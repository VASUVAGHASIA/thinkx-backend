import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { StudentHomeScreen } from '../screens/student/StudentHomeScreen';
import { StudentJobsScreen } from '../screens/student/StudentJobsScreen';
import { StudentEventsScreen } from '../screens/student/StudentEventsScreen';
import { StudentProfileScreen } from '../screens/student/StudentProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const LogoutButton = () => {
  const { logout } = useAuth();
  return (
    <TouchableOpacity
      style={styles.logoutButton}
      onPress={logout}
    >
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  );
};

const StudentTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#2563eb',
      tabBarInactiveTintColor: '#999',
      headerShown: true,
    }}
  >
    <Tab.Screen
      name="Home"
      component={StudentHomeScreen}
      options={{
        title: 'Home',
        tabBarLabel: 'Home',
        headerRight: () => <LogoutButton />,
      }}
    />
    <Tab.Screen
      name="Jobs"
      component={StudentJobsScreen}
      options={{
        title: 'Job Opportunities',
        tabBarLabel: 'Jobs',
        headerRight: () => <LogoutButton />,
      }}
    />
    <Tab.Screen
      name="Events"
      component={StudentEventsScreen}
      options={{
        title: 'Events',
        tabBarLabel: 'Events',
        headerRight: () => <LogoutButton />,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={StudentProfileScreen}
      options={{
        title: 'My Profile',
        tabBarLabel: 'Profile',
        headerRight: () => <LogoutButton />,
      }}
    />
  </Tab.Navigator>
);

export const StudentNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="StudentTabs" component={StudentTabs} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  logoutButton: {
    marginRight: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#ef4444',
    borderRadius: 4,
  },
  logoutText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
