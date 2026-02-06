import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/config';

interface DashboardStats {
  jobsPosted: number;
  storiesShared: number;
  eventsAttended: number;
  donationsMade: number;
}

interface RecentActivity {
  id: string;
  type: 'job' | 'story' | 'donation' | 'event';
  title: string;
  date: string;
}

export const AlumniDashboardScreen: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, activitiesRes] = await Promise.all([
        api.get('/alumni/stats'),
        api.get('/alumni/activities?limit=10'),
      ]);
      setStats(statsRes.data);
      setActivities(activitiesRes.data.activities || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardData();
    setRefreshing(false);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'job':
        return '💼';
      case 'story':
        return '📖';
      case 'donation':
        return '❤️';
      case 'event':
        return '🎉';
      default:
        return '📌';
    }
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome back, {user?.name}!</Text>
        <Text style={styles.subtitle}>Make a difference in our community</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2563eb" style={styles.loader} />
      ) : (
        <>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>💼</Text>
              <Text style={styles.statValue}>{stats?.jobsPosted || 0}</Text>
              <Text style={styles.statLabel}>Jobs Posted</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>📖</Text>
              <Text style={styles.statValue}>{stats?.storiesShared || 0}</Text>
              <Text style={styles.statLabel}>Stories Shared</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>❤️</Text>
              <Text style={styles.statValue}>{stats?.donationsMade || 0}</Text>
              <Text style={styles.statLabel}>Donations</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>🎉</Text>
              <Text style={styles.statValue}>{stats?.eventsAttended || 0}</Text>
              <Text style={styles.statLabel}>Events</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonIcon}>➕</Text>
              <Text style={styles.actionButtonText}>Post a Job</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonIcon}>✍️</Text>
              <Text style={styles.actionButtonText}>Share Success Story</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonIcon}>💝</Text>
              <Text style={styles.actionButtonText}>Make a Donation</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllLink}>View All</Text>
              </TouchableOpacity>
            </View>

            {activities.length > 0 ? (
              activities.map((activity) => (
                <View key={activity.id} style={styles.activityCard}>
                  <Text style={styles.activityIcon}>
                    {getActivityIcon(activity.type)}
                  </Text>
                  <View style={styles.activityContent}>
                    <Text style={styles.activityTitle}>{activity.title}</Text>
                    <Text style={styles.activityDate}>{activity.date}</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>No recent activity</Text>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  welcomeSection: {
    backgroundColor: '#2563eb',
    padding: 20,
    paddingTop: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#e0e7ff',
  },
  loader: {
    marginVertical: 30,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    paddingVertical: 16,
    gap: 8,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  viewAllLink: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: '600',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionButtonIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  activityIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  activityDate: {
    fontSize: 11,
    color: '#999',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    paddingVertical: 20,
  },
});
