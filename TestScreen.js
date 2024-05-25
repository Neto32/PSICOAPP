import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Video } from 'expo-av';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { chartConfig } from './chartConfig';

export default function TestScreen() {


  return (
    <InnerApp />
  );
}

function InnerApp() {
  const [responses, setResponses] = useState({});
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState(null);
  const windowWidth = Dimensions.get('window').width - 40;
  
  // Ajustar el tamaño de la ventana según sea necesario

  const handleSelectOption = (question, value) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [question]: value,
    }));
  };

  const calculateScores = (responses) => {
    let depressionScore = 0;
    let anxietyScore = 0;

    const depressionQuestions = [
      'constantemente1', 'constantemente2', 'constantemente3',
      'constantemente4', 'constantemente5', 'constantemente6',
      'constantemente7', 'constantemente8'
    ];

    const anxietyQuestions = [
      'constantemente9', 'constantemente10', 'constantemente11',
      'constantemente12', 'constantemente13', 'constantemente14',
      'constantemente15'
    ];

    const scoring = {
      nunca: 0,
      ocasionalmente: 1,
      frecuentemente: 2,
      constantemente: 3
    };

    for (let question of depressionQuestions) {
      if (responses[question]) {
        depressionScore += scoring[responses[question].replace(/[0-9]/g, '')];
      }
    }

    for (let question of anxietyQuestions) {
      if (responses[question]) {
        anxietyScore += scoring[responses[question].replace(/[0-9]/g, '')];
      }
    }

    return { depressionScore, anxietyScore };
  };

  const interpretResults = (scores) => {
    let resultText = "No se detectaron signos significativos de depresión o ansiedad.";

    if (scores.depressionScore >= 15 && scores.anxietyScore < 15) {
      resultText = "Los signos sugieren una mayor probabilidad de depresión.";
    } else if (scores.anxietyScore >= 15 && scores.depressionScore < 15) {
      resultText = "Los signos sugieren una mayor probabilidad de ansiedad.";
    } else if (scores.depressionScore >= 15 && scores.anxietyScore >= 15) {
      resultText = "Los signos sugieren una probabilidad de tanto depresión como ansiedad.";
    } else if (scores.depressionScore >= 10 || scores.anxietyScore >= 10) {
      resultText = "Hay algunos signos de depresión o ansiedad. Se recomienda una evaluación profesional.";
    }

    return resultText;

  };

  const handleCalculateResults = () => {
    const scores = calculateScores(responses);
    const resultText = interpretResults(scores);
    setResult(resultText);

    // Generar datos para la gráfica
    const data = {
      labels: ['Depression', 'Anxiety'],
      datasets: [{
        data: [scores.depressionScore, scores.anxietyScore],
      }],
    };

    setChartData(data);
  };

  return (
    <View style={styles.container}>
      <Video
        source={require('./assets/fondo_test.mp4')}
        style={styles.videoBackground}
        resizeMode="cover"
        shouldPlay
        isLooping
        isMuted
      />

      <View style={styles.overlay}>
        <View style={{ height: 50 }} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>TEST TRANSTORNAL</Text>
          <View style={styles.questionContainer}>
            <Question
              questionText="1. ¿Con qué frecuencia te sientes triste, desanimado o vacío?"
              options={[
                { label: 'a) Nunca', value: 'nunca1' },
                { label: 'b) Ocasionalmente', value: 'ocasionalmente1' },
                { label: 'c) Frecuentemente', value: 'frecuentemente1' },
                { label: 'd) Constantemente', value: 'constantemente1' },
              ]}
              selectedValue={responses['constantemente1']}
              onSelectOption={(value) => handleSelectOption('constantemente1', value)}
            />

            <Question
              questionText="2. ¿Has perdido el interés o el placer en actividades que solías disfrutar?"
              options={[
                { label: 'a) Nunca', value: 'nunca2' },
                { label: 'b) Ocasionalmente', value: 'ocasionalmente2' },
                { label: 'c) Frecuentemente', value: 'frecuentemente2' },
                { label: 'd) Constantemente', value: 'constantemente2' },
              ]}
              selectedValue={responses['constantemente2']}
              onSelectOption={(value) => handleSelectOption('constantemente2', value)}
            />

            <Question
              questionText="3. ¿Experimentas cambios significativos en tu apetito o peso corporal?"
              options={[
                { label: 'a) Nunca', value: 'nunca3' },
                { label: 'b) Ocasionalmente', value: 'ocasionalmente3' },
                { label: 'c) Frecuentemente', value: 'frecuentemente3' },
                { label: 'd) Constantemente', value: 'constantemente3' },
              ]}
              selectedValue={responses['constantemente3']}
              onSelectOption={(value) => handleSelectOption('constantemente3', value)}
            />

            <Question
              questionText="4. ¿Te sientes constantemente fatigado o con falta de energía?"
              options={[
                { label: 'a) Nunca', value: 'nunca4' },
                { label: 'b) Ocasionalmente', value: 'ocasionalmente4' },
                { label: 'c) Frecuentemente', value: 'frecuentemente4' },
                { label: 'd) Constantemente', value: 'constantemente4' },
              ]}
              selectedValue={responses['constantemente4']}
              onSelectOption={(value) => handleSelectOption('constantemente4', value)}
            />

            <Question
              questionText="5. ¿Tienes problemas para dormir, ya sea conciliar el sueño o mantenerlo?"
              options={[
                { label: 'a) Nunca', value: 'nunca5' },
                { label: 'b) Ocasionalmente', value: 'ocasionalmente5' },
                { label: 'c) Frecuentemente', value: 'frecuentemente5' },
                { label: 'd) Constantemente', value: 'constantemente5' },
              ]}
              selectedValue={responses['constantemente5']}
              onSelectOption={(value) => handleSelectOption('constantemente5', value)}
            />

            <Question
              questionText="6. ¿Sientes que tu mente está llena de pensamientos negativos o de autocrítica?"
              options={[
                { label: 'a) Nunca', value: 'nunca6' },
                { label: 'b) Ocasionalmente', value: 'ocasionalmente6' },
                { label: 'c) Frecuentemente', value: 'frecuentemente6' },
                { label: 'd) Constantemente', value: 'constantemente6' },
              ]}
              selectedValue={responses['constantemente6']}
              onSelectOption={(value) => handleSelectOption('constantemente6', value)}
            />

            <Question
              questionText="7. ¿Tienes dificultades para concentrarte en tareas o tomar decisiones?"
              options={[
                { label: 'a) Nunca', value: 'nunca7' },
                { label: 'b) Ocasionalmente', value: 'ocasionalmente7' },
                { label: 'c) Frecuentemente', value: 'frecuentemente7' },
                { label: 'd) Constantemente', value: 'constantemente7' },
              ]}
              selectedValue={responses['constantemente7']}
              onSelectOption={(value) => handleSelectOption('constantemente7', value)}
            />

            <Question
              questionText="8. ¿Has experimentado pensamientos recurrentes sobre la muerte o el suicidio?"
              options={[
                { label: 'a) Nunca', value: 'nunca8' },
                { label: 'b) Ocasionalmente', value: 'ocasionalmente8' },
                { label: 'c) Frecuentemente', value: 'frecuentemente8' },
                { label: 'd) Constantemente', value: 'constantemente8' },
              ]}
              selectedValue={responses['constantemente8']}
              onSelectOption={(value) => handleSelectOption('constantemente8', value)}
            />

            <Question
              questionText="9. ¿Sientes preocupación excesiva o constante por eventos futuros?"
              options={[
                { label: 'a) Nunca', value: 'nunca9' },
                { label: 'b) Ocasionalmente', value: 'ocasionalmente9' },
                { label: 'c) Frecuentemente', value: 'frecuentemente9' },
                { label: 'd) Constantemente', value: 'constantemente9' },
              ]}
              selectedValue={responses['constantemente9']}
              onSelectOption={(value) => handleSelectOption('constantemente9', value)}
            />

            <Question
              questionText="10. ¿Experimentas síntomas físicos como palpitaciones, sudoración o temblores?"
              options={[
                { label: 'a) Nunca', value: 'nunca10' },
                { label: 'b) Ocasionalmente', value: 'ocasionalmente10' },
                { label: 'c) Frecuentemente', value: 'frecuentemente10' },
                { label: 'd) Constantemente', value: 'constantemente10' },
              ]}
              selectedValue={responses['constantemente10']}
              onSelectOption={(value) => handleSelectOption('constantemente10', value)}
            />

            <Question
              questionText="11. ¿Tienes dificultades para relajarte o sentirte tranquilo/a?"
              options={[
                { label: 'a) Nunca', value: 'nunca11' },
                { label: 'b) Ocasionalmente', value: 'ocasionalmente11' },
                { label: 'c) Frecuentemente', value: 'frecuentemente11' },
                { label: 'd) Constantemente', value: 'constantemente11' },
              ]}
              selectedValue={responses['constantemente11']}
              onSelectOption={(value) => handleSelectOption('constantemente11', value)}
            />

            <Question
              questionText="12. ¿Te sientes agitado/a o tenso/a la mayor parte del tiempo?"
              options={[
                { label: 'a) Nunca', value: 'nunca12' },
                { label: 'b) Ocasionalmente', value: 'ocasionalmente12' },
                { label: 'c) Frecuentemente', value: 'frecuentemente12' },
                { label: 'd) Constantemente', value: 'constantemente12' },
              ]}
              selectedValue={responses['constantemente12']}
              onSelectOption={(value) => handleSelectOption('constantemente12', value)}
            />

            <Question
              questionText="13. ¿Has experimentado episodios repentinos de miedo intenso o pánico sin motivo aparente?"
              options={[
                { label: 'a) Nunca', value: 'nunca13' },
                { label: 'b) Ocasionalmente', value: 'ocasionalmente13' },
                { label: 'c) Frecuentemente', value: 'frecuentemente13' },
                { label: 'd) Constantemente', value: 'constantemente13' },
              ]}
              selectedValue={responses['constantemente13']}
              onSelectOption={(value) => handleSelectOption('constantemente13', value)}
            />

            <Question
              questionText="14. ¿Evitas situaciones que te generan ansiedad o malestar?"
              options={[
                { label: 'a) Nunca', value: 'nunca14' },
                { label: 'b) Ocasionalmente', value: 'ocasionalmente14' },
                { label: 'c) Frecuentemente', value: 'frecuentemente14' },
                { label: 'd) Constantemente', value: 'constantemente14' },
              ]}
              selectedValue={responses['constantemente14']}
              onSelectOption={(value) => handleSelectOption('constantemente14', value)}
            />

            <Question
              questionText="15. ¿Sientes que tu calidad de vida se ve afectada negativamente por tus síntomas emocionales o físicos?"
              options={[
                { label: 'a) Nunca', value: 'nunca15' },
                { label: 'b) Ocasionalmente', value: 'ocasionalmente15' },
                { label: 'c) Frecuentemente', value: 'frecuentemente15' },
                { label: 'd) Constantemente', value: 'constantemente15' },
              ]}
              selectedValue={responses['constantemente15']}
              onSelectOption={(value) => handleSelectOption('constantemente15', value)}
            />
          </View>

          <View style={styles.resultsContainer}>
            <Text style={styles.title}>PADECIMIENTO MÁS CERCANO DE TRANSTORNO</Text>
            {result && <Text style={styles.resultText}>{result}</Text>}

            {/* Gráfico de barras */}
            {chartData && (
              <View style={styles.chartContainer}>
                <BarChart
                  data={chartData}
                  width={windowWidth}
                  height={220} // Ajustar la altura según sea necesario
                  yAxisLabel=""
                  chartConfig={chartConfig}
                  style={styles.chart}
              />
              </View>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton text="Resultados" color="#8BC34A" onPress={handleCalculateResults} />
            <CustomButton text="Clínicas" color="#2196F3"/>
            <CustomButton text="Regresar a Inicio" color="#000000"/>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const Question = ({ questionText, options, selectedValue, onSelectOption }) => {
  return (
    <View style={styles.question}>
      <Text style={styles.questionText}>{questionText}</Text>
      <View style={styles.optionsContainer}>
        {options.map(option => (
          <TouchableOpacity
            key={option.value}
            onPress={() => onSelectOption(option.value)}
            style={styles.option}
          >
            <View
              style={{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: selectedValue === option.value ? '#007bff' : '#ffffff',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {selectedValue === option.value && (
                <View
                  style={{
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: '#007bff',
                  }}
                />
              )}
            </View>
            <Text style={styles.optionText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const CustomButton = ({ text, color, onPress }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  questionContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
    borderRadius: 10,
  },
  question: {
    marginBottom: 20,
  },
  questionText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'column',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 10,
  },
  resultsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },

    // Estilos para el contenedor de la gráfica
    chartContainer: {
      alignItems: 'center', // Centrar horizontalmente
      marginTop: 20, // Espacio arriba de la gráfica
    },
    chart: {
      marginVertical: 8,
      borderRadius: 16,
    },
});