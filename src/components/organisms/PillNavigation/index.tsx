/**
 * PillNavigation with Error Boundary
 * Exports the navigation component wrapped in an error boundary for resilience
 * Requirements: 3.4
 */

import { NavigationErrorBoundary } from './NavigationErrorBoundary';
import PillNavigation, { PillNavigationProps } from './PillNavigation';

export default function PillNavigationWithErrorBoundary(props: PillNavigationProps) {
  return (
    <NavigationErrorBoundary>
      <PillNavigation {...props} />
    </NavigationErrorBoundary>
  );
}

// Export the error boundary separately for custom usage
export { NavigationErrorBoundary } from './NavigationErrorBoundary';
export { PillNavigationProps } from './PillNavigation';
