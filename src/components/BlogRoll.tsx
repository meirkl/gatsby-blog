import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { MarkDownRemark } from '../entities/markdown-remark'

type GraphQLResult = {
  allMarkdownRemark: {
    totalCount: number
    edges: Array<{ node: MarkDownRemark }>
  }
}

const BlogRoll: React.FC = () => {
  const { allMarkdownRemark }: GraphQLResult = useStaticQuery(graphql`
    query BlogRollQuery {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        totalCount
        edges {
          node {
            excerpt(pruneLength: 300)
            id
            frontmatter {
              path
              title
              date(formatString: "MMMM DD, YYYY")
            }
          }
        }
      }
    }
  `)
  const { edges: posts } = allMarkdownRemark

  return (
    <div>
      {posts &&
        posts.map(({ node: post }) => (
          <div key={post.id}>
            <article>
              <header>
                <p>
                  <Link to={post.frontmatter.path}>
                    {post.frontmatter.title}
                  </Link>
                  <span> &bull; </span>
                  <span>{post.frontmatter.date}</span>
                </p>
              </header>
              <p>
                {post.excerpt}
                <br />
                <br />
                <Link to={post.frontmatter.path}>Keep Reading →</Link>
              </p>
            </article>
          </div>
        ))}
    </div>
  )
}

export default BlogRoll
