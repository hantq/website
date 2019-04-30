const path = require('path');
const _ = require('lodash');
const Promise = require('bluebird');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = ({ graphql, actions: { createPage } }) => {
  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js');

    resolve(
      graphql(
        `
          {
            allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges;

        _.each(posts, (post, index) => {
          const previous = index === posts.length - 1 ? null : posts[index + 1].node;
          const next = index === 0 ? null : posts[index - 1].node;

          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              previous,
              next,
            },
          });
        });
      })
    );
  });
};

exports.onCreateNode = ({ getNode, node, actions: { createNodeField } }) => {
  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: 'slug',
      node,
      value,
    });
  }
};
