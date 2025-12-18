import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SWRConfig } from 'swr';
import './index.css';
import App from './App.jsx';

const localStorageProvider = () => {
  if (typeof window === 'undefined') {
    return new Map();
  }

  const key = 'app-cache';
  const storedData = window.localStorage.getItem(key);
  const map = new Map(storedData ? JSON.parse(storedData) : []);

  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    window.localStorage.setItem(key, appCache);
  });

  return map;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SWRConfig
      value={{
        provider: localStorageProvider,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        refreshInterval: 30000,
        dedupingInterval: 2000,
      }}
    >
      <App />
    </SWRConfig>
  </StrictMode>,
);
