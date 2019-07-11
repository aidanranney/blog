import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link, graphql } from "gatsby"
import { rhythm } from "../utils/typography"

class IndexPage extends React.Component {

  render() {
    const { data } = this.props
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout>
        <SEO title="Home" />
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <div key={node.fields.slug}>
                <h3 style={{marginBottom: rhythm(1/4)}}>
                  <Link to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
                <p dangerouslySetInnerHTML={{__html: node.frontmatter.description || node.excerpt}} />
              </div>
            )
          })}
        </div>
      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author
      }
    }
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "LL")
          }
          fields {
            slug
          }
          html
          excerpt
        }
      }
    }
  }
`
