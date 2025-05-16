import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function AchievementsScreen() {
  // Placeholder : vous pouvez ajouter votre logique d’achievements ici
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Mes Réalisations</Text>
      <Text style={styles.sub}>(À implémenter…)</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111' },
  header: { color: '#00ff88', fontSize: 18 },
  sub: { color: '#ccc', marginTop: 8 }
});
