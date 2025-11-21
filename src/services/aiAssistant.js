import { GoogleGenerativeAI } from "@google/generative-ai";

const AI_API_KEY = import.meta.env.VITE_AI_API_KEY || "";
const AI_PROVIDER = import.meta.env.VITE_AI_PROVIDER || "mock";

// Google Generative AI клиентін инициализациялау
const genAI = AI_API_KEY && AI_API_KEY !== "your_gemini_api_key_here" 
  ? new GoogleGenerativeAI(AI_API_KEY) 
  : null;

export class AIService {
  static async sendMessage(message, language = 'kz') {
    try {
      // Google GenAI шарттарын тексеру
      const shouldUseGoogleAI = genAI && AI_PROVIDER === "gemini";
      
      console.log('🤖 Should use Google AI:', shouldUseGoogleAI);
      console.log('🔑 API Key length:', AI_API_KEY?.length);
      
      if (shouldUseGoogleAI) {
        console.log('🚀 Using Google Generative AI');
        return await this.callGoogleAI(message, language);
      } else {
        console.log('🔄 Using Mock API');
        return await this.callMockAI(message, language);
      }
    } catch (error) {
      console.error('❌ AI Service Error:', error);
      return await this.callMockAI(message, language);
    }
  }

  static async callGoogleAI(message, language) {
    try {
      console.log('📡 Calling Google Generative AI');
      
      if (!genAI) {
        throw new Error('Google AI client not initialized');
      }

      const systemPrompt = {
        'kz': 'Сіз Шымкент қаласының туристік көмекшісісіз. Туристік орындар, жол бағыттары, қауіпсіздік кеңестері және ұсыныстар туралы ақпарат беріңіз. Қысқа және пайдалы болыңыз. Шымкентке арналған ақпаратқа назар аударыңыз. Жауабыңыз 2-4 сөйлемнен аспауы керек.',
        'ru': 'Вы туристический помощник города Шымкент. Предоставляйте информацию о туристических местах, направлениях, советах по безопасности и рекомендациях. Будьте краткими и полезными. Сосредоточьтесь на информации, относящейся к Шымкенту. Ответ должен быть не более 2-4 предложений.',
        'en': 'You are a travel assistant for Shymkent city. Provide information about tourist places, directions, safety tips, and recommendations. Be concise and helpful. Focus on Shymkent-specific information. Keep response under 2-4 sentences.'
      };

      const prompt = `${systemPrompt[language]}\n\nСұрақ: ${message}`;

      console.log('📤 Google AI Request prompt:', prompt);
      
      // Модельді конфигурациялау
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash",
        generationConfig: {
          maxOutputTokens: 300,
          temperature: 0.7
        }
      });

      // Контентті генерациялау
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      console.log('✅ Google AI success:', text);
      
      return { response: text };
      
    } catch (error) {
      console.error('❌ Google AI API call failed:', error);
      throw error;
    }
  }

  static async callMockAI(message, language) {
    try {
      console.log('🔄 Calling Mock API...');
      
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          language: language
        }),
      });

      if (!response.ok) {
        throw new Error(`Mock API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Mock API success:', data.response);
      return data;
    } catch (error) {
      console.error('❌ Mock API error:', error);
      
      // Fallback жауаптар
      const fallbackResponses = {
        'kz': {
          'response': 'Кешіріңіз, қазіргі уақытта жауап бере алмаймын. Шымкенттегі тамаша орындар: Әзірет Сұлтан мешіті, Тәуелсіздік саябағы, Арбат. Кейінірек қайталап көріңіз.'
        },
        'ru': {
          'response': 'Извините, я не могу ответить сейчас. Замечательные места в Шымкенте: Мечеть Азрет Султан, Парк Независимости, Арбат. Попробуйте позже.'
        },
        'en': {
          'response': 'Sorry, I cannot respond right now. Great places in Shymkent: Aziret Sultan Mosque, Independence Park, Arbat. Please try again later.'
        }
      };
      
      return fallbackResponses[language] || fallbackResponses['en'];
    }
  }

  // Жиі қойылатын сұрақтар
  static getQuickResponses(language) {
    const responses = {
      kz: {
        'салам': 'Сәлем! Шымкентке қош келдіңіз! Мен сізге қалай көмектесе аламын?',
        'рахмет': 'Рақмет сізге! Басқа сұрақтарыңыз болса, айтыңызшы!',
        'көмек': 'Мен сізге Шымкенттегі туристік орындар, жол бағыттары, қауіпсіздік кеңестері және басқа да ақпаратпен көмектесе аламын.'
      },
      ru: {
        'привет': 'Здравствуйте! Добро пожаловать в Шымкент! Чем я могу вам помочь?',
        'спасибо': 'Спасибо вам! Если у вас есть другие вопросы, обращайтесь!',
        'помощь': 'Я могу помочь вам с информацией о туристических местах в Шымкенте, направлениях, советах по безопасности и другой информацией.'
      },
      en: {
        'hello': 'Hello! Welcome to Shymkent! How can I help you?',
        'thank you': 'Thank you! If you have other questions, please ask!',
        'help': 'I can help you with information about tourist places in Shymkent, directions, safety tips, and other information.'
      }
    };

    return responses[language] || responses['en'];
  }
}

export default AIService;