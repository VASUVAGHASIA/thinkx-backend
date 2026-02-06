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
import api from '../../api/config';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  type: 'full-time' | 'part-time' | 'contract';
  postedBy: string;
  createdAt: string;
}

export const StudentJobsScreen: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'full-time' | 'part-time'>('all');

  useEffect(() => {
    fetchJobs();
  }, [filter]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = filter !== 'all' ? { type: filter } : {};
      const response = await api.get('/jobs', { params });
      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchJobs();
    setRefreshing(false);
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'full-time':
        return '#10b981';
      case 'part-time':
        return '#f59e0b';
      case 'contract':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {(['all', 'full-time', 'part-time'] as const).map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterButton,
              filter === type && styles.filterButtonActive,
            ]}
            onPress={() => setFilter(type)}
          >
            <Text
              style={[
                styles.filterText,
                filter === type && styles.filterTextActive,
              ]}
            >
              {type === 'all' ? 'All Jobs' : type.replace('-', ' ')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.jobsContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#2563eb" style={styles.loader} />
        ) : jobs.length > 0 ? (
          jobs.map((job) => (
            <View key={job.id} style={styles.jobCard}>
              <View style={styles.jobHeader}>
                <View style={styles.jobInfo}>
                  <Text style={styles.jobTitle}>{job.title}</Text>
                  <Text style={styles.company}>{job.company}</Text>
                </View>
                <View
                  style={[
                    styles.jobTypeTag,
                    { backgroundColor: getJobTypeColor(job.type) },
                  ]}
                >
                  <Text style={styles.jobTypeText}>{job.type}</Text>
                </View>
              </View>

              <View style={styles.jobDetails}>
                <Text style={styles.detailText}>📍 {job.location}</Text>
                {job.salary && <Text style={styles.detailText}>💰 {job.salary}</Text>}
              </View>

              <View style={styles.jobFooter}>
                <Text style={styles.postedBy}>Posted by {job.postedBy}</Text>
                <TouchableOpacity style={styles.applyButton}>
                  <Text style={styles.applyButtonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No jobs found</Text>
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
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterButtonActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
  },
  filterTextActive: {
    color: '#fff',
  },
  jobsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  company: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
  },
  jobTypeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 8,
  },
  jobTypeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'capitalize',
  },
  jobDetails: {
    gap: 6,
    marginBottom: 12,
  },
  detailText: {
    fontSize: 12,
    color: '#6b7280',
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postedBy: {
    fontSize: 11,
    color: '#999',
  },
  applyButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  loader: {
    marginVertical: 30,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    paddingVertical: 30,
  },
});
