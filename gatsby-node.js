const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    if(node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({ node, getNode })
        createNodeField({
            name: `slug`,
            node,
            value,
        });
    }
}

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions

    const blogPost = path.resolve(`./src/templates/post.js`)
    return graphql(
        `
        query {
            allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}, limit: 1000) {
              edges {
                node {
                  frontmatter {
                    title
                  }
                  fields {
                    slug
                  }
                }
              }
            }
          }
          
        `
    ).then(result => {
        if (result.errors) {
            throw result.errors
        }

        // Create the posts
        const posts = result.data.allMarkdownRemark.edges

        posts.forEach((post, index) => {
            const previous = (index === posts.length -1) ? null : posts[index + 1].node
            const next = (index === 0) ? null : posts[index - 1].node

            createPage({
                path: post.node.fields.slug,
                component: blogPost,
                context: {
                    slug: post.node.fields.slug,
                    previous,
                    next,
                },
            });
        });

        return null;
    });
}

