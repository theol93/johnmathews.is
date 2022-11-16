import dynamic from "next/dynamic"

import generateRss from "@/lib/generate-rss"
const root = process.cwd()
import path from "path"

// https://www.npmjs.com/package/react-jupyter-notebook-viewer
// https://codesandbox.io/s/nextjs-example-react-jupyter-notebook-viewer-lzjcb5?file=/pages/index.js:0-36
// https://www.npmjs.com/package/react-jupyter-notebook <- alternative

import fs from "fs"

import { formatNotebookSlug, getNotebookBySlug, getAllNotebooksFrontMatter } from "@/lib/notebooks"

const Notebook = dynamic(() => import("@/components/Notebook"), {
  ssr: false,
})

export async function getStaticPaths() {
  const posts = await getAllNotebooksFrontMatter("notebooks") // list of filenames

  const notDrafts = posts.filter(async (p) => {
    const post = await getNotebookBySlug("notebooks", formatNotebookSlug(p.slug))
    return !post.draft
  })

  const paths = notDrafts.map((p) => ({
    params: {
      // slug: [formatNotebookSlug(p.slug).split(".")[0]],
      slug: [p.slug],
    },
  }))

  return {
    paths: paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllNotebooksFrontMatter("notebooks")

  // rss
  if (allPosts.length > 0) {
    const rss = generateRss(allPosts)
    fs.writeFileSync("./public/feed.xml", rss)
  }

  const filePath = path.join("/documents", "notebooks", `${params.slug}` + ".ipynb")

  console.log("--- debug filePath: ", filePath)
  return { props: { filePath } }
}

export default function NotebookPage({ filePath, inputLanguage = "python" }) {
  // return source
  const DARK_MODE = false
  return (
    <Notebook
      filePath={filePath}
      // filePath="/notebooks/sqlite.ipynb"
      notebookInputLanguage={inputLanguage}
      className="notebook-class"
      // notebookInputLanguage="python"
      // notebookOutputLanguage="python"
      inputCodeDarkTheme={DARK_MODE}
      outputDarkTheme={DARK_MODE}
      inputMarkdownDarkTheme={DARK_MODE}
      showInputLineNumbers={true}
      showOutputLineNumbers={false}
      outputTextClassName="output-text"
      inputTextClassName="input-text"
      outputBlockClassName="output-block"
      outputImageClassName="output-image"
      outputOuterClassName="output-outer"
      inputOuterClassName="input-outer"
      outputBorderClassName="output-border"
      inputBorderClassName="input-border"
      outputTableClassName="output-table"
      withOnClick={true}
      inputMarkdownBlockClassName="input-markdown-block"
      inputCodeBlockClassName="input-code-block"
      hideCodeBlocks={false}
      hideMarkdownBlocks={false}
      hideAllOutputs={false}
      hideAllInputs={false}
      remarkPlugins={[]}
      rehypePlugins={[]}
    />
  )
}
