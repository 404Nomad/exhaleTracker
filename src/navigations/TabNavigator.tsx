import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import HealthScreen from '../screens/HealthScreen';
import AchievementsScreen from '../screens/AchievementsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, string> = {
            Dashboard: 'home',
            Health: 'heart',
            Achievements: 'star',
            Settings: 'cog'
          };
          return <Icon name={icons[route.name]} size={size} color={color} solid />;
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
