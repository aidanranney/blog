import React from "react"
import Img from "gatsby-image"
import { graphql, useStaticQuery } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => {
    const data = useStaticQuery(graphql`
    query {
    file(relativePath: { eq: "juliaaidan.png" }) {
        childImageSharp {
        fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
        }
        }
    }
    }
`)
return (
  <Layout>
    <SEO title="About" />
    <h2>Is a recent graduate and developer.</h2>
    <p>He recently finished a diploma in technology and teaches himself now.</p>
    <p>He lives and works in Victoria, BC with his parter and a big cat.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Img fluid={data.file.childImageSharp.fluid} />
    </div>
  </Layout>
)
}

export default AboutPage