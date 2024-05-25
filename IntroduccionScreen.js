import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Animated } from 'react-native';
import { Video } from 'expo-av';

export default function IntroduccionScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim]);

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

      {/* Contenedor principal */}
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
      <View style={{ height: 50 }} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>TRANSTORNOS EMOCIONALES</Text>

          <Text style={styles.text}>Los trastornos emocionales, en psicología, se refieren a condiciones en las cuales una persona experimenta patrones persistentes de emociones que causan malestar significativo o deterioro en su funcionamiento diario. Estos trastornos pueden manifestarse de diversas maneras y pueden afectar tanto el estado de ánimo como la capacidad de la persona para relacionarse con los demás y funcionar en su vida cotidiana.</Text>

          <Text style={styles.text}>Algunos ejemplos de trastornos emocionales comunes incluyen la depresión, la ansiedad, el trastorno bipolar y los trastornos relacionados con el estrés postraumático. Cada uno de estos trastornos tiene síntomas específicos y puede requerir diferentes enfoques de tratamiento, que pueden incluir terapia psicológica, medicación y cambios en el estilo de vida.</Text>

          <Text style={styles.text}>Los trastornos emocionales pueden ser desencadenados por una combinación de factores genéticos, biológicos, psicológicos y ambientales. Es importante buscar ayuda profesional si experimentas síntomas persistentes de un trastorno emocional, ya que el tratamiento adecuado puede ayudarte a manejar tus emociones y mejorar tu calidad de vida.</Text>

          <View style={{ height: 10 }} />
          
          <Image source={require('./assets/imagen1.png')} style={styles.image} />

          <View style={{ height: 10 }} />

          <Text style={styles.title}>DIFERENCIAS ENTRE ANSIEDAD Y DEPRESION</Text>

          <Text style={styles.text}>Aunque la ansiedad y la depresión comparten algunos síntomas y pueden ocurrir simultáneamente, son trastornos distintos con características únicas. Aquí hay algunas diferencias clave entre ellos:</Text>

          <View style={{ height: 10 }} />

          <Text style={styles.title}>ANSIEDAD</Text>

          <Text style={styles.text1}>Preocupación excesiva: Las personas con ansiedad tienden a preocuparse excesivamente por situaciones futuras o potenciales problemas, a menudo de manera irracional.</Text>
          <View style={{ height: 5 }} />
          <Text style={styles.text1}>Miedo anticipatorio: Existe un miedo constante sobre eventos futuros, incluso si son poco probables o inexistentes.</Text>
          <View style={{ height: 5 }} />
          <Text style={styles.text1}>Síntomas físicos: La ansiedad a menudo se manifiesta físicamente con síntomas como palpitaciones, sudoración, temblores, mareos, dificultad para respirar y tensión muscular.</Text>
          <View style={{ height: 5 }} />
          <Text style={styles.text1}>Episodios de pánico: En casos de trastorno de pánico, pueden ocurrir ataques de pánico, que son episodios repentinos e intensos de miedo extremo.</Text>
          <View style={{ height: 5 }} />
          <Text style={styles.text1}>Evitación: Las personas con ansiedad tienden a evitar situaciones que les causan miedo o estrés.</Text>


          <View style={{ height: 10 }} />


          <Text style={styles.title}>DEPRESION</Text>

          <Text style={styles.text1}>Tristeza persistente: Las personas con depresión experimentan una tristeza profunda y persistente, y una falta de interés o placer en casi todas las actividades diarias.</Text>
          <View style={{ height: 5 }} />
          <Text style={styles.text1}>Sentimientos de desesperanza: La depresión se caracteriza por sentimientos de desesperanza, inutilidad y culpabilidad excesiva o inapropiada.</Text>
          <View style={{ height: 5 }} />
          <Text style={styles.text1}>Cambios en el apetito y el sueño: Puede haber aumento o disminución del apetito, así como insomnio o hipersomnia (dormir demasiado).</Text>
          <View style={{ height: 5 }} />
          <Text style={styles.text1}>Pérdida de energía: Las personas con depresión a menudo se sienten fatigadas y sin energía, incluso después de descansar.</Text>
          <View style={{ height: 5 }} />
          <Text style={styles.text1}>Pensamientos suicidas: En casos graves, la depresión puede incluir pensamientos recurrentes de muerte o suicidio.</Text>
          
          <Image source={require('./assets/imagen2.png')} style={styles.image} />

          <View style={{ height: 5 }} />

          <Text style={styles.title}>DIFERENCIAS CLAVE</Text>

          <Text style={styles.text1}> - ENFOQUE EMOCIONAL: La ansiedad se centra en el miedo y la preocupación por el futuro, mientras que la depresión se centra en la tristeza y la desesperanza sobre el presente y el pasado.</Text>
          <View style={{ height: 5 }} />
          <Text style={styles.text1}> - RESPUESTA FISICA: La ansiedad suele tener una respuesta física más pronunciada, con síntomas como palpitaciones y sudoración, mientras que la depresión afecta más la energía y el estado de ánimo.</Text>
          <View style={{ height: 5 }} />
          <Text style={styles.text1}> - ACTIVIDAD Y MOTIVACION y motivación: La ansiedad puede llevar a un estado de alerta constante y actividad excesiva, mientras que la depresión generalmente causa una falta de motivación y una reducción en la actividad.</Text>

          <View style={{ height: 10 }} />

          <Text style={styles.title}>PRINCIPALES SINTOMAS</Text>
          <View style={styles.listContainer}>
            <Text style={styles.listItem}>1.- Cambios en el estado de ánimo</Text>
            <Text style={styles.listItem}>2.- Problemas de sueño</Text>
            <Text style={styles.listItem}>3.- Fatiga y falta de energía</Text>
            <Text style={styles.listItem}>4.- Dificultades de concentración</Text>
            <Text style={styles.listItem}>5.- Cambios en el apetito</Text>
            <Text style={styles.listItem}>6.- Síntomas físicos</Text>
            <Text style={styles.listItem}>7.- Preocupaciones excesivas</Text>
            <Text style={styles.listItem}>8.- Evitación de actividades sociales</Text>
          </View>

          <View style={styles.buttonContainer}>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Regresar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
            
          </View>
        </ScrollView>
      </Animated.View>
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
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 10,
  },
  text1: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    aspectRatio: 16/9, // Mantener relación de aspecto 16:9
    resizeMode: 'contain', // Ajustar la imagen dentro del contenedor
    marginBottom: 10,
  },
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  listItem: {
    textAlign: 'left',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 50,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
