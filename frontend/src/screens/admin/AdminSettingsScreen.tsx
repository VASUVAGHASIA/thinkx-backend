import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

interface SystemSettings {
  maintenanceMode: boolean;
  allowNewSignups: boolean;
  requireEmailVerification: boolean;
  enableComments: boolean;
}

export const AdminSettingsScreen: React.FC = () => {
  const { logout } = useAuth();
  const [settings, setSettings] = useState<SystemSettings>({
    maintenanceMode: false,
    allowNewSignups: true,
    requireEmailVerification: true,
    enableComments: true,
  });

  const toggleSetting = (key: keyof SystemSettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleLogout = () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: logout,
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>System configuration</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System Settings</Text>

        <View style={styles.settingCard}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingName}>Maintenance Mode</Text>
            <Text style={styles.settingDescription}>
              Temporarily disable access for maintenance
            </Text>
          </View>
          <Switch
            value={settings.maintenanceMode}
            onValueChange={() => toggleSetting('maintenanceMode')}
          />
        </View>

        <View style={styles.settingCard}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingName}>Allow New Signups</Text>
            <Text style={styles.settingDescription}>
              Enable or disable new user registrations
            </Text>
          </View>
          <Switch
            value={settings.allowNewSignups}
            onValueChange={() => toggleSetting('allowNewSignups')}
          />
        </View>

        <View style={styles.settingCard}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingName}>Email Verification</Text>
            <Text style={styles.settingDescription}>
              Require email verification for new accounts
            </Text>
          </View>
          <Switch
            value={settings.requireEmailVerification}
            onValueChange={() => toggleSetting('requireEmailVerification')}
          />
        </View>

        <View style={styles.settingCard}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingName}>Enable Comments</Text>
            <Text style={styles.settingDescription}>
              Allow users to comment on posts
            </Text>
          </View>
          <Switch
            value={settings.enableComments}
            onValueChange={() => toggleSetting('enableComments')}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System Information</Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Platform Version</Text>
          <Text style={styles.infoValue}>1.0.0</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Database Status</Text>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot}></View>
            <Text style={styles.statusText}>Connected</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>API Status</Text>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot}></View>
            <Text style={styles.statusText}>Operational</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>

        <TouchableOpacity
          style={styles.dangerButton}
          onPress={handleLogout}
        >
          <Text style={styles.dangerButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#dc2626',
    padding: 16,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#fecaca',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  settingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  settingInfo: {
    flex: 1,
  },
  settingName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
    color: '#666',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
  },
  statusText: {
    fontSize: 13,
    color: '#10b981',
    fontWeight: '500',
  },
  dangerButton: {
    backgroundColor: '#dc2626',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  dangerButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
