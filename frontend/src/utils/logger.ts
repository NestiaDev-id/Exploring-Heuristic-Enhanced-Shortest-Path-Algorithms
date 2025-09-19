// Logger utility untuk aplikasi

export const LogLevel = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
} as const;

export type LogLevelType = typeof LogLevel[keyof typeof LogLevel];

interface LogEntry {
  timestamp: string;
  level: LogLevelType;
  message: string;
  data?: any;
  component?: string;
}

class Logger {
  private level: LogLevelType;
  private logs: LogEntry[] = [];
  private maxLogs: number = 1000;

  constructor(level: LogLevelType = LogLevel.INFO) {
    this.level = level;
  }

  private shouldLog(level: LogLevelType): boolean {
    return level >= this.level;
  }

  private formatMessage(level: LogLevelType, message: string, component?: string): string {
    const timestamp = new Date().toISOString();
    const levelName = Object.keys(LogLevel).find(key => LogLevel[key as keyof typeof LogLevel] === level) || 'UNKNOWN';
    const componentStr = component ? `[${component}]` : '';
    return `${timestamp} ${levelName}${componentStr}: ${message}`;
  }

  private addLog(level: LogLevelType, message: string, data?: any, component?: string): void {
    if (!this.shouldLog(level)) return;

    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      component
    };

    this.logs.push(logEntry);

    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Console output
    const formattedMessage = this.formatMessage(level, message, component);
    
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(formattedMessage, data);
        break;
      case LogLevel.INFO:
        console.info(formattedMessage, data);
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage, data);
        break;
      case LogLevel.ERROR:
        console.error(formattedMessage, data);
        break;
    }
  }

  debug(message: string, data?: any, component?: string): void {
    this.addLog(LogLevel.DEBUG, message, data, component);
  }

  info(message: string, data?: any, component?: string): void {
    this.addLog(LogLevel.INFO, message, data, component);
  }

  warn(message: string, data?: any, component?: string): void {
    this.addLog(LogLevel.WARN, message, data, component);
  }

  error(message: string, data?: any, component?: string): void {
    this.addLog(LogLevel.ERROR, message, data, component);
  }

  // Get all logs
  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  // Get logs by level
  getLogsByLevel(level: LogLevelType): LogEntry[] {
    return this.logs.filter(log => log.level === level);
  }

  // Clear all logs
  clearLogs(): void {
    this.logs = [];
  }

  // Set log level
  setLevel(level: LogLevelType): void {
    this.level = level;
  }

  // Export logs as JSON
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}

// Create singleton instance
export const logger = new Logger(
  import.meta.env.DEV ? LogLevel.DEBUG : LogLevel.INFO
);

// Convenience functions
export const debugLog = (message: string, data?: any, component?: string) => 
  logger.debug(message, data, component);

export const infoLog = (message: string, data?: any, component?: string) => 
  logger.info(message, data, component);

export const warnLog = (message: string, data?: any, component?: string) => 
  logger.warn(message, data, component);

export const errorLog = (message: string, data?: any, component?: string) => 
  logger.error(message, data, component);

// Error boundary helper
export const logError = (error: Error, component?: string) => {
  errorLog(`Error in ${component || 'Unknown component'}: ${error.message}`, {
    stack: error.stack,
    name: error.name
  }, component);
};

// API call logging
export const logApiCall = (url: string, method: string, data?: any) => {
  debugLog(`API Call: ${method} ${url}`, data, 'API');
};

export const logApiResponse = (url: string, status: number, data?: any) => {
  const level = status >= 400 ? LogLevel.ERROR : LogLevel.INFO;
  const message = `API Response: ${status} ${url}`;
  
  if (level === LogLevel.ERROR) {
    errorLog(message, data, 'API');
  } else {
    infoLog(message, data, 'API');
  }
};

export default logger;
