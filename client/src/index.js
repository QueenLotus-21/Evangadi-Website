import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const {BrowserRouter} = require("react-router-dom");


// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

const root=ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
  //   <BrowserRouter>
  //      <App />
  //   </BrowserRouter>
  // </React.StrictMode>
  <BrowserRouter>
     <App />
  </BrowserRouter>
)