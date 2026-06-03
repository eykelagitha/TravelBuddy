import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import destinations from '../data/destinations';

const ACCENT = '#00b894';

const categoryColors = {
  Nature: { bg: '#e8f8f5', text: '#00b894' },
  Beach: { bg: '#e3f2fd', text: '#1976d2' },
  Culture: { bg: '#fff8e1', text: '#f57c00' },
};

export default function HomeScreen({ navigation }) {
  const renderItem = ({ item }) => {
    const colors = categoryColors[item.category] || { bg: '#f5f5f5', text: '#666' };

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('Detail', { destination: item })}
      >
        <Image
          source={item.image}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.cardBody}>
          <View style={styles.cardTop}>
            <Text style={styles.cardName} numberOfLines={1}>
              {item.name}
            </Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={12} color="#f9ca24" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={12} color="#b2bec3" />
            <Text style={styles.locationText} numberOfLines={1}>
              {item.location}
            </Text>
          </View>
          <View style={styles.cardBottom}>
            <View style={[styles.categoryBadge, { backgroundColor: colors.bg }]}>
              <Text style={[styles.categoryText, { color: colors.text }]}>
                {item.category}
              </Text>
            </View>
            <Text style={styles.priceText}>
              Rp {item.price.toLocaleString('id-ID')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSubtitle}>Explore the world 🌍</Text>
          <Text style={styles.headerTitle}>Destinations</Text>
        </View>
        <TouchableOpacity style={styles.bellButton}>
          <Ionicons name="notifications-outline" size={22} color="#2d3436" />
        </TouchableOpacity>
      </View>

      {/* Banner */}
      <View style={styles.bannerContainer}>
        <Image
          source={require('../../assets/destinations/danau_toba.png')}
          style={styles.bannerImage}
          resizeMode="cover"
        />
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerLabel}>FEATURED</Text>
          <Text style={styles.bannerTitle}>Discover Indonesia 🇮🇩</Text>
          <Text style={styles.bannerSub}>8 amazing destinations await you</Text>
        </View>
      </View>

      {/* List */}
      <FlatList
        data={destinations}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 10,
    backgroundColor: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#b2bec3',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2d3436',
  },
  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerContainer: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 4,
    borderRadius: 16,
    overflow: 'hidden',
    height: 140,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    inset: 0,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
    padding: 14,
  },
  bannerLabel: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  bannerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },
  bannerSub: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
    marginTop: 2,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    gap: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    marginBottom: 10,
  },
  cardImage: {
    width: 110,
    height: 95,
  },
  cardBody: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 4,
  },
  cardName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2d3436',
    flex: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#636e72',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 2,
  },
  locationText: {
    fontSize: 12,
    color: '#b2bec3',
    flex: 1,
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
  },
  priceText: {
    fontSize: 13,
    fontWeight: '800',
    color: ACCENT,
  },
});
