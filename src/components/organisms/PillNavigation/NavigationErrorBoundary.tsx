'use client';

import { Component, ReactNode } from 'react';

interface NavigationErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface NavigationErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary component for navigation
 * Catches errors in navigation components and displays fallback UI
 * Requirements: 3.4
 */
export class NavigationErrorBoundary extends Component<
  NavigationErrorBoundaryProps,
  NavigationErrorBoundaryState
> {
  constructor(props: NavigationErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): NavigationErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console for debugging
    console.error('Navigation Error:', error, errorInfo);
    
    // In production, you might want to log this to an error reporting service
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // Example: logErrorToService(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Render custom fallback UI or default fallback
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI - minimal navigation
      return (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            padding: '24px 32px',
            backgroundColor: 'rgba(250, 247, 242, 0.95)',
            borderBottom: '1px solid rgba(232, 213, 196, 0.5)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <a
            href="/"
            style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: '#3A3633',
              textDecoration: 'none',
            }}
          >
            Amboseli Safari Club
          </a>
          <nav>
            <a
              href="/"
              style={{
                marginLeft: '1.5rem',
                color: '#3A3633',
                textDecoration: 'none',
                fontSize: '1rem',
              }}
            >
              Home
            </a>
          </nav>
        </div>
      );
    }

    return this.props.children;
  }
}
