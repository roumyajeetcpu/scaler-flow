/**
 * Logger utility that respects production environment
 * Automatically disables console logs in production
 */

const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
    log: (...args: any[]) => {
        if (isDevelopment) {
            console.log(...args);
        }
    },

    warn: (...args: any[]) => {
        if (isDevelopment) {
            console.warn(...args);
        }
    },

    error: (...args: any[]) => {
        // Always log errors, even in production
        console.error(...args);
    },

    info: (...args: any[]) => {
        if (isDevelopment) {
            console.info(...args);
        }
    },

    debug: (...args: any[]) => {
        if (isDevelopment) {
            console.debug(...args);
        }
    },

    table: (data: any) => {
        if (isDevelopment) {
            console.table(data);
        }
    },
};

// Export individual functions for convenience
export const { log, warn, error, info, debug } = logger;
