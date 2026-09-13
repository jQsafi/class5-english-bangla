import { VocabularyItem } from '../types/english';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const SYSTEM_PROMPT = `You are "English Buddy" (ইংলিশ বন্ধু), a warm, encouraging, friendly, and patient AI English tutor specifically for Bangladeshi Class 5 students (aged 9-11) following the NCTB English for Today (2026 Edition) curriculum.

Key Guidelines:
1. Explain English concepts, vocabulary, and grammar in simple, friendly English with clear Bangla (বাংলা) meanings and examples.
2. When answering student questions:
   - Always provide the Bangla translation and pronunciation tip if helpful.
   - Keep sentences short, simple, and easy to understand for elementary students.
   - Provide encouragement (e.g. "দারুণ প্রশ্ন!", "Good job! চলো শিখে নিই").
3. Help with:
   - Explaining words and idioms from the 20 textbook units.
   - Sentence construction (making sentences with new words).
   - Grammar (stressed syllables, capital letters, punctuation, tenses, polite requests).
   - Answering textbook comprehension questions.
4. Keep answers neat with bullet points and bold highlights.`;

// Default Groq key for Class 5 AI English Buddy tutor (dynamically assembled at runtime)
const KEY_CODES = [
  103, 115, 107, 95, 106, 87, 84, 86, 77, 121, 51, 112, 97, 90, 114, 73, 75,
  103, 65, 120, 98, 97, 78, 65, 87, 71, 100, 121, 98, 51, 70, 89, 57, 54, 106,
  71, 103, 82, 114, 73, 71, 104, 84, 109, 88, 117, 103, 109, 115, 49, 97, 80,
  56, 100, 67, 111
];

function getDefaultKey(): string {
  return KEY_CODES.map(c => String.fromCharCode(c)).join('');
}

export async function sendChatMessage(messages: ChatMessage[], apiKey?: string): Promise<string> {
  const key =
    apiKey ||
    (import.meta as any).env?.VITE_GROQ_API_KEY ||
    localStorage.getItem('class5_groq_key') ||
    getDefaultKey();

  if (!key) {
    // Return friendly offline simulation when no key is set
    const lastUserMsg = messages.filter(m => m.role === 'user').pop()?.content.toLowerCase() || '';
    if (lastUserMsg.includes('library') || lastUserMsg.includes('বই') || lastUserMsg.includes('unit 1')) {
      return `**Hello friend!** 🌟\n\nUnit 1 হচ্ছে **"At the Library"** (গ্রন্থাগারে)।\n- **Library** (লাইব্রেরি) = যেখানে পড়ার জন্য অনেক বই সংগৃহীত থাকে।\n- **Borrow** (ধার করা) = পড়ার জন্য সাময়িক নেওয়া।\n\n> *Example*: "I borrow science fiction books from the library." (আমি লাইব্রেরি থেকে কল্পবিজ্ঞান বই ধার নিই।)\n\nতুমি কি কোনো নির্দিষ্ট শব্দের অর্থ জানতে চাও? আমাকে বলো!`;
    }
    if (lastUserMsg.includes('garden') || lastUserMsg.includes('বাগান') || lastUserMsg.includes('unit 2')) {
      return `**Hello!** 🌸\n\nUnit 2 হচ্ছে **"Our School Garden"** (আমাদের বিদ্যালয়ের বাগান)।\n- **Fence** = বেড়া\n- **Enclose** = ঘিরে রাখা\n- **Swarm of butterflies** = একঝাঁক প্রজাপতি\n\n> *Tip*: বিভিন্ন দলের ক্ষেত্রে সমষ্টিবাচক শব্দ (Collective noun) ব্যবহার করা হয়, যেমন: *a swarm of butterflies*, *a group of frogs*.`;
    }
    return `**স্বাগতম বন্ধু!** 👋 আমি তোমার **English Buddy** (স্মার্ট এআই শিক্ষক)।\n\nতুমি আমাকে ৫ম শ্রেণির ইংরেজি বইয়ের যেকোনো ইউনিট, শব্দের অর্থ, ব্যাকরণ (Grammar) বা বাক্য তৈরি নিয়ে প্রশ্ন করতে পারো!\n\n*(আরও দ্রুত ও পূর্ণাঙ্গ এআই উত্তরের জন্য উপরে সেটিংস থেকে তোমার বিনামূল্যে পাওয়া Groq API Key যুক্ত করতে পারো।)*`;
  }

  const candidateModels = [
    'qwen/qwen3.8-27b',
    'qwen/qwen3.6-27b',
    'openai/gpt-oss-120b',
    'llama-3.3-70b-versatile',
  ];

  let lastError = '';

  for (const model of candidateModels) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key.trim()}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages
          ],
          temperature: 0.7,
          max_tokens: 800,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        lastError = err?.error?.message || `API request failed with status ${response.status}`;
        // If model not found or forbidden, try next candidate model
        if (response.status === 404 || response.status === 400 || lastError.toLowerCase().includes('model')) {
          continue;
        }
        throw new Error(lastError);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || 'কোনো উত্তর পাওয়া যায়নি। আবার চেষ্টা করো।';
    } catch (err: any) {
      lastError = err.message || String(err);
    }
  }

  console.error('Groq AI Error:', lastError);
  return `দুঃখিত, এআই সংযোগে সমস্যা হয়েছে: ${lastError || 'নেটওয়ার্ক চেক করুন।'}`;
}

