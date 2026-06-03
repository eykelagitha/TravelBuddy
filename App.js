import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import TabNavigator from './src/navigation/TabNavigator';
import { FavoritesContext } from './src/context/FavoritesContext';

export default function App() {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (destination) => {
    setFavorites((prev) => {
      const exists = prev.find((f) => f.id === destination.id);
      if (exists) return prev;
      return [...prev, destination];
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  const isFavorite = (id) => favorites.some((f) => f.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <TabNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </FavoritesContext.Provider>
  );
}
