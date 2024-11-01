// CalendarScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';

// Define events for specific dates
const events = {
  '2024-10-17': [{ title: 'Reunião de Equipe' }],
  '2024-10-18': [{ title: 'Apresentação do Projeto' }],
  // Add more dates and events as needed
};

export default function CalendarScreen() {
  const [selectedDay, setSelectedDay] = useState(''); // State to keep track of the selected day

  const handleDayPress = (day) => {
    setSelectedDay(day.dateString); // Update the selected day when a day is pressed
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress} // Handle day press events
        markedDates={{
          '2024-10-17': { selected: true, marked: true, selectedColor: '#2F008B' },
          '2024-10-18': { marked: true },
          // Add more dates as needed
        }}
      />
      <View style={styles.eventsContainer}>
        <Text style={styles.eventsHeader}>Eventos do Dia:</Text>
        <FlatList
          data={events[selectedDay] || []} // Get events for the selected day or empty array
          keyExtractor={(item, index) => index.toString()} // Use index as key
          renderItem={({ item }) => <Text style={styles.eventText}>{item.title}</Text>} // Render event titles
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  eventsContainer: {
    marginTop: 20,
  },
  eventsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2F008B',
  },
  eventText: {
    fontSize: 16,
    paddingVertical: 5,
    color: '#333',
  },
});
