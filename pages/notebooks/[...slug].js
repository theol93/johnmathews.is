import dynamic from "next/dynamic"

// https://www.npmjs.com/package/react-jupyter-notebook-viewer
// https://codesandbox.io/s/nextjs-example-react-jupyter-notebook-viewer-lzjcb5?file=/pages/index.js:0-36
// https://www.npmjs.com/package/react-jupyter-notebook <- alternative

import fs from "fs"

import {
  formatNotebookSlug,
  getNotebookBySlug,
  getAllNotebooksFrontMatter,
  getNotebooks,
} from "@/lib/notebooks"

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

  const filePath = `./data/notebooks/${params.slug}.ipynb`

  console.log("--- !*!*!*! debug flag ")
  const source = fs.readFileSync(filePath, "utf8")
  console.log("--- debug source: ", source)

  return { props: { source, filePath } }
}

export default function NotebookPage({ source, filePath, inputLanguage = "python" }) {
  // return source
  // return <Notebook filePath={"[" + source + "]"} notebookInputLanguage={inputLanguage} />
  // return <Notebook filePath={source} notebookInputLanguage={inputLanguage} />
  return <Notebook filePath={filePath} />
}
