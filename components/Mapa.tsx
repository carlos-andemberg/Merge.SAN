import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { FontAwesome5 } from '@expo/vector-icons';

export interface MapaProps {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  markerText: string;
}

export default function Mapa({ coordinate, markerText }: MapaProps) {
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (mapRef.current) {
      const region: Region = {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
      mapRef.current.animateToRegion(region, 1000);
    }
  }, [coordinate]);

  return (
    <View style={styles.mapContainer}>
      <MapView
        ref={mapRef}
        style={styles.mapImage}
        scrollEnabled={false}
        zoomEnabled={false}
        pitchEnabled={false}
        rotateEnabled={false}
        initialRegion={{
          ...coordinate,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker coordinate={coordinate}>
          <View style={styles.customMarker}>
            <Text style={styles.markerText}>{markerText}</Text>
            <FontAwesome5 name="map-marker-alt" size={32} color="#A64141" />
          </View>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    maxWidth: 338,
    alignSelf: 'center',
    height: 300,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
    borderWidth: 2,
    borderColor: '#94AE9F',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  customMarker: {
    alignItems: 'center',
  },
  markerText: {
    color: '#A64141',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 2,
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
    fontFamily: 'Inter_700Bold',
  },
});
