import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Routes from './rotas/routes.js'

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;