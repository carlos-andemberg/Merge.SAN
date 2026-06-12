import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Logo_app from './Logo_app';

export interface CardDetalhesMapaProps {
  title: string;
  address: string;
  hours: string[];
  imageUri?: string;
}

export default function Card_detalhes_mapa({ title, address, hours, imageUri }: CardDetalhesMapaProps) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [imageUri]);

  return (
    <View style={styles.bottomCard}>
      {imageUri && !imageError ? (
        <Image
          source={{ uri: imageUri }}
          style={styles.bottomCardImage}
          onError={() => setImageError(true)}
        />
      ) : (
        <View style={[styles.infoImageContainer, { width: 110, height: 110 }]}>
          <Logo_app size={90} />
        </View>
      )}
      <View style={styles.bottomCardContent}>
        <Text style={styles.bottomCardTitle}>{title}</Text>
        <Text style={styles.bottomCardLabel}>Endereço: <Text style={styles.bottomCardText}>{address}</Text></Text>
        <Text style={styles.bottomCardLabel}>Horário de funcionamento:</Text>
        {hours.map((hour, index) => (
          <Text key={index} style={styles.bottomCardText}>{hour}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomCard: {
    backgroundColor: '#F7DEB9',
    padding: 16,
    flexDirection: 'row',
    width: '100%',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  bottomCardImage: {
    width: 110,
    height: 110,
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
  bottomCardContent: {
    flex: 1,
  },
  bottomCardTitle: {
    fontSize: 13,
    color: '#31302C',
    marginBottom: 6,
    fontFamily: 'Inter_600SemiBold',
  },
  bottomCardLabel: {
    fontSize: 12,
    color: '#2C2B29',
    marginTop: 4,
    fontFamily: 'Inter_600SemiBold',
  },
  bottomCardText: {
    color: '#2C2B29',
    fontFamily: 'Inter_400Regular',
  },
});
