import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, useAppDispatch, useAppSelector } from '../store';
import { saveSettings } from '../store/settingsSlice';
import { improvements } from '../constants/improvements';
import { differenceInMilliseconds, formatDuration, intervalToDuration } from 'date-fns';

export default function DashboardScreen() {
  const { lastSmoke, dailyCigs, cigsPerPack, packPrice, loaded } = useAppSelector(s => s.settings);
  const dispatch = useAppDispatch();

  if (!loaded) return <Text>Chargement…</Text>;
  if (!lastSmoke) return <Text>Veuillez configurer vos paramètres.</Text>;

  const now = new Date();
  const smokedAt = new Date(lastSmoke);
  const ms = differenceInMilliseconds(now, smokedAt);
  const daysQuit = Math.floor(ms / (1000 * 3600 * 24));
  const cigsAvoided = daysQuit * dailyCigs;
  const moneySaved = (cigsAvoided / cigsPerPack) * packPrice;
  const minutesPerCig = 5;
  const totalMinutesSaved = cigsAvoided * minutesPerCig;

  // calcul détaillé
  const perDay = dailyCigs;
  const perWeek = dailyCigs * 7;
  const perMonth = dailyCigs * 30;
  const perYear = dailyCigs * 365;

  const reset = () => {
    Alert.alert('Réinitialiser', 'Voulez-vous vraiment tout réinitialiser ?', [
      { text: 'Annuler' },
      {
        text: 'OK',
        onPress: () =>
          dispatch(
            saveSettings({
              lastSmoke: null,
              dailyCigs: 0,
              cigsPerPack: 0,
              packPrice: 0
            })
          )
      }
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Depuis votre dernière cigarette :</Text>
      <Text style={styles.value}>
        {formatDuration(intervalToDuration({ start: smokedAt, end: now }))}
      </Text>

      <Text style={styles.subtitle}>Progression globale</Text>
      <View style={styles.row}>
        <Text>{daysQuit} jours</Text>
        <Text>{cigsAvoided} cig.</Text>
        <Text>{moneySaved.toFixed(2)} €</Text>
        <Text>{(totalMinutesSaved / 60).toFixed(1)} h</Text>
        <Text>
          {Math.floor(
            (improvements.filter(i => daysQuit >= i.thresholdDays).length / improvements.length) * 100
          )}
          %
        </Text>
      </View>

      <Text style={styles.subtitle}>Détail évitements</Text>
      <View style={styles.statsBox}>
        <Text>Par jour : {perDay}</Text>
        <Text>Par semaine : {perWeek}</Text>
        <Text>Par mois : {perMonth}</Text>
        <Text>Par an : {perYear}</Text>
      </View>

      <Text style={styles.subtitle}>Argent économisé</Text>
      <View style={styles.statsBox}>
        <Text>Par jour : {(perDay / cigsPerPack * packPrice).toFixed(2)} €</Text>
        <Text>Par semaine : {(perWeek / cigsPerPack * packPrice).toFixed(2)} €</Text>
        <Text>Par mois : {(perMonth / cigsPerPack * packPrice).toFixed(2)} €</Text>
        <Text>Par an : {(perYear / cigsPerPack * packPrice).toFixed(2)} €</Text>
      </View>

      <Text style={styles.subtitle}>Temps regagné</Text>
      <View style={styles.statsBox}>
        <Text>Par jour : {perDay * minutesPerCig} min</Text>
        <Text>Par semaine : {perWeek * minutesPerCig} min</Text>
        <Text>Par mois : {perMonth * minutesPerCig} min</Text>
        <Text>Par an : {perYear * minutesPerCig} min</Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={reset}>
        <Text>Réinitialiser</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111' },
  title: { color: '#00ff88', fontSize: 18, marginBottom: 8 },
  value: { color: '#eee', fontSize: 16, marginBottom: 16 },
  subtitle: { color: '#00ff88', marginTop: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' },
  statsBox: { backgroundColor: '#1a1a1a', padding: 8, borderRadius: 8, marginTop: 8 },
  btn: {
    backgroundColor: '#00ff88',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 20
  }
});
