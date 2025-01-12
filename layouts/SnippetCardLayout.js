import Link from "@/components/Link"
import Image from "@/components/Image"
import Footer from "@/components/Footer"
import siteMetadata from "@/data/siteMetadata"

export default function SnippetCardLayout({ children }) {
  return (
    <article className="snippetCard h-32">
      <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
        <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
          <div
            id="content"
            className="2xl:max-h-96 prose  max-w-none overflow-y-auto pt-10 pb-8 dark:prose-dark"
          >
            {children}
          </div>
        </div>
      </div>
    </article>
  )
}
