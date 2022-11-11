import { bundleMDX } from "mdx-bundler"
import fs from "fs"
import matter from "gray-matter"
import path from "path"
import readingTime from "reading-time"
import { visit } from "unist-util-visit"
import getAllFilesRecursively from "./utils/files"
// Remark packages
import remarkGfm from "remark-gfm"
import remarkFootnotes from "remark-footnotes"
import remarkMath from "remark-math"
import remarkExtractFrontmatter from "./remark-extract-frontmatter"
import remarkCodeTitles from "./remark-code-title"
import remarkTocHeadings from "./remark-toc-headings"
import remarkImgToJsx from "./remark-img-to-jsx"
// Rehype packages
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeKatex from "rehype-katex"
import rehypeCitation from "rehype-citation"
import rehypePrismPlus from "rehype-prism-plus"
import rehypePresetMinify from "rehype-preset-minify"

const root = process.cwd()

export function dateSortDesc(a, b) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export function formatNotebookSlug(slug) {
  return slug
    .toLowerCase()
    .replace(/\.(ipynb)/, "")
    .replace(".nbdata", "")
}

export function getNotebooks(type) {
  const prefixPaths = path.join(root, "data", type)
  const files = getAllFilesRecursively(prefixPaths)

  const toExclude = ["checkpoint", "ds_store"]
  const goodFiles = files.filter((file) => !toExclude.some((el) => file.toLowerCase().includes(el)))

  // only return .nbdata files
  const usefulFiles = goodFiles.filter((file) => file.slice(-7) === ".nbdata")

  // Only want to return blog/path and ignore root, replace is needed to work on Windows
  return usefulFiles.map((file) => file.slice(prefixPaths.length + 1).replace(/\\/g, "/"))
}

export async function getNotebookBySlug(type, slug) {
  // for a single blog post this
  // returns an object with attributes; mdxSource, toc, fronmatter{}
  const nbdataPath = path.join(root, "data", type, `${slug}`)
  const source = fs.readFileSync(nbdataPath, "utf8")

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(root, "node_modules", "esbuild", "esbuild.exe")
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(root, "node_modules", "esbuild", "bin", "esbuild")
  }

  const { data: frontmatter } = matter(source)

  return {
    frontMatter: {
      slug: slug || null,
      ...frontmatter,
      date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
    },
  }
}

export async function getAllNotebooksFrontMatter(folder) {
  // returns an array of objects with unpacked frontmatter attributes, slug, and date
  const prefixPaths = path.join(root, "data", folder)

  const files = getAllFilesRecursively(prefixPaths)

  const toExclude = ["checkpoint", "ds_store"]
  const goodFiles = files.filter((file) => !toExclude.some((el) => file.toLowerCase().includes(el)))

  const allFrontMatter = []

  goodFiles.forEach((file) => {
    const frontMatterFile = file.replace(/\.ipynb?$/, ".nbdata")
    // Replace is needed to work on Windows
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, "/")

    if (path.extname(fileName) !== ".nbdata") {
      return
    }

    const source = fs.readFileSync(frontMatterFile, "utf8")
    const { data: frontmatter } = matter(source)

    allFrontMatter.push({
      ...frontmatter,
      slug: formatNotebookSlug(fileName),
      date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
    })
  })

  return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date))
}
