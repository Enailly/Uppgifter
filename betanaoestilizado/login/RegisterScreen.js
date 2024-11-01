// RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa a biblioteca de ícones

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (username && password) {
      try {
        const storedUsers = await AsyncStorage.getItem('users');
        const users = storedUsers ? JSON.parse(storedUsers) : [];
        
        // Verifica se o nome de usuário já existe
        if (users.some(user => user.username === username)) {
          Alert.alert('Erro', 'Nome de usuário já existe.');
          return;
        }

        // Adiciona o novo usuário
        users.push({ username, password });
        await AsyncStorage.setItem('users', JSON.stringify(users));

        Alert.alert('Sucesso', 'Usuário registrado com sucesso!');
        navigation.replace('Login');
      } catch (error) {
        console.error(error);
      }
    } else {
      Alert.alert('Erro', 'Por favor, insira um nome de usuário e senha.');
    }
  };

  return (
    <View style={styles.container}>
      <Icon style={styles.icon} name="user" size={80} color="#2f008b" />
      <Text style={styles.header}>Cadastro</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.replace('Login')}>
        <Text style={styles.link}>Já tem uma conta? Faça login</Text>
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
