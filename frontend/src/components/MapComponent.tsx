import React, { useState } from 'react';
import Map from 'react-map-gl/maplibre';
import DeckGL from '@deck.gl/react';
import { TripsLayer } from '@deck.gl/geo-layers';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import 'maplibre-gl/dist/maplibre-gl.css';

// No token needed for MapLibre with Carto/OpenStreetMap tiles

interface MapComponentProps {
  trips: any[];
  stats: any[];
  time: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ trips, stats, time }) => {
  const [viewState, setViewState] = useState({
    longitude: 73.8567,
    latitude: 18.5204,
    zoom: 12,
    pitch: 45,
    bearing: 0
  });

  const layers = [
    new TripsLayer({
      id: 'trips-layer',
      data: trips,
      getPath: (d: any) => d.path,
      getTimestamps: (d: any) => d.timestamps,
      getColor: (d: any) => {
        // Neon palette based on traffic status or vendor
        const status = d.status || 'LOW';
        if (status === 'HIGH') return [255, 30, 30, 255]; // Pulsing Neon Red
        if (status === 'MEDIUM') return [255, 180, 0, 255]; // Vivid Orange
        return [0, 255, 230, 255]; // Cyber Cyan
      },
      opacity: 0.9,
      widthMinPixels: 4,
      rounded: true,
      fadeTrail: true,
      trailLength: 120, // Longer trails for motion blur feel
      currentTime: time,
      shadowEnabled: false,
      parameters: {
        blendFunc: [770, 1] // Additive blending for neon glow
      }
    }),
    new HeatmapLayer({
      id: 'heatmap-layer',
      data: stats,
      getPosition: (d: any) => [d.lon, d.lat],
      getWeight: (d: any) => d.congestion_score,
      radiusPixels: 80,
      intensity: 1.5,
      threshold: 0.05,
      colorRange: [
        [0, 255, 136, 0],
        [0, 255, 230, 100],
        [255, 180, 0, 150],
        [255, 30, 30, 200]
      ]
    })
  ];

  return (
    <div className="map-container">
      <DeckGL
        viewState={viewState}
        onViewStateChange={(e: any) => setViewState(e.viewState)}
        controller={true}
        layers={layers}
        parameters={{
          clearColor: [0, 0, 0, 1] // Pure black background
        }}
      >
        <Map
          mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        />
      </DeckGL>
    </div>
  );
};

export default MapComponent;
