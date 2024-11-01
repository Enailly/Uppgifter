// CreateTaskScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const categories = ['Pessoal', 'Trabalho', 'Outro']; // Lista de categorias

export default function CreateTaskScreen({ navigation }) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('Pessoal');
  const [modalVisible, setModalVisible] = useState(false);

  const saveTask = async () => {
    if (!text.trim()) {
      Alert.alert('Erro', 'A tarefa não pode estar vazia.');
      return;
    }

    const newTask = { text, category, done: false };
    try {
      const storedTasks = await AsyncStorage.getItem('todos');
      const tasks = storedTasks ? JSON.parse(storedTasks) : [];
      tasks.push(newTask);
      await AsyncStorage.setItem('todos', JSON.stringify(tasks));
      Alert.alert('Sucesso', 'Tarefa salva com sucesso!'); // Confirmação de sucesso
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar a tarefa.'); // Mensagem de erro ao salvar
    }
  };

  const selectCategory = (selectedCategory) => {
    setCategory(selectedCategory);
    setModalVisible(false); // Fecha o modal após a seleção
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Criar Nova Tarefa</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a tarefa..."
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity style={styles.categoryButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.categoryText}>Categoria: {category}</Text>
      </TouchableOpacity>
      <Button title="Salvar Tarefa" onPress={saveTask} />

      {/* Modal para seleção de categorias */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => selectCategory(item)} style={styles.categoryItem}>
                <Text style={styles.categoryItemText}>{item}</Text> {/* Wrapping item in Text component */}
              </TouchableOpacity>
            )}
          />
          <Button title="Fechar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2F008B',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  categoryButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  categoryText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  categoryItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  categoryItemText: {
    fontSize: 18,
  },
});
