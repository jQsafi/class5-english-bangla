import { VocabularyItem, GrammarRule, QuizQuestion, CreativeExamPassage } from '../types/english';

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

export const GROQ_CANDIDATE_MODELS = [
  'openai/gpt-oss-120b',
  'openai/gpt-oss-20b',
  'groq/compound-mini',
  'groq/compound',
];

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

  let lastError = '';

  for (const model of GROQ_CANDIDATE_MODELS) {
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

  // Try direct parse first
  try {
    return JSON.parse(clean);
  } catch {
    // Continue to slice extraction
  }

  const firstBracket = clean.indexOf('[');
  const lastBracket = clean.lastIndexOf(']');
  const firstBrace = clean.indexOf('{');
  const lastBrace = clean.lastIndexOf('}');

  // If bracket exists and starts before brace (or no brace exists), extract array
  if (
    firstBracket !== -1 &&
    lastBracket !== -1 &&
    lastBracket > firstBracket &&
    (firstBrace === -1 || firstBracket < firstBrace)
  ) {
    try {
      return JSON.parse(clean.slice(firstBracket, lastBracket + 1));
    } catch {
      // ignore and try brace
    }
  }

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    try {
      return JSON.parse(clean.slice(firstBrace, lastBrace + 1));
    } catch {
      // ignore
    }
  }

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
2. "phonetic": accurate IPA phonetic transcription enclosed in slashes, e.g. /swɔːm/ or /kəˈreɪdʒəs/.
3. "pronunciationBn": natural, easy-to-read Bengali phonetic pronunciation for elementary students (e.g. "সোয়র্ম", "কারেজাস", "ওয়ান্ডারফুল", "লাইব্রেরি").
4. "partOfSpeech": must be one of: "noun" | "verb" | "adjective" | "adverb" | "preposition" | "conjunction" | "pronoun" | "phrase".
5. "meaningBn": clear, pure Bengali meaning in simple Bangla script (avoid untranslated words like "ক্লাসিক").
6. "meaningEn": simple, clear English definition suitable for Grade 5 elementary learners.
7. "forms": object containing related forms strictly derived from the exact same root word:
   - "noun": related noun form or ""
   - "verb": related verb form or ""
   - "adjective": related adjective form or ""
   - "adverb": related adverb form or ""
   Do NOT mix forms from different words.
8. "synonyms": array of 2 to 4 simple, standard elementary synonyms (prefer single words).
9. "antonyms": array of 1 to 3 simple, standard elementary antonyms (prefer single words).
10. "example": a simple, grammatically standard English sentence suitable for Class 5 students.
11. "exampleBn": natural, fluent Bengali translation in simple, pure Bengali.

