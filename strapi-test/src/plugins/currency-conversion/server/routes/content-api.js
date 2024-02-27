'use strict';

module.exports = {
    type: 'content-api',
    routes: [
        {
          method: 'GET',
          path: '/',
          handler: 'myController.index',
          config: {
            policies: [],
            auth: false
          },
        },
        {
          method: 'GET',
          path: '/getAll',
          handler: 'myController.getAll',
          config: {
            policies: ['plugin::currency-conversion.has-full-access-token'],
            auth: false
          },
        },
        {
          method: 'POST',
          path: '/create',
          handler: 'myController.create',
          config: {
            policies: [],
            auth: false
          },
        },
        {
          method: 'PUT',
          path: '/update/:id',
          handler: 'myController.update',
          config: {
            policies: [],
            auth: false
          },
        },
        {
          method: 'DELETE',
          path: '/delete/:id',
          handler: 'myController.delete',
          config: {
            policies: [],
            auth: false
          },
        },
      ]
};