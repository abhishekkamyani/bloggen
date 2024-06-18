import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const defaultProps = {
  title: 'Bloggen - The Blog Website', 
  description: 'Bloggen - Your go-to source for insightful articles, tips, and stories on various topics ranging from technology to lifestyle. Stay informed and inspired with our daily updates',
  keywords: 'bloggen, blog, vlog, posts, medium, wikipedia, abhishek kamyani, blogs, post, research, paper, page',
  image: '/images/logo.png', 
  author: 'Abhishek Kamyani',
  url: 'bloggen.vercel.app', // Add a default URL
};

const CustomHelmet = ({
  title = defaultProps.title,
  description = defaultProps.description,
  keywords = defaultProps.keywords,
  image = defaultProps.image,
  author = defaultProps.author,
  date = new Date().toISOString().slice(0, 10), 
  url = defaultProps.url
  // ...other props if needed
}) => {
  return (
    <HelmetProvider>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="date" content={date} />

      {/* Open Graph Meta Tags -> for sharing on social-media */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} /> 
      <meta property="og:type" content="website" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
    </HelmetProvider>
  );
};

export default CustomHelmet;