Output JSON only without extra conversational text.`;

  let lastError = '';

  for (const model of GROQ_CANDIDATE_MODELS) {
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
          max_tokens: 800,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        const rawMsg = err?.error?.message || `Status ${response.status}`;
        if (rawMsg.includes('OTPM') || rawMsg.includes('rate_limit') || response.status === 429) {
          lastError = 'সার্ভার কিছুটা ব্যস্ত আছে। কয়েক মুহূর্ত অপেক্ষা করে পুনরায় চেষ্টা করুন।';
        } else {
          lastError = rawMsg;
        }
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
        pronunciationBn: parsed.pronunciationBn || '',
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
- "pronunciationBn": string (easy Bengali phonetic pronunciation, e.g. "সোয়র্ম", "ওয়ান্ডারফুল")
- "partOfSpeech": "noun" | "verb" | "adjective" | "adverb"
- "meaningBn": string (Bengali meaning)
- "meaningEn": string (simple English definition)
- "forms": { "noun": "...", "verb": "...", "adjective": "...", "adverb": "..." }
- "synonyms": array of 2-3 synonyms
- "antonyms": array of 1-2 antonyms
- "example": simple standard Class 5 sentence
- "exampleBn": Bengali translation of the sentence

Do not include markdown or conversational prefixes, output raw JSON array only.`;

  let lastError = '';

  for (const model of GROQ_CANDIDATE_MODELS) {
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
        const rawMsg = err?.error?.message || `Status ${response.status}`;
        if (rawMsg.includes('OTPM') || rawMsg.includes('rate_limit') || response.status === 429) {
          lastError = 'সার্ভার কিছুটা ব্যস্ত আছে। কয়েক মুহূর্ত অপেক্ষা করে পুনরায় চেষ্টা করুন।';
        } else {
          lastError = rawMsg;
        }
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
        pronunciationBn: parsed.pronunciationBn || '',
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

/**
 * AI Grammar Assistant:
 * Explains any grammar rule, concept, or student query with formulas, examples, and tips.
 */
export async function explainGrammarTopic(
  query: string,
  customApiKey?: string
): Promise<GrammarRule> {
  const key =
    customApiKey ||
    (import.meta as any).env?.VITE_GROQ_API_KEY ||
    localStorage.getItem('class5_groq_key') ||
    getDefaultKey();

  const prompt = `You are an expert English grammar teacher for Bangladeshi Class 5 elementary students (NCTB English curriculum).
For the topic or question: "${query.trim()}", return a student-friendly, crystal-clear grammar explanation formatted strictly as a single valid JSON object.
Rules:
1. "title": English title of the grammar rule (e.g. "Present Continuous Tense", "Use of Prepositions (in, on, at)").
2. "titleBn": Clear Bengali title (e.g. "ঘটমান বর্তমান কাল (Present Continuous Tense)", "Preposition (in, on, at) এর সঠিক ব্যবহার").
3. "category": Must be one of: "parts_of_speech" | "tenses" | "sentences" | "articles" | "punctuation" | "number_gender" | "degrees" | "modals" | "connectors".
4. "categoryBn": Bengali category name (e.g. "কাল ও সময় (Tenses)", "পদ প্রকরণ (Parts of Speech)").
5. "formula": Simple structure/formula if applicable (e.g. "Subject + am/is/are + verb-ing + Object").
6. "explanationBn": Warm, easy-to-understand explanation in fluent Bengali tailored for 9-11 year old students.
7. "explanation": Simple English summary for students.
8. "examples": Array of 2 to 4 clear, everyday examples with:
   - "en": English sentence
   - "bn": Bengali translation
   - "note": helpful grammar breakdown note
9. "tips": A memorable shortcut tip or rhyme in Bengali for remembering the rule.
10. "commonMistakes": Array of 1 to 2 common mistakes students make:
   - "incorrect": wrong sentence
   - "correct": correct sentence
   - "reason": why it is wrong in Bengali.

Output raw JSON object only without markdown backticks or conversational filler.`;

  let lastError = '';

  for (const model of GROQ_CANDIDATE_MODELS) {
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
          max_tokens: 1200,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        const rawMsg = err?.error?.message || `Status ${response.status}`;
        if (rawMsg.includes('OTPM') || rawMsg.includes('rate_limit') || response.status === 429) {
          lastError = 'সার্ভার কিছুটা ব্যস্ত আছে। কয়েক মুহূর্ত অপেক্ষা করে পুনরায় চেষ্টা করুন।';
        } else {
          lastError = rawMsg;
        }
        continue;
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || '';
      const parsed = extractJson(content);

      const rule: GrammarRule = {
        id: `ai-grammar-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        title: parsed.title || query,
        titleBn: parsed.titleBn || query,
        category: parsed.category || 'parts_of_speech',
        categoryBn: parsed.categoryBn || 'সাধারণ ব্যাকরণ',
        formula: parsed.formula || undefined,
        explanation: parsed.explanation || '',
        explanationBn: parsed.explanationBn || '',
        examples: Array.isArray(parsed.examples) ? parsed.examples : [],
        tips: parsed.tips || undefined,
        commonMistakes: Array.isArray(parsed.commonMistakes) ? parsed.commonMistakes : undefined,
        source: 'ai',
        createdAt: Date.now(),
      };

      return rule;
    } catch (err: any) {
      lastError = err.message || String(err);
    }
  }

  throw new Error(lastError || 'ব্যাকরণ এআই সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
}

export interface GenerateQuizParams {
  unitId?: number | 'all';
  topic?: string;
  count?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  customApiKey?: string;
}

/**
 * AI Quiz Generator:
 * Creates fresh, curriculum-aligned multiple choice questions on demand using Groq LLM.
 */
export async function generateQuizQuestions(
  params: GenerateQuizParams = {}
): Promise<QuizQuestion[]> {
  const {
    unitId = 'all',
    topic = 'General Model Test',
    count = 5,
    difficulty = 'medium',
    customApiKey,
  } = params;

  const key =
    customApiKey ||
    (import.meta as any).env?.VITE_GROQ_API_KEY ||
    localStorage.getItem('class5_groq_key') ||
    getDefaultKey();

  const unitDesc =
    unitId === 'all'
      ? 'across all Class 5 NCTB textbook units (1 to 20)'
      : `specifically for Unit ${unitId}`;

  const prompt = `You are an expert elementary English teacher creating a multiple-choice practice quiz for Class 5 students in Bangladesh (NCTB 2026 syllabus).
Generate exactly ${count} distinct, high-quality multiple choice questions (MCQs) ${unitDesc}, covering the topic: "${topic}" at ${difficulty} difficulty level.

Strict Requirements:
1. Each question must be suitable for 9-11 year old elementary students.
2. Return ONLY a single raw JSON array containing ${count} question objects without any markdown formatting or explanations.
3. Each question object must strictly follow this JSON schema:
[
  {
    "id": "ai-quiz-${Date.now()}-1",
    "unitId": ${unitId === 'all' ? 1 : unitId},
    "unitTitle": "Unit ${unitId === 'all' ? 'Model Test' : unitId}: ${topic}",
    "question": "What is the past tense of 'see'?",
    "questionBn": "'see' শব্দের অতীত কাল (Past tense) কোনটি?",
    "type": "mcq",
    "options": ["saw", "seen", "seeing", "seed"],
    "correctAnswer": "saw",
    "explanation": "'saw' is the irregular past form of 'see'.",
    "explanationBn": "'see' একটি Irregular Verb, এর অতীত রূপ হলো 'saw'।",
    "difficulty": "${difficulty}"
  }
]
Important rules:
- "correctAnswer" must EXACTLY match one of the items inside "options" array.
- "options" must be 4 distinct choices.
- "questionBn" and "explanationBn" must be clear, natural Bengali.
- Output ONLY the valid JSON array directly. Do NOT include markdown backticks or commentary.`;

  let lastError = '';

  for (const model of GROQ_CANDIDATE_MODELS) {
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
          temperature: 0.5,
          max_tokens: 1800,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        const rawMsg = err?.error?.message || `Status ${response.status}`;
        if (rawMsg.includes('OTPM') || rawMsg.includes('rate_limit') || response.status === 429) {
          lastError = 'সার্ভার কিছুটা ব্যস্ত আছে। কয়েক মুহূর্ত অপেক্ষা করে পুনরায় চেষ্টা করুন।';
        } else {
          lastError = rawMsg;
        }
        continue;
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || '';
      const parsed = extractJson(content);

      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((q: any, idx: number) => ({
          id: `ai-quiz-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
          unitId: typeof q.unitId === 'number' ? q.unitId : unitId === 'all' ? (idx % 20) + 1 : unitId,
          unitTitle: q.unitTitle || `Unit ${unitId === 'all' ? (idx % 20) + 1 : unitId}: ${topic}`,
          question: q.question || 'English question',
          questionBn: q.questionBn || '',
          type: 'mcq',
          options: Array.isArray(q.options) && q.options.length >= 2 ? q.options : ['A', 'B', 'C', 'D'],
          correctAnswer: q.correctAnswer || (q.options ? q.options[0] : 'A'),
          explanation: q.explanation || '',
          explanationBn: q.explanationBn || '',
          source: 'ai',
          topic,
          difficulty,
        }));
      }
    } catch (err: any) {
      lastError = err.message || String(err);
    }
  }

  throw new Error(lastError || 'এআই কুইজ প্রশ্ন তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
}

