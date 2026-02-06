import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import { SplashScreen } from '../screens/SplashScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { StudentNavigator } from './StudentNavigator';
import { AlumniNavigator } from './AlumniNavigator';
import { AdminNavigator } from './AdminNavigator';

const Stack = createNativeStackNavigator();

export const RootNavigator: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <SplashScreen />;
  }

  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      {user.role === 'student' && <StudentNavigator />}
      {user.role === 'alumni' && <AlumniNavigator />}
      {user.role === 'admin' && <AdminNavigator />}
    </NavigationContainer>
  );
};
