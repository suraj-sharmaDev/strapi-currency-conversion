/*
 *
 * HomePage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import { Layout,BaseHeaderLayout, ContentLayout  } from '@strapi/design-system';

const HomePage = () => {
  return (
    <Layout>
      <BaseHeaderLayout 
        title="Currency Conversion"
        subtitle="Convert any value between currencies."
        as="h2"
      />

      <ContentLayout>
        <p>Hello World</p>
      </ContentLayout>
      
    </Layout>
  );
};

export default HomePage;
