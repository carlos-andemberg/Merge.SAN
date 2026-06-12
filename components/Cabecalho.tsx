import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import Logo_app from './Logo_app';
import { auth, db } from '../config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default function Cabecalho() {
  const router = useRouter();
  const pathname = usePathname();
  const [primeiroNome, setPrimeiroNome] = useState('Usuário');

  useEffect(() => {
    const fetchNome = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists() && docSnap.data().nome) {
            const nomeCompleto = docSnap.data().nome;
            const primeiro = nomeCompleto.split(' ')[0];
            setPrimeiroNome(primeiro);
          }
        } catch (error) {
          console.log("Erro ao buscar nome no cabecalho", error);
        }
      }
    };
    fetchNome();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.userInfo}
        onPress={() => {
          if (pathname !== '/perfil') {
            router.push('/perfil');
          }
        }}
        disabled={pathname === '/perfil'}
        activeOpacity={0.7}
      >
        <View style={styles.avatarPlaceholder}>
          <FontAwesome name="user" size={20} color="#44A641" />
        </View>
        <Text style={styles.greeting}>Olá, {primeiroNome}!</Text>
      </TouchableOpacity>

      <View style={styles.logoAndIcon}>
        <View style={styles.logoContainer}>
          <Logo_app size={115} />
        </View>
        <TouchableOpacity style={styles.mailIconContainer}>
          <FontAwesome name="envelope" size={24} color="#31302C" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#FEF7E0',
    width: '100%',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 152,
    gap: 10,
  },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2.5,
    borderColor: '#44A641',
    backgroundColor: '#FEF7E0',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  greeting: {
    fontSize: 16,
    color: '#31302C',
    fontFamily: 'Inter_700Bold',
  },
  logoAndIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 202,
    gap: 15,
  },
  logoContainer: {
    height: 61,
    justifyContent: 'center',
  },
  mailIconContainer: {
    width: 31,
    height: 31,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
