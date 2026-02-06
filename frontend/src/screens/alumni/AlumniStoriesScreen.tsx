import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import api from '../../api/config';

interface SuccessStory {
  id: string;
  title: string;
  author: string;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
}

export const AlumniStoriesScreen: React.FC = () => {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      setLoading(true);
      const response = await api.get('/success-stories');
      setStories(response.data.stories || []);
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchStories();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Success Stories</Text>
        <Text style={styles.headerSubtitle}>Inspiring journeys from our alumni</Text>
      </View>

      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#2563eb" style={styles.loader} />
        ) : stories.length > 0 ? (
          <View style={styles.storiesContainer}>
            {stories.map((story) => (
              <View key={story.id} style={styles.storyCard}>
                <View style={styles.storyHeader}>
                  <View>
                    <Text style={styles.storyTitle}>{story.title}</Text>
                    <Text style={styles.storyAuthor}>By {story.author}</Text>
                  </View>
                </View>

                <Text style={styles.storyContent} numberOfLines={4}>
                  {story.content}
                </Text>

                <View style={styles.storyFooter}>
                  <View style={styles.storyMeta}>
                    <Text style={styles.metaItem}>👍 {story.likes}</Text>
                    <Text style={styles.metaItem}>💬 {story.comments}</Text>
                  </View>
                  <TouchableOpacity style={styles.readMoreButton}>
                    <Text style={styles.readMoreText}>Read More</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.emptyText}>No stories available yet</Text>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>✍️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#2563eb',
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#e0e7ff',
  },
  loader: {
    marginVertical: 30,
  },
  storiesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  storyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  storyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  storyAuthor: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: '500',
  },
  storyContent: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 18,
    marginBottom: 12,
  },
  storyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storyMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  metaItem: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  readMoreButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#e0e7ff',
  },
  readMoreText: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  fabText: {
    fontSize: 28,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    paddingVertical: 30,
  },
});
