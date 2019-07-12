import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import { rhythm, scale } from "../utils/typography"

const Post = ({ data }) => {
  const post = data.markdownRemark

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      ></SEO>
      <h3 style={{ marginTop: rhythm(1), marginBottom: 0 }}>
        {post.frontmatter.title}
      </h3>
      <small>{post.frontmatter.date}</small>
      <div
        dangerouslySetInnerHTML={{
          __html: post.html,
        }}
      />
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
