import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert
} from 'react-native';
import { useAppSelector, useAppDispatch } from '../store';
import { saveSettings } from '../store/settingsSlice';

export default function SettingsScreen() {
  const { lastSmoke, dailyCigs, cigsPerPack, packPrice, loaded } =
    useAppSelector(s => s.settings);
  const dispatch = useAppDispatch();

  const [daily, setDaily] = useState(String(dailyCigs));
  const [perPack, setPerPack] = useState(String(cigsPerPack));
  const [price, setPrice] = useState(String(packPrice));

  useEffect(() => {
    if (dailyCigs) setDaily(String(dailyCigs));
    if (cigsPerPack) setPerPack(String(cigsPerPack));
    if (packPrice) setPrice(String(packPrice));
  }, [dailyCigs, cigsPerPack, packPrice]);

  if (!loaded) return <Text>Chargement…</Text>;

  const onSave = () => {
    const now = new Date().toISOString();
    dispatch(
      saveSettings({
        lastSmoke: now,
        dailyCigs: parseInt(daily, 10),
        cigsPerPack: parseInt(perPack, 10),
        packPrice: parseFloat(price)
      })
    );
    Alert.alert(
      'Paramètres enregistrés ✅',
      `Date de dernière cigarette :\n${new Date(now).toLocaleString()}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Dernière cigarette</Text>
      {lastSmoke ? (
        <Text style={styles.value}>
          {new Date(lastSmoke).toLocaleString()}
        </Text>
      ) : (
        <Text style={styles.value}>Jamais enregistrée</Text>
      )}
      <Text style={styles.info}>
        Enregistrera la date et l’heure actuelles en cliquant sur « Enregistrer ».
      </Text>

      <Text style={styles.label}>Cigarettes par jour</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={daily}
        onChangeText={setDaily}
      />

      <Text style={styles.label}>Cigarettes par paquet</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={perPack}
        onChangeText={setPerPack}
      />

      <Text style={styles.label}>Prix du paquet (€)</Text>
      <TextInput
        style={styles.input}
        keyboardType="decimal-pad"
        value={price}
        onChangeText={setPrice}
      />

      <Button title="Enregistrer" onPress={onSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111', flex: 1 },
  label: { color: '#00ff88', marginTop: 16, fontSize: 16 },
  value: { color: '#eee', marginTop: 4, fontSize: 14 },
  info: { color: '#ccc', marginTop: 8, marginBottom: 16 },
  input: {
    backgroundColor: '#222',
    color: '#eee',
    padding: 8,
    borderRadius: 4,
    marginTop: 4
  }
});
