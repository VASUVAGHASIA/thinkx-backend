import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { AlumniDashboardScreen } from '../screens/alumni/AlumniDashboardScreen';
import { AlumniPostJobScreen } from '../screens/alumni/AlumniPostJobScreen';
import { AlumniStoriesScreen } from '../screens/alumni/AlumniStoriesScreen';
import { AlumniDonateScreen } from '../screens/alumni/AlumniDonateScreen';
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

const AlumniTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#2563eb',
      tabBarInactiveTintColor: '#999',
      headerShown: true,
    }}
  >
    <Tab.Screen
      name="Dashboard"
      component={AlumniDashboardScreen}
      options={{
        title: 'Dashboard',
        tabBarLabel: 'Dashboard',
        headerRight: () => <LogoutButton />,
      }}
    />
    <Tab.Screen
      name="PostJob"
      component={AlumniPostJobScreen}
      options={{
        title: 'Post a Job',
        tabBarLabel: 'Post Job',
        headerRight: () => <LogoutButton />,
      }}
    />
    <Tab.Screen
      name="Stories"
      component={AlumniStoriesScreen}
      options={{
        title: 'Success Stories',
        tabBarLabel: 'Stories',
        headerRight: () => <LogoutButton />,
      }}
    />
    <Tab.Screen
      name="Donate"
      component={AlumniDonateScreen}
      options={{
        title: 'Make a Donation',
        tabBarLabel: 'Donate',
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

export const AlumniNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AlumniTabs" component={AlumniTabs} />
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
