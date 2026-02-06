import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import api from '../../api/config';

interface DashboardStats {
  totalUsers: number;
  activeAlumni: number;
  totalJobs: number;
  totalDonations: number;
  pendingReviews: number;
  totalEvents: number;
}

interface RecentActivity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}

export const AdminDashboardScreen: React.FC = () => {
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
        api.get('/admin/dashboard/stats'),
        api.get('/admin/activity-log?limit=10'),
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

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <Text style={styles.headerSubtitle}>System Overview & Management</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#dc2626" style={styles.loader} />
      ) : (
        <>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>👥</Text>
              <Text style={styles.statValue}>{stats?.totalUsers || 0}</Text>
              <Text style={styles.statLabel}>Total Users</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>🎓</Text>
              <Text style={styles.statValue}>{stats?.activeAlumni || 0}</Text>
              <Text style={styles.statLabel}>Active Alumni</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>💼</Text>
              <Text style={styles.statValue}>{stats?.totalJobs || 0}</Text>
              <Text style={styles.statLabel}>Jobs Posted</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>❤️</Text>
              <Text style={styles.statValue}>${stats?.totalDonations || 0}</Text>
              <Text style={styles.statLabel}>Total Donations</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>⚠️</Text>
              <Text style={styles.statValue}>{stats?.pendingReviews || 0}</Text>
              <Text style={styles.statLabel}>Pending Reviews</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>🎉</Text>
              <Text style={styles.statValue}>{stats?.totalEvents || 0}</Text>
              <Text style={styles.statLabel}>Events</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activity Log</Text>
            {activities.length > 0 ? (
              activities.map((activity) => (
                <View key={activity.id} style={styles.activityCard}>
                  <View style={styles.activityDot}></View>
                  <View style={styles.activityContent}>
                    <Text style={styles.activityType}>{activity.type}</Text>
                    <Text style={styles.activityDescription}>{activity.description}</Text>
                    <Text style={styles.activityTime}>{activity.timestamp}</Text>
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
  header: {
    backgroundColor: '#dc2626',
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fecaca',
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
    width: '31.33%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#dc2626',
    marginRight: 12,
    marginTop: 4,
  },
  activityContent: {
    flex: 1,
  },
  activityType: {
    fontSize: 12,
    fontWeight: '600',
    color: '#dc2626',
    marginBottom: 2,
  },
  activityDescription: {
    fontSize: 13,
    color: '#1f2937',
    fontWeight: '500',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 11,
    color: '#999',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    paddingVertical: 20,
  },
});
