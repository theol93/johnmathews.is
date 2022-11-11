import { getAllNotebooksFrontMatter } from "@/lib/notebooks"
import siteMetadata from "@/data/siteMetadata"
import ListLayout from "@/layouts/ListLayout"
import { PageSEO } from "@/components/SEO"

export const POSTS_PER_PAGE = 55

export async function getStaticProps() {
  const notebooks = await getAllNotebooksFrontMatter("notebooks")

  return { props: { notebooks } }
}

export default function NotebookPage({ notebooks }) {
  return (
    <>
      <PageSEO
        title={`Notebooks - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <ListLayout type={"notebook"} posts={notebooks} title="Notebooks" />
    </>
  )
}
