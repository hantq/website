import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

const query = graphql`
  query GetSiteMetadata {
    site {
      siteMetadata {
        title
        author
        description
        siteUrl
      }
    }
  }
`;

function SEO({ meta, image, title, description, slug }) {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const { siteMetadata } = data.site;
        const metaDescription = description || siteMetadata.description;
        const metaImage = image ? `${siteMetadata.siteUrl}/${image}` : null;
        const url = `${siteMetadata.siteUrl}${slug}`;
        return (
          <Helmet
            htmlAttributes={{ lang: 'en' }}
            {...(title
              ? {
                  titleTemplate: `%s - ${siteMetadata.title}`,
                  title,
                }
              : {
                  title: siteMetadata.title,
                })}
            meta={[
              {
                name: 'description',
                content: metaDescription,
              },
              {
                property: 'og:url',
                content: url,
              },
              {
                property: 'og:title',
                content: title || siteMetadata.title,
              },
              {
                name: 'og:description',
                content: metaDescription,
              },
              {
                name: 'weibo:webpage:url',
                content: url,
              },
              {
                name: 'weibo:webpage:title',
                content: title || siteMetadata.title,
              },
              {
                name: 'weibo:webpage:description',
                content: metaDescription,
              },
            ]
              .concat(
                metaImage
                  ? [
                      {
                        property: 'og:image',
                        content: metaImage,
                      },
                      {
                        name: 'weibo:webpage:image',
                        content: metaImage,
                      },
                    ]
                  : []
              )
              .concat(meta)}
          />
        );
      }}
    />
  );
}

SEO.defaultProps = {
  meta: [],
  title: '',
  slug: '',
};

SEO.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  meta: PropTypes.array,
  slug: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default SEO;
