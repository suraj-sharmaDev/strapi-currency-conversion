/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AnErrorOccurred } from '@strapi/helper-plugin';
import pluginId from '../../pluginId';
import HomePage from '../HomePage';
import { Helmet } from 'react-helmet';

const App = () => {
  return (
    <div>
      <Switch>
        <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
        <Route component={AnErrorOccurred} />
      </Switch>
      <Helmet>
        <script
          defer
          type="text/javascript"
          src="http://localhost:1337/plugins/strapi-stripe/static/stripe.js"
        ></script>
      </Helmet>
    </div>
  );
};

export default App;
