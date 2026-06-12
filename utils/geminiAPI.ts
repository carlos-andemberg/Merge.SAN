import { GoogleGenerativeAI } from '@google/generative-ai';

export const getGeminiRecommendations = async (userCity: string) => {
  const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("Chave API do Gemini nao encontrada.");
    return [];
  }
  
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const prompt = `Você é um assistente social no Brasil. Use a busca na internet para encontrar locais reais.
  Pesquise até 5 locais VERDADEIROS de alimentação e assistência social (Restaurantes Populares, Cozinhas Comunitárias, CRAS, ONGs) na cidade/região de: ${userCity}. 
  Retorne ESTRITAMENTE um JSON em formato de array puro (sem markdown \`\`\`json). 
  Cada objeto DO ARRAY DEVE conter: 
  "nome" (string), "descricao" (string breve), "endereco" (string real com numero e bairro muito importante para GPS), "horario" (array de duas strings curtas, ex: ["Seg a Sex", "08:00 às 17:00"]), "imageUri" (NÃO invente links. Retorne SEMPRE uma string vazia ""), "coordinate" (objeto com "latitude": 0, "longitude": 0).`;

  // Lista de modelos caso algum esteja fora do ar (erro 503)
  const modelsToTry = ['gemini-2.5-flash', 'gemini-flash-latest', 'gemini-3.5-flash'];

  for (const modelName of modelsToTry) {
    try {
      console.log(`Tentando buscar no Gemini usando o modelo: ${modelName}...`);
      const model = genAI.getGenerativeModel({ 
        model: modelName
      });

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      const cleanJson = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsedData = JSON.parse(cleanJson);
      
      console.log(`Sucesso com o modelo ${modelName}!`);
      return parsedData;
      
    } catch (error: any) {
      console.warn(`Erro no modelo ${modelName}:`, error.message || error);
      // Se for o último modelo da lista, ele vai falhar e retornar [] fora do loop
    }
  }

  console.error("Todos os modelos do Gemini falharam ou estão sobrecarregados.");
  return []; 
};
