import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname анықтау (ES modules үшін)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env файлын жүктеу (негізгі проект папкасынан)
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// Environment variables
const AI_API_KEY = process.env.AI_API_KEY || "";
const AI_PROVIDER = process.env.AI_PROVIDER || "mock";

// Google Generative AI клиент
const genAI = AI_API_KEY && AI_API_KEY !== "your_gemini_api_key_here" 
  ? new GoogleGenerativeAI(AI_API_KEY) 
  : null;

console.log('🔑 Server AI Configuration:');
console.log('   API Key exists:', !!AI_API_KEY);
console.log('   API Key length:', AI_API_KEY?.length);
console.log('   AI Provider:', AI_PROVIDER);
console.log('   Google AI initialized:', !!genAI);

// Environment variables толық логтау
console.log('📋 All environment variables:');
console.log('   PORT:', process.env.PORT);
console.log('   AI_API_KEY:', process.env.AI_API_KEY ? '***' + process.env.AI_API_KEY.slice(-4) : 'NOT SET');
console.log('   AI_PROVIDER:', process.env.AI_PROVIDER);

class ServerAIService {
  static async sendMessage(message, language = 'kz') {
    try {
      const shouldUseGoogleAI = genAI && AI_PROVIDER === "gemini";
      
      console.log('🤖 Server AI Decision:');
      console.log('   Should use Google AI:', shouldUseGoogleAI);
      console.log('   Message:', message);
      console.log('   Language:', language);
      
      if (shouldUseGoogleAI) {
        console.log('🚀 Using Google Generative AI');
        return await this.callGoogleAI(message, language);
      } else {
        console.log('🔄 Using Mock AI (Google AI not available)');
        return await this.callMockAI(message, language);
      }
    } catch (error) {
      console.error('❌ Server AI Service Error:', error);
      return await this.callMockAI(message, language);
    }
  }

  static async callGoogleAI(message, language) {
    try {
      console.log('📡 Calling Google Generative AI...');
      
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
      
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash",
        generationConfig: {
          maxOutputTokens: 300,
          temperature: 0.7
        }
      });

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
    console.log('🔄 Generating mock response...');
    
    const mockResponses = {
      'kz': {
        '3 сағатта қандай жерлерді көрген дұрыс?': 'Шымкентте 3 сағат ішінде: 1) Әзірет Сұлтан мешіті - әдемі сәулет өнері, 2) Тәуелсіздік саябағы - жасыл алаң, 3) Арбат - сауда көшесі. Бұл негізгі орындарды көруге болады.',
        'басқа': 'Шымкентте тағы да көретін орындар: Абай алаңы, Шымкент қорғаны, Ордабазы базары. Әр орынға 30-45 минут жіберу жеткілікті.',
        'default': 'Шымкенттегі тамаша орындар: Әзірет Сұлтан мешіті, Тәуелсіздік саябағы, Арбат. Бұл орындар қала орталығында орналасқан.'
      },
      'ru': {
        '3 сағатта какие места посмотреть?': 'За 3 часа в Шымкенте можно посмотреть: 1) Мечеть Азрет Султан - красивая архитектура, 2) Парк Независимости - зеленая зона, 3) Арбат - торговая улица. Эти основные места можно осмотреть.',
        'басқа': 'Другие места в Шымкенте: Площадь Абая, Шымкентская крепость, Базар Ордабазы. На каждое место достаточно 30-45 минут.',
        'default': 'Отличные места в Шымкенте: Мечеть Азрет Султан, Парк Независимости, Арбат. Эти места расположены в центре города.'
      },
      'en': {
        '3 сағатта қандай жерлерді көрген дұрыс?': 'In 3 hours in Shymkent you can see: 1) Aziret Sultan Mosque - beautiful architecture, 2) Independence Park - green area, 3) Arbat - shopping street. You can visit these main places.',
        'басқа': 'Other places in Shymkent: Abay Square, Shymkent Fortress, Ordabazy Bazaar. 30-45 minutes for each place is enough.',
        'default': 'Great places in Shymkent: Aziret Sultan Mosque, Independence Park, Arbat. These places are located in the city center.'
      }
    };

    const langResponses = mockResponses[language] || mockResponses['kz'];
    const response = langResponses[message] || langResponses['default'];
    
    return { response };
  }
}

// API Routes
app.post('/api/assistant', async (req, res) => {
  try {
    const { message, language = 'kz' } = req.body;
    
    console.log('\n🎯 AI Assistant request received:');
    console.log('   Message:', message);
    console.log('   Language:', language);
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const result = await ServerAIService.sendMessage(message, language);
    
    console.log('✅ Sending response:', result.response);
    res.json(result);
    
  } catch (error) {
    console.error('❌ API Error:', error);
    res.status(500).json({ 
      response: 'Кешіріңіз, қазір жауап бере алмаймын. Кейінірек қайталап көріңіз.' 
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    ai_provider: AI_PROVIDER,
    ai_configured: !!genAI,
    timestamp: new Date().toISOString()
  });
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log('\n✨ Server started successfully!');
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📱 Shymkent Travel Assistant API available at http://localhost:${PORT}/api`);
  console.log(`🌐 Web application available at http://localhost:${PORT}`);
  console.log(`🔍 Health check: http://localhost:${PORT}/api/health\n`);
});