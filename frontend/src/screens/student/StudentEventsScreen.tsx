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

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  attendees: number;
  category: string;
  organizer: string;
}

export const StudentEventsScreen: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/events');
      setEvents(response.data.events || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchEvents();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Upcoming Events</Text>
        <Text style={styles.headerSubtitle}>Join the community</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2563eb" style={styles.loader} />
      ) : events.length > 0 ? (
        <View style={styles.eventsContainer}>
          {events.map((event) => (
            <View key={event.id} style={styles.eventCard}>
              <View style={styles.eventDateBox}>
                <Text style={styles.eventDateMonth}>
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                </Text>
                <Text style={styles.eventDateDay}>
                  {new Date(event.date).getDate()}
                </Text>
              </View>

              <View style={styles.eventContent}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventCategory}>{event.category}</Text>

                <View style={styles.eventMeta}>
                  <Text style={styles.metaText}>🕐 {event.time}</Text>
                  <Text style={styles.metaText}>📍 {event.location}</Text>
                </View>

                <View style={styles.eventDescription}>
                  <Text style={styles.description} numberOfLines={2}>
                    {event.description}
                  </Text>
                </View>

                <View style={styles.eventFooter}>
                  <Text style={styles.attendeeCount}>
                    {event.attendees}/{event.capacity} attending
                  </Text>
                  <TouchableOpacity style={styles.registerButton}>
                    <Text style={styles.registerButtonText}>Register</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.emptyText}>No events available</Text>
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
    backgroundColor: '#2563eb',
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
    color: '#e0e7ff',
  },
  eventsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 4,
  },
  eventDateBox: {
    backgroundColor: '#2563eb',
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  eventDateMonth: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  eventDateDay: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 2,
  },
  eventContent: {
    flex: 1,
    padding: 12,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  eventCategory: {
    fontSize: 11,
    color: '#2563eb',
    fontWeight: '500',
    marginBottom: 8,
  },
  eventMeta: {
    gap: 6,
    marginBottom: 8,
  },
  metaText: {
    fontSize: 12,
    color: '#6b7280',
  },
  eventDescription: {
    marginBottom: 10,
  },
  description: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 16,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attendeeCount: {
    fontSize: 11,
    color: '#2563eb',
    fontWeight: '500',
  },
  registerButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 11,
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
