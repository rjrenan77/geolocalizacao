import React, {useState, useEffect} from 'react';

import {View, ActivityIndicator, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';

import Geolocation from '@react-native-community/geolocation';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

function App() {
  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState({});

  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({coords}) => {
        setCoordinates(coords);
        setLoading(false);
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true, maximumAge: 1000, timeout: 1000},
    );
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <MapView
          initialRegion={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: 0.0062,
            longitudeDelta: 0.0062,
          }}
          style={styles.map}
        />
      )}
    </View>
  );
}

export default App;
