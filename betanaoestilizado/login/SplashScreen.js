// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa a biblioteca de ícones

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Navegar para a tela de login após 3 segundos
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Altere para a tela que você deseja mostrar após o splash
    }, 3000);

    return () => clearTimeout(timer); // Limpar o timer ao desmontar
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Icon name="clipboard" size={80} color="#2f008b" /> {/* Ícone de prancheta com cor ajustada */}
      <Text style={styles.title}>Uppgifter</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Altera o fundo para branco
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2f008b', // Mantém o texto na cor do tema
    fontFamily: 'Gliker', // Certifique-se de que a fonte está sendo carregada corretamente
    marginTop: 20, // Espaçamento entre o ícone e o título
  },
});

export default SplashScreen;
