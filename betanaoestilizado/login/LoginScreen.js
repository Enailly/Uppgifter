// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa a biblioteca de ícones

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (username && password) {
      try {
        const storedUsers = await AsyncStorage.getItem('users');
        const users = storedUsers ? JSON.parse(storedUsers) : [];

        // Verifica as credenciais
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
          navigation.replace('Home');
        } else {
          Alert.alert('Erro', 'Nome de usuário ou senha incorretos');
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      Alert.alert('Erro', 'Por favor, insira nome de usuário e senha');
    }
  };

  return (
    <View style={styles.container}>
      <Icon style={styles.icon} name="user" size={80} color="#2f008b" />
      <Text style={styles.header}>Login</Text>
      <TextInput
        placeholder="Nome de usuário"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2F008B', // Adicionado para manter a consistência de cor
  },
  icon: {
    textAlign: 'center',
    marginBottom: 20, // Adicionado para espaçamento
  },
  input: {
    borderColor: '#2F008B',
    borderWidth: 2,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 16, // Aumentado o tamanho da fonte para melhor legibilidade
  },
  button: {
    backgroundColor: '#2F008B',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 10,
    textAlign: 'center',
    color: '#2F008B',
  },
});
