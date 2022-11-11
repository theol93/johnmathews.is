import dynamic from "next/dynamic"

// https://www.npmjs.com/package/react-jupyter-notebook-viewer
// https://codesandbox.io/s/nextjs-example-react-jupyter-notebook-viewer-lzjcb5?file=/pages/index.js:0-36
// https://www.npmjs.com/package/react-jupyter-notebook <- alternative

import fs from "fs"
import PageTitle from "@/components/PageTitle"
import generateRss from "@/lib/generate-rss"

import {
  formatNotebookSlug,
  getNotebookBySlug,
  getAllNotebooksFrontMatter,
  getNotebooks,
} from "@/lib/notebooks"

import Tag from "@/components/Tag"
import Category from "@/components/Category"
import Link from "@/components/Link"
import MobileNav from "@/components/MobileNav"
import ThemeSwitch from "@/components/ThemeSwitch"

import Footer from "@/components/Footer"

import Autocomplete from "@/components/AutoComplete"
import "@algolia/autocomplete-theme-classic"

import headerNavLinks from "@/data/headerNavLinks"
import Logo from "@/data/logo.svg"
import siteMetadata from "@/data/siteMetadata"

const DEFAULT_LAYOUT = "PostLayout"

const Notebook = dynamic(() => import("@/components/Notebook"), {
  ssr: false,
})

export async function getStaticPaths() {
  const posts = getNotebooks("notebooks") // list of filenames

  const notDrafts = posts.filter(async (p) => {
    const post = await getNotebookBySlug("notebooks", formatNotebookSlug(p))
    return !post.draft
  })

  const paths = notDrafts.map((p) => ({
    params: {
      slug: [formatNotebookSlug(p).split(".")[0]],
    },
  }))

  return {
    paths: paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllNotebooksFrontMatter("notebooks")
  // const thisPost = allPosts.filter((post) => formatNotebookSlug(post.slug) === params.slug.join("/"))[0]

  // rss
  // if (allPosts.length > 0) {
  //   const rss = generateRss(allPosts)
  //   fs.writeFileSync("./public/feed.xml", rss)
  // }

  const slug = params.slug
  // const filePath = `./data/notebooks/${params.slug.join("/")}.ipynb`
  const filePath = `./data/notebooks/${slug}.ipynb`
  const source = fs.readFileSync(filePath, "utf8")

  return { props: { source } }
}

export default function NotebookPage({ source, inputLanguage = "python" }) {
  return <Notebook filePath={source} notebookInputLanguage={inputLanguage} />
}
