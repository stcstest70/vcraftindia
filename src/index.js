import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Context from './context/Context';
import Context1 from './context/Context1';
import { DataProvider } from './reducer/SearchReducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Context1>
        <Context>
          <DataProvider>
            <App />
          </DataProvider>
        </Context>
      </Context1>
    </BrowserRouter>
  </React.StrictMode>
);

