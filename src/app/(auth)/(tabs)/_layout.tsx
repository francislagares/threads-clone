import React from 'react';

import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Tabs, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/Colors';

const CreateTabIcon = ({ color, size }: { color: string; size: number }) => (
  <View style={styles.createIconContainer}>
    <Ionicons name='add' size={size} color={color} />
  </View>
);

const Layout = () => {
  const { signOut } = useAuth();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#000',
      }}
    >
      <Tabs.Screen
        name='feed'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color}
            />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => signOut()}>
              <Text style={styles.logoutText}>Log out</Text>
            </TouchableOpacity>
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'search' : 'search-outline'}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name='create'
        options={{
          title: 'Create',
          tabBarIcon: ({ color, size }) => (
            <CreateTabIcon color={color} size={size} />
          ),
        }}
        listeners={{
          tabPress: e => {
            e.preventDefault();
            Haptics.selectionAsync();
            router.push('/(modal)/create');
          },
        }}
      />
      <Tabs.Screen
        name='favorites'
        options={{
          title: 'Favorites',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'heart' : 'heart-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;

const styles = StyleSheet.create({
  logoutText: {
    marginRight: 10,
    color: 'blue',
  },
  createIconContainer: {
    backgroundColor: Colors.itemBackground,
    borderRadius: 8,
  },
});
