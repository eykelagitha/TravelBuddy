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
import { useNavigation } from '@react-navigation/native';
import { useFavorites } from '../context/FavoritesContext';

const ACCENT = '#00b894';

export default function FavoritesScreen() {
  const navigation = useNavigation();
  const { favorites, removeFavorite } = useFavorites();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate('HomeTab', {
          screen: 'Detail',
          params: { destination: item },
        })
      }
    >
      <Image
        source={item.image}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardBody}>
        <View>
          <Text style={styles.cardName} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={12} color="#b2bec3" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        </View>
        <View style={styles.cardBottom}>
          <Text style={styles.priceText}>
            Rp {item.price.toLocaleString('id-ID')}
          </Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={12} color="#f9ca24" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>
      {/* Remove button */}
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFavorite(item.id)}
      >
        <Ionicons name="heart-dislike-outline" size={18} color="#e17055" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSubtitle}>Your saved places</Text>
          <Text style={styles.headerTitle}>Favorites</Text>
        </View>
        {favorites.length > 0 && (
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>{favorites.length}</Text>
          </View>
        )}
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={64} color="#dfe6e9" />
          <Text style={styles.emptyTitle}>Belum ada favorit</Text>
          <Text style={styles.emptySubtitle}>
            Tap tombol{' '}
            <Text style={{ color: ACCENT, fontWeight: '700' }}>❤️ Simpan</Text>
            {' '}di halaman detail{'\n'}untuk menyimpan destinasi favoritmu
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Text style={styles.resultsCount}>
              {favorites.length} destinasi tersimpan
            </Text>
          }
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  headerSubtitle: {
    fontSize: 13,
    color: '#b2bec3',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2d3436',
  },
  countBadge: {
    backgroundColor: ACCENT,
    borderRadius: 20,
    minWidth: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  countBadgeText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#b2bec3',
    marginTop: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#b2bec3',
    textAlign: 'center',
    lineHeight: 22,
  },
  resultsCount: {
    fontSize: 12,
    color: '#b2bec3',
    paddingHorizontal: 4,
    paddingBottom: 8,
  },
  listContent: {
    padding: 16,
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
    alignItems: 'center',
  },
  cardImage: {
    width: 110,
    height: 90,
  },
  cardBody: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
    height: 90,
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
    marginTop: 3,
  },
  locationText: {
    fontSize: 12,
    color: '#b2bec3',
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceText: {
    fontSize: 13,
    fontWeight: '800',
    color: ACCENT,
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
  removeButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
