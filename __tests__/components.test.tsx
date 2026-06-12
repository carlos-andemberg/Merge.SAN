import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Botao from '../components/Botao';
import Campo from '../components/Campo';
import Pesquisa from '../components/Pesquisa';

// Mock vector icons
jest.mock('@expo/vector-icons', () => ({
  MaterialIcons: 'MaterialIcons',
}));

describe('Unit Tests - Componentes', () => {
  // Testes para Botao (1 e 2)
  it('1. Botao: deve renderizar corretamente o título fornecido', async () => {
    const { getByText } = await render(<Botao title="Salvar" />);
    expect(getByText('Salvar')).toBeTruthy();
  });

  it('2. Botao: deve chamar a função onPress ao ser clicado', async () => {
    const onPressMock = jest.fn();
    const { getByText } = await render(<Botao title="Clicar" onPress={onPressMock} />);
    fireEvent.press(getByText('Clicar'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  // Testes para Campo (3 e 4)
  it('3. Campo: deve renderizar o label corretamente', async () => {
    const { getByText } = await render(<Campo label="E-mail do usuário" />);
    expect(getByText('E-mail do usuário')).toBeTruthy();
  });

  it('4. Campo: deve repassar props ao TextInput (ex: placeholder)', async () => {
    const { getByPlaceholderText } = await render(<Campo label="Nome" placeholder="Digite aqui..." />);
    expect(getByPlaceholderText('Digite aqui...')).toBeTruthy();
  });

  // Testes para Pesquisa (5 a 10)
  const mockData = [
    { id: '1', title: 'CRAS Centro' },
    { id: '2', title: 'CREAS Sul' },
  ];

  it('5. Pesquisa: deve renderizar com o placeholder padrão', async () => {
    const { getByPlaceholderText } = await render(<Pesquisa data={mockData} onSelect={jest.fn()} />);
    expect(getByPlaceholderText('Pesquisar...')).toBeTruthy();
  });

  it('6. Pesquisa: atualiza o valor do input ao digitar', async () => {
    const { getByPlaceholderText } = await render(<Pesquisa data={mockData} onSelect={jest.fn()} />);
    const input = getByPlaceholderText('Pesquisar...');
    fireEvent.changeText(input, 'CRAS');
    expect(input.props.value).toBe('CRAS');
  });

  it('7. Pesquisa: exibe recomendações quando focado', async () => {
    const { getByPlaceholderText, getByText } = await render(<Pesquisa data={mockData} onSelect={jest.fn()} />);
    const input = getByPlaceholderText('Pesquisar...');
    fireEvent(input, 'focus');
    expect(getByText('CRAS Centro')).toBeTruthy();
    expect(getByText('CREAS Sul')).toBeTruthy();
  });

  it('8. Pesquisa: filtra os itens com base no texto digitado', async () => {
    const { getByPlaceholderText, queryByText } = await render(<Pesquisa data={mockData} onSelect={jest.fn()} />);
    const input = getByPlaceholderText('Pesquisar...');
    fireEvent(input, 'focus');
    fireEvent.changeText(input, 'Centro');
    expect(queryByText('CRAS Centro')).toBeTruthy();
    expect(queryByText('CREAS Sul')).toBeNull();
  });

  it('9. Pesquisa: exibe mensagem quando nenhum local é encontrado', async () => {
    const { getByPlaceholderText, getByText } = await render(<Pesquisa data={mockData} onSelect={jest.fn()} />);
    const input = getByPlaceholderText('Pesquisar...');
    fireEvent(input, 'focus');
    fireEvent.changeText(input, 'Inexistente');
    expect(getByText('Nenhum local encontrado.')).toBeTruthy();
  });

  it('10. Pesquisa: chama onSelect com o id correto ao selecionar um item', async () => {
    const onSelectMock = jest.fn();
    const { getByPlaceholderText, getByText } = await render(<Pesquisa data={mockData} onSelect={onSelectMock} />);
    const input = getByPlaceholderText('Pesquisar...');
    fireEvent(input, 'focus');
    fireEvent.press(getByText('CRAS Centro'));
    expect(onSelectMock).toHaveBeenCalledWith('1');
  });
});
