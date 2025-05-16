import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SettingsState {
  lastSmoke: string | null;
  dailyCigs: number;
  cigsPerPack: number;
  packPrice: number;
  loaded: boolean;
}

const initialState: SettingsState = {
  lastSmoke: null,
  dailyCigs: 0,
  cigsPerPack: 20,
  packPrice: 0,
  loaded: false
};

export const loadSettings = createAsyncThunk(
  'settings/load',
  async () => {
    const json = await AsyncStorage.getItem('settings');
    return json ? JSON.parse(json) : {};
  }
);

export const saveSettings = createAsyncThunk(
  'settings/save',
  async (settings: Partial<SettingsState>) => {
    await AsyncStorage.setItem('settings', JSON.stringify(settings));
    return settings;
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadSettings.fulfilled, (state, action: PayloadAction<Partial<SettingsState>>) => {
      Object.assign(state, action.payload, { loaded: true });
    });
    builder.addCase(saveSettings.fulfilled, (state, action: PayloadAction<Partial<SettingsState>>) => {
      Object.assign(state, action.payload);
    });
  }
});

export default settingsSlice.reducer;
