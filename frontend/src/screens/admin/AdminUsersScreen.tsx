import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  TextInput,
} from 'react-native';
import api from '../../api/config';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'alumni' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  joinedDate: string;
}

export const AdminUsersScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'alumni' | 'admin'>('all');

  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = roleFilter !== 'all' ? { role: roleFilter } : {};
      const response = await api.get('/admin/users', { params });
      setUsers(response.data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUsers();
    setRefreshing(false);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return '#dc2626';
      case 'alumni':
        return '#2563eb';
      case 'student':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#10b981';
      case 'inactive':
        return '#f59e0b';
      case 'suspended':
        return '#dc2626';
      default:
        return '#6b7280';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>User Management</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.filterContainer}>
        {(['all', 'student', 'alumni', 'admin'] as const).map((role) => (
          <TouchableOpacity
            key={role}
            style={[
              styles.filterButton,
              roleFilter === role && styles.filterButtonActive,
            ]}
            onPress={() => setRoleFilter(role)}
          >
            <Text
              style={[
                styles.filterText,
                roleFilter === role && styles.filterTextActive,
              ]}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#dc2626" style={styles.loader} />
        ) : filteredUsers.length > 0 ? (
          <View style={styles.usersList}>
            {filteredUsers.map((user) => (
              <TouchableOpacity key={user.id} style={styles.userCard}>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                  <Text style={styles.userJoined}>Joined: {user.joinedDate}</Text>
                </View>
                <View style={styles.userBadges}>
                  <View
                    style={[
                      styles.badge,
                      { backgroundColor: getRoleColor(user.role) },
                    ]}
                  >
                    <Text style={styles.badgeText}>{user.role}</Text>
                  </View>
                  <View
                    style={[
                      styles.badge,
                      { backgroundColor: getStatusColor(user.status) },
                    ]}
                  >
                    <Text style={styles.badgeText}>{user.status}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text style={styles.emptyText}>No users found</Text>
        )}
      </ScrollView>
    </View>
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
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#f3f4f6',
  },
  filterButtonActive: {
    backgroundColor: '#dc2626',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  filterTextActive: {
    color: '#fff',
  },
  loader: {
    marginVertical: 30,
  },
  usersList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  userJoined: {
    fontSize: 11,
    color: '#999',
  },
  userBadges: {
    flexDirection: 'column',
    gap: 4,
    alignItems: 'flex-end',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'capitalize',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    paddingVertical: 30,
  },
});
