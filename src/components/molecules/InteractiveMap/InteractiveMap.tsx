'use client';

import { useState } from 'react';
import { RouteWaypoint, ProximityInfo } from '@/data/locationData';
import styles from './InteractiveMap.module.css';

export interface InteractiveMapProps {
  waypoints: RouteWaypoint[];
  centerLat?: number;
  centerLng?: number;
  zoom?: number;
  showRoute?: boolean;
  proximityLandmarks?: ProximityInfo[];
}

/**
 * Interactive Map Component - Fallback Implementation
 *
 * Note: This is a fallback static map implementation.
 * For full interactive Mapbox functionality, proper mapbox-gl setup is required.
 *
 * TODO: Replace with full react-map-gl implementation when mapbox-gl dependency is resolved
 */
export function InteractiveMap({
  waypoints,
  centerLat = -2.0,
  centerLng = 37.0,
  zoom = 7,
  showRoute = true,
  proximityLandmarks = [],
}: InteractiveMapProps) {
  const [activeMarker, setActiveMarker] = useState<number | null>(null);
  const [activeLandmark, setActiveLandmark] = useState<string | null>(null);

  // Generate Mapbox static map URL with markers
  const generateStaticMapUrl = () => {
    try {
      const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

      if (!mapboxToken) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('InteractiveMap: Mapbox token not configured');
        }
        return null;
      }

      // Validate waypoints
      if (!waypoints || waypoints.length === 0) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('InteractiveMap: No waypoints provided');
        }
        return null;
      }

      // Sort waypoints by order with safety check
      const sortedWaypoints = [...waypoints]
        .filter(wp => wp && typeof wp.lat === 'number' && typeof wp.lng === 'number')
        .sort((a, b) => (a.order || 0) - (b.order || 0));

      if (sortedWaypoints.length === 0) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('InteractiveMap: No valid waypoints after filtering');
        }
        return null;
      }

      // Create pin overlays for each waypoint
      const waypointPins = sortedWaypoints.map((wp, idx) =>
        `pin-s-${idx + 1}+D4AF37(${wp.lng},${wp.lat})`
      ).join(',');

      // Create markers for proximity landmarks (different color)
      const landmarkPins = proximityLandmarks
        .filter(lm => lm && typeof lm.coordinates?.lat === 'number' && typeof lm.coordinates?.lng === 'number')
        .map(lm => `pin-s+FF6B35(${lm.coordinates.lng},${lm.coordinates.lat})`)
        .join(',');

      const pins = landmarkPins ? `${waypointPins},${landmarkPins}` : waypointPins;

      // Calculate center point from waypoints
      let mapCenterLng = centerLng || 0;
      let mapCenterLat = centerLat || 0;

      if (sortedWaypoints.length > 0) {
        const lngs = sortedWaypoints.map(wp => wp.lng);
        const lats = sortedWaypoints.map(wp => wp.lat);
        mapCenterLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;
        mapCenterLat = (Math.min(...lats) + Math.max(...lats)) / 2;
      }

      // Generate path coordinates for route line (if more than 1 waypoint)
      let pathOverlay = '';
      if (showRoute && sortedWaypoints.length > 1) {
        const pathCoords = sortedWaypoints.map(wp => `${wp.lng},${wp.lat}`).join(',');
        pathOverlay = `path-5+D4AF37-0.8(${encodeURIComponent(`polyline(${pathCoords})`)})`;
      }

      const overlays = pathOverlay ? `${pathOverlay},${pins}` : pins;

      return `https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/static/${overlays}/${mapCenterLng},${mapCenterLat},${zoom || 7},0/800x500@2x?access_token=${mapboxToken}`;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('InteractiveMap: Error generating map URL:', error);
      }
      return null;
    }
  };

  const mapUrl = generateStaticMapUrl();

  if (!mapUrl) {
    return (
      <div className={styles.mapError}>
        <p>Map configuration error. Please check environment variables.</p>
      </div>
    );
  }

  return (
    <div className={styles.mapContainer}>
      {/* Static map background */}
      <div className={styles.staticMapWrapper}>
        {/* Using img tag instead of Next Image for Mapbox API URLs */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mapUrl}
          alt="Route map showing journey waypoints"
          className={styles.mapImage}
        />
      </div>

      {/* Waypoint markers overlay */}
      <div className={styles.markersOverlay}>
        {waypoints.map((waypoint, index) => {
          // Calculate approximate position (simplified - real implementation would use proper projection)
          const posX = `${20 + (index * 15)}%`;
          const posY = `${30 + (index % 2) * 20}%`;

          return (
            <div
              key={waypoint.id}
              className={`${styles.markerTooltip} ${activeMarker === index ? styles.active : ''}`}
              style={{ left: posX, top: posY }}
              onMouseEnter={() => setActiveMarker(index)}
              onMouseLeave={() => setActiveMarker(null)}
            >
              <div className={styles.markerNumber}>{index + 1}</div>
              {activeMarker === index && (
                <div className={styles.tooltipContent}>
                  <strong>{waypoint.name}</strong>
                  {waypoint.description && <p>{waypoint.description}</p>}
                  {waypoint.estimatedTime && <small>{waypoint.estimatedTime}</small>}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Map info */}
      <div className={styles.mapControls}>
        <button
          className={styles.directionsButton}
          onClick={() => {
            if (waypoints && waypoints.length >= 2) {
              const origin = waypoints[0];
              const destination = waypoints[waypoints.length - 1];
              if (origin && destination) {
                const url = `https://www.google.com/maps/dir/${origin.lat},${origin.lng}/${destination.lat},${destination.lng}`;
                window.open(url, '_blank', 'noopener,noreferrer');
              }
            }
          }}
          disabled={!waypoints || waypoints.length < 2}
        >
          📍 Get Directions
        </button>
      </div>

      {/* Proximity Landmarks Info */}
      {proximityLandmarks && proximityLandmarks.length > 0 && (
        <div className={styles.proximityInfo}>
          {proximityLandmarks.map((landmark) => (
            <div
              key={landmark.id}
              className={`${styles.proximityCard} ${activeLandmark === landmark.id ? styles.active : ''}`}
              onMouseEnter={() => setActiveLandmark(landmark.id)}
              onMouseLeave={() => setActiveLandmark(null)}
            >
              <span className={styles.proximityIcon}>{landmark.icon}</span>
              <div className={styles.proximityDetails}>
                <strong className={styles.proximityName}>{landmark.name}</strong>
                <span className={styles.proximityDistance}>{landmark.distance}</span>
              </div>
              {activeLandmark === landmark.id && (
                <div className={styles.proximityDescription}>{landmark.description}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
