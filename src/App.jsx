import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { CompraProvider } from './Providers/Compra';
import './Library.css';
import './root.css'
import './App.css';
import { Home } from './components/Home/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <CompraProvider>
            <Home />
        </CompraProvider>
      </div>
    </Router>
  );
}

export default App;
