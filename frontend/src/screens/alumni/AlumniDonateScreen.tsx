import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import api from '../../api/config';

interface DonationAmount {
  id: string;
  amount: number;
  label: string;
}

const PRESET_AMOUNTS: DonationAmount[] = [
  { id: '25', amount: 25, label: '$25' },
  { id: '50', amount: 50, label: '$50' },
  { id: '100', amount: 100, label: '$100' },
  { id: '250', amount: 250, label: '$250' },
  { id: '500', amount: 500, label: '$500' },
  { id: '1000', amount: 1000, label: '$1000' },
];

const IMPACT_INITIATIVES = [
  {
    id: 'scholarships',
    title: 'Scholarships',
    description: 'Support deserving students with financial aid',
    icon: '🎓',
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    description: 'Improve campus facilities and resources',
    icon: '🏢',
  },
  {
    id: 'mentorship',
    title: 'Mentorship Programs',
    description: 'Fund mentoring initiatives for students',
    icon: '👥',
  },
  {
    id: 'research',
    title: 'Research & Innovation',
    description: 'Support cutting-edge research projects',
    icon: '🔬',
  },
];

export const AlumniDonateScreen: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedInitiative, setSelectedInitiative] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const amount = selectedAmount || (customAmount ? parseInt(customAmount) : 0);

  const handleDonate = async () => {
    if (!amount || amount <= 0) {
      Alert.alert('Error', 'Please enter a valid donation amount');
      return;
    }

    if (!selectedInitiative) {
      Alert.alert('Error', 'Please select an initiative to support');
      return;
    }

    try {
      setLoading(true);
      await api.post('/donations', {
        amount,
        initiative: selectedInitiative,
        message: customAmount ? 'Custom amount' : `Preset: $${amount}`,
      });
      Alert.alert('Thank You!', 'Your donation has been received. We appreciate your support!');
      setSelectedAmount(null);
      setCustomAmount('');
      setSelectedInitiative(null);
    } catch (error: any) {
      Alert.alert('Error', error?.response?.data?.message || 'Failed to process donation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Make a Difference</Text>
        <Text style={styles.headerSubtitle}>Your contribution helps shape the future</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Amount</Text>
        <View style={styles.amountGrid}>
          {PRESET_AMOUNTS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.amountButton,
                selectedAmount === item.amount && styles.amountButtonActive,
              ]}
              onPress={() => {
                setSelectedAmount(item.amount);
                setCustomAmount('');
              }}
              disabled={loading}
            >
              <Text
                style={[
                  styles.amountButtonText,
                  selectedAmount === item.amount && styles.amountButtonTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.customLabel}>Or enter custom amount</Text>
        <TextInput
          style={styles.customInput}
          placeholder="Enter amount ($)"
          value={customAmount}
          onChangeText={(value) => {
            setCustomAmount(value);
            setSelectedAmount(null);
          }}
          keyboardType="number-pad"
          editable={!loading}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support an Initiative</Text>
        {IMPACT_INITIATIVES.map((initiative) => (
          <TouchableOpacity
            key={initiative.id}
            style={[
              styles.initiativeCard,
              selectedInitiative === initiative.id && styles.initiativeCardActive,
            ]}
            onPress={() => setSelectedInitiative(initiative.id)}
            disabled={loading}
          >
            <View style={styles.initiativeIcon}>
              <Text style={styles.initiativeIconText}>{initiative.icon}</Text>
            </View>
            <View style={styles.initiativeContent}>
              <Text style={styles.initiativeTitle}>{initiative.title}</Text>
              <Text style={styles.initiativeDescription}>{initiative.description}</Text>
            </View>
            {selectedInitiative === initiative.id && (
              <Text style={styles.checkmark}>✓</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.summarySection}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Donation Amount:</Text>
          <Text style={styles.summaryAmount}>${amount}</Text>
          {selectedInitiative && (
            <>
              <Text style={styles.summaryLabel} style={{ marginTop: 10 }}>
                Supporting:
              </Text>
              <Text style={styles.summaryValue}>
                {IMPACT_INITIATIVES.find((i) => i.id === selectedInitiative)?.title}
              </Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.donateButton, loading && styles.donateButtonDisabled]}
          onPress={handleDonate}
          disabled={loading || !amount || !selectedInitiative}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.donateButtonText}>Proceed to Payment</Text>
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
  section: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  amountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  amountButton: {
    width: '31%',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  amountButtonActive: {
    borderColor: '#2563eb',
    backgroundColor: '#e0e7ff',
  },
  amountButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  amountButtonTextActive: {
    color: '#2563eb',
  },
  customLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  customInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fff',
  },
  initiativeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  initiativeCardActive: {
    borderColor: '#2563eb',
    backgroundColor: '#f0f9ff',
  },
  initiativeIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  initiativeIconText: {
    fontSize: 24,
  },
  initiativeContent: {
    flex: 1,
  },
  initiativeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  initiativeDescription: {
    fontSize: 12,
    color: '#6b7280',
  },
  checkmark: {
    fontSize: 18,
    color: '#2563eb',
    marginLeft: 8,
  },
  summarySection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  summaryValue: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '600',
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  donateButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  donateButtonDisabled: {
    opacity: 0.5,
  },
  donateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
