// App.js or Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './screens/LoginScreen';
import Dashboard from './screens/Dashboard';
import Notes from './screens/Notes';
import Downloads from './screens/Downloads';
import BookChat from './screens/BookChat';
import UploadAndChat from './screens/UploadAndChat';
import Book from './screens/Book.js';
import ResearchPaper from './screens/ResearchPaper.js'
import Attendance from './screens/Attendance.js'

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Notes" component={Notes} />
      <Drawer.Screen name="Downloads" component={Downloads} />
      <Drawer.Screen name="Book: Wanna Talk?" component={BookChat} />
      <Drawer.Screen name="Upload and Chat" component={UploadAndChat} />
      <Drawer.Screen name="Books" component={BooksScreen} />
      <Drawer.Screen name="Research Papers" component={ResearchPaper} />
      <Drawer.Screen name="Attendance" component={Attendance} />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Main"
          component={DrawerNavigator}
          options={{ headerShown: false }} // Hide header for the drawer navigator
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;