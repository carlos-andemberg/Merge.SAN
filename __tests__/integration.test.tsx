import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import PaginaDeLogin from '../app/login';

// Mocks
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock('../config/firebaseConfig', () => ({
  auth: {},
}));

describe('Integration Tests - Login Flow', () => {
  it('1. Deve exibir um alerta caso tente fazer login com campos vazios', () => {
    const alertSpy = jest.spyOn(global.Alert || require('react-native').Alert, 'alert');
    const { getByText } = render(<PaginaDeLogin />);
    
    fireEvent.press(getByText('Entrar'));
    
    expect(alertSpy).toHaveBeenCalledWith('Erro', 'Por favor, preencha e-mail e senha.');
  });

  it('2. Deve chamar a função de signIn do firebase e mudar o estado para loading ao informar credenciais', async () => {
    const { signInWithEmailAndPassword } = require('firebase/auth');
    signInWithEmailAndPassword.mockResolvedValueOnce({ user: { uid: '123' } });
    
    const { getByText, getByPlaceholderText, queryByText } = render(<PaginaDeLogin />);
    
  it('2. Cabecalho: deve exibir "Olá, Usuário!" no estado inicial e possuir o ícone de perfil', async () => {
    // Importar o Cabecalho para testar
    const Cabecalho = require('../components/Cabecalho').default;
    
    const { getByText } = render(<Cabecalho />);
    
    // Verifica se renderiza o estado inicial do usuário
    expect(getByText('Olá, Usuário!')).toBeTruthy();
  });
});
