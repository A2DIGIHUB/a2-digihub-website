// Web Vitals and performance monitoring
import { ReportHandler } from 'web-vitals';

export const initializeMonitoring = (): void => {
  // Initialize performance monitoring
  if (process.env.NODE_ENV === 'production') {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      const vitalsCallback: ReportHandler = (metric) => {
        // You can send this data to your analytics service
        console.log(metric);
      };

      getCLS(vitalsCallback);
      getFID(vitalsCallback);
      getFCP(vitalsCallback);
      getLCP(vitalsCallback);
      getTTFB(vitalsCallback);
    });
  }
};

// Error tracking
export const trackError = (error: Error, errorInfo: React.ErrorInfo): void => {
  // Log the error to your error tracking service (e.g., Sentry)
  console.error('Error:', error);
  console.error('Error Info:', errorInfo);
};

// Performance tracking
export const measurePerformance = (label: string): void => {
  if (process.env.NODE_ENV === 'development') {
    console.time(label);
  }
};

export const endMeasurePerformance = (label: string): void => {
  if (process.env.NODE_ENV === 'development') {
    console.timeEnd(label);
  }
};

// Resource loading tracking
export const trackResourceTiming = (): void => {
  if ('performance' in window && typeof window.performance.getEntriesByType === 'function') {
    const resources = window.performance.getEntriesByType('resource');
    const navigationTiming = window.performance.getEntriesByType('navigation')[0];
    
    console.log('Resource Timing:', resources);
    console.log('Navigation Timing:', navigationTiming);
  }
};

// Custom performance markers
export const setPerformanceMark = (markName: string): void => {
  if ('performance' in window && typeof window.performance.mark === 'function') {
    performance.mark(markName);
  }
};

export const measurePerformanceMarks = (
  measureName: string,
  startMark: string,
  endMark: string
): void => {
  if ('performance' in window && typeof window.performance.measure === 'function') {
    performance.measure(measureName, startMark, endMark);
    const measures = performance.getEntriesByName(measureName);
    console.log(`${measureName}:`, measures[0]);
  }
};
