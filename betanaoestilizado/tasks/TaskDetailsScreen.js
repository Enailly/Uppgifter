// TaskDetailsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

export default function TaskDetailsScreen({ route, navigation }) {
  const { task, index } = route.params; // Desestrutura as propriedades passadas da rota
  const [taskText, setTaskText] = useState(task.text); // Estado para o texto da tarefa
  const [taskCategory, setTaskCategory] = useState(task.category); // Estado para a categoria da tarefa

  const editTask = async () => {
    if (!taskText.trim()) {
      Alert.alert('Erro', 'O nome da tarefa não pode estar vazio.'); // Verifica se o texto da tarefa está vazio
      return;
    }

    try {
      const storedTasks = await AsyncStorage.getItem('todos'); // Recupera a lista de tarefas armazenadas
      const tasks = storedTasks ? JSON.parse(storedTasks) : []; // Converte as tarefas para um array
      tasks[index] = { ...tasks[index], text: taskText, category: taskCategory }; // Atualiza a tarefa
      await AsyncStorage.setItem('todos', JSON.stringify(tasks)); // Salva as tarefas atualizadas
      Alert.alert('Sucesso', 'Tarefa editada com sucesso!'); // Mensagem de sucesso
      navigation.navigate('Home', { refresh: true }); // Navega de volta para a tela inicial
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível editar a tarefa.'); // Mensagem de erro ao editar
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Editar Tarefa</Text>
      <View style={styles.taskContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome da Tarefa"
          value={taskText}
          onChangeText={setTaskText}
        />
        <TextInput
          style={styles.input}
          placeholder="Categoria"
          value={taskCategory}
          onChangeText={setTaskCategory}
        />
      </View>
      <TouchableOpacity style={styles.editButton} onPress={editTask}>
        <Icon name="create" size={24} color="#fff" />
        <Text style={styles.editButtonText}>Salvar Tarefa</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text> {/* Adicionei texto ao botão de voltar */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  header: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2F008B',
  },
  taskContainer: {
    padding: 25,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#2F008B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  input: {
    height: 50,
    borderColor: '#2F008B',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: '#2F008B',
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    justifyContent: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: '#2F008B', // Mantém a cor consistente com o tema
  },
});
