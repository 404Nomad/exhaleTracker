// src/navigations/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import HealthScreen from '../screens/HealthScreen';
import AchievementsScreen from '../screens/AchievementsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

// Mapping des noms de route vers les icônes MaterialCommunityIcons
const iconNames: Record<string, string> = {
  Dashboard: 'home-outline',
  Health: 'heart-outline',
  Achievements: 'star-outline',
  Settings: 'cog-outline'
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          // Récupère le nom d'icône à partir du mapping
          const name = iconNames[route.name] || 'help-circle-outline';
          return <Icon name={name} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00ff88',
        tabBarInactiveTintColor: '#eee',
        tabBarStyle: { backgroundColor: '#222' }
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Health" component={HealthScreen} />
      <Tab.Screen name="Achievements" component={AchievementsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
