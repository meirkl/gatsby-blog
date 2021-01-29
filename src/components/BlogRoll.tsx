import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'

type Props = {
  data: {
    allMarkdownRemark: {
      edges: any[]
    }
  }
  count: any
}

const BlogRoll: React.FC<Props> = props => {
  const { data } = props
  const { edges: posts } = data.allMarkdownRemark

  return (
    <div className="columns is-multiline">
      {posts &&
        posts.map(({ node: post }) => (
          <div className="is-parent column is-6" key={post.id}>
            <article
              className={`blog-list-item tile is-child box notification ${
                post.frontmatter.featuredpost ? 'is-featured' : ''
              }`}
            >
              <header>
                <p className="post-meta">
                  <Link
                    className="title has-text-primary is-size-4"
                    to={post.frontmatter.path}
                  >
                    {post.frontmatter.title}
                  </Link>
                  <span> &bull; </span>
                  <span className="subtitle is-size-5 is-block">
                    {post.frontmatter.date}
                  </span>
                </p>
              </header>
              <p>
                {post.excerpt}
                <br />
                <br />
                <Link className="button" to={post.frontmatter.path}>
                  Keep Reading →
                </Link>
              </p>
            </article>
          </div>
        ))}
    </div>
  )
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
          edges {
            node {
              excerpt(pruneLength: 400)
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
    `}
    // @ts-ignore
    render={(data: any, count: any) => <BlogRoll data={data} count={count} />}
  />
)
