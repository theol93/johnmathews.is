import Link from "@/components/Link"
import PageTitle from "@/components/PageTitle"
import { BlogSEO } from "@/components/SEO"

import Footer from "@/components/Footer"
import Image from "@/components/Image"
import Tag from "@/components/Tag"
import siteMetadata from "@/data/siteMetadata"
import Comments from "@/components/comments"
import ScrollTop from "@/components/ScrollTop"

import path from "path"
import dynamic from "next/dynamic"
const Notebook = dynamic(() => import("@/components/Notebook"), {
  ssr: false,
})

export default function PostLayout({ frontMatter, authorDetails, children }) {
  const { slug, title } = frontMatter

  var PostImage
  if (frontMatter.image) {
    PostImage = (
      <div className="pb-5">
        <Image src={frontMatter.image} alt={frontMatter.title} height="500" width="900" />
      </div>
    )
  } else {
    PostImage = null
  }

  var PostSummary
  if (frontMatter.summary) {
    PostSummary = <div className="py-5 font-serif text-xl"> {frontMatter.summary} </div>
  } else {
    PostSummary = null
  }

  console.log("--- debug frontMatter: ", frontMatter)
  console.log("--- debug PostSummary: ", PostSummary)
  console.log("--- debug PostImage: ", PostImage)

  function renderChildren() {
    if (frontMatter.notebook) {
      const filePath = path.join("/", "documents", "notebooks", `${slug}` + ".ipynb")
      return (
        <Notebook
          filePath={filePath}
          withOnClick={false}
          inputCodeDarkTheme={true}
          outputDarkTheme={true}
          inputMarkdownDarkTheme={true}
          showInputLineNumbers={true}
          showOutputLineNumbers={false}
        />
      )
    } else {
      return children
    }
  }

  return (
    <>
      <div
        id="sectionContainerWrapsFooter"
        className="mt-5 min-h-screen px-4 md:mx-auto lg:mt-16 xl:px-0 2xl:mt-32 2xl:w-5/6"
      >
        <div
          id="layoutWrapperDoesntWrapFooter"
          className="z-10 min-h-screen justify-between md:flex md:flex-col lg:ml-32"
        >
          <div id="LayoutWrapperForFlex" className="justify-between lg:flex lg:flex-row">
            <BlogSEO
              url={`${siteMetadata.siteUrl}/posts/${slug}`}
              authorDetails={authorDetails}
              {...frontMatter}
            />
            <ScrollTop />
            <article id="article" className="md:mx-5 lg:mx-0 xl:mt-20">
              <div className="">
                <header className="pt-0 2xl:mb-6">
                  {PostImage}
                  <div className="space-y-1 text-center">
                    <div className="">
                      <PageTitle>{title}</PageTitle>
                    </div>
                  </div>
                </header>
                <div
                  id="contentContainer"
                  className="pb-8 xl:max-w-5xl"
                  style={{ gridTemplateRows: "auto 1fr" }}
                >
                  <div className="xl:col-span-3 xl:row-span-2 xl:pb-0">
                    {PostSummary}
                    <div
                      id="content"
                      className="prose-xl max-w-none pt-10 pb-8 dark:prose-dark dark:text-gray-100"
                    >
                      {renderChildren()}
                    </div>
                  </div>
                  <footer className="">
                    <div className="pt-4 xl:pt-8">
                      <Link
                        href="/posts"
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        &larr; Back to the blog
                      </Link>
                    </div>
                  </footer>
                </div>
              </div>
            </article>
          </div>
          <Footer />
        </div>
      </div>
    </>
  )
}
