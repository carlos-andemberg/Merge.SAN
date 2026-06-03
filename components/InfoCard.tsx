import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Logo from './Logo';

export interface InfoCardProps {
  title: string;
  description: string;
  imageUri?: string;
}

export default function InfoCard({ title, description, imageUri }: InfoCardProps) {
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
          <Logo size={100} />
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
    backgroundColor: '#F7DDB9',
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
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  infoDescription: {
    fontSize: 12,
    color: '#333',
    lineHeight: 18,
    textAlign: 'justify',
  },
});
