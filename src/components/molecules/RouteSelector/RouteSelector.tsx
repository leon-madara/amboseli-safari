'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import styles from './RouteSelector.module.css';

export interface Route {
  id: string;
  name: string;
  icon: string;
  duration: string;
  distance: string;
  recommended?: boolean;
}

export interface RouteSelectorProps {
  routes: Route[];
  onRouteChange: (routeId: string) => void;
  defaultRoute?: string;
}

export function RouteSelector({
  routes,
  onRouteChange,
  defaultRoute,
}: RouteSelectorProps) {
  const [selectedRoute, setSelectedRoute] = useState(
    defaultRoute || routes[0]?.id
  );

  const handleRouteClick = (routeId: string) => {
    setSelectedRoute(routeId);
    onRouteChange(routeId);
  };

  const selectedRouteData = routes.find(r => r.id === selectedRoute);

  return (
    <div className={styles.routeSelector}>
      <div className={styles.routeTabs}>
        {routes.map((route) => (
          <button
            key={route.id}
            className={clsx(
              styles.routeTab,
              selectedRoute === route.id && styles.active
            )}
            onClick={() => handleRouteClick(route.id)}
            aria-label={`Select route from ${route.name}`}
          >
            <span className={styles.routeIcon} aria-hidden="true">{route.icon}</span>
            <span className={styles.routeName}>{route.name}</span>
            {route.recommended && (
              <span className={styles.recommendedBadge}>Recommended</span>
            )}
            {selectedRoute === route.id && (
              <motion.div
                className={styles.activeIndicator}
                layoutId="activeRoute"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {selectedRouteData && (
        <div className={styles.routeDetails}>
          <motion.div
            key={selectedRoute}
            className={styles.routeInfo}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.routeMetric}>
              <span className={styles.metricLabel}>Distance:</span>
              <span className={styles.metricValue}>{selectedRouteData.distance}</span>
            </div>
            <div className={styles.routeMetric}>
              <span className={styles.metricLabel}>Duration:</span>
              <span className={styles.metricValue}>{selectedRouteData.duration}</span>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
