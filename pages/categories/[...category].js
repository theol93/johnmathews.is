import { CategorySEO } from "@/components/SEO"
import siteMetadata from "@/data/siteMetadata"
import ListLayout from "@/layouts/ListLayout"
import generateRss from "@/lib/generate-rss"
import { getAllFilesFrontMatter } from "@/lib/mdx"
import { getAllCategories } from "@/lib/categories"
import kebabCase from "@/lib/utils/kebabCase"
import fs from "fs"
import path from "path"

const root = process.cwd()

export async function getStaticPaths() {
  const categories = await getAllCategories("blog")
  console.log("--- debug categories: ", categories)

  const paths = Object.keys(categories).map((category) => ({
    params: {
      category: category.split(" "),
    },
  }))
  console.log("--- debug paths: ", paths)

  return {
    paths,
    fallback: false,
  }
}

// example from ...slug.js
// export async function getStaticPaths() {
//   const posts = getFiles("blog")
//   return {
//     paths: posts.map((p) => ({
//       params: {
//         slug: formatSlug(p).split("/"),
//       },
//     })),
//     fallback: false,
//   }
// }

export async function getStaticProps({ params }) {
  const allPosts = await getAllFilesFrontMatter("blog")
  const filteredPosts = allPosts.filter(
    (post) =>
      post.draft !== true && post.category.map((c) => kebabCase(c)).includes(params.category)
  )

  // rss
  if (filteredPosts.length > 0) {
    const rss = generateRss(filteredPosts, `categories/${params.category}/feed.xml`)
    const rssPath = path.join(root, "public", "categories", params.category)
    fs.mkdirSync(rssPath, { recursive: true })
    fs.writeFileSync(path.join(rssPath, "feed.xml"), rss)
  }

  return { props: { posts: filteredPosts, category: params.category } }
}

export default function Category({ posts, category }) {
  // Capitalize first letter and convert space to dash
  const title = category //[0].toUpperCase() + category.split(" ").join("-").slice(1)
  return (
    <>
      <CategorySEO
        title={`${category} - ${siteMetadata.author}`}
        description={`${category} category - ${siteMetadata.author}`}
      />
      <ListLayout posts={posts} title={title} />
    </>
  )
}