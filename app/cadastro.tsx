import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Logo_app from '../components/Logo_app';
import Campo from '../components/Campo';
import Botao from '../components/Botao';
import { maskCPF, maskCNPJ, maskPhone, maskCEP, maskCidadeEstado, maskNome, isValidEmail } from '../utils/masks';
import { auth, db } from '../config/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getGeminiRecommendations } from '../utils/geminiAPI';

const LOADING_PHRASES = [
  "Criando sua conta com segurança...",
  "Preparando tudo para você...",
  "Buscando locais de alimentação próximos...",
  "Mapeando assistência social na sua região...",
  "Estamos configurando para que você tenha uma boa experiência...",
  "Falta muito pouco! Salvando os dados...",
];

const COLORS = ['#F28322', '#44A641', '#0378A6'];

export default function PaginaDeCadastro() {
  const [tipoUsuario, setTipoUsuario] = useState<'cpf' | 'cnpj'>('cpf');
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [documento, setDocumento] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (loading) {
      interval = setInterval(() => {
        setLoadingIndex((prev) => (prev + 1) % LOADING_PHRASES.length);
      }, 3000);
    } else {
      setLoadingIndex(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleDocumentoChange = (text: string) => {
    if (tipoUsuario === 'cpf') {
      setDocumento(maskCPF(text));
    } else {
      setDocumento(maskCNPJ(text));
    }
  };



  const handleCadastro = async () => {
    if (!nome || !documento || !email || !telefone || !cep || !cidade || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert('Erro', 'Formato de e-mail inválido.');
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'A senha e a confirmação não batem.');
      return;
    }
    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      // 1. Create Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // 2. Fetch recommendations silently
      const locaisSugeridos = await getGeminiRecommendations(cidade);

      // 3. Save to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        nome,
        tipoUsuario,
        documento,
        email: email.toLowerCase(),
        telefone,
        cep,
        cidade,
        locaisSugeridos,
        createdAt: serverTimestamp(),
      });

      Alert.alert('Sucesso!', 'Cadastro realizado com sucesso!');
      router.push('/principal');
    } catch (error: any) {
      console.log("Erro no cadastro:", error.message);
      let msg = "Erro ao cadastrar usuário.";
      if (error.code === 'auth/email-already-in-use') {
        msg = "Este e-mail já está em uso.";
      } else if (error.code === 'auth/invalid-email') {
        msg = "E-mail inválido.";
      }
      Alert.alert('Erro', msg);
    } finally {
      setLoading(false);
    }
  };

  const currentColor = COLORS[loadingIndex % COLORS.length];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.logoContainer}>
          <Logo_app size={199} />
        </View>

        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => { setTipoUsuario('cpf'); setDocumento(''); }}
            activeOpacity={0.7}
            disabled={loading}
          >
            <MaterialIcons
              name={tipoUsuario === 'cpf' ? 'radio-button-checked' : 'radio-button-unchecked'}
              size={24}
              color="#31302C"
            />
            <Text style={styles.radioLabel}>Usuário CPF</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => { setTipoUsuario('cnpj'); setDocumento(''); }}
            activeOpacity={0.7}
            disabled={loading}
          >
            <MaterialIcons
              name={tipoUsuario === 'cnpj' ? 'radio-button-checked' : 'radio-button-unchecked'}
              size={24}
              color="#31302C"
            />
            <Text style={styles.radioLabel}>Usuário CNPJ</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.areaCampos} pointerEvents={loading ? 'none' : 'auto'}>
          <Campo label="Nome" value={nome} onChangeText={(t) => setNome(maskNome(t))} />
          <Campo 
            label={tipoUsuario === 'cpf' ? "CPF" : "CNPJ"} 
            keyboardType="numeric" 
            value={documento}
            onChangeText={handleDocumentoChange}
            maxLength={tipoUsuario === 'cpf' ? 14 : 18}
          />
          <Campo 
            label="E-mail" 
            keyboardType="email-address" 
            autoCapitalize="none" 
            value={email}
            onChangeText={setEmail}
          />
          <Campo 
            label="Telefone" 
            keyboardType="phone-pad" 
            value={telefone}
            onChangeText={(t) => setTelefone(maskPhone(t))}
            maxLength={15}
          />
          <Campo 
            label="CEP" 
            keyboardType="numeric" 
            value={cep}
            onChangeText={(t) => setCep(maskCEP(t))}
            maxLength={9}
          />
          <Campo 
            label="Cidade - Estado (ex: Maceió / AL)" 
            value={cidade}
            onChangeText={(t) => setCidade(maskCidadeEstado(t))}
          />
          <Campo 
            label="Senha" 
            secureTextEntry 
            value={senha}
            onChangeText={setSenha}
          />
          <Campo 
            label="Confirmar Senha" 
            secureTextEntry 
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />
        </View>

        <View style={styles.buttonContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={currentColor} style={{ marginBottom: 12 }} />
              <Text style={[styles.loadingText, { color: currentColor }]}>
                {LOADING_PHRASES[loadingIndex]}
              </Text>
            </View>
          ) : (
            <Botao title="Cadastrar" onPress={handleCadastro} />
          )}
          <Botao title="Voltar" onPress={() => router.push('/')} disabled={loading} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF7E0',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 34,
    paddingBottom: 40,
    alignItems: 'center',
  },
  logoContainer: {
    width: 199,
    height: 106,
    alignItems: 'center',
    marginBottom: 29,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 338,
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  radioLabel: {
    fontSize: 16,
    color: '#31302C',
    fontFamily: 'Inter_700Bold',
  },
  areaCampos: {
    width: 340,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    minHeight: 80,
  },
  loadingText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
