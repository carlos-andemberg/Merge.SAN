import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface CampoProps extends TextInputProps {
  label: string;
}

export default function Campo({ label, ...rest }: CampoProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#999"
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 338,
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: '#31302C',
    marginBottom: 6,
    fontFamily: 'Inter_500Medium',
  },
  input: {
    backgroundColor: '#D5DA8A',
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 36,
    fontSize: 13,
    color: '#333',
    fontFamily: 'Inter_500Medium',
  },
});
