// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import CalendarScreen from './CalendarScreen';
import LoginScreen from './login/LoginScreen';
import RegisterScreen from './login/RegisterScreen';
import SplashScreen from './login/SplashScreen';
import CreateTaskScreen from './tasks/CreateTaskScreen';
import TaskDetailsScreen from './tasks/TaskDetailsScreen';
import CategoryTasksScreen from './CategoryTasksScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true); // State to manage loading screen

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 2000); // Simulated loading time
    return () => clearTimeout(timeout); // Clean up the timeout
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="CreateTask" component={CreateTaskScreen} />
        <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
        <Stack.Screen name="CategoryTasks" component={CategoryTasksScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
