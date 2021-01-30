import React from 'react'
import BlogRoll from '../components/BlogRoll'

const BlogIndexPage: React.FC = () => {
  return (
    <>
      <h1>Latest Posts</h1>
      <section>
        <div>
          <BlogRoll />
        </div>
      </section>
    </>
  )
}

export default BlogIndexPage
