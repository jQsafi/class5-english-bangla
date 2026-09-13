export interface SectionDialogue {
  speaker: string;
  speakerBn?: string;
  text: string;
  textBn: string;
}

export interface SectionQA {
  question: string;
  questionBn?: string;
  answer: string;
  answerBn?: string;
}

export interface UnitSection {
  id: string;
  title: string;
  titleBn: string;
  type: 'dialogue' | 'story' | 'poem' | 'exercise' | 'language_focus';
  description?: string;
  descriptionBn?: string;
  bodyText?: string;
  bodyTextBn?: string;
  dialogues?: SectionDialogue[];
  qaList?: SectionQA[];
  bullets?: string[];
  bulletsBn?: string[];
  audioText?: string;
}

export interface WordForms {
  noun?: string;
  verb?: string;
  adjective?: string;
  adverb?: string;
}

export interface VocabularyItem {
  id: string;
  word: string;
  phonetic: string;
  pronunciationBn?: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'pronoun' | string;
  meaningBn: string;
  meaningEn: string;
  example: string;
  exampleBn: string;
  unitId?: number;
  unitTitle?: string;
  forms?: WordForms;
  synonyms?: string[];
  antonyms?: string[];
  source?: 'textbook' | 'ai' | 'custom';
  createdAt?: number;
}

export interface GrammarRule {
  id: string;
  unitId: number;
  title: string;
  titleBn: string;
  explanation: string;
  explanationBn: string;
  examples: Array<{
    en: string;
    bn: string;
    note?: string;
  }>;
  tips?: string;
}

export interface QuizQuestion {
  id: string;
  unitId: number;
  unitTitle: string;
  question: string;
  questionBn?: string;
  type: 'mcq' | 'fill' | 'truefalse';
  options: string[];
  correctAnswer: string;
  explanation: string;
  explanationBn: string;
}

export interface UnitData {
  id: number;
  unitNumber: number;
  title: string;
  titleBn: string;
  pageRange: string;
  theme: string;
  themeBn: string;
  summary: string;
  summaryBn: string;
  sections: UnitSection[];
  vocabulary: VocabularyItem[];
  grammar: GrammarRule[];
  quizzes: QuizQuestion[];
}
