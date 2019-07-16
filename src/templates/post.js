import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"

const Post = ({ data }) => {
  const post = data.markdownRemark

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <div className="post">
        <h3>{post.frontmatter.title}</h3>
        <small>{post.frontmatter.date}</small>
        <div
          dangerouslySetInnerHTML={{
            __html: post.html,
          }}
        />
      </div>
    </Layout>
  )
}

export default Post

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "LL")
      }
    }
  }
`
