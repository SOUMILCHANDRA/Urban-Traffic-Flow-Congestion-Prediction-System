import React, { useState, useEffect } from 'react';
import Map from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { TripsLayer } from '@deck.gl/geo-layers';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

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
      getColor: (d: any) => (d.vendor === 0 ? [0, 242, 255] : d.vendor === 1 ? [112, 0, 255] : [255, 62, 62]),
      opacity: 0.8,
      widthMinPixels: 3,
      rounded: true,
      fadeTrail: true,
      trailLength: 100,
      currentTime: time,
      shadowEnabled: false
    }),
    new HeatmapLayer({
      id: 'heatmap-layer',
      data: stats,
      getPosition: (d: any) => [d.lon, d.lat],
      getWeight: (d: any) => d.congestion_score,
      radiusPixels: 60,
      intensity: 1,
      threshold: 0.1,
      colorRange: [
        [0, 255, 136],
        [255, 204, 0],
        [255, 62, 62]
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
      >
        <Map
          mapboxAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/satellite-v9"
        />
      </DeckGL>
    </div>
  );
};

export default MapComponent;
