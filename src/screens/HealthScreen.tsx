import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { improvements } from '../constants/improvements';

export default function HealthScreen() {
  const { lastSmoke, loaded } = useSelector((s: RootState) => s.settings);
  if (!loaded) return <Text>Chargement…</Text>;
  if (!lastSmoke) return <Text>Configurez d’abord vos paramètres.</Text>;

  const daysQuit = Math.floor(
    (Date.now() - new Date(lastSmoke).getTime()) / (1000 * 3600 * 24)
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>
        Améliorations <Text style={styles.count}>{`${improvements.filter(i => daysQuit >= i.thresholdDays).length}/${improvements.length}`}</Text>
      </Text>
      {improvements.map(impr => {
        const pct = Math.min((daysQuit / impr.thresholdDays) * 100, 100);
        return (
          <View key={impr.key} style={styles.card}>
            <View style={styles.row}>
              <Text>{`${Math.floor(pct)}%`}</Text>
              <View style={styles.bar}>
                <View style={[styles.fill, { width: `${pct}%` }]} />
              </View>
              <Text>100%</Text>
            </View>
            <Text style={styles.desc}>{impr.desc}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#111' },
  header: { fontSize: 18, color: '#00ff88', padding: 16 },
  count: { color: '#eee' },
  card: { backgroundColor: '#1a1a1a', padding: 12, margin: 8, borderRadius: 8 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  bar: { flex: 1, height: 10, backgroundColor: '#333', marginHorizontal: 8, borderRadius: 5 },
  fill: { height: '100%', backgroundColor: '#00ff88' },
  desc: { color: '#ccc', marginTop: 4 }
});
