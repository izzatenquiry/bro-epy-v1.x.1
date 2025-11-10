import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FirstTimeSetupView from './components/views/FirstTimeSetupView';
import { initializeAdminAccount } from './services/userService';
import { initializeConsoleInterceptor } from './services/consoleInterceptor';
import { initializeConfig, MASTER_CONFIG } from './services/configService';

const updateDocumentHead = () => {
    // Update page title
    if (MASTER_CONFIG.appName) {
        document.title = MASTER_CONFIG.appName;
    }

    // Remove any existing favicon
    const existingFavicon = document.querySelector("link[rel*='icon']");
    if (existingFavicon) {
        existingFavicon.remove();
    }

    // Add new favicon
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = MASTER_CONFIG.customFaviconDataUrl || 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤖</text></svg>';
    document.head.appendChild(favicon);
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}
const root = ReactDOM.createRoot(rootElement);

const renderApp = (config: any) => {
  initializeConsoleInterceptor();
  initializeConfig(config); // Synchronously initialize config
  updateDocumentHead();
  
  // Non-blocking initialization of admin account if needed
  initializeAdminAccount().catch(error => {
    console.error("Non-critical error during admin account initialization:", error);
  });

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

const renderSetup = () => {
  initializeConsoleInterceptor();
  console.warn("`config.js` not found. Rendering setup view. Please generate the config file and place it in the root directory.");
  root.render(
    <React.StrictMode>
      <FirstTimeSetupView />
    </React.StrictMode>
  );
};

// Main application entry point
const startApp = async () => {
  try {
    // Dynamically import the configuration file.
    // The /* @vite-ignore */ comment is crucial. It tells the build tool (Vite/Rollup)
    // not to try and bundle this file. We expect it to be missing during build,
    // and we handle the error case gracefully at runtime.
    // @ts-ignore
    const configModule = await import(/* @vite-ignore */ './config.js');
    if (configModule.default) {
      renderApp(configModule.default);
    } else {
      throw new Error('config.js does not have a default export.');
    }
  } catch (error) {
    // If config.js is not found, render the setup view.
    renderSetup();
  }
};

startApp();