// CategoryTasksScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CategoryTasksScreen({ route }) {
  const { category } = route.params; // Get the selected category from the route parameters
  const [tasks, setTasks] = useState([]); // State to store tasks

  useEffect(() => {
    const loadTasksByCategory = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('todos');
        const allTasks = storedTasks ? JSON.parse(storedTasks) : [];
        const filteredTasks = allTasks.filter(task => task.category === category && !task.done); // Filter tasks based on category and status
        setTasks(filteredTasks); // Update state with filtered tasks
      } catch (error) {
        console.error(error);
      }
    };

    loadTasksByCategory(); // Load tasks when the component mounts
  }, [category]);

  const markTaskAsDone = async (index) => {
    try {
      const storedTasks = await AsyncStorage.getItem('todos');
      const allTasks = storedTasks ? JSON.parse(storedTasks) : [];
      allTasks[index].done = true; // Mark the task as completed
      await AsyncStorage.setItem('todos', JSON.stringify(allTasks)); // Update AsyncStorage
      setTasks(prevTasks => prevTasks.filter((_, i) => i !== index)); // Update state to remove the completed task
      Alert.alert('Sucesso', 'Tarefa marcada como concluída!'); // Show success message
    } catch (error) {
      console.error(error);
    }
  };

  const renderTask = ({ item, index }) => (
    <TouchableOpacity style={styles.taskContainer} onPress={() => markTaskAsDone(index)}>
      <Text style={styles.taskText}>{item.text}</Text> {/* Ensure text is rendered inside a <Text> component */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tarefas da Categoria: {category}</Text> {/* Display selected category */}
      {tasks.length === 0 ? (
        <Text style={styles.emptyMessage}>Nenhuma tarefa encontrada.</Text> // Display message if no tasks found
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={(item, index) => index.toString()} // Use index as key
        />
      )}
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
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#2f008b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  taskText: {
    fontSize: 16,
  },
  emptyMessage: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
});
