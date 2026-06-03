import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Logo from './Logo';

export interface BottomCardProps {
  title: string;
  address: string;
  hours: string[];
  imageUri?: string;
}

export default function BottomCard({ title, address, hours, imageUri }: BottomCardProps) {
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
          <Logo size={90} />
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
    backgroundColor: '#F7DDB9',
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
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  bottomCardLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  bottomCardText: {
    fontWeight: 'normal',
    color: '#333',
  },
});
