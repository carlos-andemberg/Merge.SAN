import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Logo from '../components/Logo';
import CampoTexto from '../components/CampoTexto';
import BotaoPrimario from '../components/BotaoPrimario';

export default function CadastroScreen() {
  const [tipoUsuario, setTipoUsuario] = useState<'cpf' | 'cnpj'>('cpf');

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <Logo size={200} />
        </View>

        <View style={styles.radioGroup}>
          <TouchableOpacity 
            style={styles.radioButton} 
            onPress={() => setTipoUsuario('cpf')}
            activeOpacity={0.7}
          >
            <FontAwesome 
              name={tipoUsuario === 'cpf' ? 'dot-circle-o' : 'circle-o'} 
              size={20} 
              color="#333" 
            />
            <Text style={styles.radioLabel}>Usuário CPF</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.radioButton} 
            onPress={() => setTipoUsuario('cnpj')}
            activeOpacity={0.7}
          >
            <FontAwesome 
              name={tipoUsuario === 'cnpj' ? 'dot-circle-o' : 'circle-o'} 
              size={20} 
              color="#333" 
            />
            <Text style={styles.radioLabel}>Usuário CNPJ</Text>
          </TouchableOpacity>
        </View>

        <CampoTexto label="Nome" />
        <CampoTexto label={tipoUsuario === 'cpf' ? "CPF" : "CNPJ"} keyboardType="numeric" />
        <CampoTexto label="E-mail" keyboardType="email-address" autoCapitalize="none" />
        <CampoTexto label="Telefone" keyboardType="phone-pad" />
        <CampoTexto label="CEP" keyboardType="numeric" />
        <CampoTexto label="Endereço" />
        <CampoTexto label="Senha" secureTextEntry />
        <CampoTexto label="Confirmar Senha" secureTextEntry />

        <View style={styles.buttonContainer}>
          <BotaoPrimario title="Cadastrar" onPress={() => console.log('Cadastrar pressed')} />
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
    padding: 24,
    paddingTop: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
});
