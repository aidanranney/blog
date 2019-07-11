import React from 'react'
import { graphql } from 'gatsby'

const Post = (data) => {

    const post = data.markdownRemark;

    return (
        <div dangerouslySetInnerHTML={{
            __html: post.html}} />
    )
}



export default Post

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
            html
            }
        }
        }
    }
    `