import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ThinkX Alumni</Text>
      <ActivityIndicator size="large" color="#2563eb" style={styles.loader} />
      <Text style={styles.subtitle}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 20,
  },
  loader: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});
