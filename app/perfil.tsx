import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Cabecalho from '../components/Cabecalho';
import Botao from '../components/Botao';
import { auth, db } from '../config/firebaseConfig';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface UserData {
  nome: string;
  email: string;
  cidade: string;
}

export default function PaginaPerfil() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) {
        // Redireciona se não estiver logado
        router.replace('/');
        return;
      }

      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData({
            nome: data.nome || 'Usuário',
            email: data.email || user.email || '',
            cidade: data.cidade || 'Não informada',
          });
        } else {
          // Fallback se não tiver doc no firestore
          setUserData({
            nome: 'Usuário',
            email: user.email || '',
            cidade: 'Não informada',
          });
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível sair da conta.');
    }
  };

  return (
    <View style={styles.container}>
      <Cabecalho />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.cardUsuario}>
          
          <Text style={styles.titulo}>Perfil do Usuário</Text>
          
          {loading ? (
            <ActivityIndicator size="large" color="#FEF7E0" />
          ) : (
            <>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Nome: </Text>
                <Text style={styles.valor}>{userData?.nome}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>E-mail: </Text>
                <Text style={styles.valor}>{userData?.email}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Cidade - Estado: </Text>
                <Text style={styles.valor}>{userData?.cidade}</Text>
              </View>
            </>
          )}

          <View style={styles.botoesContainer}>
            <Botao title="Voltar" onPress={() => router.back()} />
            <Botao title="Sair" onPress={handleLogout} />
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF7E0',
  },
  scrollContent: {
    flexGrow: 1,
  },
  cardUsuario: {
    flex: 1,
    backgroundColor: '#44A641',
    marginTop: 8,
    paddingTop: 49,
    paddingBottom: 41,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 18,
    color: '#31302C',
    fontFamily: 'Inter_700Bold',
    marginBottom: 40,
  },
  infoRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  label: {
    fontSize: 18,
    color: '#31302C',
    fontFamily: 'Inter_700Bold',
  },
  valor: {
    fontSize: 18,
    color: '#F7DEB9',
    fontFamily: 'Inter_500Medium',
  },
  botoesContainer: {
    width: '100%',
    marginTop: 'auto',
    alignItems: 'center',
    gap: 20,
  },
});
