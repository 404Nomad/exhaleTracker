import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigations/TabNavigator';
import { store } from './src/store';
import { loadSettings } from './src/store/settingsSlice';

const Root = () => {
  const dispatch = useDispatch();
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
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}
