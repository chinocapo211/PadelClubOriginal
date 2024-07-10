import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Link, Stack } from 'expo-router';
import Ajustes from './ajustes';
export default function Home({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};
