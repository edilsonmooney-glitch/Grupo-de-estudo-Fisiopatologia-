import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion, Unit } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const modelId = 'gemini-2.5-flash';

export const generateStudyContent = async (unit: Unit): Promise<string> => {
  try {
    const prompt = `
      Atue como um professor especialista em Biomedicina e Fisiopatologia.
      
      Crie um material de estudo detalhado para a seguinte unidade:
      Título: ${unit.title} - ${unit.subtitle}
      
      Tópicos a cobrir:
      ${unit.topics.map(t => `- ${t}`).join('\n')}
      
      Formatação Obrigatória:
      - Use Markdown claro.
      - Separe os tópicos com títulos (##).
      - Foque nos mecanismos fisiopatológicos.
      - Use bullet points para facilitar a leitura.
      - O idioma deve ser Português (Brasil).
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text || "Não foi possível gerar o conteúdo. Tente novamente.";
  } catch (error) {
    console.error("Error generating study content:", error);
    return "Erro ao conectar com a IA. Verifique sua chave de API ou tente novamente mais tarde.";
  }
};

export const generateQuiz = async (unit: Unit): Promise<QuizQuestion[]> => {
  try {
    const prompt = `
      Crie um quiz de 5 perguntas de múltipla escolha sobre: ${unit.title} - ${unit.subtitle}.
      Tópicos: ${unit.topics.join(', ')}.
      
      O nível deve ser de ensino superior (Biomedicina/Medicina).
      O idioma deve ser Português.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              correctAnswer: { 
                type: Type.INTEGER, 
                description: "Index of the correct option (0-3)" 
              },
              explanation: { type: Type.STRING }
            },
            required: ["question", "options", "correctAnswer", "explanation"]
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return [];
    
    return JSON.parse(jsonText) as QuizQuestion[];

  } catch (error) {
    console.error("Error generating quiz:", error);
    return [];
  }
};

export const generateClinicalCases = async (unit: Unit): Promise<QuizQuestion[]> => {
  try {
    const prompt = `
      Crie 3 Casos Clínicos detalhados baseados nos tópicos de: ${unit.title} - ${unit.subtitle}.
      
      Para cada caso:
      1. Descreva um cenário clínico realista (paciente, sintomas, exames).
      2. Faça uma pergunta diagnóstica ou terapêutica sobre o caso.
      3. Forneça 4 opções de resposta.
      4. Explique detalhadamente a resposta correta relacionando com a fisiopatologia.
      
      Formato JSON array.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING, description: "Description of the case followed by the question" },
              options: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              correctAnswer: { 
                type: Type.INTEGER, 
                description: "Index of the correct option (0-3)" 
              },
              explanation: { type: Type.STRING }
            },
            required: ["question", "options", "correctAnswer", "explanation"]
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return [];
    
    return JSON.parse(jsonText) as QuizQuestion[];

  } catch (error) {
    console.error("Error generating clinical cases:", error);
    return [];
  }
};