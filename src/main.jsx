import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import axios from 'axios';
import { store, persistor } from './redox/store.js';
import './index.css'
import App from './App.jsx';

// UI-only mode: preserve form flows without making any external requests.
axios.defaults.adapter = async (config) => ({
  data: { success: true, message: 'Static UI response', data: [] },
  status: 200,
  statusText: 'OK',
  headers: {},
  config,
});
const nativeFetch = window.fetch.bind(window);
window.fetch = async (input, init) => {
  const url = typeof input === 'string' ? input : input?.url || '';
  if (url.includes('/api/') || url.includes('onrender.com')) {
    return new Response(JSON.stringify({ success: true, data: [], message: 'Static UI response' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return nativeFetch(input, init);
};
// import initClipboardHandler from './utils/clipboardHandler'

// // Initialize clipboard handler to prevent service worker errors
// initClipboardHandler()

// Simple loading component
const Loading = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    fontSize: '20px'
  }}>
    Loading...
  </div>
)

// Get Google Client ID from environment variables
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
