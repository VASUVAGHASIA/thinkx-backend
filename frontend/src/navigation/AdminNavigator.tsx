import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { AdminDashboardScreen } from '../screens/admin/AdminDashboardScreen';
import { AdminUsersScreen } from '../screens/admin/AdminUsersScreen';
import { AdminModerationScreen } from '../screens/admin/AdminModerationScreen';
import { AdminReportsScreen } from '../screens/admin/AdminReportsScreen';
import { AdminSettingsScreen } from '../screens/admin/AdminSettingsScreen';

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

const AdminTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#dc2626',
      tabBarInactiveTintColor: '#999',
      headerShown: true,
    }}
  >
    <Tab.Screen
      name="AdminDashboard"
      component={AdminDashboardScreen}
      options={{
        title: 'Dashboard',
        tabBarLabel: 'Dashboard',
        headerRight: () => <LogoutButton />,
      }}
    />
    <Tab.Screen
      name="Users"
      component={AdminUsersScreen}
      options={{
        title: 'User Management',
        tabBarLabel: 'Users',
        headerRight: () => <LogoutButton />,
      }}
    />
    <Tab.Screen
      name="Moderation"
      component={AdminModerationScreen}
      options={{
        title: 'Content Moderation',
        tabBarLabel: 'Moderation',
        headerRight: () => <LogoutButton />,
      }}
    />
    <Tab.Screen
      name="Reports"
      component={AdminReportsScreen}
      options={{
        title: 'Reports & Analytics',
        tabBarLabel: 'Reports',
        headerRight: () => <LogoutButton />,
      }}
    />
    <Tab.Screen
      name="Settings"
      component={AdminSettingsScreen}
      options={{
        title: 'Settings',
        tabBarLabel: 'Settings',
        headerRight: () => <LogoutButton />,
      }}
    />
  </Tab.Navigator>
);

export const AdminNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AdminTabs" component={AdminTabs} />
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
