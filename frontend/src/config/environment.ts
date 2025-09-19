// Environment configuration for the application
export const config = {
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
    endpoints: {
      path: '/api/path',
      health: '/api/health'
    }
  },

  // Map Configuration
  map: {
    defaultCenter: {
      lat: parseFloat(import.meta.env.VITE_DEFAULT_LAT || '-6.2088'),
      lng: parseFloat(import.meta.env.VITE_DEFAULT_LNG || '106.8456')
    },
    defaultZoom: parseInt(import.meta.env.VITE_DEFAULT_ZOOM || '13'),
    tileLayer: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
  },

  // Search Configuration
  search: {
    nominatimUrl: import.meta.env.VITE_NOMINATIM_URL || 'https://nominatim.openstreetmap.org',
    debounceMs: parseInt(import.meta.env.VITE_SEARCH_DEBOUNCE_MS || '300'),
    maxResults: parseInt(import.meta.env.VITE_MAX_SEARCH_RESULTS || '5')
  },

  // UI Configuration
  ui: {
    enableDemoData: import.meta.env.VITE_ENABLE_DEMO_DATA === 'true' || true,
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true' || false
  },

  // Development Configuration
  dev: {
    debugMode: import.meta.env.VITE_DEBUG_MODE === 'true' || false,
    enableConsoleLogs: import.meta.env.VITE_ENABLE_CONSOLE_LOGS === 'true' || true
  }
};

// Helper function to check if we're in development mode
export const isDevelopment = import.meta.env.DEV;

// Helper function to check if we're in production mode
export const isProduction = import.meta.env.PROD;

// Helper function for debug logging
export const debugLog = (...args: any[]) => {
  if (config.dev.enableConsoleLogs && (isDevelopment || config.dev.debugMode)) {
    console.log('[DEBUG]', ...args);
  }
};

// Helper function for error logging
export const errorLog = (...args: any[]) => {
  if (config.dev.enableConsoleLogs) {
    console.error('[ERROR]', ...args);
  }
};
