import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store, useAppDispatch } from './src/store';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigations/TabNavigator';
import { loadSettings } from './src/store/settingsSlice';

const MainApp: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadSettings());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default function App() {
  console.log('App component rendered');
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}
