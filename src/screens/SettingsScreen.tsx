import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { saveSettings } from '../store/settingsSlice';

export default function SettingsScreen() {
  const { lastSmoke, dailyCigs, cigsPerPack, packPrice, loaded } = useSelector((s: RootState) => s.settings);
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [daily, setDaily] = useState(String(dailyCigs));
  const [perPack, setPerPack] = useState(String(cigsPerPack));
  const [price, setPrice] = useState(String(packPrice));

  useEffect(() => {
    if (lastSmoke) setDate(new Date(lastSmoke));
  }, [lastSmoke]);

  if (!loaded) return <Text>Chargement…</Text>;

  const onSave = () => {
    dispatch(saveSettings({
      lastSmoke: date.toISOString(),
      dailyCigs: parseInt(daily, 10),
      cigsPerPack: parseInt(perPack, 10),
      packPrice: parseFloat(price)
    }));
    Alert.alert('Paramètres enregistrés ✅');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Date dernière cigarette</Text>
      <Button title={date.toLocaleString()} onPress={() => setShowPicker(true)} />
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display="default"
          onChange={(_, d) => { setShowPicker(false); if (d) setDate(d); }}
        />
      )}

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
  label: { color: '#eee', marginTop: 12 },
  input: {
    backgroundColor: '#222',
    color: '#eee',
    padding: 8,
    borderRadius: 4,
    marginTop: 4
  }
});