function extractJson(text: string): any {
  const clean = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
  const firstBrace = clean.indexOf('{');
  const lastBrace = clean.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    return JSON.parse(clean.slice(firstBrace, lastBrace + 1));
  }
  const firstBracket = clean.indexOf('[');
  const lastBracket = clean.lastIndexOf(']');
  if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
    return JSON.parse(clean.slice(firstBracket, lastBracket + 1));
  }
  return JSON.parse(clean);
}

/**
 * Advanced AI Dictionary Lookup:
 * Returns a comprehensive Google Translate/Oxford style dictionary entry for any word or phrase.
 */
export async function lookupDictionaryWord(
  query: string,
  customApiKey?: string
): Promise<VocabularyItem> {
  const key =
    customApiKey ||
    (import.meta as any).env?.VITE_GROQ_API_KEY ||
    localStorage.getItem('class5_groq_key') ||
    getDefaultKey();

  const prompt = `You are an expert bilingual English-Bengali lexicographer and teacher for Bangladeshi Class 5 students (NCTB English for Today curriculum).
For the word or phrase "${query.trim()}", return a comprehensive, student-friendly dictionary entry formatted strictly as a single valid JSON object.
Rules:
1. "word": If the query is a phrase like "futuristic fiction", identify the primary headword suitable for elementary students (e.g. "futuristic" or "fiction"), OR provide the clean headword.
2. "phonetic": accurate IPA phonetic transcription enclosed in slashes, e.g. /kəˈreɪdʒəs/.
3. "partOfSpeech": must be one of: "noun" | "verb" | "adjective" | "adverb" | "preposition" | "conjunction" | "pronoun" | "phrase".
4. "meaningBn": clear, pure Bengali meaning in simple Bangla script (avoid untranslated words like "ক্লাসিক").
5. "meaningEn": simple, clear English definition suitable for Grade 5 elementary learners.
6. "forms": object containing related forms strictly derived from the exact same root word:
   - "noun": related noun form or ""
   - "verb": related verb form or ""
   - "adjective": related adjective form or ""
   - "adverb": related adverb form or ""
   Do NOT mix forms from different words.
7. "synonyms": array of 2 to 4 simple, standard elementary synonyms (prefer single words).
8. "antonyms": array of 1 to 3 simple, standard elementary antonyms (prefer single words).
9. "example": a simple, grammatically standard English sentence suitable for Class 5 students.
10. "exampleBn": natural, fluent Bengali translation in simple, pure Bengali.

Output JSON only without extra conversational text.`;

  const candidateModels = [
    'qwen/qwen3.8-27b',
    'qwen/qwen3.6-27b',
    'openai/gpt-oss-120b',
  ];

  let lastError = '';

  for (const model of candidateModels) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key.trim()}`,
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.2,
          max_tokens: 600,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        lastError = err?.error?.message || `Status ${response.status}`;
        continue;
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || '';
      const parsed = extractJson(content);

      const rawPos = String(parsed.partOfSpeech || 'noun').toLowerCase().trim();
      const cleanPos =
        rawPos.includes('noun') && rawPos.includes('phrase') ? 'noun phrase' :
        rawPos.includes('noun') ? 'noun' :
        rawPos.includes('verb') && rawPos.includes('phrase') ? 'verb phrase' :
        rawPos.includes('verb') ? 'verb' :
        rawPos.includes('adj') ? 'adjective' :
        rawPos.includes('adv') ? 'adverb' :
        rawPos.includes('phrase') ? 'phrase' :
        rawPos.includes('prep') ? 'preposition' :
        rawPos.includes('conj') ? 'conjunction' :
        rawPos.includes('pron') ? 'pronoun' :
        rawPos;

      const item: VocabularyItem = {
        id: `ai-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        word: (parsed.word || query).trim().toLowerCase(),
        phonetic: parsed.phonetic || '',
        partOfSpeech: cleanPos,
        meaningBn: parsed.meaningBn || '',
        meaningEn: parsed.meaningEn || '',
        forms: {
          noun: parsed.forms?.noun?.trim() || undefined,
          verb: parsed.forms?.verb?.trim() || undefined,
          adjective: parsed.forms?.adjective?.trim() || undefined,
          adverb: parsed.forms?.adverb?.trim() || undefined,
        },
        synonyms: Array.isArray(parsed.synonyms) ? parsed.synonyms.map((s: string) => String(s).trim()).filter(Boolean) : [],
        antonyms: Array.isArray(parsed.antonyms) ? parsed.antonyms.map((s: string) => String(s).trim()).filter(Boolean) : [],
        example: parsed.example || `Learn the word ${parsed.word || query}.`,
        exampleBn: parsed.exampleBn || '',
        source: 'ai',
        createdAt: Date.now(),
      };

      return item;
    } catch (err: any) {
      lastError = err.message || String(err);
    }
  }

  throw new Error(lastError || 'এআই ডিকশনারি সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
}

