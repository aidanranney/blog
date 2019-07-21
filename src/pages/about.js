import React from "react"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

class AboutPage extends React.Component {
  render() {
    const { data } = this.props

    return (
      <Layout>
        <SEO title="About" />
        <div>
          <h2>Is a developer</h2>
          <p>
            He recently finished a diploma in technology and teaches himself
            now. He lives and works in Victoria, BC with his parter and a big
            cat.
          </p>
          <div
            style={{
              maxWidth: "400px",
            }}
          >
            <Img fluid={data.file.childImageSharp.fluid} />
            <br />
            <div>
              <span>instagram</span>
              <span>twitter</span>
              <span>facebook</span>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default AboutPage

export const pageQuery = graphql`
  query {
    file(relativePath: { eq: "aidanjulia.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
