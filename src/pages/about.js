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
        <div >
          <div style={{width: '100%'}}>
          <h3>Is a developer</h3>
          <p>
            He recently finished a diploma in technology and teaches himself
            now. He lives and works in Victoria, BC with his parter and a big cat.
          </p>
          <div style={{ maxWidth: "300px" }}>
            <Img fluid={data.file.childImageSharp.fluid} />
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
