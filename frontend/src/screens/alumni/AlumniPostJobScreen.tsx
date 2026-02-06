import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import api from '../../api/config';

export const AlumniPostJobScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    type: 'full-time',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.company || !formData.location) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      await api.post('/jobs', formData);
      Alert.alert('Success', 'Job posted successfully!');
      setFormData({
        title: '',
        company: '',
        location: '',
        salary: '',
        type: 'full-time',
        description: '',
      });
    } catch (error: any) {
      Alert.alert('Error', error?.response?.data?.message || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Post a Job Opportunity</Text>
        <Text style={styles.headerSubtitle}>Help fellow alumni find their next opportunity</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Job Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Senior Software Engineer"
            value={formData.title}
            onChangeText={(value) => handleInputChange('title', value)}
            editable={!loading}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Company Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter company name"
            value={formData.company}
            onChangeText={(value) => handleInputChange('company', value)}
            editable={!loading}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Location *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., San Francisco, CA"
            value={formData.location}
            onChangeText={(value) => handleInputChange('location', value)}
            editable={!loading}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Salary Range</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., $80K - $120K"
            value={formData.salary}
            onChangeText={(value) => handleInputChange('salary', value)}
            editable={!loading}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Employment Type *</Text>
          <View style={styles.typeContainer}>
            {['full-time', 'part-time', 'contract'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeButton,
                  formData.type === type && styles.typeButtonActive,
                ]}
                onPress={() => handleInputChange('type', type)}
                disabled={loading}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    formData.type === type && styles.typeButtonTextActive,
                  ]}
                >
                  {type.replace('-', ' ')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Job Description</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Describe the job, responsibilities, and requirements..."
            value={formData.description}
            onChangeText={(value) => handleInputChange('description', value)}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            editable={!loading}
          />
        </View>

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Post Job</Text>
          )}
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
    backgroundColor: '#2563eb',
    padding: 20,
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
  form: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  formGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fff',
  },
  descriptionInput: {
    minHeight: 120,
    paddingVertical: 12,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  typeButtonActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  typeButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textTransform: 'capitalize',
  },
  typeButtonTextActive: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
