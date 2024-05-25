import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Slider from '@react-native-community/slider';
import axios from 'axios';

const GOOGLE_PLACES_API_KEY = 'AIzaSyB2v0mfZuJ87z3QfMGEWP0DbJYelBVni_o';  // Reemplaza con tu API Key de Google Places

export default function ClinicasScreen() {
  const [location, setLocation] = useState(null);
  const [clinics, setClinics] = useState([]);
  const [radius, setRadius] = useState(5); // Default radius in kilometers

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  const findClinics = async () => {
    if (location) {
      try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
          params: {
            location: `${location.latitude},${location.longitude}`,
            radius: radius * 1000, // Convert radius to meters
            type: 'hospital', // Puedes refinar esto a 'psychologist' o similar si está disponible
            keyword: 'clinica psicologo', // Múltiples palabras clave separadas por espacios
            key: GOOGLE_PLACES_API_KEY,
          },
        });
        setClinics(response.data.results);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={location} title="Your Location" />
        {clinics.map((clinic, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: clinic.geometry.location.lat, longitude: clinic.geometry.location.lng }}
            title={clinic.name}
            onCalloutPress={() => handleGoogleMaps(clinic.geometry.location.lat, clinic.geometry.location.lng)}
          />
        ))}
      </MapView>
      <View style={styles.sliderContainer}>
        <Text>Radio de Busqueda: {radius} km</Text>
        <Text>Determina tu radio de busqueda</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={20}
          step={1}
          value={radius}
          onValueChange={value => setRadius(value)}
        />
        <TouchableOpacity style={styles.button} onPress={findClinics}>
          <Text style={styles.buttonText}>Buscar Clinicas</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.clinicList}>
        {clinics.map((clinic, index) => (
          <View key={index} style={styles.clinicItem}>
            <Text style={styles.clinicName}>{clinic.name}</Text>
            <Text>{clinic.vicinity}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleGoogleMaps(clinic.geometry.location.lat, clinic.geometry.location.lng)}
            >
              <Text style={styles.buttonText}>Abrir en Mapas</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>

        {/* Botón para ir a PaginaPrincipalScreen.js */}
        <TouchableOpacity style={styles.horizontalButton}>
          <Text style={styles.buttonText}>Salir</Text>
        </TouchableOpacity>

        {/* Botón para ir a TestScreen.js */}
        <TouchableOpacity style={styles.horizontalButton}>
          <Text style={styles.buttonText}>Regresar</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '50%',
  },
  sliderContainer: {
    width: '90%',
    alignItems: 'center',
    marginTop: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  horizontalButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    margin: 10, // Añadido para una separación considerable
    flex: 1,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginVertical: 20,
  },
  clinicList: {
    width: '90%',
    marginTop: 10,
  },
  clinicItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 2,
  },
  clinicName: {
    fontWeight: 'bold',
  },
});
