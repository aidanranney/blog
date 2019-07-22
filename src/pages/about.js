import React from "react"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

class AboutPage extends React.Component {
  render() {
    const { social } = this.props.data.site.siteMetadata
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
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            <Img fluid={data.aidanjulia.childImageSharp.fluid} />
          </div>
          <div className="socialLinks">
            <a href={`http://instagram.com/${social.instagram}`}>
              <Img fluid={data.instagram.childImageSharp.fluid} />
            </a>
            <a href={`http://twitter.com/${social.twitter}`}>
              <Img fluid={data.twitter.childImageSharp.fluid} />
            </a>
            <a href={`http://facebook.com/${social.fbook}`}>
              <Img fluid={data.facebook.childImageSharp.fluid} />
            </a>
          </div>
        </div>
      </Layout>
    )
  }
}

export default AboutPage

export const fluidImage = graphql`
  fragment fluidImage on File {
    childImageSharp {
      fluid(maxWidth: 600) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        social {
          facebook
          instagram
          twitter
        }
      }
    }
    aidanjulia: file(relativePath: { eq: "aidanjulia.png" }) {
      ...fluidImage
    }
    twitter: file(relativePath: { eq: "twitter.png" }) {
      ...fluidImage
    }
    facebook: file(relativePath: { eq: "fbook.png" }) {
      ...fluidImage
    }
    instagram: file(relativePath: { eq: "instagram.png" }) {
      ...fluidImage
    }
  }
`
