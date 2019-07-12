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
          <h2>Is a recent graduate and developer.</h2>
          <p>
            He recently finished a diploma in technology and teaches himself
            now.
          </p>
          <p>
            He lives and works in Victoria, BC with his parter and a big cat.
          </p>
          <div style={{ maxWidth: "300px" }}>
            <Img fluid={data.file.childImageSharp.fluid} />
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
