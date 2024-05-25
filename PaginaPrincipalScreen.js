import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Video } from 'expo-av';

export default function PaginaPrincipalScreen() {

  return (
    <View style={styles.container}>
      {/* Video de fondo */}
      <Video
        source={require('./assets/fondo_principal.mp4')}
        style={styles.videoBackground}
        resizeMode="cover"
        shouldPlay
        isLooping
        isMuted // Desactivar el sonido del video
      />

      {/* Contenedor con fondo difuminado */}
      <View style={styles.overlay}>
        <Image
          source={require('./assets/logo_app.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Introduccion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Clinicas</Text>
        </TouchableOpacity>

        {/* Texto en la parte inferior */}
        <Text style={styles.footerText}>Derechos reservados de uso ®</Text>
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
  videoBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo con opacidad para difuminado
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '80%', // Ajusta el ancho al 80% del contenedor
    height: undefined, // Permite que la altura se ajuste automáticamente
    aspectRatio: 1, // Mantiene la relación de aspecto de la imagen
    marginBottom: 80,
  },
  button: {
    padding: 15,
    margin: 30,
    borderRadius: 30,
    backgroundColor: '#fff',
    width: 200,
    alignItems: 'center', // Asegura que el texto del botón esté centrado
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  footerText: {
    color: '#fff', // Color blanco
    opacity: 0.8, // Opacidad del 80%
    position: 'absolute', // Posición absoluta para colocar en la parte inferior
    bottom: 20, // Alineado a la parte inferior
  },
});
