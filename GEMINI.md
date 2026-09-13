# Class 5 English Bangla (English for Today 2026) — Project Context & Guidelines

## 📌 Project Overview
**Class 5 English Bangla** is an interactive educational web platform built for Bangladeshi Grade 5 students, teachers, and parents based on the newly released **NCTB English for Today (Class Five) 2026 edition**.

The app provides:
- **Complete 20 Units**: All dialogues, stories, and poems with line-by-line bilingual Bengali translation.
- **Audio Pronunciation Engine**: Web Speech API integration allowing students to listen to accurate English speech (with slow and normal speed controls).
- **Vocabulary Bank & Flashcards**: Curated word list with IPA phonetics, part of speech, Bengali meanings, and example sentences.
- **Grammar & Language Focus**: Unit-aligned grammar topics (syllables, stress, collective nouns, polite requests, tenses, story connectors) with Bengali explanations.
- **Practice & Quiz Lab**: Interactive multiple-choice questions with instant verification, explanations, and celebratory confetti.
- **English Buddy (AI Tutor)**: Conversational tutor powered by Groq API (Llama 3.3) with smart offline fallback for Class 5 students.
- **Analytics**: Google Analytics (GA4: `G-9JYFV3LZNH`) and Google Tag Manager (`GTM-NFV8T9QM`) with single-page navigation event tracking.

---

## 🛠️ Technology Stack
- **Framework**: React 19 (TypeScript)
- **Bundler**: Vite (configured with relative `base: './'` for GitHub Pages and static hosting)
- **Styling**: Tailwind CSS (v3) with `@tailwindcss` directives and responsive utility classes
- **Icons**: `lucide-react`
- **Speech**: Browser Web Speech API (`SpeechSynthesisUtterance`)
- **Effects**: `canvas-confetti`
- **AI Integration**: Groq Cloud Chat Completions API (`llama-3.3-70b-versatile`)
- **Typography**: Google Fonts (`Hind Siliguri`, `Noto Sans Bengali`, `Outfit`)

---

## 📁 Repository Structure
```
class5-english-bangla/
├── index.html                 # Main entry with meta tags, Google Fonts, GA4, and GTM
├── package.json               # Dependencies and scripts (dev, build, deploy)
├── vite.config.ts             # Vite configuration with base: './'
├── tailwind.config.js         # Tailwind theme extension (custom fonts & colors)
├── postcss.config.js          # PostCSS configuration
├── tsconfig.app.json          # TypeScript bundler compiler options
├── public/
│   ├── english-icon.svg       # Application SVG logo and favicon
│   └── favicon.svg
├── scripts/
│   ├── extract_units.py       # Decodes custom shifted fonts and extracts textbook PDF
│   └── generate_all_data.py   # Compiles all 20 units into typed TypeScript datasets
└── src/
    ├── main.tsx               # React DOM root entry
    ├── App.tsx                # App state, hash routing, page titles & analytics triggers
    ├── index.css              # Global styles, fonts, and print utilities
    ├── vite-env.d.ts          # Window.gtag, dataLayer, and env definitions
    ├── types/
    │   └── english.ts         # TypeScript models for units, vocabulary, grammar, and quizzes
    ├── data/
    │   ├── unitsData.ts       # Detailed data for Units 1-20 (texts, dialogues, Q&A)
    │   ├── vocabularyData.ts  # Filterable word bank with phonetic and Bengali meanings
    │   ├── grammarData.ts     # 20 unit-aligned grammar modules
    │   └── quizzesData.ts     # Practice questions with options and explanations
    ├── services/
    │   ├── speechService.ts   # TTS engine with pitch, speed, and cancel handlers
    │   └── aiService.ts       # AI chat tutor service with offline simulation
    ├── components/
    │   ├── Navbar.tsx         # Responsive navbar, audio speed toggle, and AI modal trigger
    │   ├── Sidebar.tsx        # Unit selector drawer with search and completion checkmarks
    │   ├── UnitCard.tsx       # Visual card representation of an individual unit
    │   ├── AudioButton.tsx    # Interactive speaker button for TTS playback
    │   └── AiTutorModal.tsx   # Chatbot interface with suggestion chips and key manager
    └── pages/
        ├── HomePage.tsx       # Hero banner, learning progress, and 20 unit cards
        ├── UnitDetailPage.tsx # Section tabs (Read, Vocabulary, Grammar, Q&A) with audio
        ├── VocabularyPage.tsx # List view and 3D flip flashcard deck
        ├── GrammarPage.tsx    # Grammar guides with Bengali explanations and examples
        └── PracticeQuizPage.tsx # MCQ test lab with immediate feedback & scoring
```

---

## 💻 Essential Developer Commands

```bash
# Start local development server (Vite)
npm run dev

# Run TypeScript compilation and build production bundle
npm run build

# Preview production build locally
npm run preview

# Deploy to GitHub Pages (gh-pages)
npm run deploy
```

---

## 🎨 Design & Code Principles
1. **Bengali & English Typography Harmony**:
   - English passages use `font-english` (`Outfit`).
   - Bengali translations, guides, and explanations use `font-bangla` (`Hind Siliguri` / `Noto Sans Bengali`).
2. **Audio First**:
   - Every English phrase, dialogue, and word is paired with an `<AudioButton />` for listening.
   - Text passed to `speechService.speak()` is cleaned of bracketed stage directions (e.g. `[Loudly]`).
3. **No Breaking Layouts**:
   - All pages must remain responsive on mobile screens, tablets, and desktop displays.
   - Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`).
4. **State & Storage**:
   - Unit completion is stored in `localStorage` under `class5_english_completed`.
   - Custom Groq API keys are optionally stored in `localStorage` under `class5_groq_key`.
