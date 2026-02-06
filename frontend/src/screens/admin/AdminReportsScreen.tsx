import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import api from '../../api/config';

interface Report {
  id: string;
  title: string;
  description: string;
  data: number;
  icon: string;
  trend: number;
}

export const AdminReportsScreen: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/reports');
      setReports(response.data.reports || generateDummyReports());
    } catch (error) {
      console.error('Error fetching reports:', error);
      setReports(generateDummyReports());
    } finally {
      setLoading(false);
    }
  };

  const generateDummyReports = (): Report[] => [
    {
      id: '1',
      title: 'User Growth',
      description: 'New users this month',
      data: 145,
      icon: '📈',
      trend: 12,
    },
    {
      id: '2',
      title: 'Job Postings',
      description: 'Total jobs posted',
      data: 234,
      icon: '💼',
      trend: 8,
    },
    {
      id: '3',
      title: 'Success Stories',
      description: 'Stories shared',
      data: 47,
      icon: '📖',
      trend: 5,
    },
    {
      id: '4',
      title: 'Donations',
      description: 'Total amount donated',
      data: 15230,
      icon: '❤️',
      trend: 23,
    },
    {
      id: '5',
      title: 'Event Attendance',
      description: 'Total attendees',
      data: 892,
      icon: '🎉',
      trend: 15,
    },
    {
      id: '6',
      title: 'Engagement Rate',
      description: 'Community engagement',
      data: 78,
      icon: '👥',
      trend: 3,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reports & Analytics</Text>
        <Text style={styles.headerSubtitle}>System metrics and insights</Text>
      </View>

      <ScrollView>
        {loading ? (
          <ActivityIndicator size="large" color="#dc2626" style={styles.loader} />
        ) : (
          <View style={styles.reportsGrid}>
            {reports.map((report) => (
              <View key={report.id} style={styles.reportCard}>
                <View style={styles.reportHeader}>
                  <Text style={styles.reportIcon}>{report.icon}</Text>
                  <View style={styles.trendBadge}>
                    <Text style={styles.trendText}>↑ {report.trend}%</Text>
                  </View>
                </View>

                <Text style={styles.reportValue}>{report.data}</Text>
                <Text style={styles.reportTitle}>{report.title}</Text>
                <Text style={styles.reportDescription}>{report.description}</Text>
              </View>
            ))}
          </View>
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
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#fecaca',
  },
  loader: {
    marginVertical: 30,
  },
  reportsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    paddingVertical: 16,
    gap: 8,
  },
  reportCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reportIcon: {
    fontSize: 28,
  },
  trendBadge: {
    backgroundColor: '#d1fae5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  trendText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '600',
  },
  reportValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  reportTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  reportDescription: {
    fontSize: 11,
    color: '#666',
  },
});
