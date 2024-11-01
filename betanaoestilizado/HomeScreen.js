// HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker'; // Importando o Picker

const TaskItem = ({ item, index, markTaskAsDone, navigation }) => (
  <TouchableOpacity
    style={styles.taskContainer}
    onPress={() => navigation.navigate('TaskDetails', { task: item, index })}
  >
    <View style={styles.taskDetails}>
      <Text style={styles.taskText}>{item.text}</Text>
      <TouchableOpacity 
        style={styles.categoryButton} 
        onPress={() => navigation.navigate('CategoryTasks', { category: item.category })} // Navega para a nova tela de categoria
      >
        <Text style={styles.categoryText}>Categoria: {item.category}</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.completeButton} onPress={() => markTaskAsDone(index)}>
      <Icon name="checkmark-circle" size={24} color="#fff" />
    </TouchableOpacity>
  </TouchableOpacity>
);

const TaskForm = ({ visible, onClose, onSave }) => {
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('');

  const handleSave = () => {
    if (newTaskText.trim() && newTaskCategory.trim()) {
      onSave(newTaskText, newTaskCategory);
      setNewTaskText('');
      setNewTaskCategory('');
      onClose();
    } else {
      alert('Por favor, preencha todos os campos!');
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.formContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onClose}>
          <Icon name="arrow-back" size={24} color="#2F008B" />
        </TouchableOpacity>
        <Text style={styles.formTitle}>Adicionar Nova Tarefa</Text>
        <TextInput
          placeholder="Nome da Tarefa"
          value={newTaskText}
          onChangeText={setNewTaskText}
          style={styles.input}
        />
        
        {/* Picker para selecionar a categoria */}
        <Picker
          selectedValue={newTaskCategory}
          onValueChange={(itemValue) => setNewTaskCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione uma Categoria" value="" />
          <Picker.Item label="Trabalho" value="Trabalho" />
          <Picker.Item label="Pessoal" value="Pessoal" />
          <Picker.Item label="Estudo" value="Estudo" />
          <Picker.Item label="Outros" value="Outros" />
        </Picker>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Criar Tarefa</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Recarregar tarefas ao entrar na tela
  useFocusEffect(
    React.useCallback(() => {
      loadTasks();
    }, [])
  );

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('todos');
      const tasks = storedTasks ? JSON.parse(storedTasks) : [];
      setTasks(tasks.filter(task => !task.done));
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async (text, category) => {
    const newTask = { text, category, done: false };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    await AsyncStorage.setItem('todos', JSON.stringify(updatedTasks));
  };

  const markTaskAsDone = async (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = true;
    setTasks(updatedTasks.filter(task => !task.done));
    await AsyncStorage.setItem('todos', JSON.stringify(updatedTasks));
  };

  const renderTask = ({ item, index }) => (
    <TaskItem item={item} index={index} markTaskAsDone={markTaskAsDone} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Uppgifter</Text>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item, index) => index.toString()}
        style={styles.taskList}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowForm(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <TaskForm visible={showForm} onClose={() => setShowForm(false)} onSave={addTask} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 25,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#2f008b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  taskDetails: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10, // Aumenta a distância entre o nome da tarefa e a categoria
  },
  categoryButton: {
    backgroundColor: '#2f008b',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
    right: 5,
  },
  categoryText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  completeButton: {
    backgroundColor: '#2f008b',
    padding: 10,
    borderRadius: 60,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2F008B',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#2F008B',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#2F008B',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#2F008B',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addButtonText: {
    fontSize: 30,
    color: '#fff',
  },
  taskList: {
    marginBottom: 80,
  },
  picker: {
    height: 50,
    borderColor: '#2F008B',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
  },
});
