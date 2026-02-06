import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import api from '../../api/config';

interface PendingReview {
  id: string;
  type: 'job' | 'story' | 'feedback' | 'event';
  title: string;
  author: string;
  content: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const AdminModerationScreen: React.FC = () => {
  const [reviews, setReviews] = useState<PendingReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeStatus, setActiveStatus] = useState<'pending' | 'approved' | 'rejected'>(
    'pending'
  );

  useEffect(() => {
    fetchReviews();
  }, [activeStatus]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/moderation/queue?status=${activeStatus}`);
      setReviews(response.data.items || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchReviews();
    setRefreshing(false);
  };

  const handleApprove = async (itemId: string) => {
    try {
      await api.post(`/admin/moderation/${itemId}/approve`);
      setReviews(reviews.filter((r) => r.id !== itemId));
      Alert.alert('Success', 'Content approved');
    } catch (error) {
      Alert.alert('Error', 'Failed to approve content');
    }
  };

  const handleReject = async (itemId: string) => {
    try {
      await api.post(`/admin/moderation/${itemId}/reject`);
      setReviews(reviews.filter((r) => r.id !== itemId));
      Alert.alert('Success', 'Content rejected');
    } catch (error) {
      Alert.alert('Error', 'Failed to reject content');
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'job':
        return '#3b82f6';
      case 'story':
        return '#8b5cf6';
      case 'feedback':
        return '#f59e0b';
      case 'event':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Content Moderation</Text>
      </View>

      <View style={styles.statusTabs}>
        {(['pending', 'approved', 'rejected'] as const).map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.statusTab,
              activeStatus === status && styles.statusTabActive,
            ]}
            onPress={() => setActiveStatus(status)}
          >
            <Text
              style={[
                styles.statusTabText,
                activeStatus === status && styles.statusTabTextActive,
              ]}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#dc2626" style={styles.loader} />
        ) : reviews.length > 0 ? (
          <View style={styles.reviewsList}>
            {reviews.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewTypeContainer}>
                    <View
                      style={[
                        styles.typeTag,
                        { backgroundColor: getTypeColor(review.type) },
                      ]}
                    >
                      <Text style={styles.typeTagText}>{review.type}</Text>
                    </View>
                  </View>
                  <Text style={styles.submittedDate}>{review.submittedDate}</Text>
                </View>

                <Text style={styles.reviewTitle}>{review.title}</Text>
                <Text style={styles.authorName}>By {review.author}</Text>

                <View style={styles.contentPreview}>
                  <Text style={styles.contentText} numberOfLines={3}>
                    {review.content}
                  </Text>
                </View>

                {activeStatus === 'pending' && (
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={styles.approveButton}
                      onPress={() => handleApprove(review.id)}
                    >
                      <Text style={styles.approveButtonText}>✓ Approve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.rejectButton}
                      onPress={() => handleReject(review.id)}
                    >
                      <Text style={styles.rejectButtonText}>✗ Reject</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.emptyText}>
            No {activeStatus} items to moderate
          </Text>
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
  statusTabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  statusTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  statusTabActive: {
    borderBottomColor: '#dc2626',
  },
  statusTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  statusTabTextActive: {
    color: '#dc2626',
  },
  loader: {
    marginVertical: 30,
  },
  reviewsList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  reviewCard: {
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
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewTypeContainer: {
    flexDirection: 'row',
  },
  typeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  typeTagText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'capitalize',
  },
  submittedDate: {
    fontSize: 11,
    color: '#999',
  },
  reviewTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  authorName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  contentPreview: {
    backgroundColor: '#f9fafb',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  contentText: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  approveButton: {
    flex: 1,
    backgroundColor: '#10b981',
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
  },
  approveButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#dc2626',
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
  },
  rejectButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    paddingVertical: 30,
  },
});
