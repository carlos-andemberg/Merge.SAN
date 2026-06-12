# 🥗 Merge.SAN

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native"/>
  <img src="https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white" alt="Expo"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white" alt="Firebase"/>
</p>

> **Rede de Integração para Promoção de Segurança Alimentar e Nutricional**

## 📖 Sobre o Projeto

O **Merge.SAN** é uma plataforma digital em formato de aplicativo móvel construída com foco em **cidadania alimentar**. O objetivo é facilitar a conexão entre pessoas em situação de insegurança alimentar e vulnerabilidade social aos diversos serviços públicos e iniciativas sociais da sua região, de forma ágil, segura e inteligente.

Através do aplicativo, é possível visualizar no mapa os pontos de atendimento, realizar cadastros rápidos e permitir que organizações acompanhem as famílias necessitadas. Além disso, uma IA embutida analisa dados e sugere os melhores encaminhamentos sociais.

---

## ✨ Principais Funcionalidades

- 🗺️ **Georreferenciamento:** Visualização de equipamentos sociais (CRAS, CREAS, Restaurantes Populares, ONGs) mais próximos.
- 📱 **Cadastro Descomplicado:** Formulários ágeis direcionados tanto a pessoas vulneráveis quanto a entidades de auxílio.
- 🤖 **Análise por Inteligência Artificial:** Integração com Google Gemini para gerar rotas de apoio baseadas no perfil socioeconômico do usuário.
- 🔒 **Segurança dos Dados:** Uso robusto do Firebase Auth e Firestore para proteger dados sensíveis.

---

## 🛠 Tecnologias Utilizadas

- **Front-end / Mobile:** React Native, Expo, Expo Router
- **Linguagem:** TypeScript
- **Back-end / DB / Autenticação:** Firebase (Firestore, Authentication)
- **APIs e Integrações Externas:** Google Generative AI (Gemini), React Native Maps
- **Qualidade de Código & Testes:** Jest, React Native Testing Library

---

## 🚀 Como Executar o Projeto

**1. Clone este repositório:**
```bash
git clone https://github.com/carlos-andemberg/Merge.SAN.git
```

**2. Instale as dependências:**
```bash
cd Merge.SAN
npm install --legacy-peer-deps
```

**3. Configure o `.env`:**
Crie um arquivo `.env` na raiz do projeto com as suas credenciais do Firebase e a sua chave da API do Google Gemini:
```env
EXPO_PUBLIC_FIREBASE_API_KEY="SUA_CHAVE"
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN="SEU_DOMAIN"
EXPO_PUBLIC_FIREBASE_PROJECT_ID="SEU_PROJECT_ID"
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET="SEU_BUCKET"
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="SEU_SENDER"
EXPO_PUBLIC_FIREBASE_APP_ID="SEU_APP_ID"
EXPO_PUBLIC_GEMINI_API_KEY="SUA_CHAVE_GEMINI"
```

**4. Rode o aplicativo (Expo):**
```bash
npx expo start
```
*Selecione "a" para rodar num emulador Android, ou "i" para iOS.*

---

## 👥 Equipe
- **Carolina da Silva Menezes**
- **Carlos Andemberg da Silva**

*Projeto final desenvolvido para o IFAL.* 💚