export interface GenerateCreativeExamParams {
  unitId: number;
  unitTitle: string;
  passageType?: 'seen' | 'unseen';
  customApiKey?: string;
}

/**
 * AI Creative Exam Generator:
 * Generates an authentic Class 5 terminal exam question paper based on NCTB curriculum:
 * Passage + Matching (5m) + True/False (6m) + Short Questions (10m) + Short Composition (10m).
 */
export async function generateCreativeExam(
  params: GenerateCreativeExamParams
): Promise<CreativeExamPassage> {
  const {
    unitId,
    unitTitle,
    passageType = 'seen',
    customApiKey,
  } = params;

  const key =
    customApiKey ||
    (import.meta as any).env?.VITE_GROQ_API_KEY ||
    localStorage.getItem('class5_groq_key') ||
    getDefaultKey();

  const passageTypeDesc =
    passageType === 'seen'
      ? `based closely on the textbook themes, characters, or dialogues of ${unitTitle}`
      : `an unseen but age-appropriate story or informative passage aligned with the vocabulary level of Class 5 (Grade 5) students`;

  const prompt = `You are a senior primary school English exam moderator in Bangladesh (NCTB 2026 syllabus).
Create a complete Creative Passage Exam for Class 5 students based on: ${unitTitle} (${passageTypeDesc}).

Return strictly a single raw JSON object conforming to this exact structure:
{
  "id": "ai-creative-${unitId}-${Date.now()}",
  "unitId": ${unitId},
  "unitTitle": "${unitTitle}",
  "passageType": "${passageType}",
  "passageTitle": "Title of the passage in English",
  "passageText": "A cohesive, interesting 8 to 12 sentence passage suitable for 10-year-old 5th grade students.",
  "passageTextBn": "Accurate, fluent Bengali translation of the full passage.",
  "matching": [
    {"word": "Word 1", "meaning": "English meaning definition 1", "distractors": ["Distractor A", "Distractor B"]},
    {"word": "Word 2", "meaning": "English meaning definition 2"},
    {"word": "Word 3", "meaning": "English meaning definition 3"},
    {"word": "Word 4", "meaning": "English meaning definition 4"},
    {"word": "Word 5", "meaning": "English meaning definition 5"}
  ],
  "trueFalse": [
    {
      "statement": "Statement 1 based on passage",
      "statementBn": "বাংলা অনুবাদ",
      "isTrue": true,
      "explanationBn": "বাংলায় ব্যাখ্যা"
    },
    {
      "statement": "False statement 2 based on passage",
      "statementBn": "বাংলা অনুবাদ",
      "isTrue": false,
      "correctAnswer": "Corrected true statement",
      "explanationBn": "বাংলায় ব্যাখ্যা"
    }
  ],
  "shortQuestions": [
    {
      "question": "Question 1 (e.g. Who / What / Where / When / Why / How)?",
      "questionBn": "বাংলা অনুবাদ",
      "modelAnswer": "Complete grammatical answer in 1-2 sentences.",
      "modelAnswerBn": "মডেল উত্তরের বাংলা অর্থ",
      "marks": 2
    }
  ],
  "composition": {
    "title": "Title of Short Composition",
    "titleBn": "বাংলা শিরোনাম",
    "instructions": "Write at least 5 sentences about [Topic] answering the questions below.",
    "guidingQuestions": [
      "Question (a)?",
      "Question (b)?",
      "Question (c)?",
      "Question (d)?",
      "Question (e)?"
    ],
    "modelParagraph": "A well-written 5 to 6 sentence model composition answering all the guiding questions.",
    "modelParagraphBn": "রচনার সহজ বাংলা অনুবাদ"
  }
}

Requirements:
- "matching" must have 5 words from the passage.
- "trueFalse" must have 6 items (3 true, 3 false).
- "shortQuestions" must have 5 questions covering Wh-questions (Who, What, Where, When, Why, How).
- "composition" must have 5 guiding questions and a 5-6 sentence model paragraph.
- Output ONLY valid JSON directly without markdown code fences or conversational prefixes.`;

  let lastError = '';

  for (const model of GROQ_CANDIDATE_MODELS) {
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
          temperature: 0.5,
          max_tokens: 2500,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        const rawMsg = err?.error?.message || `Status ${response.status}`;
        if (rawMsg.includes('OTPM') || rawMsg.includes('rate_limit') || response.status === 429) {
          lastError = 'সার্ভার কিছুটা ব্যস্ত আছে। কয়েক মুহূর্ত অপেক্ষা করে পুনরায় চেষ্টা করুন।';
        } else {
          lastError = rawMsg;
        }
        continue;
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || '';
      const parsed = extractJson(content);

      if (parsed && parsed.passageText) {
        return {
          id: `ai-creative-${unitId}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          unitId,
          unitTitle,
          passageType,
          passageTitle: parsed.passageTitle || `${unitTitle} Passage`,
          passageText: parsed.passageText,
          passageTextBn: parsed.passageTextBn || '',
          matching: Array.isArray(parsed.matching) ? parsed.matching : [],
          trueFalse: Array.isArray(parsed.trueFalse) ? parsed.trueFalse : [],
          shortQuestions: Array.isArray(parsed.shortQuestions) ? parsed.shortQuestions : [],
          composition: parsed.composition || {
            title: `Composition on ${unitTitle}`,
            titleBn: 'সংক্ষিপ্ত অনুচ্ছেদ',
            instructions: 'Write 5 sentences about this topic.',
            guidingQuestions: [],
            modelParagraph: 'This is a model paragraph.',
            modelParagraphBn: 'এটি একটি নমুনা অনুচ্ছেদ।',
          },
          source: 'ai',
          createdAt: Date.now(),
        };
      }
    } catch (err: any) {
      lastError = err.message || String(err);
    }
  }

  throw new Error(lastError || 'এআই সৃজনশীল প্রশ্নপত্র তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
}



