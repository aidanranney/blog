import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

class Resume extends React.Component {
  render() {
    const { data } = this.props

    return (
      <Layout>
        <SEO title="Resume" />
      </Layout>
    )
  }
}

export default Resume
