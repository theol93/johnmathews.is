import PostsInYear from "@/components/PostsInYear"

const PostsGroupedByYear = ({ type, posts }) => {
  return (
    <>
      {Object.keys(posts)
        .reverse()
        .map((year) => {
          return (
            <>
              <div key={year} className="text-3xl font-medium 2xl:my-10 2xl:text-4xl">
                {year}
              </div>
              <ul key={`${year}_list`}>
                <PostsInYear type={type} year={year} posts={posts} />
              </ul>
            </>
          )
        })}
    </>
  )
}

export default PostsGroupedByYear
