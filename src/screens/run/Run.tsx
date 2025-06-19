import React, {useState, useRef} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import MapView, {Polyline, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

type Coordinate = {
  latitude: number;
  longitude: number;
};

const Run = () => {
  const [route, setRoute] = useState<Coordinate[]>([]);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [tracking, setTracking] = useState(false);
  const [distance, setDistance] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const mapRef = useRef<MapView>(null);

  const getDistance = (coord1: Coordinate, coord2: Coordinate) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371e3; // meters
    const φ1 = toRad(coord1.latitude);
    const φ2 = toRad(coord2.latitude);
    const Δφ = toRad(coord2.latitude - coord1.latitude);
    const Δλ = toRad(coord2.longitude - coord1.longitude);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // in meters
  };

  const startTracking = () => {
    setTracking(true);
    setStartTime(new Date());
    const id = Geolocation.watchPosition(
      pos => {
        const newCoord = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };
        setRoute(prev => {
          if (prev.length > 0) {
            const d = getDistance(prev[prev.length - 1], newCoord);
            setDistance(dist => dist + d);
          }
          return [...prev, newCoord];
        });
      },
      error => console.log(error),
      {enableHighAccuracy: true, distanceFilter: 10, interval: 3000},
    );
    setWatchId(id);
  };

  const stopTracking = () => {
    if (watchId !== null) {
      Geolocation.clearWatch(watchId);
    }
    setTracking(false);
  };

  const resetTracking = () => {
    setRoute([]);
    setDistance(0);
    setStartTime(null);
  };

  const duration = startTime
    ? Math.floor((new Date().getTime() - startTime.getTime()) / 1000)
    : 0;

  return (
    <View style={styles.container}>
      <MapView
        zoomEnabled
        zoomControlEnabled
        ref={mapRef}
        style={styles.map}
        showsUserLocation
        followsUserLocation
        region={
          route.length > 0
            ? {
                ...route[route.length - 1],
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }
            : undefined
        }>
        {route.length > 1 && (
          <Polyline coordinates={route} strokeColor="blue" strokeWidth={5} />
        )}
        {route.length > 0 && <Marker coordinate={route[0]} title="Start" />}
      </MapView>

      <View style={styles.stats}>
        <Text>
          Thời gian: {Math.floor(duration / 60)}:
          {('0' + (duration % 60)).slice(-2)} phút
        </Text>
        <Text>Quãng đường: {(distance / 1000).toFixed(2)} km</Text>
        <Text>
          Tốc độ:{' '}
          {distance > 0 ? (duration / 60 / (distance / 1000)).toFixed(2) : '0'}{' '}
          phút/km
        </Text>
      </View>

      <View style={styles.buttons}>
        {!tracking ? (
          <Button title="Bắt đầu chạy" onPress={startTracking} />
        ) : (
          <Button title="Dừng" onPress={stopTracking} />
        )}
        <Button title="Reset" onPress={resetTracking} color="gray" />
      </View>
    </View>
  );
};

export default Run;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  stats: {
    padding: 10,
    backgroundColor: 'white',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'white',
  },
});
