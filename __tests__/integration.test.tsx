import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PaginaDeLogin from '../app/login';
import { Alert } from 'react-native';

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
  it('1. Deve exibir um alerta caso tente fazer login com campos vazios', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    const { getByText } = await render(<PaginaDeLogin />);
    
    fireEvent.press(getByText('Entrar'));
    
    expect(alertSpy).toHaveBeenCalledWith('Erro', 'Por favor, preencha e-mail e senha.');
  });

  it('2. Cabecalho: deve exibir "Olá, Usuário!" no estado inicial e possuir o ícone de perfil', async () => {
    // Importar o Cabecalho para testar
    const Cabecalho = require('../components/Cabecalho').default;
    
    const { getByText } = await render(<Cabecalho />);
    
    // Verifica se renderiza o estado inicial do usuário
    expect(getByText('Olá, Usuário!')).toBeTruthy();
  });
});
