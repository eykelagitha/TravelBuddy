import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';

const ACCENT = '#00b894';

const categoryColors = {
  Nature: { bg: '#e8f8f5', text: '#00b894' },
  Beach: { bg: '#e3f2fd', text: '#1976d2' },
  Culture: { bg: '#fff8e1', text: '#f57c00' },
};

export default function DetailScreen({ route, navigation }) {
  // ✅ Extract data dari route.params
  const { destination } = route.params;
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const insets = useSafeAreaInsets();
  const favorited = isFavorite(destination.id);
  const colors = categoryColors[destination.category] || { bg: '#f5f5f5', text: '#666' };

  const handleToggleFavorite = () => {
    if (favorited) {
      removeFavorite(destination.id);
    } else {
      addFavorite(destination);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image
            source={destination.image}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay} />

          {/* Back Button */}
          <TouchableOpacity
            style={[styles.backButton, { top: insets.top + 10 }]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={22} color="#2d3436" />
          </TouchableOpacity>

          {/* Favorite Button */}
          <TouchableOpacity
            style={[styles.favoriteButton, { top: insets.top + 10 }]}
            onPress={handleToggleFavorite}
          >
            <Ionicons
              name={favorited ? 'heart' : 'heart-outline'}
              size={22}
              color={favorited ? '#e17055' : '#2d3436'}
            />
          </TouchableOpacity>

          {/* Title overlay */}
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>{destination.name}</Text>
            <View style={styles.heroLocation}>
              <Ionicons name="location" size={14} color="rgba(255,255,255,0.85)" />
              <Text style={styles.heroLocationText}>{destination.location}</Text>
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Ionicons name="star" size={18} color="#f9ca24" />
              <Text style={styles.statValue}>{destination.rating}/5</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Ionicons name="cash-outline" size={18} color={ACCENT} />
              <Text style={styles.statValue}>
                Rp {(destination.price / 1000).toFixed(0)}k
              </Text>
              <Text style={styles.statLabel}>Per hari</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Ionicons name="pricetag-outline" size={18} color={colors.text} />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {destination.category}
              </Text>
              <Text style={styles.statLabel}>Kategori</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.sectionTitle}>Tentang Destinasi</Text>
          <Text style={styles.description}>{destination.description}</Text>

          {/* Route Params Debug Card (Educational) */}
          <View style={styles.paramsCard}>
            <Text style={styles.paramsLabel}>route.params (data yang diterima)</Text>
            <Text style={styles.paramsValue}>
              {`id: ${destination.id}\nname: "${destination.name}"\nlocation: "${destination.location}"\nprice: ${destination.price}\nrating: ${destination.rating}`}
            </Text>
          </View>

          {/* Price + CTA */}
          <View style={styles.ctaCard}>
            <View>
              <Text style={styles.ctaLabel}>Estimasi Biaya</Text>
              <Text style={styles.ctaPrice}>
                Rp {destination.price.toLocaleString('id-ID')}
              </Text>
              <Text style={styles.ctaSub}>per orang / hari</Text>
            </View>
            <TouchableOpacity
              style={[
                styles.favButton,
                favorited && styles.favButtonActive,
              ]}
              onPress={handleToggleFavorite}
            >
              <Ionicons
                name={favorited ? 'heart' : 'heart-outline'}
                size={16}
                color={favorited ? '#ffffff' : ACCENT}
              />
              <Text
                style={[
                  styles.favButtonText,
                  favorited && styles.favButtonTextActive,
                ]}
              >
                {favorited ? 'Tersimpan' : 'Simpan'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scroll: {
    flex: 1,
  },
  heroContainer: {
    height: 280,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  favoriteButton: {
    position: 'absolute',
    right: 16,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  heroTextContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
  },
  heroLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  heroLocationText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
  },
  content: {
    padding: 20,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
  },
  statValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2d3436',
  },
  statLabel: {
    fontSize: 10,
    color: '#b2bec3',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#2d3436',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#636e72',
    lineHeight: 22,
    marginBottom: 20,
  },
  paramsCard: {
    backgroundColor: '#f1f2f6',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: ACCENT,
  },
  paramsLabel: {
    fontSize: 10,
    color: ACCENT,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    marginBottom: 4,
  },
  paramsValue: {
    fontSize: 11,
    color: '#636e72',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    lineHeight: 18,
  },
  ctaCard: {
    backgroundColor: ACCENT,
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ctaLabel: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
  },
  ctaPrice: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
  },
  ctaSub: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
  },
  favButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  favButtonActive: {
    backgroundColor: '#e17055',
  },
  favButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: ACCENT,
  },
  favButtonTextActive: {
    color: '#ffffff',
  },
});
