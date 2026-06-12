import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface LogoProps {
  size?: number;
}

export default function Logo_app({ size = 40 }: LogoProps) {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/logo_merge_SAN.png')} 
        style={{ width: size, height: size * (929 / 1693) }} 
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
