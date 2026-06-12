import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

interface BotaoProps extends TouchableOpacityProps {
  title: string;
}

export default function Botao({ title, style, ...rest }: BotaoProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} activeOpacity={0.8} {...rest}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F28322',
    height: 45,
    width: '100%',
    maxWidth: 350,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    elevation: 2, // shadow for android
    shadowColor: '#000', // shadow for ios
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  text: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
  },
});
