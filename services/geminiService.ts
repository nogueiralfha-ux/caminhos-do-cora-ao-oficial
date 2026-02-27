
import { GoogleGenAI, Type } from "@google/genai";
import { DevotionalContent } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const devotionalSchema = {
  type: Type.OBJECT,
  properties: {
    titulo: {
      type: Type.STRING,
      description: "Um título inspirador e relacionado ao tema.",
    },
    versiculo: {
      type: Type.OBJECT,
      properties: {
        texto: {
          type: Type.STRING,
          description: "O texto completo do versículo bíblico base."
        },
        referencia: {
          type: Type.STRING,
          description: "A referência completa do versículo (ex: João 3:16)."
        }
      },
      required: ['texto', 'referencia']
    },
    reflexao: {
      type: Type.STRING,
      description: "Uma reflexão espiritual profunda, acessível e teologicamente correta sobre o versículo e o tema."
    },
    aplicacao: {
      type: Type.STRING,
      description: "Conselhos práticos sobre como o leitor pode aplicar o ensinamento em seu dia a dia."
    },
    frase: {
      type: Type.STRING,
      description: "Uma frase de impacto curta, memorável e espiritual que resume a mensagem principal."
    },
    oracao: {
      type: Type.STRING,
      description: "Uma oração final simples, sincera e bíblica relacionada ao tema."
    },
    acao: {
      type: Type.STRING,
      description: "Uma ação prática, desafio ou exercício espiritual para o dia."
    }
  },
  required: ['titulo', 'versiculo', 'reflexao', 'aplicacao', 'frase', 'oracao', 'acao']
};

export async function generateDevotional(theme: string): Promise<DevotionalContent> {
  const prompt = `
    Você é um escritor cristão sênior da Missio Dei, especializado em criar devocionais diários profundos e teologicamente ricos.
    Gere um conteúdo devocional para o tema: "${theme}".

    Instruções específicas:
    - O tom deve ser solene, acolhedor e focado no propósito de Deus (Missio Dei).
    - A reflexão deve ser estruturada e profunda.
    - O JSON deve seguir rigorosamente o esquema definido.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: devotionalSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Falha ao gerar o conteúdo devocional.");
  }
}

export async function askShema(question: string): Promise<string> {
  const prompt = `
    Você é o "Shemá", um assistente espiritual sábio e acolhedor da Missio Dei. 
    Sua missão é responder perguntas sobre fé, vida cristã e o propósito de Deus com base nos princípios bíblicos.
    
    Pergunta do usuário: "${question}"
    
    Responda de forma pastoral, profunda e encorajadora. Se a pergunta não for relacionada a temas espirituais ou de fé, gentilmente direcione o usuário de volta ao caminho do coração.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.8,
      },
    });

    return response.text || "Desculpe, não consegui processar sua pergunta agora. Que a paz de Deus esteja com você.";
  } catch (error) {
    console.error("Error calling Gemini API for Shema:", error);
    return "Ocorreu um erro ao buscar sua resposta. Tente novamente em breve.";
  }
}
