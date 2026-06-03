import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import destinations from '../data/destinations';

const ACCENT = '#00b894';
const CATEGORIES = ['All', 'Nature', 'Beach', 'Culture'];

const categoryColors = {
  Nature: { bg: '#e8f8f5', text: '#00b894' },
  Beach: { bg: '#e3f2fd', text: '#1976d2' },
  Culture: { bg: '#fff8e1', text: '#f57c00' },
};

export default function SearchScreen() {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = destinations.filter((dest) => {
    const matchQuery =
      dest.name.toLowerCase().includes(query.toLowerCase()) ||
      dest.location.toLowerCase().includes(query.toLowerCase());
    const matchCategory =
      activeCategory === 'All' || dest.category === activeCategory;
    return matchQuery && matchCategory;
  });

  const renderItem = ({ item }) => {
    const colors = categoryColors[item.category] || { bg: '#f5f5f5', text: '#666' };
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => {
          // Navigate ke Home tab → Detail screen dengan params
          navigation.navigate('HomeTab', {
            screen: 'Detail',
            params: { destination: item },
          });
        }}
      >
        <Image
          source={item.image}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.cardBody}>
          <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={11} color="#b2bec3" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
          <View style={styles.cardBottom}>
            <View style={[styles.badge, { backgroundColor: colors.bg }]}>
              <Text style={[styles.badgeText, { color: colors.text }]}>{item.category}</Text>
            </View>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={11} color="#f9ca24" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>
          <Text style={styles.price}>Rp {item.price.toLocaleString('id-ID')}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>

        {/* Search Input */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={16} color="#b2bec3" />
          <TextInput
            style={styles.input}
            placeholder="Cari destinasi atau lokasi..."
            placeholderTextColor="#b2bec3"
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={16} color="#b2bec3" />
            </TouchableOpacity>
          )}
        </View>

        {/* Category Filter (BONUS) */}
        <View style={styles.categoryRow}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                activeCategory === cat && styles.categoryChipActive,
              ]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  activeCategory === cat && styles.categoryChipTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Results count */}
      <Text style={styles.resultsCount}>{filtered.length} hasil ditemukan</Text>

      {/* Result List */}
      {filtered.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="search" size={48} color="#dfe6e9" />
          <Text style={styles.emptyText}>Destinasi tidak ditemukan</Text>
          <Text style={styles.emptySubtext}>Coba kata kunci lain</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2d3436',
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f2f6',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#2d3436',
    paddingVertical: 0,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f1f2f6',
  },
  categoryChipActive: {
    backgroundColor: ACCENT,
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#636e72',
  },
  categoryChipTextActive: {
    color: '#ffffff',
  },
  resultsCount: {
    fontSize: 12,
    color: '#b2bec3',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 4,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    marginBottom: 10,
  },
  cardImage: {
    width: 90,
    height: 80,
  },
  cardBody: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  cardName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2d3436',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 2,
  },
  locationText: {
    fontSize: 11,
    color: '#b2bec3',
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  badge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#636e72',
  },
  price: {
    fontSize: 12,
    fontWeight: '800',
    color: ACCENT,
    marginTop: 2,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#b2bec3',
  },
  emptySubtext: {
    fontSize: 13,
    color: '#dfe6e9',
  },
});
