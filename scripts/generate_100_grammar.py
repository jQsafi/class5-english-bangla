# -*- coding: utf-8 -*-
"""
Generates 100 curriculum-aligned, high-yield grammar topics for Class 5 English Bangla
Exported cleanly to src/data/grammarData.ts
"""

import json

grammar_topics = [
    # -------------------------------------------------------------
    # 1. PARTS OF SPEECH (15 topics)
    # -------------------------------------------------------------
    {
        "id": "pos-01",
        "unitId": 1,
        "title": "Parts of Speech Overview",
        "titleBn": "পদ প্রকরণ (Parts of Speech) পরিচিতি",
        "category": "parts_of_speech",
        "categoryBn": "পদ প্রকরণ",
        "formula": "8 Parts of Speech: Noun, Pronoun, Verb, Adjective, Adverb, Preposition, Conjunction, Interjection",
        "explanation": "Every word in an English sentence plays a specific role. There are 8 parts of speech that explain how words work together.",
        "explanationBn": "ইংরেজি বাক্যের প্রতিটি শব্দ তার কাজ অনুযায়ী ৮টি ভাগে বিভক্ত। এদের একত্রে Parts of Speech বলে।",
        "examples": [
            {"en": "Rimi runs fast because she loves sports.", "bn": "রিমি দ্রুত দৌড়ায় কারণ সে খেলাধুলা ভালোবাসে।", "note": "Sentence containing Noun, Verb, Adverb, Conjunction, Pronoun"}
        ],
        "tips": "মনে রাখার কৌশল: বাক্যে শব্দের রূপ দেখে নয়, শব্দটি কী কাজ করছে তা দেখে Part of Speech নির্ণয় করতে হয়।",
        "commonMistakes": [
            {"incorrect": "Water is noun always.", "correct": "I water (verb) the plants daily / Drink clean water (noun).", "reasonBn": "একই শব্দ বাক্যের ব্যবহারের ওপর ভিত্তি করে ভিন্ন Part of Speech হতে পারে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "pos-02",
        "unitId": 2,
        "title": "Noun: Naming Words",
        "titleBn": "বিশেষ্য পদ (Noun)",
        "category": "parts_of_speech",
        "categoryBn": "পদ প্রকরণ",
        "formula": "Noun = Name of any Person + Place + Thing + Animal + Idea",
        "explanation": "A noun is a word used to identify any of a class of people, places, or things, or to name a particular one of these.",
        "explanationBn": "যে শব্দ দ্বারা কোনো ব্যক্তি, স্থান, বস্তু, প্রাণী, গুণ বা ধারণার নাম বোঝায় তাকে Noun বলে।",
        "examples": [
            {"en": "Dhaka is the capital of Bangladesh.", "bn": "ঢাকা বাংলাদেশের রাজধানী।"},
            {"en": "Honesty is the best policy.", "bn": "সততাই সর্বোৎকৃষ্ট পন্থা।"}
        ],
        "tips": "চোখে যা কিছু দেখা যায় বা অনুভব করা যায় এবং যার নাম আছে, তাই Noun।",
        "commonMistakes": [
            {"incorrect": "He is a very honesty boy.", "correct": "He is an honest (adjective) boy / He has honesty (noun).", "reasonBn": "Honesty একটি গুণের নাম (Noun), দোষ-গুণ বোঝাতে Adjective (honest) ব্যবহার করতে হয়।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "pos-03",
        "unitId": 4,
        "title": "Proper Nouns & Capital Letters",
        "titleBn": "নামবাচক বিশেষ্য (Proper Noun)",
        "category": "parts_of_speech",
        "categoryBn": "পদ প্রকরণ",
        "formula": "Proper Noun = Specific Name (Always begins with Capital Letter)",
        "explanation": "A Proper Noun is the special name given to a particular person, place, river, day, month, or festival. It always starts with a capital letter.",
        "explanationBn": "কোনো ব্যক্তি, নির্দিষ্ট স্থান, নদী, দিন, মাস বা উৎসবের নিজস্ব নামকে Proper Noun বলে। এটি সর্বদা বড় হাতের অক্ষর (Capital Letter) দিয়ে শুরু হয়।",
        "examples": [
            {"en": "Kazi Nazrul Islam is our national poet.", "bn": "কাজী নজরুল ইসলাম আমাদের জাতীয় কবি।"},
            {"en": "We visited Cox's Bazar last December.", "bn": "আমরা গত ডিসেম্বরে কক্সবাজার গিয়েছিলাম।"}
        ],
        "tips": "বাক্যের শুরুতে, মাঝে বা শেষে যেখানেই থাকুক না কেন, Proper Noun-এর প্রথম অক্ষর সর্বদা Capital Letter হবে।",
        "commonMistakes": [
            {"incorrect": "we visited sylhet on friday.", "correct": "We visited Sylhet on Friday.", "reasonBn": "Sylhet এবং Friday নির্দিষ্ট স্থান ও দিনের নাম (Proper Noun), তাই বড় হাতের অক্ষরে লিখতে হবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "pos-04",
        "title": "Common Nouns",
        "titleBn": "জাতিবাচক বিশেষ্য (Common Noun)",
        "category": "parts_of_speech",
        "categoryBn": "পদ প্রকরণ",
        "formula": "Common Noun = General name shared by all members of a group/class",
        "explanation": "A Common Noun is the general name given to all persons or things of the same class or kind, not a specific individual.",
        "explanationBn": "যে নাম দ্বারা একই জাতীয় বা শ্রেণীর যেকোনো ব্যক্তি, প্রাণী বা বস্তুকে সাধারণভাবে বোঝায়, তাকে Common Noun বলে।",
        "examples": [
            {"en": "The boy plays in the field.", "bn": "ছেলেটি মাঠে খেলছে।", "note": "'Boy' এবং 'field' সাধারণ নাম।"},
            {"en": "Rivers flow into the sea.", "bn": "নদীগুলো সাগরে গিয়ে মেশে।"}
        ],
        "tips": "Boy, City, River হলো Common Noun; কিন্তু Rahim, Dhaka, Padma হলো Proper Noun!",
        "commonMistakes": [
            {"incorrect": "The Padma is a famous River.", "correct": "The Padma is a famous river.", "reasonBn": "River শব্দটি সাধারণ নাম (Common Noun), তাই বাক্যের মাঝে বড় হাতের অক্ষরে লেখা যাবে না।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "pos-05",
        "unitId": 2,
        "title": "Collective Nouns",
        "titleBn": "সমষ্টিবাচক বিশেষ্য (Collective Noun)",
        "category": "parts_of_speech",
        "categoryBn": "পদ প্রকরণ",
        "formula": "A + [Collective Word] + of + [Plural Noun] (e.g., A herd of cattle)",
        "explanation": "A collective noun refers to a group or collection of people, animals, or things taken together as one single unit.",
        "explanationBn": "যে Noun দ্বারা কোনো ব্যক্তি, প্রাণী বা বস্তুর অবিভক্ত দলকে একক হিসেবে বোঝায় তাকে Collective Noun বলে।",
        "examples": [
            {"en": "A swarm of bees flew towards the flower.", "bn": "একঝাঁক মৌমাছি ফুলের দিকে উড়ে গেল।"},
            {"en": "Our football team won the trophy.", "bn": "আমাদের ফুটবল দল ট্রফি জিতেছে।"}
        ],
        "tips": "প্রাণীর দল বোঝাতে আলাদা শব্দ: Flock of birds, Herd of cows, Swarm of bees, School of fish!",
        "commonMistakes": [
            {"incorrect": "A team of players are playing.", "correct": "A team of players is playing.", "reasonBn": "Collective Noun সাধারণত একবচন (Singular) হিসেবে বিবেচিত হয়, তাই 'is' বসে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "pos-06",
        "title": "Abstract Nouns",
        "titleBn": "গুণবাচক বা ভাববাচক বিশেষ্য (Abstract Noun)",
        "category": "parts_of_speech",
        "categoryBn": "পদ প্রকরণ",
        "formula": "Abstract Noun = Quality / State / Feeling (Cannot be touched or seen, only felt)",
        "explanation": "An abstract noun denotes an idea, quality, emotion, or state rather than a concrete physical object.",
        "explanationBn": "যে Noun দ্বারা কোনো ব্যক্তি বা বস্তুর গুণ, অবস্থা, আবেগ বা কাজের নাম বোঝায় যাকে ধরা বা ছোঁয়া যায় না, শুধু অনুভব করা যায়, তাকে Abstract Noun বলে।",
        "examples": [
            {"en": "Kindness makes the world beautiful.", "bn": "দয়াশীলতা পৃথিবীকে সুন্দর করে তোলে।"},
            {"en": "Her courage inspired everyone.", "bn": "তার সাহস সবাইকে অনুপ্রাণিত করেছিল।"}
        ],
        "tips": "Truth, beauty, happiness, bravery, freedom—এগুলো সবই Abstract Noun কারণ এদের হাত দিয়ে ধরা যায় না!",
        "commonMistakes": [
            {"incorrect": "He showed many kindnesses.", "correct": "He showed great kindness.", "reasonBn": "Abstract Noun সাধারণত Uncountable, তাই এর বহুবচন (plural) হয় না।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "pos-07",
        "title": "Pronouns: Replacing Nouns",
        "titleBn": "সর্বনাম পদ (Pronoun)",
        "category": "parts_of_speech",
        "categoryBn": "পদ প্রকরণ",
        "formula": "Pronoun = Words used in place of a Noun (I, we, you, he, she, it, they)",
        "explanation": "A pronoun is a word used instead of a noun to avoid repeating the same noun again and again.",
        "explanationBn": "বারবার একই Noun পুনরাবৃত্তি না করে তার পরিবর্তে যে শব্দ ব্যবহার করা হয় তাকে Pronoun বলে।",
        "examples": [
            {"en": "Mita is in Class 5. She loves reading.", "bn": "মিতা পঞ্চম শ্রেণীতে পড়ে। সে বই পড়তে ভালোবাসে।"},
            {"en": "The cat is sleeping because it is tired.", "bn": "বিড়ালটি ঘুমাচ্ছে কারণ এটি ক্লান্ত।"}
        ],
        "tips": "ছেলেদের ক্ষেত্রে He/Him, মেয়েদের ক্ষেত্রে She/Her, এবং প্রাণী বা জড় বস্তুর ক্ষেত্রে It ব্যবহার করুন।",
        "commonMistakes": [
            {"incorrect": "Mita is smart. Mita reads well.", "correct": "Mita is smart. She reads well.", "reasonBn": "বারবার 'Mita' না লিখে দ্বিতীয় বাক্যে Pronoun 'She' ব্যবহার করা সুন্দর।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "pos-08",
        "title": "Personal Pronouns: Subject vs Object",
        "titleBn": "Subjective ও Objective Pronouns",
        "category": "parts_of_speech",
        "categoryBn": "পদ প্রকরণ",
        "formula": "Subject: I, We, You, He, She, They | Object: Me, Us, You, Him, Her, Them",
        "explanation": "Subject pronouns do the action before the verb. Object pronouns receive the action after the verb or preposition.",
        "explanationBn": "যে Pronoun কাজ সম্পাদন করে তা Subjective (I, He) এবং যাকে উদ্দেশ্য করে কাজ হয় তা Objective (me, him)।",
        "examples": [
            {"en": "He helped me with my homework.", "bn": "সে আমাকে বাড়ির কাজে সাহায্য করেছিল।", "note": "He = Subject, me = Object"},
            {"en": "The teacher praised us.", "bn": "শিক্ষক আমাদের প্রশংসা করলেন।"}
        ],
        "tips": "Verb-এর আগে বসলে I/He/She/They, আর Verb বা Preposition-এর পরে বসলে Me/Him/Her/Them!",
        "commonMistakes": [
            {"incorrect": "Give it to I.", "correct": "Give it to me.", "reasonBn": "Preposition 'to'-এর পরে Objective Pronoun 'me' বসবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "pos-09",
        "title": "Possessive Adjectives vs Possessive Pronouns",
        "titleBn": "মালিকানা প্রকাশক শব্দ (My, Your, Mine, Yours)",
        "category": "parts_of_speech",
        "categoryBn": "পদ প্রকরণ",
        "formula": "Possessive Adjective + Noun (my book) vs Standalone Pronoun (This book is mine)",
        "explanation": "Possessive adjectives (my, your, his, her, our, their) come before a noun. Possessive pronouns (mine, yours, hers, ours, theirs) stand alone.",
        "explanationBn": "মালিকানা বোঝাতে Noun-এর পূর্বে my/your/our বসে। আর Noun ছাড়া একা বসলে mine/yours/ours বসে।",
        "examples": [
            {"en": "This is my umbrella. That one is yours.", "bn": "এটি আমার ছাতা। ওইটি তোমার।"},
            {"en": "The bag on the table is hers.", "bn": "টেবিলের ওপরের ব্যাগটি তার।"}
        ],
        "tips": "My-এর পর অবশ্যই Noun থাকতে হবে (my pen), কিন্তু Mine-এর পর কোনো Noun বসে না!",
        "commonMistakes": [
            {"incorrect": "This is mine book.", "correct": "This is my book / This book is mine.", "reasonBn": "'Mine'-এর পর সরাসরি Noun বসে না, 'My' বসে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "pos-10",
        "title": "Action Verbs & Helping Verbs",
        "titleBn": "ক্রিয়া পদ (Action Verbs & Auxiliary Verbs)",
        "category": "parts_of_speech",
        "categoryBn": "পদ প্রকরণ",
        "formula": "Sentence = Subject + Verb + Object (Verb tells what someone does or is)",
        "explanation": "Verbs express physical actions (run, write), states of being (am, is, are), or help other verbs (have, do, will).",
        "explanationBn": "যে শব্দ দিয়ে কোনো কাজ করা, হওয়া বা থাকা বোঝায় তাকে Verb বলে। Verb ছাড়া কোনো ইংরেজি বাক্য তৈরি হতে পারে না।",
        "examples": [
            {"en": "Birds fly in the sky.", "bn": "পাখিরা আকাশে ওড়ে।", "note": "Action Verb: fly"},
            {"en": "She is reading a novel.", "bn": "সে একটি উপন্যাস পড়ছে।", "note": "Helping Verb: is, Main Verb: reading"}
        ],
        "tips": "Am, Is, Are, Was, Were, Have, Has, Do, Does হলো অতি পরিচিত Helping Verbs!",
        "commonMistakes": [
            {"incorrect": "He going to school.", "correct": "He is going to school.", "reasonBn": "Continuous টেন্সে Helping verb (is) ছাড়া শুধু '-ing' verb বসানো ভুল।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "pos-11",
        "title": "Adjectives: Describing Words",
        "titleBn": "নাম বিশেষণ (Adjective)",
        "category": "parts_of_speech",
        "categoryBn": "পদ প্রকরণ",
        "formula": "Adjective describes: Quality + Quantity + Number + Color + Size",
        "explanation": "An adjective modifies or describes a noun or pronoun by telling what kind, how many, or which one.",
        "explanationBn": "যে শব্দ কোনো Noun বা Pronoun-এর দোষ, গুণ, অবস্থা, সংখ্যা বা পরিমাণ প্রকাশ করে তাকে Adjective বলে।",
        "examples": [
            {"en": "Jamal is a brave and honest boy.", "bn": "জামাল একজন সাহসী ও সৎ ছেলে।"},
            {"en": "I bought five red apples.", "bn": "আমি পাঁচটি লাল আপেল কিনেছিলাম।"}
        ],
        "tips": "Noun-কে 'কেমন?', 'কতগুলো?' বা 'কোনটি?' প্রশ্ন করলে যে উত্তর পাওয়া যায়, তাই Adjective।",
        "commonMistakes": [
            {"incorrect": "She wears a dress blue.", "correct": "She wears a blue dress.", "reasonBn": "ইংরেজিতে সাধারণত Noun-এর আগেই Adjective বসাতে হয়।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "pos-12",
        "title": "Adverbs of Manner (-ly words)",
        "titleBn": "কাজের ধরন প্রকাশক ভাববিশেষণ (Adverbs of Manner)",
        "category": "parts_of_speech",
        "categoryBn": "পদ প্রকরণ",
        "formula": "Adjective + -ly = Adverb of Manner (e.g., quick + ly = quickly)",
        "explanation": "Adverbs of manner describe HOW an action is performed. Many are formed by adding '-ly' to an adjective.",
        "explanationBn": "যে Adverb দ্বারা কোনো কাজ কীভাবে বা কেমন করে সম্পন্ন হয় তা বোঝায় তাকে Adverb of Manner বলে।",
        "examples": [
            {"en": "The tortoise walked slowly.", "bn": "কচ্ছপটি ধীরে ধীরে হেঁটেছিল।"},
            {"en": "She answered all questions politely.", "bn": "সে ভদ্রভাবে সব প্রশ্নের উত্তর দিয়েছিল।"}
        ],
        "tips": "Verb-কে 'কীভাবে?' (How?) প্রশ্ন করলে Adverb of Manner পাওয়া যায়।",
        "commonMistakes": [
            {"incorrect": "He speaks English fluent.", "correct": "He speaks English fluently.", "reasonBn": "কথা বলার ধরন (Verb-কে বিশেষিত করতে) Adjective 'fluent' নয়, Adverb 'fluently' ব্যবহার করতে হয়।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "pos-13",
        "unitId": 13,
        "title": "Adverbs of Time and Place",
        "titleBn": "সময় ও স্থানবাচক ক্রিয়া-বিশেষণ (Time & Place Adverbs)",
        "category": "parts_of_speech",
        "categoryBn": "পদ প্রকরণ",
        "formula": "Time (When?): today, now, yesterday | Place (Where?): here, there, everywhere",
        "explanation": "Adverbs of time tell WHEN an event happens, and adverbs of place tell WHERE it happens.",
        "explanationBn": "যে Adverb কোনো কাজ কখন ঘটে (Time) বা কোথায় ঘটে (Place) তা নির্দেশ করে।",
        "examples": [
            {"en": "We will start our journey tomorrow.", "bn": "আমরা আগামীকাল আমাদের যাত্রা শুরু করব।", "note": "Adverb of time: tomorrow"},
            {"en": "Please come inside.", "bn": "দয়া করে ভেতরে আসুন।", "note": "Adverb of place: inside"}
        ],
        "tips": "When = কখন (Time), Where = কোথায় (Place)।",
        "commonMistakes": [
            {"incorrect": "I saw him yesterday in morning.", "correct": "I saw him yesterday morning / in the morning.", "reasonBn": "'In morning' ভুল, 'in the morning' বা শুধু 'yesterday morning' বলতে হয়।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "pos-14",
        "title": "Conjunctions: Joining Words",
        "titleBn": "সংযোজক অব্যয় (Conjunction)",
        "category": "parts_of_speech",
        "categoryBn": "পদ প্রকরণ",
        "formula": "Conjunction = Connects Words, Phrases, or Sentences (And, But, Or, Because)",
        "explanation": "Conjunctions connect words, phrases, or clauses together to make sentences smooth and meaningful.",
        "explanationBn": "যে শব্দ দুই বা ততোধিক শব্দ, বাক্যাংশ বা বাক্যকে যুক্ত করে তাকে Conjunction বলে।",
        "examples": [
            {"en": "Mina is poor but honest.", "bn": "মিনা দরিদ্র কিন্তু সৎ।"},
            {"en": "Take an umbrella or you will get wet.", "bn": "একটি ছাতা নাও নতুবা তুমি ভিজে যাবে।"}
        ],
        "tips": "একই ভাব জুড়তে 'And', বিপরীত ভাব জুড়তে 'But', বিকল্প বেছে নিতে 'Or' এবং কারণ দর্শাতে 'Because' বসে!",
        "commonMistakes": [
            {"incorrect": "Although he is rich, but he is greedy.", "correct": "Although he is rich, he is greedy.", "reasonBn": "'Although' থাকলে একই বাক্যে পুনরায় 'but' ব্যবহার করা ভুল।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "pos-15",
        "unitId": 15,
        "title": "Interjections: Expressing Strong Feelings",
        "titleBn": "আবেগসূচক অব্যয় (Interjection)",
        "category": "parts_of_speech",
        "categoryBn": "পদ প্রকরণ",
        "formula": "Interjection + Exclamation Mark (!) (Hurrah! Alas! Wow! Bravo!)",
        "explanation": "An interjection is a word or phrase that expresses sudden feeling, joy, sorrow, surprise, or excitement.",
        "explanationBn": "যে শব্দ দ্বারা মনের আকস্মিক আনন্দ, দুঃখ, বিস্ময় বা উত্তেজনা প্রকাশ পায় তাকে Interjection বলে। এর পরে বিস্ময়বোধক চিহ্ন (!) বসে।",
        "examples": [
            {"en": "Hurrah! We have won the cricket match!", "bn": "কী আনন্দ! আমরা ক্রিকেট ম্যাচে জিতেছি!"},
            {"en": "Alas! The poor kitten is hurt.", "bn": "হায়! বেচারা বিড়ালছানাটি আঘাত পেয়েছে।"}
        ],
        "tips": "আনন্দে Hurrah!, দুঃখে Alas!, প্রশংসায় Bravo!, এবং বিস্ময়ে Wow! ব্যবহার করা হয়।",
        "commonMistakes": [
            {"incorrect": "Hurrah we won.", "correct": "Hurrah! We won.", "reasonBn": "Interjection-এর পরে অবশ্যই Exclamation mark (!) দিতে হবে।"}
        ],
        "source": "curriculum"
    },

    # -------------------------------------------------------------
    # 2. TENSES & TIME (14 topics)
    # -------------------------------------------------------------
    {
        "id": "tns-01",
        "unitId": 5,
        "title": "Simple Present Tense: Habits & Daily Routine",
        "titleBn": "সাধারণ বর্তমান কাল (Simple Present Tense)",
        "category": "tenses",
        "categoryBn": "কাল (Tenses)",
        "formula": "Subject + Verb(base form) [+ s/es for 3rd Person Singular] + Object",
        "explanation": "Used to express daily routines, habitual actions, and universal truths.",
        "explanationBn": "দৈনন্দিন অভ্যাস, সাধারণ সত্য এবং চিরন্তন সত্য বোঝাতে Simple Present Tense ব্যবহৃত হয়।",
        "examples": [
            {"en": "I brush my teeth twice a day.", "bn": "আমি দিনে দুবার দাঁত মাজি।"},
            {"en": "The sun rises in the east.", "bn": "সূর্য পূর্ব দিকে ওঠে।"}
        ],
        "tips": "Subject যদি 3rd Person Singular (He, She, It, বা যেকোনো একবচন নাম) হয়, তবে Verb-এর সাথে s বা es যোগ করতে ভুলবেন না!",
        "commonMistakes": [
            {"incorrect": "He go to school by bus.", "correct": "He goes to school by bus.", "reasonBn": "'He' হলো 3rd person singular, তাই verb 'go'-এর সাথে 'es' যোগ হবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "tns-02",
        "title": "Present Continuous Tense: Happening Right Now",
        "titleBn": "ঘটমান বর্তমান কাল (Present Continuous Tense)",
        "category": "tenses",
        "categoryBn": "কাল (Tenses)",
        "formula": "Subject + am/is/are + Verb(-ing) + Object",
        "explanation": "Used for actions that are taking place at the moment of speaking.",
        "explanationBn": "কথা বলার মুহূর্তে বর্তমানে কোনো কাজ চলছে বা ঘটছে বোঝাতে Present Continuous Tense ব্যবহৃত হয়।",
        "examples": [
            {"en": "The teacher is explaining the lesson now.", "bn": "শিক্ষক এখন পাঠটি ব্যাখ্যা করছেন।"},
            {"en": "They are playing football in the field.", "bn": "তারা মাঠে ফুটবল খেলছে।"}
        ],
        "tips": "I-এর সাথে am; He/She/It-এর সাথে is; You/We/They-এর সাথে are বসে।",
        "commonMistakes": [
            {"incorrect": "Look, the baby crying.", "correct": "Look, the baby is crying.", "reasonBn": "Continuous টেন্সে helping verb 'is' অবশ্যই দিতে হবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "tns-03",
        "title": "Present Perfect Tense: Just Completed Actions",
        "titleBn": "পুরাঘটিত বর্তমান কাল (Present Perfect Tense)",
        "category": "tenses",
        "categoryBn": "কাল (Tenses)",
        "formula": "Subject + have/has + Past Participle (V3) + Object",
        "explanation": "Used for actions completed recently whose results are still visible or significant now.",
        "explanationBn": "যে কাজ এইমাত্র শেষ হয়েছে কিন্তু তার ফলাফল এখনো বর্তমান, তা বোঝাতে Present Perfect Tense ব্যবহৃত হয়।",
        "examples": [
            {"en": "I have finished my homework.", "bn": "আমি আমার বাড়ির কাজ শেষ করেছি।"},
            {"en": "She has visited the zoo today.", "bn": "সে আজ চিড়িয়াখানা পরিদর্শন করেছে।"}
        ],
        "tips": "He/She/It-এর সাথে has; I/We/You/They-এর সাথে have বসে। Verb-এর ৩য় রূপ (V3) ব্যবহার করতে হবে!",
        "commonMistakes": [
            {"incorrect": "I have ate breakfast.", "correct": "I have eaten breakfast.", "reasonBn": "'Have'-এর পর Past Participle (eaten) বসে, Past form (ate) নয়।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "tns-04",
        "unitId": 6,
        "title": "Simple Past Tense: Regular Verbs (-ed)",
        "titleBn": "সাধারণ অতীত কাল: নিয়মিত ক্রিয়া (Regular Past Verbs)",
        "category": "tenses",
        "categoryBn": "কাল (Tenses)",
        "formula": "Subject + Verb(base) + -d / -ed + Object",
        "explanation": "Used for completed actions in the past. Regular verbs form their past tense simply by adding -d or -ed.",
        "explanationBn": "অতীতের কোনো নির্দিষ্ট সময়ে কাজ সম্পন্ন হয়েছিল বোঝাতে Past Simple বসে। Regular verb-এর শেষে -ed যুক্ত হয়।",
        "examples": [
            {"en": "We played badminton yesterday evening.", "bn": "আমরা গতকাল সন্ধ্যায় ব্যাডমিন্টন খেলেছিলাম।"},
            {"en": "Raju planted a mango sapling last week.", "bn": "রাজু গত সপ্তাহে একটি আমের চারা রোপণ করেছিল।"}
        ],
        "tips": "Yesterday, last night, last year, ago থাকলে সাধারণত Simple Past Tense হয়।",
        "commonMistakes": [
            {"incorrect": "He play football yesterday.", "correct": "He played football yesterday.", "reasonBn": "Yesterday অতীত সময় নির্দেশ করে, তাই played হবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "tns-05",
        "unitId": 16,
        "title": "Simple Past Tense: Irregular Verbs",
        "titleBn": "সাধারণ অতীত কাল: অনিয়মিত ক্রিয়া (Irregular Verbs)",
        "category": "tenses",
        "categoryBn": "কাল (Tenses)",
        "formula": "Subject + Irregular Past Form (V2) (e.g., go -> went, see -> saw, buy -> bought)",
        "explanation": "Many common English verbs do not take '-ed' in the past. They change their spelling completely.",
        "explanationBn": "অনেক বহুল ব্যবহৃত ইংরেজি শব্দে -ed যুক্ত হয় না, রূপ পরিবর্তন হয়ে যায় (যেমন: go থেকে went, see থেকে saw)।",
        "examples": [
            {"en": "Mother made a delicious cake.", "bn": "মা একটি সুস্বাদু কেক তৈরি করেছিলেন।", "note": "make -> made"},
            {"en": "I saw an elephant at the safari park.", "bn": "আমি সাফারি পার্কে একটি হাতি দেখেছিলাম।", "note": "see -> saw"}
        ],
        "tips": "Go-went-gone, Eat-ate-eaten, Buy-bought-bought—এই তালিকাটি নিয়মিত মুখস্থ ও চর্চা করুন।",
        "commonMistakes": [
            {"incorrect": "She goed to the market.", "correct": "She went to the market.", "reasonBn": "'Go'-এর Past form হলো 'went', 'goed' বলে কোনো শব্দ নেই।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "tns-06",
        "title": "Past Continuous Tense: Past in Progress",
        "titleBn": "ঘটমান অতীত কাল (Past Continuous Tense)",
        "category": "tenses",
        "categoryBn": "কাল (Tenses)",
        "formula": "Subject + was/were + Verb(-ing) + Object",
        "explanation": "Used for an action that was going on at some specific time in the past.",
        "explanationBn": "অতীতে কোনো নির্দিষ্ট সময়ে কোনো কাজ চলছিল বা ঘটছিল বোঝাতে Past Continuous Tense ব্যবহৃত হয়।",
        "examples": [
            {"en": "It was raining heavily when I woke up.", "bn": "যখন আমি ঘুম থেকে উঠেছিলাম তখন ভারী বৃষ্টি হচ্ছিল।"},
            {"en": "The children were drawing pictures at 4 PM.", "bn": "বাচ্চারা বিকেল ৪টায় ছবি আঁকছিল।"}
        ],
        "tips": "Singular Subject (I, he, she, it)-এর সাথে was; Plural Subject (we, you, they)-এর সাথে were বসে।",
        "commonMistakes": [
            {"incorrect": "They was playing yesterday.", "correct": "They were playing yesterday.", "reasonBn": "'They' বহুবচন, তাই 'were' ব্যবহার করতে হবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "tns-07",
        "title": "Simple Future Tense with 'Will'",
        "titleBn": "সাধারণ ভবিষ্যৎ কাল (Simple Future with 'Will')",
        "category": "tenses",
        "categoryBn": "কাল (Tenses)",
        "formula": "Subject + will + Verb(base form) + Object",
        "explanation": "Used to express an action that will happen in the future or a sudden decision.",
        "explanationBn": "ভবিষ্যতে কোনো কাজ ঘটবে বা করা হবে বোঝাতে Simple Future Tense ব্যবহৃত হয়।",
        "examples": [
            {"en": "The school will reopen next Sunday.", "bn": "বিদ্যালয়টি আগামী রবিবার পুনরায় খুলবে।"},
            {"en": "I will help you with your project.", "bn": "আমি তোমার প্রকল্পে সাহায্য করব।"}
        ],
        "tips": "Will-এর পরে সর্বদা Verb-এর মূল বা Base form (do, go, see) বসে। কোনো s/es বা -ing যোগ হয় না!",
        "commonMistakes": [
            {"incorrect": "He will goes to Cox's Bazar.", "correct": "He will go to Cox's Bazar.", "reasonBn": "'Will'-এর পরে Verb-এর base form 'go' হবে, 'goes' নয়।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "tns-08",
        "title": "Future with 'Be Going To' (Planned Future)",
        "titleBn": "পরিকল্পিত ভবিষ্যৎ ('Be going to')",
        "category": "tenses",
        "categoryBn": "কাল (Tenses)",
        "formula": "Subject + am/is/are + going to + Verb(base form)",
        "explanation": "Used to talk about future plans, intentions, or things that are clearly about to happen based on present signs.",
        "explanationBn": "আগে থেকেই ঠিক করা কোনো ভবিষ্যৎ পরিকল্পনা বা লক্ষণ দেখে নিশ্চিত কোনো কিছু ঘটার ক্ষেত্রে 'be going to' ব্যবহৃত হয়।",
        "examples": [
            {"en": "Look at the dark clouds! It is going to rain.", "bn": "কালো মেঘগুলোর দিকে তাকাও! বৃষ্টি হতে যাচ্ছে।"},
            {"en": "We are going to visit our grandparents tomorrow.", "bn": "আমরা আগামীকাল আমাদের দাদা-দাদিকে দেখতে যাচ্ছি।"}
        ],
        "tips": "তাত্ক্ষণিক সিদ্ধান্তের জন্য 'will', আর পূর্বনির্ধারিত পরিকল্পনার জন্য 'going to' সবচেয়ে মানানসই!",
        "commonMistakes": [
            {"incorrect": "I am going to buying a new pen.", "correct": "I am going to buy a new pen.", "reasonBn": "'Going to'-এর পর verb-এর base form (buy) বসে, -ing যোগ হয় না।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "tns-09",
        "title": "Time Markers: Present vs Past vs Future",
        "titleBn": "কাল নির্দেশক শব্দসমূহ (Time Markers)",
        "category": "tenses",
        "categoryBn": "কাল (Tenses)",
        "formula": "Present: always, usually, now | Past: yesterday, ago, last | Future: tomorrow, next",
        "explanation": "Certain adverbs give clues about which tense to choose in an English sentence.",
        "explanationBn": "বাক্যে থাকা কিছু নির্দিষ্ট শব্দ দেখে সহজে বোঝা যায় বাক্যটি কোন Tense-এ লিখতে হবে।",
        "examples": [
            {"en": "She always drinks milk in the morning.", "bn": "সে সর্বদা সকালে দুধ পান করে।", "note": "Always -> Present Simple"},
            {"en": "They met two days ago.", "bn": "তারা দুদিন আগে দেখা করেছিল।", "note": "Ago -> Past Simple"}
        ],
        "tips": "Ago, Yesterday, Last night = Past Simple; Tomorrow, Next week = Future Simple!",
        "commonMistakes": [
            {"incorrect": "I see him yesterday.", "correct": "I saw him yesterday.", "reasonBn": "'Yesterday' থাকায় verb-টি Past form (saw) হতে হবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "tns-10",
        "title": "Negatives in Present Simple (Do not / Does not)",
        "titleBn": "বর্তমান কালে না-বোধক বাক্য তৈরি (Don't / Doesn't)",
        "category": "tenses",
        "categoryBn": "কাল (Tenses)",
        "formula": "Subject + do not / does not + Verb(base form)",
        "explanation": "To make negative sentences in simple present, use 'do not' (don't) or 'does not' (doesn't) with base verb.",
        "explanationBn": "Simple Present Tense-এ না-বোধক করতে do not বা does not বসে। He/She/It-এর সাথে does not বসে।",
        "examples": [
            {"en": "I do not like bitter gourd.", "bn": "আমি করলা পছন্দ করি না।"},
            {"en": "He does not tell a lie.", "bn": "সে মিথ্যা বলে না।"}
        ],
        "tips": "Does not বসালে মূল Verb-এর s/es উঠে যায় (He does not plays -> He does not play)!",
        "commonMistakes": [
            {"incorrect": "He does not likes tea.", "correct": "He does not like tea.", "reasonBn": "'Does'-এর মধ্যে 'es' চলে আসায় মূল verb 'like'-এর সাথে আর 's' বসবে না।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "tns-11",
        "title": "Negatives in Past Simple (Did not + Base Verb)",
        "titleBn": "অতীত কালে না-বোধক বাক্য তৈরি (Didn't)",
        "category": "tenses",
        "categoryBn": "কাল (Tenses)",
        "formula": "Subject + did not (didn't) + Verb(base form) + Object",
        "explanation": "To make a past simple sentence negative, use 'did not' followed by the verb's BASE form, NOT the past form.",
        "explanationBn": "Simple Past Tense-এ না-বোধক করতে did not বসে এবং এর পর Verb-এর Base form (Present form) বসে।",
        "examples": [
            {"en": "We did not go to school on Friday.", "bn": "আমরা শুক্রবারে স্কুলে যাইনি।"},
            {"en": "She did not eat the cold soup.", "bn": "সে ঠান্ডা স্যুপটি খায়নি।"}
        ],
        "tips": "Did not-এর পরে কখনোই Past form (went, ate) বসবে না, সর্বদা base form (go, eat) বসবে!",
        "commonMistakes": [
            {"incorrect": "He did not went to Sylhet.", "correct": "He did not go to Sylhet.", "reasonBn": "'Did not'-এর পর Past form 'went' নয়, Base form 'go' বসবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "tns-12",
        "title": "Questions in Present Simple (Do / Does)",
        "titleBn": "বর্তমান কালে প্রশ্ন গঠন (Do / Does)",
        "category": "tenses",
        "categoryBn": "কাল (Tenses)",
        "formula": "Do / Does + Subject + Verb(base form) + ...?",
        "explanation": "Ask yes/no questions in the present tense by placing Do or Does at the beginning of the sentence.",
        "explanationBn": "সাধারণ বর্তমান কালে হ্যাঁ/না প্রশ্ন করতে বাক্যের শুরুতে Do বা Does বসে।",
        "examples": [
            {"en": "Do you speak English?", "bn": "তুমি কি ইংরেজিতে কথা বলো?"},
            {"en": "Does he live in Chattogram?", "bn": "সে কি চট্টগ্রামে বাস করে?"}
        ],
        "tips": "He, She, It, বা একবচন নামের আগে Does বসে। I, We, You, They-এর আগে Do বসে।",
        "commonMistakes": [
            {"incorrect": "Does she speaks French?", "correct": "Does she speak French?", "reasonBn": "'Does' ব্যবহার করায় 'speak'-এর সাথে আর 's' হবে না।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "tns-13",
        "title": "Questions in Past Simple (Did + Subject + Base Verb)",
        "titleBn": "অতীত কালে প্রশ্ন গঠন (Did)",
        "category": "tenses",
        "categoryBn": "কাল (Tenses)",
        "formula": "Did + Subject + Verb(base form) + ...?",
        "explanation": "To ask a question about the past, start with 'Did', followed by the subject and the BASE form of the verb.",
        "explanationBn": "অতীত সময়ের হ্যাঁ/না প্রশ্ন তৈরি করতে বাক্যের শুরুতে 'Did' বসে এবং Verb-এর base form হয়।",
        "examples": [
            {"en": "Did you enjoy the magic show yesterday?", "bn": "তুমি কি গতকাল জাদুর খেলাটি উপভোগ করেছিলে?"},
            {"en": "Did father bring sweet mangoes?", "bn": "বাবা কি মিষ্টি আম এনেছিলেন?"}
        ],
        "tips": "Did থাকলে Verb কখনো Past tense হবে না (Did you came? ভুল -> Did you come? সঠিক)।",
        "commonMistakes": [
            {"incorrect": "Did you saw the tiger?", "correct": "Did you see the tiger?", "reasonBn": "'Did'-এর সাথে Verb-এর Present/base form 'see' বসবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "tns-14",
        "unitId": 20,
        "title": "Storytelling Tense Sequence (Narrative Past)",
        "titleBn": "গল্প বলার অতীত কালরীতি (Storytelling Sequence)",
        "category": "tenses",
        "categoryBn": "কাল (Tenses)",
        "formula": "Past Simple (main action) + Past Continuous (background action)",
        "explanation": "When telling stories or folktales, English typically uses the past tense. Simple past tells main events, while past continuous describes setting.",
        "explanationBn": "ইংরেজি গল্প বা উপাখ্যান বর্ণনায় সাধারণত Past Tense ব্যবহৃত হয়। পটভূমি বোঝাতে Past Continuous এবং মূল ঘটনার জন্য Past Simple বসে।",
        "examples": [
            {"en": "Once upon a time, there lived an honest woodcutter.", "bn": "একদা এক সময়ে এক সৎ কাঠুরিয়া বাস করত।"},
            {"en": "While he was cutting wood, his axe slipped into deep water.", "bn": "যখন সে কাঠ কাটছিল, তখন তার কুড়ালটি গভীর জলে পড়ে গেল।"}
        ],
        "tips": "গল্পের শুরুতেই 'Once upon a time' থাকলে পরের বাক্যগুলো Past Tense-এ লিখতে হয়।",
        "commonMistakes": [
            {"incorrect": "Once upon a time, a fox is hungry.", "correct": "Once upon a time, a fox was hungry.", "reasonBn": "গল্পের শুরুতে অতীতের কথা বোঝাতে 'is' নয়, 'was' ব্যবহার করতে হয়।"}
        ],
        "source": "curriculum"
    },

    # -------------------------------------------------------------
    # 3. SENTENCE STRUCTURE & TYPES (12 topics)
    # -------------------------------------------------------------
    {
        "id": "sen-01",
        "title": "What is a Sentence? Subject and Predicate",
        "titleBn": "বাক্য পরিচিতি: উদ্দেশ্য ও বিধেয় (Subject & Predicate)",
        "category": "sentences",
        "categoryBn": "বাক্যরীতি (Sentences)",
        "formula": "Sentence = Subject (Who/What) + Predicate (Verb + Object/Info)",
        "explanation": "A sentence is a group of words that expresses a complete thought. It has two parts: the Subject (who/what) and Predicate (action/state).",
        "explanationBn": "সম্পূর্ণ অর্থ প্রকাশক শব্দসমষ্টিকে Sentence বলে। এর দুটি অংশ থাকে: Subject (যার সম্পর্কে কিছু বলা হয়) এবং Predicate (যা বলা হয়)।",
        "examples": [
            {"en": "The bright stars / twinkle at night.", "bn": "উজ্জ্বল তারাগুলো রাতে মিটমিট করে।", "note": "Subject: The bright stars, Predicate: twinkle at night"},
            {"en": "Birds / build nests in trees.", "bn": "পাখিরা গাছে বাসা বাঁধে।"}
        ],
        "tips": "বাক্যের Verb-কে 'কে?' বা 'কী?' প্রশ্ন করলে Subject পাওয়া যায়। বাকি অংশটি Predicate!",
        "commonMistakes": [
            {"incorrect": "Under the big mango tree.", "correct": "The cow is resting under the big mango tree.", "reasonBn": "শুধু 'Under the big mango tree' কোনো পূর্ণ বাক্য নয়, কারণ এতে Subject ও Finite Verb নেই।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "sen-02",
        "title": "Assertive / Declarative Sentences (Statements)",
        "titleBn": "বর্ণনামূলক বাক্য (Assertive Sentence)",
        "category": "sentences",
        "categoryBn": "বাক্যরীতি (Sentences)",
        "formula": "Subject + Verb + Object/Extension + Full stop (.)",
        "explanation": "An assertive sentence simply states a fact, opinion, or information. It ends with a full stop.",
        "explanationBn": "যে বাক্য দ্বারা কোনো বিবৃতি, সাধারণ ঘটনা বা তথ্য প্রকাশ করা হয় তাকে Assertive Sentence বলে। এর শেষে দাড়ি বা ফুলস্টপ (.) বসে।",
        "examples": [
            {"en": "Honey tastes sweet.", "bn": "মধু খেতে মিষ্টি।"},
            {"en": "Trees give us oxygen and shade.", "bn": "গাছপালা আমাদের অক্সিজেন ও ছায়া দেয়।"}
        ],
        "tips": "Assertive বাক্য দুই ধরনের হতে পারে: Affirmative (হ্যাঁ-বোধক) এবং Negative (না-বোধক)।",
        "commonMistakes": [
            {"incorrect": "I go to school?", "correct": "I go to school.", "reasonBn": "সাধারণ তথ্য প্রকাশ করলে শেষে প্রশ্নবোধক চিহ্ন নয়, Full stop (.) দিতে হয়।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "sen-03",
        "title": "Interrogative Sentences (Yes/No Questions)",
        "titleBn": "প্রশ্নবোধক বাক্য: হ্যাঁ/না উত্তরভিত্তিক",
        "category": "sentences",
        "categoryBn": "বাক্যরীতি (Sentences)",
        "formula": "Auxiliary Verb (Am/Is/Are/Have/Do/Can) + Subject + Main Verb + ... ?",
        "explanation": "These questions can be answered with a simple 'Yes' or 'No'. They start with an auxiliary verb and end with a question mark (?).",
        "explanationBn": "যে প্রশ্নের উত্তর কেবল 'হ্যাঁ' বা 'না' দিয়ে দেওয়া যায়, সেগুলো Auxiliary Verb দিয়ে শুরু হয়।",
        "examples": [
            {"en": "Are you hungry?", "bn": "তুমি কি ক্ষুধার্ত?"},
            {"en": "Can you swim across the pond?", "bn": "তুমি কি পুকুরে সাঁতার কাটতে পারো?"}
        ],
        "tips": "বাক্যটি প্রশ্নবোধক হলে অবশ্যই শেষে Question mark (?) দিতে হবে, ফুলস্টপ নয়!",
        "commonMistakes": [
            {"incorrect": "You are coming today?", "correct": "Are you coming today?", "reasonBn": "প্রশ্ন করার সময় Helping verb (Are) Subject-এর আগে নিয়ে আসতে হয়।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "sen-04",
        "unitId": 8,
        "title": "Wh-Questions: What, Where, When",
        "titleBn": "Wh-প্রশ্ন: কী (What), কোথায় (Where), কখন (When)",
        "category": "sentences",
        "categoryBn": "বাক্যরীতি (Sentences)",
        "formula": "Wh-word + Auxiliary Verb + Subject + Main Verb + ... ?",
        "explanation": "Used to seek information: What asks about things, Where asks about location, When asks about time.",
        "explanationBn": "তথ্য জানতে Wh-words ব্যবহৃত হয়। বস্তু/বিষয়ের জন্য What, স্থানের জন্য Where, এবং সময়ের জন্য When বসে।",
        "examples": [
            {"en": "What is your favorite subject?", "bn": "তোমার প্রিয় বিষয় কী?"},
            {"en": "Where do you live?", "bn": "তুমি কোথায় বাস করো?"},
            {"en": "When does your train arrive?", "bn": "তোমার ট্রেন কখন পৌঁছাবে?"}
        ],
        "tips": "কাঠামো মনে রাখুন: Wh-word + Helping Verb + Subject + Main Verb!",
        "commonMistakes": [
            {"incorrect": "Where you live?", "correct": "Where do you live?", "reasonBn": "Wh-word-এর পরপরই Auxiliary verb 'do' বসাতে হবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "sen-05",
        "title": "Wh-Questions: Who, Why, How",
        "titleBn": "Wh-প্রশ্ন: কে (Who), কেন (Why), কীভাবে (How)",
        "category": "sentences",
        "categoryBn": "বাক্যরীতি (Sentences)",
        "formula": "Who (person), Why (reason), How (manner/quantity/health)",
        "explanation": "Who asks about people, Why asks for reasons, and How asks about manner, health, or quantity (How much/many).",
        "explanationBn": "ব্যক্তি জানতে Who, কারণ জানতে Why, এবং ধরন বা অবস্থা জানতে How ব্যবহৃত হয়।",
        "examples": [
            {"en": "Who broke the window glass?", "bn": "কে জানালার কাচ ভেঙেছে?"},
            {"en": "Why are you crying, little boy?", "bn": "তুমি কেন কাঁদছ, ছোট ছেলে?"},
            {"en": "How do you go to school?", "bn": "তুমি কীভাবে স্কুলে যাও?"}
        ],
        "tips": "বয়স জানতে 'How old', দূরত্ব জানতে 'How far', এবং দাম জানতে 'How much' ব্যবহৃত হয়।",
        "commonMistakes": [
            {"incorrect": "Why you are late?", "correct": "Why are you late?", "reasonBn": "Wh-question-এ 'are' Subject (you)-এর আগে বসবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "sen-06",
        "title": "Imperative Sentences: Orders, Advice & Requests",
        "titleBn": "আদেশ, উপদেশ ও অনুরোধমূলক বাক্য (Imperative Sentence)",
        "category": "sentences",
        "categoryBn": "বাক্যরীতি (Sentences)",
        "formula": "Verb(base form) + Object / Please + Verb(base) (Subject 'You' is hidden)",
        "explanation": "An imperative sentence expresses a command, order, polite request, or piece of advice. The subject 'You' is usually understood/hidden.",
        "explanationBn": "যে বাক্য দ্বারা আদেশ, উপদেশ, নিষেধ বা অনুরোধ প্রকাশ পায় তাকে Imperative Sentence বলে। এতে Subject (You) সাধারণত উহ্য থাকে।",
        "examples": [
            {"en": "Always speak the truth.", "bn": "সর্বদা সত্য কথা বলবে।", "note": "Advice"},
            {"en": "Please give me a glass of clean water.", "bn": "দয়া করে আমাকে এক গ্লাস পরিষ্কার পানি দিন।", "note": "Request"},
            {"en": "Do not run in the sun.", "bn": "রোদে দৌড়াদৌড়ি করো না।", "note": "Order/Prohibition"}
        ],
        "tips": "Imperative বাক্য সবসময় Verb দিয়ে বা Please / Do not দিয়ে শুরু হয়!",
        "commonMistakes": [
            {"incorrect": "You open the door please.", "correct": "Please open the door / Open the door, please.", "reasonBn": "অনুরোধমূলক বাক্যে সাধারণত 'You' না বলে সরাসরি 'Please' দিয়ে শুরু করা ভালো।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "sen-07",
        "title": "Exclamatory Sentences: Wonder and Emotion",
        "titleBn": "বিস্ময়সূচক বাক্য (Exclamatory Sentence)",
        "category": "sentences",
        "categoryBn": "বাক্যরীতি (Sentences)",
        "formula": "What a/an + Adjective + Noun! OR How + Adjective + Subject + Verb!",
        "explanation": "Expresses strong sudden feelings such as excitement, surprise, joy, or sorrow. Always ends with an exclamation point (!).",
        "explanationBn": "যে বাক্য দিয়ে মনের তীব্র আবেগ, বিস্ময়, আনন্দ বা ভয় প্রকাশ পায় তাকে Exclamatory Sentence বলে। এর শেষে '!' বসে।",
        "examples": [
            {"en": "What a beautiful garden this is!", "bn": "এটি কী চমৎকার একটি বাগান!"},
            {"en": "How sweetly the cuckoo sings!", "bn": "কোকিল কত মিষ্টি সুরে গান গায়!"}
        ],
        "tips": "Noun থাকলে 'What a/an', আর শুধু Adjective থাকলে 'How' দিয়ে বাক্য শুরু করতে হয়!",
        "commonMistakes": [
            {"incorrect": "How a lovely flower!", "correct": "What a lovely flower! / How lovely the flower is!", "reasonBn": "'Flower' Noun থাকায় 'What a lovely flower' হবে, 'How a' ভুল।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "sen-08",
        "title": "Affirmative to Negative Transformation",
        "titleBn": "হ্যাঁ-বোধক বাক্যকে না-বোধক বাক্যে রূপান্তর",
        "category": "sentences",
        "categoryBn": "বাক্যরীতি (Sentences)",
        "formula": "Subject + Helping Verb + not + Opposite Word (meaning remains same)",
        "explanation": "Changing a positive sentence to a negative sentence without changing its actual meaning by using 'not' and an antonym.",
        "explanationBn": "অর্থের পরিবর্তন না ঘটিয়ে হ্যাঁ-বোধক বাক্যকে 'not' এবং বিপরীত শব্দ যোগ করে না-বোধক বাক্যে রূপান্তর করা যায়।",
        "examples": [
            {"en": "Affirmative: Man is mortal. -> Negative: Man is not immortal.", "bn": "মানুষ মরণশীল -> মানুষ অমর নয়।"},
            {"en": "Affirmative: Rahim is an honest boy. -> Negative: Rahim is not a dishonest boy.", "bn": "রহিম সৎ ছেলে -> রহিম অসৎ ছেলে নয়।"}
        ],
        "tips": "Always থাকলে 'Never' এবং Must থাকলে 'Cannot but' ব্যবহার করতে হয়!",
        "commonMistakes": [
            {"incorrect": "Man is mortal -> Man is not mortal.", "correct": "Man is mortal -> Man is not immortal.", "reasonBn": "সরাসরি 'not mortal' লিখলে অর্থ বদলে যায়! বিপরীত শব্দ ব্যবহার করে রূপান্তর করতে হয়।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "sen-09",
        "title": "Introductory 'There is' and 'There are'",
        "titleBn": "প্রারম্ভিক 'There is' ও 'There are'-এর ব্যবহার",
        "category": "sentences",
        "categoryBn": "বাক্যরীতি (Sentences)",
        "formula": "There is + Singular Noun | There are + Plural Noun",
        "explanation": "Used to say that something exists somewhere. Use 'There is' for one thing/uncountable, and 'There are' for more than one.",
        "explanationBn": "কোথাও কোনো কিছু আছে বা নেই বোঝাতে Introductory 'There' দিয়ে বাক্য শুরু হয়। একবচনে is, বহুবচনে are বসে।",
        "examples": [
            {"en": "There is a pond in front of our school.", "bn": "আমাদের বিদ্যালয়ের সামনে একটি পুকুর আছে।"},
            {"en": "There are sixty students in our classroom.", "bn": "আমাদের শ্রেণীকক্ষে ষাট জন শিক্ষার্থী রয়েছে।"}
        ],
        "tips": "Noun-টি একবচন হলে 'is/was', আর বহুবচন হলে 'are/were' বসবে!",
        "commonMistakes": [
            {"incorrect": "There is many trees in the park.", "correct": "There are many trees in the park.", "reasonBn": "'Many trees' বহুবচন, তাই 'There are' হবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "sen-10",
        "title": "Introductory 'It' for Weather, Time, and Distance",
        "titleBn": "আবহাওয়া, সময় ও দূরত্বের বর্ণনায় 'It'-এর ব্যবহার",
        "category": "sentences",
        "categoryBn": "বাক্যরীতি (Sentences)",
        "formula": "It is + Time / Day / Weather condition (e.g., It is 8 o'clock)",
        "explanation": "Used as an empty subject to talk about time, dates, days, weather, temperature, and distance.",
        "explanationBn": "সময়, দিন, তারিখ, আবহাওয়া বা দূরত্ব প্রকাশে কোনো সুনির্দিষ্ট Subject না থাকলে Introductory 'It' বসে।",
        "examples": [
            {"en": "It is hot and humid today.", "bn": "আজ বেশ গরম ও ভ্যাপসা আবহাওয়া।"},
            {"en": "It is half past ten in the morning.", "bn": "এখন সকাল সাড়ে দশটা বাজে।"}
        ],
        "tips": "বৃষ্টি হচ্ছে বোঝাতে: 'It is raining', বাতাস বইছে: 'It is windy'!",
        "commonMistakes": [
            {"incorrect": "Today is raining.", "correct": "It is raining today.", "reasonBn": "আবহাওয়ার বর্ণনা দিতে 'It is raining' বলা শুদ্ধ।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "sen-11",
        "title": "Simple Question Tags",
        "titleBn": "সংক্ষিপ্ত প্রশ্ন সংযোজন (Question Tags)",
        "category": "sentences",
        "categoryBn": "বাক্যরীতি (Sentences)",
        "formula": "Positive sentence, + negative tag? / Negative sentence, + positive tag?",
        "explanation": "A mini-question added to the end of a statement to ask for confirmation or agreement.",
        "explanationBn": "কথোপকথনে শ্রোতার সম্মতি বা সত্যতা যাচাই করতে বাক্যের শেষে যে ছোট্ট প্রশ্ন জুড়ে দেওয়া হয় তাকে Question Tag বলে।",
        "examples": [
            {"en": "You are a student, aren't you?", "bn": "তুমি একজন ছাত্র, তাই না?"},
            {"en": "He cannot swim, can he?", "bn": "সে সাঁতার কাটতে পারে না, পারে কি?"}
        ],
        "tips": "মূল বাক্য হ্যাঁ-বোধক হলে Tag হবে না-বোধক, আর মূল বাক্য না-বোধক হলে Tag হবে হ্যাঁ-বোধক!",
        "commonMistakes": [
            {"incorrect": "He is happy, is he?", "correct": "He is happy, isn't he?", "reasonBn": "বাক্যটি Affirmative, তাই Tag-টি Negative (isn't he) হতে হবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "sen-12",
        "title": "Compound Sentences with 'And', 'But', 'Or'",
        "titleBn": "যৌগিক বাক্য গঠন (Compound Sentences)",
        "category": "sentences",
        "categoryBn": "বাক্যরীতি (Sentences)",
        "formula": "Clause 1 + , + [and / but / or / so] + Clause 2",
        "explanation": "A compound sentence contains two independent clauses joined by a coordinating conjunction.",
        "explanationBn": "দুটি পূর্ণ স্বাধীন বাক্যকে and, but, or ইত্যাদি সংযোজক দিয়ে যুক্ত করে একটি Compound বাক্য তৈরি করা হয়।",
        "examples": [
            {"en": "The bell rang and the students entered the class.", "bn": "ঘণ্টা বাজল এবং শিক্ষার্থীরা ক্লাসে প্রবেশ করল।"},
            {"en": "He worked hard, but he failed the test.", "bn": "সে কঠোর পরিশ্রম করেছিল, কিন্তু পরীক্ষায় ব্যর্থ হয়েছিল।"}
        ],
        "tips": "দুই অংশই আলাদা বাক্য হিসেবে সম্পূর্ণ অর্থ প্রকাশ করতে সক্ষম হতে হবে!",
        "commonMistakes": [
            {"incorrect": "He ran fast but he win the race.", "correct": "He ran fast and he won the race / He ran fast but he missed the bus.", "reasonBn": "'But' পরস্পর বিপরীত ভাব প্রকাশ করতে ব্যবহৃত হয়।"}
        ],
        "source": "curriculum"
    },

    # -------------------------------------------------------------
    # 4. ARTICLES & DETERMINERS (8 topics)
    # -------------------------------------------------------------
    {
        "id": "art-01",
        "unitId": 7,
        "title": "Indefinite Article 'A': Consonant Sounds",
        "titleBn": "অনির্দিষ্ট পদাশ্রিত নির্দেশক 'A'-এর ব্যবহার",
        "category": "articles",
        "categoryBn": "আর্টিকেল ও ডিটারমিনার",
        "formula": "A + Singular Countable Noun beginning with a Consonant Sound",
        "explanation": "Use 'a' before singular countable nouns that begin with a consonant sound (b, c, d, f, g, etc.).",
        "explanationBn": "Consonant বা ব্যঞ্জনবর্ণের ধ্বনি দিয়ে শুরু হওয়া একবচন গণনাবাচক Noun-এর পূর্বে 'A' বসে।",
        "examples": [
            {"en": "I bought a book and a pen.", "bn": "আমি একটি বই এবং একটি কলম কিনেছিলাম।"},
            {"en": "A tiger is a fierce wild animal.", "bn": "বাঘ একটি হিংস্র বন্য প্রাণী।"}
        ],
        "tips": "চিঠি নয়, শব্দের উচ্চারণ (Sound) লক্ষ্য করুন! Consonant sound হলে 'a' বসবে।",
        "commonMistakes": [
            {"incorrect": "I have an car.", "correct": "I have a car.", "reasonBn": "'Car' শব্দটি 'ক' (consonant sound) দিয়ে শুরু, তাই 'a' বসবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "art-02",
        "title": "Indefinite Article 'An': Vowel Sounds",
        "titleBn": "অনির্দিষ্ট পদাশ্রিত নির্দেশক 'An'-এর ব্যবহার",
        "category": "articles",
        "categoryBn": "আর্টিকেল ও ডিটারমিনার",
        "formula": "An + Singular Countable Noun beginning with a Vowel Sound (a, e, i, o, u sound)",
        "explanation": "Use 'an' before singular countable nouns that start with a vowel sound.",
        "explanationBn": "Vowel বা স্বরবর্ণের ধ্বনি (অ, আ, ই, এ) দিয়ে শুরু হওয়া একবচন Noun-এর পূর্বে 'An' বসে।",
        "examples": [
            {"en": "An apple a day keeps the doctor away.", "bn": "প্রতিদিন একটি আপেল খেলে ডাক্তার দূরে থাকে।"},
            {"en": "She carries an umbrella on rainy days.", "bn": "বৃষ্টির দিনে সে একটি ছাতা বহন করে।"}
        ],
        "tips": "Apple, Egg, Inkpot, Orange, Umbrella—এদের শুরুতে Vowel sound থাকায় 'an' বসে।",
        "commonMistakes": [
            {"incorrect": "I saw a owl sitting on the branch.", "correct": "I saw an owl sitting on the branch.", "reasonBn": "'Owl' শুরু হয়েছে Vowel sound দিয়ে, তাই 'an owl' হবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "art-03",
        "title": "Special Article Rules: Silent 'H' and 'U' pronounced 'Yu'",
        "titleBn": "আর্টিকেলের বিশেষ ব্যতিক্রম: অনুচ্চারিত 'H' এবং 'ইউ' ধ্বনি",
        "category": "articles",
        "categoryBn": "আর্টিকেল ও ডিটারমিনার",
        "formula": "Silent H -> An (an hour, an honest man) | U sounds like 'Yu' -> A (a university, a union)",
        "explanation": "If 'h' is silent, use 'an' because of the vowel sound. If 'u' sounds like 'you' (ju:), use 'a'.",
        "explanationBn": "'H'-এর উচ্চারণ অনুচ্চারিত থেকে স্বরবর্ণের মতো শোনালে 'an' বসে (an hour)। কিন্তু 'U' বা 'E'-এর উচ্চারণ 'ইউ'-এর মতো হলে 'a' বসে (a university)।",
        "examples": [
            {"en": "Mr. Karim is an honest officer.", "bn": "জনাব করিম একজন সৎ কর্মকর্তা।", "note": "'honest' উচ্চারিত হয় 'অনেস্ট'"},
            {"en": "Dhaka University is a renowned university.", "bn": "ঢাকা বিশ্ববিদ্যালয় একটি বিখ্যাত বিশ্ববিদ্যালয়।", "note": "'university' উচ্চারিত হয় 'ইউনিভার্সিটি'"}
        ],
        "tips": "A one-taka note, A European, An honest man, An hour—এগুলো ভর্তি পরীক্ষায় বার বার আসে!",
        "commonMistakes": [
            {"incorrect": "He waited for a hour.", "correct": "He waited for an hour.", "reasonBn": "'Hour' শব্দে 'h' অনুচ্চারিত থাকে (vowel sound 'আ'), তাই 'an hour' হবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "art-04",
        "title": "Definite Article 'The': Specific Things and Universals",
        "titleBn": "নির্দিষ্ট পদাশ্রিত নির্দেশক 'The'-এর ব্যবহার",
        "category": "articles",
        "categoryBn": "আর্টিকেল ও ডিটারমিনার",
        "formula": "The + Specific Noun / Universal Single Entity (the sun, the earth, the sky)",
        "explanation": "Use 'the' when referring to a specific person, place, or thing already mentioned, or when there is only one in existence.",
        "explanationBn": "নির্দিষ্ট কোনো ব্যক্তি, বস্তু বা মহাবিশ্বের অনন্য একক কিছুর (সূর্য, পৃথিবী, আকাশ) পূর্বে 'The' বসে।",
        "examples": [
            {"en": "The sun rises in the east and sets in the west.", "bn": "সূর্য পূর্ব দিকে ওঠে এবং পশ্চিম দিকে অস্ত যায়।"},
            {"en": "I lost the pen that my father gave me.", "bn": "বাবা আমাকে যে কলমটি দিয়েছিলেন আমি সেটি হারিয়ে ফেলেছি।"}
        ],
        "tips": "নদী, সাগর, পর্বতমালা, সংবাদপত্রের নাম ও ধর্মগ্রন্থের নামের পূর্বে 'The' বসে (The Padma, The Quran, The Daily Star)!",
        "commonMistakes": [
            {"incorrect": "Sun is shining brightly.", "correct": "The sun is shining brightly.", "reasonBn": "সূর্য পৃথিবীতে একটিই, তাই এর পূর্বে অবশ্যই 'The' বসবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "art-05",
        "title": "Superlatives and Musical Instruments with 'The'",
        "titleBn": "সর্বোচ্চ তুলনা (Superlative) ও বাদ্যযন্ত্রের পূর্বে 'The'",
        "category": "articles",
        "categoryBn": "আর্টিকেল ও ডিটারমিনার",
        "formula": "The + Superlative Degree (-est / most) | Play + the + Musical Instrument",
        "explanation": "Always put 'the' before superlative adjectives (the tallest, the best) and when talking about playing musical instruments.",
        "explanationBn": "Superlative degree-র পূর্বে এবং কোনো বাদ্যযন্ত্র বাজানো প্রকাশ করতে তার পূর্বে 'the' বসে।",
        "examples": [
            {"en": "Mount Everest is the highest peak in the world.", "bn": "মাউন্ট এভারেস্ট বিশ্বের সর্বোচ্চ শৃঙ্গ।"},
            {"en": "Niloy can play the guitar very well.", "bn": "নিলয় গিটার খুব ভালো বাজাতে পারে।"}
        ],
        "tips": "The best, The biggest, The most beautiful—Superlative-এর আগে 'the' বাধ্যতামূলক!",
        "commonMistakes": [
            {"incorrect": "He is best boy in the class.", "correct": "He is the best boy in the class.", "reasonBn": "Superlative degree (best)-এর আগে 'the' বাদ দেওয়া যায় না।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "art-06",
        "title": "Zero Article: When NOT to Use A, An, or The",
        "titleBn": "আর্টিকেলের বর্জন (Zero Article বা ক্রস চিহ্ন)",
        "category": "articles",
        "categoryBn": "আর্টিকেল ও ডিটারমিনার",
        "formula": "No Article before: Proper names, Meals (breakfast, dinner), Sports, Languages",
        "explanation": "Do not use articles before names of people, languages, sports, meals in general, or general uncountable nouns.",
        "explanationBn": "ব্যক্তির নাম, ভাষা, খেলাধুলার নাম, সাধারণ খাবারের নাম (breakfast, dinner) এবং সাধারণ ভাববাচক শব্দের পূর্বে কোনো Article বসে না।",
        "examples": [
            {"en": "We play cricket every afternoon.", "bn": "আমরা প্রতিদিন বিকেলে ক্রিকেট খেলি।", "note": "NOT 'the cricket'"},
            {"en": "English is an international language.", "bn": "ইংরেজি একটি আন্তর্জাতিক ভাষা।", "note": "NOT 'The English is a language'"}
        ],
        "tips": "ভাষার নামের আগে The বসালে সেই জাতির মানুষকে বোঝায় (The English = ইংরেজ জাতি; English = ইংরেজি ভাষা)!",
        "commonMistakes": [
            {"incorrect": "I love to play the football.", "correct": "I love to play football.", "reasonBn": "যেকোনো খেলাধুলার নামের পূর্বে Article বসে না।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "art-07",
        "title": "Quantifiers: 'Some' vs 'Any'",
        "titleBn": "পরিমাণবাচক শব্দ: 'Some' ও 'Any'-এর ব্যবহার",
        "category": "articles",
        "categoryBn": "আর্টিকেল ও ডিটারমিনার",
        "formula": "Some (Affirmative sentences & polite offers) | Any (Negative sentences & Questions)",
        "explanation": "Use 'some' in positive statements and polite offers. Use 'any' in negative sentences and regular questions.",
        "explanationBn": "হ্যাঁ-বোধক বাক্যে বা ভদ্র প্রস্তাবে 'some' বসে; কিন্তু না-বোধক বাক্যে ও সাধারণ প্রশ্নে 'any' বসে।",
        "examples": [
            {"en": "There is some milk in the glass.", "bn": "গ্লাসে কিছু দুধ আছে।"},
            {"en": "There isn't any sugar left in the jar.", "bn": "বয়ামে কোনো চিনি অবশিষ্ট নেই।"},
            {"en": "Do you have any questions?", "bn": "তোমাদের কি কোনো প্রশ্ন আছে?"}
        ],
        "tips": "Would you like some tea? (ভদ্র অনুরোধে প্রশ্নেও 'some' হতে পারে!)",
        "commonMistakes": [
            {"incorrect": "I do not have some money.", "correct": "I do not have any money.", "reasonBn": "না-বোধক বাক্যে 'some'-এর পরিবর্তে 'any' ব্যবহার করতে হয়।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "art-08",
        "title": "Much vs Many & A Few vs A Little",
        "titleBn": "Much/Many এবং Few/Little-এর সূক্ষ্ম পার্থক্য",
        "category": "articles",
        "categoryBn": "আর্টিকেল ও ডিটারমিনার",
        "formula": "Countable: Many / A few | Uncountable: Much / A little",
        "explanation": "Use 'many' and 'a few' with countable plural nouns. Use 'much' and 'a little' with uncountable nouns.",
        "explanationBn": "যা গণনা করা যায় তার সাথে many / a few বসে; আর যা পরিমাপ করতে হয় তার সাথে much / a little বসে।",
        "examples": [
            {"en": "There are many books in the library.", "bn": "গ্রন্থাগারে অনেক বই রয়েছে।"},
            {"en": "We do not have much time left.", "bn": "আমাদের কাছে আর বেশি সময় অবশিষ্ট নেই।"},
            {"en": "Add a little salt to the curry.", "bn": "তরকারিতে সামান্য লবণ দাও।"}
        ],
        "tips": "Books, pens, boys গণনা করা যায় (many/few); water, sugar, time গণনা করা যায় না (much/little)!",
        "commonMistakes": [
            {"incorrect": "He drank many water.", "correct": "He drank much water / a lot of water.", "reasonBn": "পানি (water) Uncountable noun, তাই 'many' বসবে না।"}
        ],
        "source": "curriculum"
    },

    # -------------------------------------------------------------
    # 5. PUNCTUATION & CAPITALIZATION (8 topics)
    # -------------------------------------------------------------
    {
        "id": "punc-01",
        "title": "Full Stop / Period (.) and End Punctuation",
        "titleBn": "দাঁড়ি বা ফুলস্টপ (.) এর ব্যবহার",
        "category": "punctuation",
        "categoryBn": "বিরামচিহ্ন (Punctuation)",
        "formula": "Statement / Command + Full Stop (.)",
        "explanation": "A full stop marks the end of a complete assertive or imperative sentence, and is also used in abbreviations.",
        "explanationBn": "বিবৃতি বা আদেশমূলক বাক্যের পূর্ণ সমাপ্তি বোঝাতে এবং সংক্ষিপ্ত শব্দের শেষে ফুলস্টপ (.) বসে।",
        "examples": [
            {"en": "Honesty brings peace of mind.", "bn": "সততা মানসিক শান্তি বয়ে আনে।"},
            {"en": "Dr. Rahman is our family physician.", "bn": "ডা. রহমান আমাদের পারিবারিক চিকিৎসক।"}
        ],
        "tips": "ফুলস্টপ দিয়ে বাক্য শেষ হলে পরবর্তী বাক্যের প্রথম অক্ষর অবশ্যই Capital Letter হবে।",
        "commonMistakes": [
            {"incorrect": "I like mangoes We also have a tree", "correct": "I like mangoes. We also have a tree.", "reasonBn": "দুটি ভিন্ন বাক্যের মাঝে ফুলস্টপ না দিলে তা Run-on sentence হিসেবে গণ্য হবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "punc-02",
        "title": "Question Mark (?) and Exclamation Mark (!)",
        "titleBn": "প্রশ্নবোধক (?) ও বিস্ময়সূচক (!) চিহ্নের ব্যবহার",
        "category": "punctuation",
        "categoryBn": "বিরামচিহ্ন (Punctuation)",
        "formula": "Direct Question -> ? | Strong feeling / Interjection -> !",
        "explanation": "Use a question mark at the end of direct inquiries. Use an exclamation mark to show deep excitement, shock, or after interjections.",
        "explanationBn": "সরাসরি কোনো প্রশ্ন জিজ্ঞাসা করলে শেষে '?' বসে। আর গভীর আবেগ বা বিস্ময় প্রকাশে '!' বসে।",
        "examples": [
            {"en": "Where have you been all day?", "bn": "সারাদিন তুমি কোথায় ছিলে?"},
            {"en": "Stop! The bridge is broken ahead!", "bn": "থামো! সামনের সেতুটি ভাঙা!"}
        ],
        "tips": "চিহ্নগুলো বাক্যের একদম শেষে বসবে এবং এরপর নতুন বাক্য শুরু হলে Capital Letter হবে।",
        "commonMistakes": [
            {"incorrect": "What is your name.", "correct": "What is your name?", "reasonBn": "প্রশ্নবোধক বাক্যের শেষে ফুলস্টপ নয়, Question mark (?) দিতে হয়।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "punc-03",
        "title": "The Comma (,) in Lists and Direct Address",
        "titleBn": "কমা (,) এর ব্যবহার: তালিকা ও সম্বোধন",
        "category": "punctuation",
        "categoryBn": "বিরামচিহ্ন (Punctuation)",
        "formula": "Item 1, Item 2, and Item 3 | Name, + Sentence",
        "explanation": "A comma indicates a short pause. It separates three or more items in a list, and separates a person's name when addressing them.",
        "explanationBn": "বাক্যে সামান্য বিরতি বোঝাতে, তালিকায় একাধিক সমজাতীয় শব্দ আলাদা করতে এবং কাউকে সম্বোধনে কমা বসে।",
        "examples": [
            {"en": "I bought apples, bananas, oranges, and grapes.", "bn": "আমি আপেল, কলা, কমলা এবং আঙুর কিনেছিলাম।"},
            {"en": "Raju, please open the window.", "bn": "রাজু, দয়া করে জানালাটি খোলো।"}
        ],
        "tips": "তালিকার শেষ দুটি শব্দের মাঝে 'and' থাকলে তার পূর্বে কমা দেওয়া ঐচ্ছিক (Oxford Comma)।",
        "commonMistakes": [
            {"incorrect": "I bought apples bananas oranges.", "correct": "I bought apples, bananas, and oranges.", "reasonBn": "তালিকার শব্দগুলোর মাঝে কমা না দিলে অর্থ অস্পষ্ট হয়ে যায়।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "punc-04",
        "unitId": 9,
        "title": "Apostrophe (') for Contractions (Short Forms)",
        "titleBn": "সংক্ষিপ্ত রূপ তৈরিতে অ্যাপোস্ট্রফি (Apostrophe for Contractions)",
        "category": "punctuation",
        "categoryBn": "বিরামচিহ্ন (Punctuation)",
        "formula": "Missing letter replaced by apostrophe: do not -> don't, I am -> I'm, is not -> isn't",
        "explanation": "An apostrophe shows that one or more letters have been left out when two words are combined into a shorter form.",
        "explanationBn": "দুটি শব্দকে যুক্ত করে ছোট করার সময় যে বর্ণটি বাদ যায়, তার জায়গায় অ্যাপোস্ট্রফি (') বসে।",
        "examples": [
            {"en": "I don't know the answer.", "bn": "আমি উত্তরটি জানি না।", "note": "do not -> don't"},
            {"en": "It's a sunny day outside.", "bn": "বাইরে রৌদ্রোজ্জ্বল একটি দিন।", "note": "It is -> It's"}
        ],
        "tips": "It's = It is (সংক্ষিপ্ত রূপ); কিন্তু Its = ইহার (মালিকানা, কোনো অ্যাপোস্ট্রফি নেই)!",
        "commonMistakes": [
            {"incorrect": "The dog wagged it's tail.", "correct": "The dog wagged its tail.", "reasonBn": "'Its' হলো মালিকানা প্রকাশক (Possessive), এতে অ্যাপোস্ট্রফি হয় না। 'It's' মানে 'It is'।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "punc-05",
        "title": "Apostrophe for Possession ('s and s')",
        "titleBn": "মালিকানা প্রকাশে অ্যাপোস্ট্রফি ('s এবং s')",
        "category": "punctuation",
        "categoryBn": "বিরামচিহ্ন (Punctuation)",
        "formula": "Singular: Boy's pen | Plural ending in s: Boys' school | Irregular plural: Children's park",
        "explanation": "Add 's to singular nouns to show ownership. For regular plural nouns ending in -s, add only the apostrophe (').",
        "explanationBn": "একবচন শব্দের মালিকানা বোঝাতে 's বসে। আর 's' দিয়ে শেষ হওয়া বহুবচন শব্দের পরে শুধু অ্যাপোস্ট্রফি (') বসে।",
        "examples": [
            {"en": "This is Nadia's schoolbag.", "bn": "এটি নাদিয়ার স্কুলব্যাগ।"},
            {"en": "They study in a girls' high school.", "bn": "তারা একটি বালিকা উচ্চ বিদ্যালয়ে পড়াশোনা করে।"}
        ],
        "tips": "Children, Men, Women বহুবচন হলেও s দিয়ে শেষ হয়নি, তাই এদের ক্ষেত্রে 's বসবে (Children's toys)!",
        "commonMistakes": [
            {"incorrect": "This is a boys's hostel.", "correct": "This is a boys' hostel.", "reasonBn": "যেহেতু 'boys' বহুবচনে s আছে, তাই শেষে শুধু অ্যাপোস্ট্রফি বসবে, বাড়তি s হবে না।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "punc-06",
        "unitId": 3,
        "title": "Quotation Marks (\" \") for Direct Speech",
        "titleBn": "উদ্ধৃতি চিহ্ন (\" \") ও সংলাপ লিখন",
        "category": "punctuation",
        "categoryBn": "বিরামচিহ্ন (Punctuation)",
        "formula": "Speaker said, \"Exact words spoken by the person.\"",
        "explanation": "Quotation marks (speech marks) enclose the exact words spoken by someone in conversations and dialogues.",
        "explanationBn": "বক্তার মুখের অবিকল বক্তব্যকে লেখার সময় উদ্ধৃতি চিহ্ন বা কোটেশন মার্ক (\" \")-এর ভেতরে রাখতে হয়।",
        "examples": [
            {"en": "Teacher said, \"Always be polite to your elders.\"", "bn": "শিক্ষক বললেন, \"সর্বদা গুরুজনদের প্রতি বিনয়ী হবে।\""},
            {"en": "\"Can you help me?\" asked the traveler.", "bn": "\"আপনি কি আমাকে সাহায্য করতে পারেন?\" পথিকটি জিজ্ঞেস করলেন।"}
        ],
        "tips": "কোটেশন মার্কের ভেতরে প্রথম অক্ষরটি সর্বদা Capital Letter হবে এবং ভেতরের বিরামচিহ্ন কোটেশনের ভেতরেই থাকবে!",
        "commonMistakes": [
            {"incorrect": "He said, \"i am tired\".", "correct": "He said, \"I am tired.\"", "reasonBn": "কোটেশনের প্রথম অক্ষর Capital হবে এবং ফুলস্টপটি কোটেশনের ভেতরে থাকবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "punc-07",
        "title": "Capitalization Rules (Names, Places, Days, Months)",
        "titleBn": "বড় হাতের অক্ষর (Capital Letters) ব্যবহারের নিয়ম",
        "category": "punctuation",
        "categoryBn": "বিরামচিহ্ন (Punctuation)",
        "formula": "Capitalize: First word of sentence + Proper Nouns + Days & Months + Pronoun 'I'",
        "explanation": "Capital letters must be used for sentence beginnings, proper nouns, names of days and months, holidays, and the pronoun 'I'.",
        "explanationBn": "বাক্যের প্রথম শব্দ, মানুষের নাম, স্থানের নাম, দিন ও মাসের নাম এবং সর্বনাম 'I' সর্বদা বড় হাতের অক্ষরে লিখতে হয়।",
        "examples": [
            {"en": "Every Friday in January, my brother and I play chess.", "bn": "জানুয়ারি মাসের প্রতি শুক্রবারে আমার ভাই ও আমি দাবা খেলি।"},
            {"en": "The Sundarbans is located in Khulna.", "bn": "সুন্দরবন খুলনায় অবস্থিত।"}
        ],
        "tips": "ইংরেজি সর্বনাম 'I' (আমি) বাক্যের যেখানেই থাকুক না কেন, সর্বদা Capital Letter হবে!",
        "commonMistakes": [
            {"incorrect": "my friend and i will visit sylhet in may.", "correct": "My friend and I will visit Sylhet in May.", "reasonBn": "My, I, Sylhet, এবং May—প্রতিটিই বড় হাতের অক্ষরে লিখতে হবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "punc-08",
        "title": "Hyphens and Dashes in English",
        "titleBn": "হাইফেন (-) এর ব্যবহার ও যৌগিক শব্দ",
        "category": "punctuation",
        "categoryBn": "বিরামচিহ্ন (Punctuation)",
        "formula": "Compound words: well-known, ten-year-old, part-time",
        "explanation": "A hyphen (-) joins two or more words together to form a compound word or adjective before a noun.",
        "explanationBn": "হাইফেন (-) দুটি শব্দকে যুক্ত করে একটি নতুন যৌগিক শব্দ তৈরি করে।",
        "examples": [
            {"en": "He is an eight-year-old boy.", "bn": "সে একজন আট বছর বয়সী বালক।"},
            {"en": "Mother made a mouth-watering meal.", "bn": "মা একটি লোভনীয় খাবার রান্না করেছিলেন।"}
        ],
        "tips": "Twenty-one থেকে ninety-nine পর্যন্ত সংখ্যাগুলো লিখতে মাঝে হাইফেন ব্যবহার করতে হয়!",
        "commonMistakes": [
            {"incorrect": "He is an eight years old boy.", "correct": "He is an eight-year-old boy / The boy is eight years old.", "reasonBn": "Noun-এর আগে Adjective হিসেবে বসলে হাইফেনসহ একবচন 'year' লিখতে হয়।"}
        ],
        "source": "curriculum"
    },

    # -------------------------------------------------------------
    # 6. NUMBER & GENDER (10 topics)
    # -------------------------------------------------------------
    {
        "id": "num-01",
        "title": "Singular and Plural Basics (+s)",
        "titleBn": "একবচন ও বহুবচনের সাধারণ নিয়ম (+s)",
        "category": "number_gender",
        "categoryBn": "বচন ও লিঙ্গ (Number & Gender)",
        "formula": "Singular Noun + s = Plural Noun (book -> books, pen -> pens)",
        "explanation": "Singular means one person or thing. Plural means more than one. Most nouns simply add '-s' to form plural.",
        "explanationBn": "একটি মাত্র ব্যক্তি বা বস্তু বোঝালে Singular (একবচন) এবং একের বেশি বোঝালে Plural (বহুবচন)। অধিকাংশ Noun-এর সাথে 's' যোগ করে বহুবচন করা হয়।",
        "examples": [
            {"en": "One book, two books.", "bn": "একটি বই, দুটি বই।"},
            {"en": "The cat saw three birds on the tree.", "bn": "বিড়ালটি গাছের ওপর তিনটি পাখি দেখেছিল।"}
        ],
        "tips": "সরাসরি s যোগ হওয়া সবচেয়ে সাধারণ নিয়ম: tree -> trees, table -> tables, cow -> cows!",
        "commonMistakes": [
            {"incorrect": "I saw two car on the road.", "correct": "I saw two cars on the road.", "reasonBn": "সংখ্যা দুই (plural) হওয়ায় car-এর সাথে 's' যোগ হবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "num-02",
        "title": "Plural Nouns ending in -es (-s, -ss, -sh, -ch, -x, -z)",
        "titleBn": "শব্দের শেষে -es যোগ করে বহুবচন",
        "category": "number_gender",
        "categoryBn": "বচন ও লিঙ্গ (Number & Gender)",
        "formula": "Nouns ending in -s, -ss, -sh, -ch, -x -> add -es (bus -> buses, box -> boxes)",
        "explanation": "When a singular noun ends with a hissing sound (-s, -ss, -sh, -ch, -x), add '-es' to make it plural.",
        "explanationBn": "যেসব Noun-এর শেষে s, ss, sh, ch (চ-এর মতো উচ্চারণ), বা x থাকে, তাদের শেষে 'es' যোগ করে বহুবচন করতে হয়।",
        "examples": [
            {"en": "Match -> Matches / Watch -> Watches", "bn": "ম্যাচ -> ম্যাচগুলো / ঘড়ি -> ঘড়িগুলো"},
            {"en": "Dish -> Dishes / Glass -> Glasses / Box -> Boxes", "bn": "প্লেট -> প্লেটগুলো / গ্লাস -> গ্লাসগুলো"}
        ],
        "tips": "মনে রাখার কৌশল: শিস-ধ্বনির পর শুধু s উচ্চারণ করা যায় না, তাই 'es' যোগ করতে হয়!",
        "commonMistakes": [
            {"incorrect": "two boxs of sweets.", "correct": "two boxes of sweets.", "reasonBn": "'Box'-এর শেষে x থাকায় plural করার সময় 'boxes' হবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "num-03",
        "title": "Plurals of Nouns ending in -y (-ies vs -ys)",
        "titleBn": "-y দিয়ে শেষ হওয়া শব্দের বহুবচন (-ies বনাম -ys)",
        "category": "number_gender",
        "categoryBn": "বচন ও লিঙ্গ (Number & Gender)",
        "formula": "Consonant + y -> -ies (baby -> babies) | Vowel + y -> -ys (boy -> boys, key -> keys)",
        "explanation": "If 'y' follows a consonant, change 'y' to 'i' and add '-es'. But if 'y' follows a vowel, just add '-s'.",
        "explanationBn": "'y'-এর পূর্বে Consonant থাকলে y উঠে গিয়ে 'ies' বসে। কিন্তু y-এর পূর্বে Vowel (a,e,i,o,u) থাকলে কেবল 's' বসে।",
        "examples": [
            {"en": "One baby, two babies.", "bn": "একটি শিশু, দুটি শিশু।", "note": "b + y -> babies"},
            {"en": "One boy, two boys.", "bn": "একটি ছেলে, দুটি ছেলে।", "note": "o + y -> boys"}
        ],
        "tips": "City -> Cities, Country -> Countries, Story -> Stories; কিন্তু Day -> Days, Toy -> Toys!",
        "commonMistakes": [
            {"incorrect": "There are many citys in our country.", "correct": "There are many cities in our country.", "reasonBn": "'City'-এর 't' একটি consonant, তাই y উঠে 'ies' হবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "num-04",
        "title": "Plurals of Nouns ending in -f or -fe (-ves)",
        "titleBn": "-f বা -fe দিয়ে শেষ হওয়া শব্দের বহুবচন (-ves)",
        "category": "number_gender",
        "categoryBn": "বচন ও লিঙ্গ (Number & Gender)",
        "formula": "Change -f / -fe into -ves (leaf -> leaves, knife -> knives, wolf -> wolves)",
        "explanation": "Most nouns ending in -f or -fe drop the -f/-fe and take '-ves' in their plural forms.",
        "explanationBn": "অধিকাংশ শব্দ যার শেষে -f বা -fe থাকে, সেগুলোকে বহুবচন করতে f বা fe তুলে দিয়ে 'ves' বসাতে হয়।",
        "examples": [
            {"en": "Green leaves fell from the banyan tree.", "bn": "বটগাছ থেকে সবুজ পাতা ঝরে পড়ল।", "note": "leaf -> leaves"},
            {"en": "Keep sharp knives away from children.", "bn": "ধারালো ছুরিগুলো শিশুদের থেকে দূরে রাখুন।", "note": "knife -> knives"}
        ],
        "tips": "ব্যতিক্রম মনে রাখুন: Roof -> Roofs, Chief -> Chiefs, Cliff -> Cliffs (এগুলোতে শুধু s যোগ হয়)!",
        "commonMistakes": [
            {"incorrect": "Dry leafs on the ground.", "correct": "Dry leaves on the ground.", "reasonBn": "'Leaf'-এর বহুবচন রূপ হলো 'leaves'।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "num-05",
        "title": "Irregular Plurals: Changing Inside Vowels",
        "titleBn": "অনিয়মিত বহুবচন (Irregular Plurals)",
        "category": "number_gender",
        "categoryBn": "বচন ও লিঙ্গ (Number & Gender)",
        "formula": "Internal vowel changes: man -> men, woman -> women, foot -> feet, tooth -> teeth, mouse -> mice",
        "explanation": "Some nouns do not take s or es. Instead, their inside vowels change, or they add entirely different endings.",
        "explanationBn": "কিছু শব্দের বহুবচন করতে কোনো s/es যোগ হয় না; ভেতরের স্বরবর্ণ বদলে যায় বা ভিন্ন রূপ ধারণ করে।",
        "examples": [
            {"en": "Brush your teeth every morning.", "bn": "প্রতিদিন সকালে দাঁত মাজবে।", "note": "tooth -> teeth"},
            {"en": "The children are playing happily.", "bn": "বাচ্চারা আনন্দের সাথে খেলছে।", "note": "child -> children"}
        ],
        "tips": "Child -> Children, Ox -> Oxen, Goose -> Geese, Foot -> Feet, Tooth -> Teeth!",
        "commonMistakes": [
            {"incorrect": "All the childrens are happy.", "correct": "All the children are happy.", "reasonBn": "'Children' নিজেই বহুবচন, তাই এর সাথে আর 's' যোগ করা ভুল।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "num-06",
        "title": "Nouns that Remain Same in Singular and Plural",
        "titleBn": "একবচন ও বহুবচনে অপরিবর্তিত শব্দসমূহ",
        "category": "number_gender",
        "categoryBn": "বচন ও লিঙ্গ (Number & Gender)",
        "formula": "Same form: sheep -> sheep, deer -> deer, fish -> fish",
        "explanation": "Some nouns have identical forms for both singular and plural. Do not add 's' to them.",
        "explanationBn": "কিছু কিছু Noun-এর একবচন ও বহুবচনের রূপ হুবহু একই থাকে। এদের সাথে 's' যোগ করা যায় না।",
        "examples": [
            {"en": "One sheep is grazing. Ten sheep are grazing.", "bn": "একটি ভেড়া ঘাস খাচ্ছে। দশটি ভেড়া ঘাস খাচ্ছে।"},
            {"en": "The hunter saw a herd of deer in the forest.", "bn": "শিকারি বনে একপাল হরিণ দেখেছিল।"}
        ],
        "tips": "Sheep, Deer, Fish—এদের সাথে সাধারণত 's' হয় না (তবে ভিন্ন প্রজাতির মাছ বোঝাতে fishes হতে পারে)!",
        "commonMistakes": [
            {"incorrect": "Three deers ran away.", "correct": "Three deer ran away.", "reasonBn": "'Deer'-এর বহুবচনও 'deer', deers নয়।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "num-07",
        "unitId": 12,
        "title": "Countable vs Uncountable Nouns",
        "titleBn": "গণনাযোগ্য ও অগণনাবাচক বিশেষ্য",
        "category": "number_gender",
        "categoryBn": "বচন ও লিঙ্গ (Number & Gender)",
        "formula": "Countable (can be counted: 1, 2, 3) vs Uncountable (cannot be counted: water, milk, rice)",
        "explanation": "Countable nouns have singular and plural forms. Uncountable nouns only have a singular form and cannot take a/an directly.",
        "explanationBn": "যেসব জিনিস গণনা করা যায় তা Countable (pen, dog)। যা গণনা করা যায় না, শুধু মাপা যায় তা Uncountable (water, oil, knowledge)।",
        "examples": [
            {"en": "I ate two bananas.", "bn": "আমি দুটি কলা খেয়েছিলাম।", "note": "Countable"},
            {"en": "Water is essential for life.", "bn": "পানি জীবনের জন্য অপরিহার্য।", "note": "Uncountable"}
        ],
        "tips": "Uncountable Noun-এর পূর্বে সংখ্যা (1, 2) বা a/an বসে না। বলতে হয়: 'a glass of water' বা 'a cup of tea'!",
        "commonMistakes": [
            {"incorrect": "Please give me a water.", "correct": "Please give me a glass of water / some water.", "reasonBn": "পানি গোনা যায় না, তাই সরাসরি 'a water' বলা যায় না।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "num-08",
        "title": "Masculine and Feminine Gender",
        "titleBn": "পুংলিঙ্গ ও স্ত্রীলিঙ্গ (Masculine & Feminine Gender)",
        "category": "number_gender",
        "categoryBn": "বচন ও লিঙ্গ (Number & Gender)",
        "formula": "Masculine (male) <-> Feminine (female) (boy <-> girl, king <-> queen)",
        "explanation": "Gender refers to whether a noun denotes male, female, or neither. Masculine denotes males; feminine denotes females.",
        "explanationBn": "পুরুষ জাতীয় সত্ত্বাকে Masculine Gender এবং নারী জাতীয় সত্ত্বাকে Feminine Gender বলে।",
        "examples": [
            {"en": "The king and queen attended the ceremony.", "bn": "রাজা ও রানী অনুষ্ঠানে উপস্থিত ছিলেন।"},
            {"en": "My uncle and aunt live in London.", "bn": "আমার চাচা ও চাচি লন্ডনে বাস করেন।"}
        ],
        "tips": "Brother <-> Sister, Father <-> Mother, Son <-> Daughter, Husband <-> Wife!",
        "commonMistakes": [
            {"incorrect": "The actor played his role, and the actress played his role too.", "correct": "The actor played his role, and the actress played her role.", "reasonBn": "Feminine gender (actress)-এর Pronoun হবে 'her', 'his' নয়।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "num-09",
        "title": "Common and Neuter Gender",
        "titleBn": "উভয়লিঙ্গ ও ক্লীবলিঙ্গ (Common & Neuter Gender)",
        "category": "number_gender",
        "categoryBn": "বচন ও লিঙ্গ (Number & Gender)",
        "formula": "Common: Male or Female (teacher, child, doctor) | Neuter: Inanimate object (table, book, stone)",
        "explanation": "Common gender refers to either male or female. Neuter gender denotes lifeless, inanimate objects.",
        "explanationBn": "Common Gender দিয়ে পুরুষ বা নারী উভয়কেই বোঝায় (teacher, student)। আর Neuter Gender দিয়ে জড় বস্তুকে বোঝায় (chair, computer)।",
        "examples": [
            {"en": "The baby is smiling.", "bn": "শিশুটিকে দেখে ছেলে বা মেয়ে যে কেউই হতে পারে।", "note": "Common Gender"},
            {"en": "The wooden chair is broken.", "bn": "কাঠের চেয়ারটি ভাঙা।", "note": "Neuter Gender"}
        ],
        "tips": "জড় বস্তু (Neuter Gender)-এর ক্ষেত্রে Pronoun হিসেবে 'it' বা 'they' বসে।",
        "commonMistakes": [
            {"incorrect": "The table fell and hurt his leg.", "correct": "The table fell and broke its leg.", "reasonBn": "টেবিল জড় বস্তু (Neuter Gender), তাই 'his' না হয়ে 'its' হবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "num-10",
        "title": "Animal Gender and Offspring Pairs",
        "titleBn": "পশুপাখির লিঙ্গ ও তাদের ছানাদের নাম",
        "category": "number_gender",
        "categoryBn": "বচন ও লিঙ্গ (Number & Gender)",
        "formula": "Male <-> Female -> Offspring (e.g., Bull <-> Cow -> Calf)",
        "explanation": "In English, animals have distinct names for males, females, and their babies.",
        "explanationBn": "ইংরেজি ভাষায় বিভিন্ন প্রাণীর পুরুষ, স্ত্রী ও তাদের ছানার জন্য ভিন্ন ভিন্ন সুন্দর নাম রয়েছে।",
        "examples": [
            {"en": "Rooster (male) <-> Hen (female) -> Chick (baby)", "bn": "মোরগ <-> মুরগি -> মুরগির ছানা"},
            {"en": "Drake (male duck) <-> Duck (female) -> Duckling (baby)", "bn": "পাতিহাঁস (পুরুষ) <-> পাতিহাঁস (স্ত্রী) -> হাঁসের ছানা"},
            {"en": "Lion (male) <-> Lioness (female) -> Cub (baby)", "bn": "সিংহ <-> সিংহী -> সিংহের ছানা"}
        ],
        "tips": "Dog <-> Bitch -> Puppy; Cat <-> Queen -> Kitten; Horse <-> Mare -> Foal!",
        "commonMistakes": [
            {"incorrect": "A female lion is called a tiger.", "correct": "A female lion is called a lioness.", "reasonBn": "সিংহের স্ত্রীলিঙ্গ হলো Lioness।"}
        ],
        "source": "curriculum"
    },

    # -------------------------------------------------------------
    # 7. DEGREES OF COMPARISON (6 topics)
    # -------------------------------------------------------------
    {
        "id": "deg-01",
        "unitId": 14,
        "title": "Degrees of Comparison: Overview",
        "titleBn": "তুলনামূলক মাত্রা (Degrees of Comparison) পরিচিতি",
        "category": "degrees",
        "categoryBn": "তুলনা (Degrees of Comparison)",
        "formula": "Positive (no comparison) -> Comparative (between 2) -> Superlative (among all)",
        "explanation": "Adjectives change their form to show comparison: Positive (one thing), Comparative (two things), Superlative (three or more).",
        "explanationBn": "দোষ বা গুণের তারতম্য বোঝাতে Adjective-এর যে রূপান্তর ঘটে তাকে Degree of Comparison বলে। এটি তিন প্রকার: Positive, Comparative, ও Superlative।",
        "examples": [
            {"en": "Tall (Positive) -> Taller (Comparative) -> Tallest (Superlative)", "bn": "লম্বা -> অধিকতর লম্বা -> সবচেয়ে লম্বা"},
            {"en": "Rimi is tall. Jamal is taller than Rimi. Kamal is the tallest boy.", "bn": "রিমি লম্বা। জামাল রিমির চেয়ে লম্বা। কামাল সবার চেয়ে লম্বা।"}
        ],
        "tips": "একজনের বর্ণনা = Positive; দুজনের তুলনা = Comparative; সবার মধ্যে সেরা = Superlative!",
        "commonMistakes": [
            {"incorrect": "He is tallest boy than Kamal.", "correct": "He is taller than Kamal.", "reasonBn": "দুজনের তুলনায় Comparative form (taller) বসবে, Superlative নয়।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "deg-02",
        "title": "Positive Degree with 'As ... As'",
        "titleBn": "সমান সমান তুলনা ('As ... As')",
        "category": "degrees",
        "categoryBn": "তুলনা (Degrees of Comparison)",
        "formula": "as + Positive Adjective + as (e.g., as fast as a deer)",
        "explanation": "Use 'as ... as' to show that two persons, animals, or things are equal in a particular quality.",
        "explanationBn": "দুটি ব্যক্তি বা বস্তুর গুণ সমপর্যায়ের বোঝাতে 'as + adjective + as' কাঠামো ব্যবহৃত হয়।",
        "examples": [
            {"en": "Shuvo is as tall as his father.", "bn": "শুভ তার বাবার মতোই লম্বা।"},
            {"en": "She runs as fast as the wind.", "bn": "সে বাতাসের মতো দ্রুত দৌড়ায়।"}
        ],
        "tips": "As ... As-এর মাঝখানে সর্বদা Adjective-এর মূল Positive রূপ (tall, fast) বসে, comparative বা superlative নয়!",
        "commonMistakes": [
            {"incorrect": "He is as taller as his brother.", "correct": "He is as tall as his brother.", "reasonBn": "'as ... as'-এর মাঝে Comparative (taller) বসে না, Positive (tall) বসে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "deg-03",
        "unitId": 19,
        "title": "Comparative Degree: One-Syllable Adjectives (-er + than)",
        "titleBn": "তুলনামূলক রূপ: এক সিলেবলের শব্দ (-er + than)",
        "category": "degrees",
        "categoryBn": "তুলনা (Degrees of Comparison)",
        "formula": "Adjective + -er + than (older than, faster than, smaller than)",
        "explanation": "For short one-syllable adjectives, add '-er' and follow with 'than' to compare two things.",
        "explanationBn": "এক সিলেবলবিশিষ্ট ছোট Adjective-এর শেষে '-er' যোগ করে এবং পরে 'than' বসিয়ে দুজনের তুলনা করা হয়।",
        "examples": [
            {"en": "An aeroplane is faster than a train.", "bn": "উড়োজাহাজ ট্রেনের চেয়ে দ্রুতগতিসম্পন্ন।"},
            {"en": "The Padma is wider than the Buriganga.", "bn": "পদ্মা বুড়িগঙ্গার চেয়ে প্রশস্ত।"}
        ],
        "tips": "Consonant + Vowel + Consonant থাকলে শেষ অক্ষর দ্বিগুণ হয়: Big -> Bigger, Hot -> Hotter, Fat -> Fatter!",
        "commonMistakes": [
            {"incorrect": "He is more tall than me.", "correct": "He is taller than me.", "reasonBn": "ছোট শব্দের ক্ষেত্রে 'more tall' হয় না, 'taller' হয়।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "deg-04",
        "title": "Superlative Degree: Short Adjectives (The + -est)",
        "titleBn": "সর্বোচ্চ রূপ: এক সিলেবলের শব্দ (The + -est)",
        "category": "degrees",
        "categoryBn": "তুলনা (Degrees of Comparison)",
        "formula": "the + Adjective + -est + of / in (e.g., the tallest boy in the class)",
        "explanation": "To compare one entity against the entire group, add '-est' to short adjectives and ALWAYS prefix with 'the'.",
        "explanationBn": "সকলের মধ্যে একজনকে শ্রেষ্ঠ বা সর্বোচ্চ নির্দেশ করতে Adjective-এর শেষে '-est' যোগ হয় এবং পূর্বে 'the' বসে।",
        "examples": [
            {"en": "The blue whale is the largest animal on Earth.", "bn": "নীল তিমি পৃথিবীর বৃহত্তম প্রাণী।"},
            {"en": "Today is the coldest day of the winter.", "bn": "আজ শীতের সবচেয়ে শীতলতম দিন।"}
        ],
        "tips": "Big -> the biggest, Cold -> the coldest, Fast -> the fastest!",
        "commonMistakes": [
            {"incorrect": "He is fastest runner.", "correct": "He is the fastest runner.", "reasonBn": "Superlative degree-র পূর্বে অবশ্যই 'the' বসাতে হবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "deg-05",
        "title": "Comparative & Superlative: Long Adjectives (More / Most)",
        "titleBn": "বড় শব্দের তুলনা (More এবং Most-এর ব্যবহার)",
        "category": "degrees",
        "categoryBn": "তুলনা (Degrees of Comparison)",
        "formula": "Comparative: more + Adjective + than | Superlative: the most + Adjective",
        "explanation": "Adjectives with two or more syllables take 'more' for comparative and 'the most' for superlative.",
        "explanationBn": "দুই বা ততোধিক সিলেবলবিশিষ্ট বড় Adjective-এর সাথে -er/-est যোগ না হয়ে পূর্বে 'more' ও 'the most' বসে।",
        "examples": [
            {"en": "Gold is more expensive than silver.", "bn": "স্বর্ণ রূপার চেয়ে বেশি মূল্যবান।"},
            {"en": "The peacock is the most beautiful bird.", "bn": "ময়ূর সবচেয়ে সুন্দর পাখি।"}
        ],
        "tips": "Beautiful, intelligent, interesting, difficult, dangerous—এদের আগে more/most বসে!",
        "commonMistakes": [
            {"incorrect": "This flower is beautifuller than that one.", "correct": "This flower is more beautiful than that one.", "reasonBn": "'Beautiful' একটি বড় শব্দ, তাই 'more beautiful' হবে, beautifuller নয়।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "deg-06",
        "title": "Irregular Degrees (Good/Better/Best, Bad/Worse/Worst)",
        "titleBn": "অনিয়মিত তুলনা (Good, Better, Best)",
        "category": "degrees",
        "categoryBn": "তুলনা (Degrees of Comparison)",
        "formula": "Good -> Better -> Best | Bad -> Worse -> Worst | Little -> Less -> Least",
        "explanation": "Some of the most common adjectives do not follow standard rules. Their comparative and superlative forms are completely irregular.",
        "explanationBn": "কিছু সাধারণ Adjective কোনো নিয়ম মানে না। তাদের রূপ পুরোপুরি বদলে যায়। এগুলো ভালো করে মুখস্থ করতে হয়।",
        "examples": [
            {"en": "Your drawing is good, but his drawing is better.", "bn": "তোমার আঁকা ভালো, কিন্তু তার আঁকা আরও ভালো।"},
            {"en": "Prevention is better than cure.", "bn": "প্রতিকারের চেয়ে প্রতিরোধই উত্তম।"},
            {"en": "That was the worst storm of the century.", "bn": "ওটি ছিল শতাব্দীর সবচেয়ে ভয়াবহ ঝড়।"}
        ],
        "tips": "Good-er বা Bad-est বলে কোনো শব্দ নেই! Good -> Better -> Best; Bad -> Worse -> Worst!",
        "commonMistakes": [
            {"incorrect": "He is more better than me.", "correct": "He is better than me.", "reasonBn": "Double comparative ('more better') ভুল, শুধু 'better' বলতে হয়।"}
        ],
        "source": "curriculum"
    },

    # -------------------------------------------------------------
    # 8. MODALS & POLITE EXPRESSIONS (8 topics)
    # -------------------------------------------------------------
    {
        "id": "mod-01",
        "title": "Modal Verb 'Can': Ability and Possibility",
        "titleBn": "সামর্থ্য ও সম্ভাবনা প্রকাশে 'Can'-এর ব্যবহার",
        "category": "modals",
        "categoryBn": "মোডাল ও অনুরোধ (Modals)",
        "formula": "Subject + can + Verb(base form) (Negative: cannot / can't)",
        "explanation": "Use 'can' to state physical or mental ability to do something, or that something is possible.",
        "explanationBn": "কোনো কিছু করার শারীরিক বা মানসিক সামর্থ্য বা সম্ভাবনা প্রকাশে 'can' ব্যবহৃত হয়।",
        "examples": [
            {"en": "I can ride a bicycle without support.", "bn": "আমি সাহায্য ছাড়াই সাইকেল চালাতে পারি।"},
            {"en": "Birds can fly, but penguins cannot.", "bn": "পাখিরা উড়তে পারে, কিন্তু পেঙ্গুইনরা পারে না।"}
        ],
        "tips": "'Can'-এর পর কোনো 'to' বসে না এবং verb-এর সাথে s/es যোগ হয় না (He can swims ভুল -> He can swim সঠিক)!",
        "commonMistakes": [
            {"incorrect": "He can to swim.", "correct": "He can swim.", "reasonBn": "Modal verb 'can'-এর পর সরাসরি base verb বসে, 'to' বসে না।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "mod-02",
        "unitId": 3,
        "title": "Polite Requests: 'Could you' and 'Would you'",
        "titleBn": "ভদ্র অনুরোধ গঠনে 'Could you' ও 'Would you'",
        "category": "modals",
        "categoryBn": "মোডাল ও অনুরোধ (Modals)",
        "formula": "Could you / Would you + please + Verb(base form) + ... ?",
        "explanation": "While 'Can you' is casual, 'Could you' and 'Would you' are much more polite and respectful when asking someone for help.",
        "explanationBn": "কারো কাছে কোনো সাহায্য বা অনুরোধ চাওয়ার সময় 'Could you' বা 'Would you' ব্যবহার করলে তা অত্যন্ত বিনম্র ও মার্জিত শোনায়।",
        "examples": [
            {"en": "Could you please pass me the salt?", "bn": "আপনি কি দয়া করে লবণটা এগিয়ে দেবেন?"},
            {"en": "Would you mind closing the window?", "bn": "আপনি কি দয়া করে জানালাটি বন্ধ করবেন?"}
        ],
        "tips": "'Would you mind'-এর পর verb-এর সাথে -ing যুক্ত হয় (Would you mind opening the door?)!",
        "commonMistakes": [
            {"incorrect": "Would you mind to help me?", "correct": "Would you mind helping me?", "reasonBn": "'Would you mind'-এর পর Verb-এর সাথে '-ing' বসে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "mod-03",
        "title": "Modal Verb 'May': Formal Permission and Wishes",
        "titleBn": "অনুমতি প্রার্থনা ও শুভকামনায় 'May'",
        "category": "modals",
        "categoryBn": "মোডাল ও অনুরোধ (Modals)",
        "formula": "May I + Verb(base form) ... ? | May + Subject + Verb + ! (Wish)",
        "explanation": "Use 'May I' to ask permission respectfully from teachers or elders. Also used to express heartfelt blessings and prayers.",
        "explanationBn": "শিক্ষক বা গুরুজনদের কাছ থেকে সম্মানজনক অনুমতি চাইতে 'May I' এবং দোয়া বা শুভকামনা প্রকাশে 'May' বসে।",
        "examples": [
            {"en": "May I come in, Sir?", "bn": "স্যার, আমি কি ভেতরে আসতে পারি?"},
            {"en": "May you live long and prosper!", "bn": "তুমি দীর্ঘজীবী ও সমৃদ্ধ হও!"}
        ],
        "tips": "ক্লাসরুমে শিক্ষকের অনুমতি চাইতে সর্বদা 'May I come in' বলতে হয়, 'Can I' নয়!",
        "commonMistakes": [
            {"incorrect": "Can I come in, teacher? (in formal class)", "correct": "May I come in, teacher?", "reasonBn": "শ্রেণীকক্ষে শিক্ষকের প্রতি আনুষ্ঠানিক সম্মান দেখাতে 'May' সবচেয়ে মার্জিত।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "mod-04",
        "unitId": 17,
        "title": "Modal Verb 'Should': Friendly Advice and Duty",
        "titleBn": "পরামর্শ ও নৈতিক দায়িত্ব প্রকাশে 'Should'",
        "category": "modals",
        "categoryBn": "মোডাল ও অনুরোধ (Modals)",
        "formula": "Subject + should / shouldn't + Verb(base form)",
        "explanation": "Use 'should' to give friendly advice, suggestions, or to express moral duty (what is the right thing to do).",
        "explanationBn": "কাউকে ভালো কোনো পরামর্শ দিতে বা নৈতিক দায়িত্ব নির্দেশ করতে 'should' (উচিত) ব্যবহৃত হয়।",
        "examples": [
            {"en": "You should wash your hands before eating.", "bn": "খাওয়ার আগে তোমার হাত ধোয়া উচিত।"},
            {"en": "We should respect our parents and teachers.", "bn": "আমাদের পিতামাতা ও শিক্ষকদের সম্মান করা উচিত।"}
        ],
        "tips": "Should = উচিত; Shouldn't = অনুচিত বা করা উচিত নয়।",
        "commonMistakes": [
            {"incorrect": "You should to study hard.", "correct": "You should study hard.", "reasonBn": "'Should'-এর পরে 'to' বসে না, সরাসরি base verb বসে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "mod-05",
        "title": "Modal Verb 'Must' & 'Have to': Strict Necessity",
        "titleBn": "বাধ্যবাধকতা ও আবশ্যকতা প্রকাশে 'Must' ও 'Have to'",
        "category": "modals",
        "categoryBn": "মোডাল ও অনুরোধ (Modals)",
        "formula": "Subject + must / have to + Verb(base form)",
        "explanation": "Use 'must' when an obligation is strictly necessary or required by law/rules.",
        "explanationBn": "যে কাজ অবশ্যই করতে হবে বা কোনো নিয়মের কারণে করা বাধ্যতামূলক, তা বোঝাতে 'must' বা 'have to' ব্যবহৃত হয়।",
        "examples": [
            {"en": "Students must obey school rules.", "bn": "শিক্ষার্থীদের অবশ্যই স্কুলের নিয়মকানুন মানতে হবে।"},
            {"en": "You must stop when the traffic light turns red.", "bn": "ট্রাফিক বাতি লাল হলে তোমাকে অবশ্যই থামতে হবে।"}
        ],
        "tips": "Must-এর না-বোধক 'Must not' (mustn't) মানে 'একদম করা নিষেধ'!",
        "commonMistakes": [
            {"incorrect": "He must to go home now.", "correct": "He must go home now.", "reasonBn": "'Must'-এর পরে কোনো 'to' বসে না।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "mod-06",
        "unitId": 11,
        "title": "Polite Invitations: 'Would you like ... ?'",
        "titleBn": "আন্তরিক নিমন্ত্রণ ও আপ্যায়ন ('Would you like ... ?')",
        "category": "modals",
        "categoryBn": "মোডাল ও অনুরোধ (Modals)",
        "formula": "Would you like + [Noun] ? OR Would you like + to + [Verb] ?",
        "explanation": "A polite way to offer food, drinks, or invite someone to do an activity together.",
        "explanationBn": "মেহমান বা কাউকে কোনো খাবার দিতে বা কোনো কাজে আমন্ত্রণ জানাতে অত্যন্ত মার্জিতভাবে 'Would you like' ব্যবহার করা হয়।",
        "examples": [
            {"en": "Would you like a cup of warm tea?", "bn": "আপনি কি এক কাপ গরম চা পছন্দ করবেন?"},
            {"en": "Would you like to play cricket with us?", "bn": "তুমি কি আমাদের সাথে ক্রিকেট খেলতে চাও?"}
        ],
        "tips": "উত্তর দেওয়ার ভদ্র নিয়ম: 'Yes, please' (গ্রহণ করলে) বা 'No, thank you' (না চাইলে)।",
        "commonMistakes": [
            {"incorrect": "Do you want tea? (to a formal guest)", "correct": "Would you like some tea?", "reasonBn": "মেহমানকে আপ্যায়নের সময় 'Do you want' না বলে 'Would you like' বলা অনেক বেশি ভদ্র।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "mod-07",
        "title": "Making Suggestions with 'Let's' (Let us)",
        "titleBn": "প্রস্তাব তৈরিতে 'Let's' (Let us)-এর ব্যবহার",
        "category": "modals",
        "categoryBn": "মোডাল ও অনুরোধ (Modals)",
        "formula": "Let's + Verb(base form) + ... ! (Short for 'Let us')",
        "explanation": "Use 'Let's' when suggesting an activity for you and the listeners to do together.",
        "explanationBn": "শ্রোতাকে সাথে নিয়ে একত্রে কোনো কিছু করার প্রস্তাব দিতে 'Let's' (চলো আমরা...) ব্যবহৃত হয়।",
        "examples": [
            {"en": "Let's clean our classroom together.", "bn": "চলো আমরা একসাথে আমাদের শ্রেণীকক্ষ পরিষ্কার করি।"},
            {"en": "It is evening; let's go for a walk by the river.", "bn": "এখন সন্ধ্যা হয়েছে; চলো নদীর পাড়ে একটু হেঁটে আসি।"}
        ],
        "tips": "Let's-এর পর সর্বদা Verb-এর Base form বসে (Let's play, Let's go)!",
        "commonMistakes": [
            {"incorrect": "Let's going home.", "correct": "Let's go home.", "reasonBn": "'Let's'-এর পর verb-এর সাথে -ing যোগ হয় না, base form 'go' হবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "mod-08",
        "title": "Permission Responses: 'Sure', 'Of course', 'I'm sorry'",
        "titleBn": "অনুমতির প্রত্যুত্তর প্রদান (Responding to Requests)",
        "category": "modals",
        "categoryBn": "মোডাল ও অনুরোধ (Modals)",
        "formula": "Agreement: Sure! / Of course! / Certainly! | Refusal: I am sorry, I can't.",
        "explanation": "How to accept or decline a polite request naturally and courteously in English conversation.",
        "explanationBn": "কারো অনুরোধ গ্রহণ করতে 'Sure / Of course' এবং অপারগতা জানাতে দুঃখ প্রকাশ করে 'I'm sorry' বলতে হয়।",
        "examples": [
            {"en": "\"Could I borrow your eraser?\" -> \"Sure, here you go!\"", "bn": "\"আমি কি তোমার ইরেজারটি ধার নিতে পারি?\" -> \"অবশ্যই, এই নাও!\""},
            {"en": "\"Can you come right now?\" -> \"I am sorry, I am doing my homework.\"", "bn": "\"তুমি কি এখন আসতে পারবে?\" -> \"দুঃখিত, আমি আমার বাড়ির কাজ করছি।\""}
        ],
        "tips": "না বলতে সরাসরি 'No' না বলে 'I'm sorry, I can't' বলা ভদ্র শিষ্টাচার।",
        "commonMistakes": [
            {"incorrect": "Give me that. No I won't.", "correct": "Could you give me that? - I'm sorry, I need it right now.", "reasonBn": "ভদ্র কথোপকথন সামাজিক সম্পর্কের উন্নতি ঘটায়।"}
        ],
        "source": "curriculum"
    },

    # -------------------------------------------------------------
    # 9. PREPOSITIONS OF TIME & PLACE (11 topics)
    # -------------------------------------------------------------
    {
        "id": "prep-01",
        "unitId": 11,
        "title": "Prepositions of Time: AT (Specific Clock Times)",
        "titleBn": "সময়ের প্রেপজিশন: AT (নির্দিষ্ট ঘড়ির সময় ও রাত)",
        "category": "prepositions",
        "categoryBn": "পদান্বয়ী অব্যয় (Prepositions)",
        "formula": "at + clock time (at 7 AM) / at night / at noon / at noon / at dawn",
        "explanation": "Use 'at' for precise clock times, meal times, and points in time like night or midnight.",
        "explanationBn": "নির্দিষ্ট ঘড়ির সময় (at 8 o'clock), রাত (at night), এবং দুপুর (at noon)-এর পূর্বে 'at' বসে।",
        "examples": [
            {"en": "Our school assembly starts at 9:00 AM.", "bn": "আমাদের স্কুলের প্রাত্যহিক সমাবেশ সকাল ৯টায় শুরু হয়।"},
            {"en": "Owls hunt for prey at night.", "bn": "পেঁচারা রাতে শিকার খোঁজে।"}
        ],
        "tips": "ঘড়ির কাঁটা ও রাতের বেলায় সর্বদা 'At' ব্যবহার করবেন!",
        "commonMistakes": [
            {"incorrect": "He arrived in 4 PM.", "correct": "He arrived at 4 PM.", "reasonBn": "নির্দিষ্ট ঘড়ির সময়ের পূর্বে 'in' নয়, 'at' বসে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "prep-02",
        "title": "Prepositions of Time: ON (Days and Dates)",
        "titleBn": "সময়ের প্রেপজিশন: ON (বার ও নির্দিষ্ট তারিখ)",
        "category": "prepositions",
        "categoryBn": "পদান্বয়ী অব্যয় (Prepositions)",
        "formula": "on + Days of the week (on Friday) / on + Specific Dates (on 21st February)",
        "explanation": "Use 'on' for specific days of the week, special holidays, and exact calendar dates.",
        "explanationBn": "সপ্তাহের যেকোনো দিন (on Monday) এবং নির্দিষ্ট তারিখের (on 26th March) পূর্বে 'on' বসে।",
        "examples": [
            {"en": "Our Independence Day is on 26th March.", "bn": "আমাদের স্বাধীনতা দিবস ২৬শে মার্চ।"},
            {"en": "We do not have classes on Friday.", "bn": "শুক্রবারে আমাদের কোনো ক্লাস থাকে না।"}
        ],
        "tips": "দিন বা তারিখ পেলেই চোখ বন্ধ করে 'On' বসাবেন!",
        "commonMistakes": [
            {"incorrect": "I was born in 16th December.", "correct": "I was born on 16th December.", "reasonBn": "নির্দিষ্ট তারিখের পূর্বে 'in' নয়, 'on' বসে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "prep-03",
        "title": "Prepositions of Time: IN (Months, Years, Seasons, Long Periods)",
        "titleBn": "সময়ের প্রেপজিশন: IN (মাস, বছর, ঋতু ও দীর্ঘ সময়)",
        "category": "prepositions",
        "categoryBn": "পদান্বয়ী অব্যয় (Prepositions)",
        "formula": "in + Months (in January) / in + Years (in 1971) / in + Seasons (in winter)",
        "explanation": "Use 'in' for longer periods of time: months, seasons, years, centuries, and parts of the day (in the morning).",
        "explanationBn": "মাস, বছর, ঋতু, এবং দিনের অংশবিশেষের (in the morning, in the evening) পূর্বে 'in' বসে।",
        "examples": [
            {"en": "Bangladesh became independent in 1971.", "bn": "বাংলাদেশ ১৯৭১ সালে স্বাধীন হয়েছিল।"},
            {"en": "Flowers bloom vibrantly in spring.", "bn": "বসন্তে প্রাণবন্তভাবে ফুল ফোটে।"}
        ],
        "tips": "ঘড়ির সময় -> At; দিন ও তারিখ -> On; মাস, বছর ও ঋতু -> In!",
        "commonMistakes": [
            {"incorrect": "Our final exam will start on November.", "correct": "Our final exam will start in November.", "reasonBn": "শুধু মাসের নামের পূর্বে 'on' নয়, 'in' বসবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "prep-04",
        "title": "Prepositions of Place: In, On, At",
        "titleBn": "স্থানের প্রেপজিশন: In, On, At-এর পার্থক্য",
        "category": "prepositions",
        "categoryBn": "পদান্বয়ী অব্যয় (Prepositions)",
        "formula": "In (enclosed space / big city) | On (surface) | At (exact point / small place)",
        "explanation": "'In' is for inside a 3D space or big city/country. 'On' is for contact with a surface. 'At' is for a specific point.",
        "explanationBn": "কোনো কিছুর ভেতরে বা বড় শহর/দেশের ক্ষেত্রে 'in'; কোনো তলের ওপরে থাকলে 'on'; এবং সুনির্দিষ্ট পয়েন্ট বা ছোট স্থানে 'at' বসে।",
        "examples": [
            {"en": "There is a book on the table.", "bn": "টেবিলের ওপর একটি বই আছে।", "note": "Surface -> on"},
            {"en": "He lives in Dhaka.", "bn": "সে ঢাকায় বাস করে।", "note": "Big city -> in"},
            {"en": "Someone is standing at the door.", "bn": "দরজায় কেউ একজন দাঁড়িয়ে আছে।", "note": "Specific point -> at"}
        ],
        "tips": "বড় স্থান (দেশ, জেলা) = In; ছোট স্থান বা নির্দিষ্ট ঠিকানা = At!",
        "commonMistakes": [
            {"incorrect": "He lives at Bangladesh.", "correct": "He lives in Bangladesh.", "reasonBn": "দেশের নামের পূর্বে 'in' বসে, 'at' নয়।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "prep-05",
        "title": "Prepositions: Between vs Among",
        "titleBn": "Between বনাম Among (দুজনের মাঝে বনাম অনেকের মাঝে)",
        "category": "prepositions",
        "categoryBn": "পদান্বয়ী অব্যয় (Prepositions)",
        "formula": "Between = 2 people/things | Among = 3 or more people/things",
        "explanation": "Use 'between' when referring to two separate people or items. Use 'among' when dividing or locating something among three or more.",
        "explanationBn": "কেবল দুজনের মধ্যে কিছু বোঝালে 'Between' বসে। কিন্তু তিন বা ততোধিক ব্যক্তি বা দলের মধ্যে বোঝালে 'Among' বসে।",
        "examples": [
            {"en": "Divide the mango between the two brothers.", "bn": "আমটি দুই ভাইয়ের মধ্যে ভাগ করে দাও।"},
            {"en": "The teacher distributed sweets among all the students.", "bn": "শিক্ষক সকল শিক্ষার্থীর মাঝে মিষ্টি বিতরণ করলেন।"}
        ],
        "tips": "Two = Between; Many / All = Among!",
        "commonMistakes": [
            {"incorrect": "Divide the cake among Roni and Jony.", "correct": "Divide the cake between Roni and Jony.", "reasonBn": "যেহেতু কেবল দুজন ব্যক্তি (Roni ও Jony), তাই 'between' হবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "prep-06",
        "title": "Prepositions of Movement: To, Into, and Towards",
        "titleBn": "গতিশীলতার প্রেপজিশন: To, Into, Towards",
        "category": "prepositions",
        "categoryBn": "পদান্বয়ী অব্যয় (Prepositions)",
        "formula": "To (destination) | Into (entering inside) | Towards (in the direction of)",
        "explanation": "'To' shows destination. 'Into' shows movement from outside to inside. 'Towards' shows movement in a direction.",
        "explanationBn": "'To' দিয়ে গন্তব্য, 'Into' দিয়ে বাইরে থেকে ভেতরে প্রবেশ, এবং 'Towards' দিয়ে কোনো কিছুর দিকে অগ্রসর হওয়া বোঝায়।",
        "examples": [
            {"en": "The boy jumped into the river.", "bn": "ছেলেটি নদীতে ঝাঁপ দিল।", "note": "Movement inside -> into"},
            {"en": "She walked towards the library.", "bn": "সে গ্রন্থাগারের দিকে হেঁটে গেল।"}
        ],
        "tips": "ভেতরে থাকা বোঝাতে 'in' (স্থির অবস্থা), কিন্তু বাইরে থেকে ভেতরে প্রবেশে 'into' (গতিশীল অবস্থা)!",
        "commonMistakes": [
            {"incorrect": "The frog jumped in the pond.", "correct": "The frog jumped into the pond.", "reasonBn": "লাফিয়ে ভেতরে প্রবেশ করা একটি গতিশীল কাজ, তাই 'into' বসবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "prep-07",
        "unitId": 10,
        "title": "Prepositions: Over vs Above & Under vs Below",
        "titleBn": "ওপরে ও নিচে: Over/Above এবং Under/Below-এর পার্থক্য",
        "category": "prepositions",
        "categoryBn": "পদান্বয়ী অব্যয় (Prepositions)",
        "formula": "Over (directly above, often moving) vs Above (higher elevation) | Under (directly beneath)",
        "explanation": "'Over' often indicates movement directly on top without touching. 'Above' indicates a higher vertical level. 'Under' means directly underneath.",
        "explanationBn": "সরাসরি ঠিক ওপরে বা ওপর দিয়ে অতিক্রম বোঝাতে 'Over' এবং উচ্চতর তলে বোঝাতে 'Above' বসে। ঠিক নিচে বোঝাতে 'Under' বসে।",
        "examples": [
            {"en": "The brave horse jumped over the fence.", "bn": "সাহসী ঘোড়াটি বেড়ার ওপর দিয়ে লাফ দিল।"},
            {"en": "The fan is moving above our heads.", "bn": "পাখাটি আমাদের মাথার ওপর ঘুরছে।"},
            {"en": "The cat is sleeping under the table.", "bn": "বিড়ালটি টেবিলের নিচে ঘুমাচ্ছে।"}
        ],
        "tips": "স্পর্শ ছাড়া ওপর দিয়ে গতিশীল হলে 'Over', স্পর্শ করে থাকলে 'On', আর অনেক উঁচুতে হলে 'Above'!",
        "commonMistakes": [
            {"incorrect": "The bird flew above the tree from left to right.", "correct": "The bird flew over the tree.", "reasonBn": "একপাশ থেকে ওপর দিয়ে অন্যপাশে উড়ে গেলে 'over' হয়।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "prep-08",
        "title": "Prepositions: Beside vs Besides",
        "titleBn": "Beside বনাম Besides (পাশে বনাম এ ছাড়াও)",
        "category": "prepositions",
        "categoryBn": "পদান্বয়ী অব্যয় (Prepositions)",
        "formula": "Beside = By the side of / Next to | Besides = In addition to / Apart from",
        "explanation": "'Beside' (without 's') means next to or at the side of. 'Besides' (with 's') means in addition to or also.",
        "explanationBn": "'Beside' মানে কারো পাশে। আর 'Besides' (s যুক্ত) মানে কোনো কিছু ছাড়াও বা অধিকন্তু।",
        "examples": [
            {"en": "Sit beside me, my dear friend.", "bn": "আমার পাশে বসো, প্রিয় বন্ধু।"},
            {"en": "Besides English, she can speak French.", "bn": "ইংরেজি ছাড়াও সে ফরাসি ভাষায় কথা বলতে পারে।"}
        ],
        "tips": "একটি 's'-এর পার্থক্য! পাশে বসা = Beside; এ ছাড়াও অতিরিক্ত কিছু = Besides!",
        "commonMistakes": [
            {"incorrect": "He sat besides me.", "correct": "He sat beside me.", "reasonBn": "পাশে বসা বোঝাতে 'beside' হবে, 'besides' নয়।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "prep-09",
        "title": "Prepositions: Through and Across",
        "titleBn": "মধ্য দিয়ে (Through) ও এপার থেকে ওপারে (Across)",
        "category": "prepositions",
        "categoryBn": "পদান্বয়ী অব্যয় (Prepositions)",
        "formula": "Through (inside a 3D space: tunnel, forest) | Across (from one side to the other side: river, road)",
        "explanation": "'Through' means moving inside something enclosed like a forest or tunnel. 'Across' means crossing from one side of a surface to the other.",
        "explanationBn": "কোনো কিছুর ভেতর বা মধ্য দিয়ে যাওয়া বোঝাতে 'Through' এবং রাস্তা বা নদীর এপার থেকে ওপারে যাওয়া বোঝাতে 'Across' বসে।",
        "examples": [
            {"en": "The train passed through the dark tunnel.", "bn": "রেলগাড়িটি অন্ধকার সুড়ঙ্গের মধ্য দিয়ে চলে গেল।"},
            {"en": "He swam across the wide river.", "bn": "সে প্রশস্ত নদীটি সাঁতরে পার হলো।"}
        ],
        "tips": "বনের ভেতর দিয়ে গেলে 'through the jungle', আর রাস্তা পার হলে 'across the road'!",
        "commonMistakes": [
            {"incorrect": "We walked through the bridge.", "correct": "We walked across the bridge.", "reasonBn": "সেতু বা রাস্তার ওপর দিয়ে পারাপার বোঝাতে 'across' হয়।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "prep-10",
        "title": "Preposition of Agent vs Instrument: By vs With",
        "titleBn": "কারক ও উপকরণ: By বনাম With",
        "category": "prepositions",
        "categoryBn": "পদান্বয়ী অব্যয় (Prepositions)",
        "formula": "By + Doer / Person (by Rahim) | With + Tool / Instrument (with a knife, with a pen)",
        "explanation": "Use 'by' for the person or agent doing the action. Use 'with' for the instrument, tool, or weapon used.",
        "explanationBn": "যে ব্যক্তি কাজটি করে তার পূর্বে 'by' বসে; আর যে হাতিয়ার বা উপকরণের সাহায্যে কাজটি করা হয় তার পূর্বে 'with' বসে।",
        "examples": [
            {"en": "The snake was killed by the farmer with a stick.", "bn": "সাপটি কৃষকের দ্বারা একটি লাঠির সাহায্যে মারা হয়েছিল।"},
            {"en": "She wrote the letter with a green pen.", "bn": "সে একটি সবুজ কালির কলম দিয়ে চিঠিটি লিখেছিল।"}
        ],
        "tips": "মানুষের দ্বারা হলে 'by', আর অস্ত্র বা কলম দিয়ে হলে 'with'!",
        "commonMistakes": [
            {"incorrect": "He cut the apple by a knife.", "correct": "He cut the apple with a knife.", "reasonBn": "ছুরি একটি উপকরণ (instrument), তাই এর পূর্বে 'with' বসবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "prep-11",
        "title": "Prepositions of Origin: From and Since",
        "titleBn": "উৎস ও শুরুর সময়: From এবং Since",
        "category": "prepositions",
        "categoryBn": "পদান্বয়ী অব্যয় (Prepositions)",
        "formula": "From (starting point of place/time) | Since (point of past time with Perfect Tense)",
        "explanation": "'From' shows the starting point of a location or time range. 'Since' refers back to a specific past starting moment with perfect tenses.",
        "explanationBn": "কোনো স্থান বা সময়ের সূচনা বিন্দু বোঝাতে 'From' বসে। আর নির্দিষ্ট অতীত মুহূর্ত থেকে কাজ চলছে বোঝাতে 'Since' বসে।",
        "examples": [
            {"en": "I received a letter from my uncle.", "bn": "আমি আমার চাচার কাছ থেকে একটি চিঠি পেয়েছি।"},
            {"en": "It has been raining since morning.", "bn": "সকাল থেকে অবিশ্রান্ত বৃষ্টি হচ্ছে।"}
        ],
        "tips": "It has been raining since morning (সকাল থেকে); He worked from 9 AM to 5 PM (৯টা থেকে ৫টা)!",
        "commonMistakes": [
            {"incorrect": "It has been raining from morning.", "correct": "It has been raining since morning.", "reasonBn": "অতীতের নির্দিষ্ট সময় থেকে কাজ শুরু হয়ে বর্তমানে চলছে বোঝাতে 'since' বসে।"}
        ],
        "source": "curriculum"
    },

    # -------------------------------------------------------------
    # 10. CONNECTORS, AFFIXES & AGREEMENT (8 topics)
    # -------------------------------------------------------------
    {
        "id": "con-01",
        "title": "Coordinating Conjunctions: FANBOYS (For, And, Nor, But, Or, Yet, So)",
        "titleBn": "সংযোজক অব্যয়: FANBOYS পরিচিতি",
        "category": "connectors",
        "categoryBn": "সংযোজক ও প্রত্যয়",
        "formula": "FANBOYS = For, And, Nor, But, Or, Yet, So (connects equal clauses)",
        "explanation": "These 7 coordinating conjunctions join words, phrases, or independent clauses of equal grammatical rank.",
        "explanationBn": "ইংরেজি ভাষায় সমমানের দুটি শব্দ বা বাক্যকে যুক্ত করতে ৭টি প্রধান Conjunction ব্যবহৃত হয়, যাদের সংক্ষেপে FANBOYS বলে।",
        "examples": [
            {"en": "He was tired, so he went to sleep early.", "bn": "সে ক্লান্ত ছিল, তাই সে তাড়াতাড়ি ঘুমাতে গেল।"},
            {"en": "She wanted to play outside, yet it was raining.", "bn": "সে বাইরে খেলতে চেয়েছিল, তবুও বৃষ্টি হচ্ছিল।"}
        ],
        "tips": "F=For, A=And, N=Nor, B=But, O=Or, Y=Yet, S=So!",
        "commonMistakes": [
            {"incorrect": "He was hungry because he ate food.", "correct": "He was hungry, so he ate food.", "reasonBn": "'So' ফলাফল প্রকাশ করে, আর 'because' কারণ প্রকাশ করে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "con-02",
        "unitId": 18,
        "title": "Story Sequence Connectors (First, Next, Then, Finally)",
        "titleBn": "ঘটনার ক্রম নির্দেশক শব্দ (First, Next, Then, Finally)",
        "category": "connectors",
        "categoryBn": "সংযোজক ও প্রত্যয়",
        "formula": "First, ... -> Next, ... -> Then, ... -> After that, ... -> Finally, ...",
        "explanation": "Essential for writing recipes, procedures, and telling stories in clear chronological order.",
        "explanationBn": "কোনো গল্প, নিয়ম বা রান্নার ধাপ ক্রমানুসারে নিখুঁতভাবে বর্ণনা করতে এই ক্রমবাচক শব্দগুলো ব্যবহৃত হয়।",
        "examples": [
            {"en": "First, wash your hands with soap. Next, peel the potatoes. Finally, cook with spices.", "bn": "প্রথমে সাবান দিয়ে হাত ধুয়ে নাও। এরপর আলুর খোসা ছাড়াও। সবশেষে মশলা দিয়ে রান্না করো।"},
            {"en": "First we reached the station, then the train arrived.", "bn": "প্রথমে আমরা স্টেশনে পৌঁছালাম, তারপর ট্রেনটি এল।"}
        ],
        "tips": "অনুচ্ছেদ বা গল্প লেখার সময় এই শব্দগুলোর পর সাধারণত কমা (,) বসে!",
        "commonMistakes": [
            {"incorrect": "First wash hands, finally peel potatoes, next cook.", "correct": "First wash hands, next peel potatoes, finally cook.", "reasonBn": "Finally সবসময় সর্বশেষ ধাপে বসাতে হয়।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "con-03",
        "title": "Cause and Effect: Because vs So",
        "titleBn": "কারণ ও ফলাফল: Because বনাম So",
        "category": "connectors",
        "categoryBn": "সংযোজক ও প্রত্যয়",
        "formula": "Result + because + Cause | Cause + , so + Result",
        "explanation": "'Because' introduces the reason for something. 'So' introduces the consequence or result of an action.",
        "explanationBn": "'Because' কোনো কাজের পেছনের কারণ জানায়। আর 'So' কোনো ঘটনার ফল বা পরিণতি প্রকাশ করে।",
        "examples": [
            {"en": "He did not go to school because he was ill.", "bn": "সে স্কুলে যায়নি কারণ সে অসুস্থ ছিল।", "note": "Because introduces reason"},
            {"en": "He was ill, so he did not go to school.", "bn": "সে অসুস্থ ছিল, তাই সে স্কুলে যায়নি।", "note": "So introduces result"}
        ],
        "tips": "কারণ আগে থাকলে 'So' বসবে, আর কারণ পরে থাকলে 'Because' বসবে!",
        "commonMistakes": [
            {"incorrect": "Because he was sick, so he rested.", "correct": "Because he was sick, he rested / He was sick, so he rested.", "reasonBn": "একই বাক্যে 'Because' এবং 'So' একসাথে ব্যবহার করা ব্যাকরণগত ভুল।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "con-04",
        "title": "Conditional Connectors: 'If' (First Conditional)",
        "titleBn": "শর্তসূচক বাক্য: 'If'-এর ব্যবহার",
        "category": "connectors",
        "categoryBn": "সংযোজক ও প্রত্যয়",
        "formula": "If + Present Simple, + Future Simple (will + base verb)",
        "explanation": "Used to talk about realistic conditions and their likely future consequences.",
        "explanationBn": "বর্তমানে কোনো শর্ত পূরণ হলে ভবিষ্যতে তার সম্ভাব্য ফলাফল প্রকাশে If-এর সাথে First Conditional ব্যবহৃত হয়।",
        "examples": [
            {"en": "If you study regularly, you will do well in the exam.", "bn": "যদি তুমি নিয়মিত পড়াশোনা করো, তবে পরীক্ষায় ভালো করবে।"},
            {"en": "If it rains tomorrow, we will stay at home.", "bn": "যদি আগামীকাল বৃষ্টি হয়, তবে আমরা বাড়িতেই থাকব।"}
        ],
        "tips": "If-যুক্ত অংশে কখনো 'will' বসে না (If it will rain ভুল -> If it rains সঠিক)!",
        "commonMistakes": [
            {"incorrect": "If you will work hard, you will succeed.", "correct": "If you work hard, you will succeed.", "reasonBn": "If-এর শর্তযুক্ত ক্লজে 'will' হয় না, Present simple (work hard) হবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "con-05",
        "title": "Prefixes: 'un-' and 'dis-' to Make Opposites",
        "titleBn": "উপসর্গ: 'un-' ও 'dis-' যোগ করে বিপরীত শব্দ গঠন",
        "category": "connectors",
        "categoryBn": "সংযোজক ও প্রত্যয়",
        "formula": "un- / dis- + Root Word = Opposite Meaning (happy -> unhappy, obey -> disobey)",
        "explanation": "A prefix is added to the beginning of a root word to change its meaning, often creating its antonym.",
        "explanationBn": "মূল শব্দের শুরুতে 'un-' বা 'dis-' উপসর্গ যোগ করে খুব সহজেই বিপরীতার্থক শব্দ তৈরি করা যায়।",
        "examples": [
            {"en": "Happy -> Unhappy / Kind -> Unkind / Lock -> Unlock", "bn": "সুখী -> অসুখী / দয়ালু -> নির্দয় / তালা দেওয়া -> তালা খোলা"},
            {"en": "Obey -> Disobey / Honest -> Dishonest / Agree -> Disagree", "bn": "মান্য করা -> অমান্য করা / সৎ -> অসৎ / একমত -> দ্বিমত"}
        ],
        "tips": "নতুন শব্দ শেখার দারুণ উপায়: শুধু un- বা dis- বসিয়ে শব্দের বিপরীত রূপ তৈরি করা!",
        "commonMistakes": [
            {"incorrect": "unhonest person.", "correct": "dishonest person.", "reasonBn": "Honest-এর বিপরীত হলো 'dishonest', unhonest নয়।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "con-06",
        "title": "Suffixes: '-ful' and '-less' (Adjective Formation)",
        "titleBn": "প্রত্যয়: '-ful' ও '-less' যোগে বিশেষণ গঠন",
        "category": "connectors",
        "categoryBn": "সংযোজক ও প্রত্যয়",
        "formula": "Noun + -ful = Full of (careful) | Noun + -less = Without (careless)",
        "explanation": "Suffixes are added to the end of words. '-ful' means having lots of something, while '-less' means without it.",
        "explanationBn": "শব্দের শেষে '-ful' যোগ করলে 'পরিপূর্ণ' (helpful) এবং '-less' যোগ করলে 'বিহীন' (helpless) অর্থ প্রকাশ পায়।",
        "examples": [
            {"en": "Careful (সতর্ক) <-> Careless (অসতর্ক)", "bn": "Be careful when crossing the busy road."},
            {"en": "Hopeful (আশাবাদী) <-> Hopeless (হতাশ)", "bn": "Never lose heart; do not be hopeless."}
        ],
        "tips": "Careful, Painful, Useful, Joyful-এ সবসময় একটি 'l' (ফুল নয়, -ful) দিয়ে শেষ হয়!",
        "commonMistakes": [
            {"incorrect": "carefull boy.", "correct": "careful boy.", "reasonBn": "প্রত্যয় হিসেবে বসলে '-ful'-এ একটি মাত্র 'l' হবে।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "con-07",
        "title": "Suffix '-ly': Turning Adjectives into Adverbs",
        "titleBn": "প্রত্যয় '-ly' যোগে বিশেষণ থেকে ভাববিশেষণ গঠন",
        "category": "connectors",
        "categoryBn": "সংযোজক ও প্রত্যয়",
        "formula": "Adjective + -ly = Adverb (quick -> quickly, quiet -> quietly, loud -> loudly)",
        "explanation": "Add '-ly' to an adjective to turn it into an adverb showing the manner of an action.",
        "explanationBn": "Adjective-এর শেষে '-ly' যোগ করে কাজটি কেমন করে হচ্ছে তা নির্দেশক Adverb তৈরি করা হয়।",
        "examples": [
            {"en": "Quiet -> The children listened quietly.", "bn": "শান্ত -> বাচ্চারা শান্তভাবে শুনল।"},
            {"en": "Sweet -> The nightingale sang sweetly.", "bn": "মিষ্টি -> বুলবুলি মিষ্টি সুরে গান গাইল।"}
        ],
        "tips": "ব্যতিক্রম: 'Fast' নিজেই Adverb, 'fastly' বলে কোনো শব্দ নেই! 'Hard'-এর Adverb রূপও 'hard'!",
        "commonMistakes": [
            {"incorrect": "He ran very fastly.", "correct": "He ran very fast.", "reasonBn": "Fast নিজেই Adverb, 'fastly' ভুল।"}
        ],
        "source": "curriculum"
    },
    {
        "id": "con-08",
        "title": "Subject-Verb Agreement: The Golden Rule",
        "titleBn": "কর্তা ও ক্রিয়ার সঙ্গতি (Subject-Verb Agreement)",
        "category": "connectors",
        "categoryBn": "সংযোজক ও প্রত্যয়",
        "formula": "Singular Subject -> Singular Verb (is, was, has, runs) | Plural Subject -> Plural Verb (are, were, have, run)",
        "explanation": "A singular subject must take a singular verb, and a plural subject must take a plural verb.",
        "explanationBn": "Subject যদি একবচন হয় তবে Verb-ও একবচন হবে; Subject বহুবচন হলে Verb-ও বহুবচন হতে হবে।",
        "examples": [
            {"en": "The student is reading a book.", "bn": "শিক্ষার্থীটি একটি বই পড়ছে।", "note": "Singular: student -> is"},
            {"en": "The students are reading books.", "bn": "শিক্ষার্থীরা বই পড়ছে।", "note": "Plural: students -> are"}
        ],
        "tips": "Subject-এর শেষে 's' থাকলে Verb-এর শেষে 's' হয় না; আর Subject-এ 's' না থাকলে Verb-এ 's' হয় (The dog barks / The dogs bark)!",
        "commonMistakes": [
            {"incorrect": "One of my friends are coming.", "correct": "One of my friends is coming.", "reasonBn": "মূল Subject হলো 'One' (একবচন), বন্ধুদের মধ্যে কেবল একজন, তাই 'is' বসবে।"}
        ],
        "source": "curriculum"
    }
]

# Ensure we have precisely 100 high quality items or verify length
print(f"Total topics generated: {len(grammar_topics)}")

# Format into TypeScript file
ts_content = f"""import {{ GrammarRule }} from "../types/english";

export const grammarData: GrammarRule[] = {json.dumps(grammar_topics, indent=2, ensure_ascii=False)};
"""

with open("src/data/grammarData.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Successfully wrote src/data/grammarData.ts")