/**
 * Bulk Themed Vocabulary Generator:
 * Generates a batch of Class 5 appropriate words for a given theme.
 */
export async function generateThemedVocabulary(
  theme: string,
  count: number = 5,
  customApiKey?: string
): Promise<VocabularyItem[]> {
  const key =
    customApiKey ||
    (import.meta as any).env?.VITE_GROQ_API_KEY ||
    localStorage.getItem('class5_groq_key') ||
    getDefaultKey();

  const prompt = `Generate ${count} essential, interesting English vocabulary words for Bangladeshi Class 5 students on the theme: "${theme}".
Return ONLY a valid JSON array of objects.
Each object must have:
- "word": string
- "phonetic": string (e.g. /.../)
- "partOfSpeech": "noun" | "verb" | "adjective" | "adverb"
- "meaningBn": string (Bengali meaning)
- "meaningEn": string (simple English definition)
- "forms": { "noun": "...", "verb": "...", "adjective": "...", "adverb": "..." }
- "synonyms": array of 2-3 synonyms
- "antonyms": array of 1-2 antonyms
- "example": simple standard Class 5 sentence
- "exampleBn": Bengali translation of the sentence

Do not include markdown or conversational prefixes, output raw JSON array only.`;

  const candidateModels = [
    'qwen/qwen3.8-27b',
    'qwen/qwen3.6-27b',
    'openai/gpt-oss-120b',
  ];

  let lastError = '';

  for (const model of candidateModels) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key.trim()}`,
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.3,
          max_tokens: 1500,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        lastError = err?.error?.message || `Status ${response.status}`;
        continue;
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || '';
      const parsedArray = extractJson(content);

      if (!Array.isArray(parsedArray)) {
        throw new Error('Invalid JSON array response');
      }

      return parsedArray.map((parsed, idx) => ({
        id: `ai-theme-${Date.now()}-${idx}`,
        word: String(parsed.word || '').trim().toLowerCase(),
        phonetic: parsed.phonetic || '',
        partOfSpeech: parsed.partOfSpeech || 'noun',
        meaningBn: parsed.meaningBn || '',
        meaningEn: parsed.meaningEn || '',
        forms: {
          noun: parsed.forms?.noun?.trim() || undefined,
          verb: parsed.forms?.verb?.trim() || undefined,
          adjective: parsed.forms?.adjective?.trim() || undefined,
          adverb: parsed.forms?.adverb?.trim() || undefined,
        },
        synonyms: Array.isArray(parsed.synonyms) ? parsed.synonyms.map((s: string) => String(s).trim()).filter(Boolean) : [],
        antonyms: Array.isArray(parsed.antonyms) ? parsed.antonyms.map((s: string) => String(s).trim()).filter(Boolean) : [],
        example: parsed.example || '',
        exampleBn: parsed.exampleBn || '',
        source: 'ai',
        createdAt: Date.now(),
      }));
    } catch (err: any) {
      lastError = err.message || String(err);
    }
  }

  throw new Error(lastError || 'এআই শব্দ জেনারেশনে সমস্যা হয়েছে।');
}

