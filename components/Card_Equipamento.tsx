// Force Metro Cache Refresh
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Logo_app from './Logo_app';

export interface CardEquipamentoProps {
  title: string;
  description: string;
  imageUri?: string;
}

export default function Card_Equipamento({ title, description, imageUri }: CardEquipamentoProps) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [imageUri]);

  return (
    <View style={styles.infoCard}>
      {imageUri && !imageError ? (
        <Image
          source={{ uri: imageUri }}
          style={styles.infoImage}
          onError={() => setImageError(true)}
        />
      ) : (
        <View style={[styles.infoImageContainer, { width: 120, height: 120 }]}>
          <Logo_app size={100} />
        </View>
      )}
      <View style={styles.infoTextContainer}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoDescription}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoCard: {
    backgroundColor: '#F7DEB9',
    padding: 16,
    marginHorizontal: -16,
    marginTop: -16,
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  infoImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 16,
  },
  infoImageContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    color: '#31302C',
    marginBottom: 8,
    fontFamily: 'Inter_600SemiBold',
  },
  infoDescription: {
    fontSize: 14,
    color: '#2C2B29',
    lineHeight: 18,
    textAlign: 'justify',
    fontFamily: 'Inter_400Regular',
  },
});
