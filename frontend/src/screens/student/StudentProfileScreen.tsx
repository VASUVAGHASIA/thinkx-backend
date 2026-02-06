import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/config';

interface StudentProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  department?: string;
  graduationYear?: number;
  profileImage?: string;
  skills?: string[];
}

export const StudentProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/auth/profile`);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Use user data from context as fallback
      setProfile(user as StudentProfile);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  const displayProfile = profile || user;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          {displayProfile?.profileImage ? (
            <Image
              source={{ uri: displayProfile.profileImage }}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileImageInitial}>
                {displayProfile?.name?.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.profileSection}>
        <Text style={styles.name}>{displayProfile?.name}</Text>
        <Text style={styles.email}>{displayProfile?.email}</Text>

        {displayProfile?.department && (
          <Text style={styles.department}>{displayProfile.department}</Text>
        )}
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Contact Information</Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{displayProfile?.email}</Text>
        </View>

        {displayProfile?.phone && (
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoValue}>{displayProfile.phone}</Text>
          </View>
        )}

        {displayProfile?.graduationYear && (
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Graduation Year</Text>
            <Text style={styles.infoValue}>{displayProfile.graduationYear}</Text>
          </View>
        )}
      </View>

      {displayProfile?.bio && (
        <View style={styles.bioSection}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bioText}>{displayProfile.bio}</Text>
        </View>
      )}

      {displayProfile?.skills && displayProfile.skills.length > 0 && (
        <View style={styles.skillsSection}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {displayProfile.skills.map((skill, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={styles.actionSection}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#2563eb',
    paddingVertical: 30,
    alignItems: 'center',
  },
  profileImageContainer: {
    marginBottom: 12,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageInitial: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#2563eb',
    marginBottom: 4,
  },
  department: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  infoSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#2563eb',
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '500',
  },
  bioSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  bioText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  skillsSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    backgroundColor: '#e0e7ff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  skillText: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: '500',
  },
  actionSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 10,
  },
  editButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
