import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import Logo_app from '../components/Logo_app';
import Campo from '../components/Campo';
import Botao from '../components/Botao';
import { auth } from '../config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function PaginaDeLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha e-mail e senha.');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      router.push('/principal');
    } catch (error: any) {
      console.log("Erro no login:", error.message);
      let msg = "Erro ao fazer login. Verifique suas credenciais.";
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        msg = "E-mail ou senha incorretos.";
      }
      Alert.alert('Erro', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Quadriculado */}
      <View style={[styles.bgBox, { backgroundColor: '#44A641', top: 0, left: 0 }]} />
      <View style={[styles.bgBox, { backgroundColor: '#0378A6', top: 0, left: '50%' }]} />
      <View style={[styles.bgBox, { backgroundColor: '#0378A6', top: '50%', left: 0 }]} />
      <View style={[styles.bgBox, { backgroundColor: '#44A641', top: '50%', left: '50%' }]} />

      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.cardLogin}>
          <View style={styles.logoContainer}>
            <Logo_app size={282} />
          </View>
          
          <Campo 
            label="E-mail" 
            keyboardType="email-address" 
            autoCapitalize="none" 
            value={email}
            onChangeText={setEmail}
          />
          <Campo 
            label="Senha" 
            secureTextEntry 
            value={senha}
            onChangeText={setSenha}
          />
          
          {loading ? (
            <ActivityIndicator size="large" color="#F28322" style={{ marginVertical: 10 }} />
          ) : (
            <Botao title="Entrar" onPress={handleLogin} />
          )}
          <Botao title="Voltar" onPress={() => router.push('/')} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF7E0',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  bgBox: {
    position: 'absolute',
    width: '50%',
    height: '50%',
  },
  keyboardAvoid: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLogin: {
    width: 370,
    backgroundColor: '#FEF7E0',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
    gap: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  logoContainer: {
    height: 151,
    width: 282,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
