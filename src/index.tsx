import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './Root';
import './common/prototypes.extensions/index'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
