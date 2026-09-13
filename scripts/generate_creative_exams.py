# -*- coding: utf-8 -*-
"""
Generates 20 authentic, curriculum-aligned creative exam passage sets for Units 1-20
Matching Bangladeshi Class 5 Terminal Exam Question Pattern:
Passage -> 1. Matching (5m) -> 2. True/False (6m) -> 3. Short Questions (10m) -> 4. Short Composition (10m)
"""

import json

creative_exams = [
    {
        "id": "creative-u1",
        "unitId": 1,
        "unitTitle": "Unit 1: At the Library",
        "passageType": "seen",
        "passageTitle": "Visiting the Public Library and Meeting Rupa",
        "passageText": "Rina and Omar went to the public library on a sunny afternoon. The library was calm, neat, and quiet. There were hundreds of colorful books neatly arranged on wooden shelves. While looking for science fiction, they met a new girl named Rupa. Rupa was a student of Class 5 who loved fairy tales and adventure stories. Omar showed Rupa how to borrow books using a library card. The librarian, Mr. Shafiq, smiled and helped them issue three books. Before leaving, Rupa thanked Rina and Omar warmly for their kind help.",
        "passageTextBn": "এক রৌদ্রোজ্জ্বল বিকেলে রিনা ও ওমর গণগ্রন্থাগারে গিয়েছিল। লাইব্রেরিটি ছিল শান্ত, পরিপাটি এবং নীরব। কাঠের তাকে শত শত রঙিন বই সুন্দরভাবে সাজানো ছিল। কল্পবিজ্ঞানের বই খোঁজার সময় তাদের রূপা নামের এক নতুন মেয়ের সাথে পরিচয় হয়। রূপা পঞ্চম শ্রেণির শিক্ষার্থী এবং রূপকথা ও রোমাঞ্চকর গল্প পড়তে ভালোবাসত। ওমর রূপাকে দেখাল কীভাবে লাইব্রেরি কার্ড ব্যবহার করে বই ধার নিতে হয়। লাইব্রেরিয়ান জনাব শফিক হেসে তাদের তিনটি বই ইস্যু করে দিলেন। চলে যাওয়ার আগে রূপা তাদের আন্তরিক সাহায্যের জন্য রিনা ও ওমরকে ধন্যবাদ জানাল।",
        "matching": [
            {"word": "Calm", "meaning": "Peaceful and without noise", "distractors": ["Very crowded", "Full of sadness"]},
            {"word": "Shelves", "meaning": "Flat boards where books are kept"},
            {"word": "Fiction", "meaning": "Stories that are imagined by authors"},
            {"word": "Issue", "meaning": "To officially lend or give out something"},
            {"word": "Warmly", "meaning": "In a friendly and affectionate manner"}
        ],
        "trueFalse": [
            {
                "statement": "The public library was noisy and disorganized.",
                "statementBn": "পাবলিক লাইব্রেরিটি কোলাহলপূর্ণ ও অগোছালো ছিল।",
                "isTrue": False,
                "correctAnswer": "The public library was calm, neat, and quiet.",
                "explanationBn": "প্যাসেজে উল্লেখ আছে লাইব্রেরিটি ছিল শান্ত ও পরিপাটি।"
            },
            {
                "statement": "Rupa was studying in Class 5.",
                "statementBn": "রূপা পঞ্চম শ্রেণিতে পড়াশোনা করত।",
                "isTrue": True,
                "explanationBn": "প্যাসেজ অনুযায়ী রূপা পঞ্চম শ্রেণির শিক্ষার্থী ছিল।"
            },
            {
                "statement": "Omar showed Rupa how to use a library card.",
                "statementBn": "ওমর রূপাকে দেখিয়েছিল কীভাবে লাইব্রেরি কার্ড ব্যবহার করতে হয়।",
                "isTrue": True,
                "explanationBn": "ওমর রূপাকে লাইব্রেরি কার্ড ব্যবহারের নিয়ম দেখিয়েছিল।"
            },
            {
                "statement": "Mr. Shafiq was the school headmaster.",
                "statementBn": "জনাব শফিক ছিলেন বিদ্যালয়ের প্রধান শিক্ষক।",
                "isTrue": False,
                "correctAnswer": "Mr. Shafiq was the friendly librarian.",
                "explanationBn": "জনাব শফিক ছিলেন লাইব্রেরিয়ান।"
            },
            {
                "statement": "They borrowed five storybooks in total.",
                "statementBn": "তারা মোট পাঁচটি গল্পের বই ধার নিয়েছিল।",
                "isTrue": False,
                "correctAnswer": "They borrowed three books in total.",
                "explanationBn": "তারা মোট তিনটি বই ইস্যু করেছিল।"
            },
            {
                "statement": "Rupa thanked Rina and Omar before leaving.",
                "statementBn": "চলে যাওয়ার আগে রূপা রিনা ও ওমরকে ধন্যবাদ জানিয়েছিল।",
                "isTrue": True,
                "explanationBn": "রূপা তাদের ধন্যবাদ জানিয়েছিল।"
            }
        ],
        "shortQuestions": [
            {
                "question": "Where did Rina and Omar go on a sunny afternoon?",
                "questionBn": "রিনা ও ওমর এক রৌদ্রোজ্জ্বল বিকেলে কোথায় গিয়েছিল?",
                "modelAnswer": "Rina and Omar went to the public library on a sunny afternoon.",
                "modelAnswerBn": "রিনা ও ওমর এক রৌদ্রোজ্জ্বল বিকেলে গণগ্রন্থাগারে গিয়েছিল।"
            },
            {
                "question": "What kind of books did Rupa like to read?",
                "questionBn": "রূপা কী ধরনের বই পড়তে ভালোবাসত?",
                "modelAnswer": "Rupa liked to read fairy tales and adventure stories.",
                "modelAnswerBn": "রূপা রূপকথা এবং রোমাঞ্চকর গল্প পড়তে ভালোবাসত।"
            },
            {
                "question": "How did Omar help Rupa in the library?",
                "questionBn": "ওমর কীভাবে রূপাকে লাইব্রেরিতে সাহায্য করেছিল?",
                "modelAnswer": "Omar helped Rupa by showing her how to borrow books using a library card.",
                "modelAnswerBn": "ওমর রূপাকে লাইব্রেরি কার্ড দিয়ে বই ধার নেওয়ার নিয়ম দেখিয়ে সাহায্য করেছিল।"
            },
            {
                "question": "Who was Mr. Shafiq and what did he do?",
                "questionBn": "জনাব শফিক কে ছিলেন এবং তিনি কী করেছিলেন?",
                "modelAnswer": "Mr. Shafiq was the librarian who smiled and helped the children issue three books.",
                "modelAnswerBn": "জনাব শফিক ছিলেন লাইব্রেরিয়ান যিনি হাসিমুখে বাচ্চাদের তিনটি বই ইস্যু করে দিয়েছিলেন।"
            },
            {
                "question": "Why should we maintain silence inside a library?",
                "questionBn": "লাইব্রেরির ভেতরে আমাদের কেন নীরবতা বজায় রাখা উচিত?",
                "modelAnswer": "We should maintain silence so that everyone can read and study with full concentration without disturbance.",
                "modelAnswerBn": "আমাদের নীরবতা বজায় রাখা উচিত যাতে সবাই মনোযোগ দিয়ে নির্বিঘ্নে পড়তে ও পড়াশোনা করতে পারে।"
            }
        ],
        "composition": {
            "title": "A Visit to a Library",
            "titleBn": "একটি লাইব্রেরি পরিদর্শন",
            "instructions": "Write at least 5 sentences about your visit to a library by answering the guiding questions below.",
            "guidingQuestions": [
                "When did you visit a library?",
                "Where was the library located?",
                "What did you see inside?",
                "What kind of books did you read or borrow?",
                "How did you feel about the visit?"
            ],
            "modelParagraph": "Last Saturday morning, I visited our local town public library with my father. The library is located near our school and has a huge collection of books. Inside the library, I saw many students and elders reading quietly. I borrowed an exciting science fiction book using my new library card. I felt very happy and inspired because reading in a library enriches our knowledge.",
            "modelParagraphBn": "গত শনিবার সকালে আমি আমার বাবার সাথে আমাদের স্থানীয় গণগ্রন্থাগারে গিয়েছিলাম। লাইব্রেরিটি আমাদের স্কুলের কাছে অবস্থিত এবং এতে প্রচুর বইয়ের সংগ্রহ রয়েছে। ভেতরে আমি অনেক শিক্ষার্থী ও বয়োজ্যেষ্ঠদের শান্তভাবে পড়তে দেখেছি। আমি আমার নতুন লাইব্রেরি কার্ড দিয়ে একটি চমৎকার কল্পবিজ্ঞানের বই ধার নিয়েছিলাম। এই পরিদর্শনে আমি অত্যন্ত আনন্দিত হয়েছিলাম কারণ লাইব্রেরিতে পড়াশোনা জ্ঞান বৃদ্ধি করে।"
        }
    },
    {
        "id": "creative-u2",
        "unitId": 2,
        "unitTitle": "Unit 2: Our School Garden",
        "passageType": "seen",
        "passageTitle": "Working Together in the School Garden",
        "passageText": "The students of Class 5 created a lovely garden in front of their school building. Every morning before the bell rings, they water the blooming plants and pull out weeds. Jamal and Mita planted red roses, bright sunflowers, and fresh vegetables. Yesterday, a colorful swarm of butterflies and honeybees visited the flower bed. The head teacher praised all the students for keeping the environment green and tidy. Working together taught the boys and girls the value of teamwork and nature care.",
        "passageTextBn": "পঞ্চম শ্রেণির শিক্ষার্থীরা তাদের স্কুল ভবনের সামনে একটি সুন্দর বাগান তৈরি করেছে। প্রতিদিন সকালে ঘণ্টা পড়ার আগে তারা গাছে পানি দেয় এবং আগাছা তুলে ফেলে। জামাল ও মিতা লাল গোলাপ, উজ্জ্বল সূর্যমুখী এবং টাটকা শাকসবজি রোপণ করেছে। গতকাল একঝাঁক রঙিন প্রজাপতি ও মৌমাছি ফুলের বাগানে এসেছিল। প্রধান শিক্ষক পরিবেশ সবুজ ও পরিপাটি রাখার জন্য সকল শিক্ষার্থীর প্রশংসা করলেন। একসাথে কাজ করার মাধ্যমে ছেলেমেয়েরা দলগত কাজ ও প্রকৃতির যত্ন নেওয়ার গুরুত্ব শিখেছে।",
        "matching": [
            {"word": "Lovely", "meaning": "Very pleasant and beautiful", "distractors": ["Very dark", "Bitter taste"]},
            {"word": "Weeds", "meaning": "Unwanted wild plants growing in a garden"},
            {"word": "Swarm", "meaning": "A large group of flying insects moving together"},
            {"word": "Praised", "meaning": "Expressed warm approval and admiration"},
            {"word": "Teamwork", "meaning": "Cooperative effort by members of a group"}
        ],
        "trueFalse": [
            {
                "statement": "The garden was situated behind a dirty factory.",
                "statementBn": "বাগানটি একটি নোংরা কারখানার পেছনে ছিল।",
                "isTrue": False,
                "correctAnswer": "The garden was created in front of the school building.",
                "explanationBn": "বাগানটি স্কুলের ভবনের সামনে তৈরি করা হয়েছিল।"
            },
            {
                "statement": "The students water the plants every morning.",
                "statementBn": "শিক্ষার্থীরা প্রতিদিন সকালে গাছে পানি দেয়।",
                "isTrue": True,
                "explanationBn": "প্যাসেজে বলা হয়েছে তারা প্রতিদিন সকালে গাছে পানি দেয়।"
            },
            {
                "statement": "Butterflies and honeybees visited the flower bed.",
                "statementBn": "প্রজাপতি ও মৌমাছি ফুলের বাগানে এসেছিল।",
                "isTrue": True,
                "explanationBn": "একঝাঁক প্রজাপতি ও মৌমাছি বাগানে এসেছিল।"
            },
            {
                "statement": "The head teacher was angry with the students.",
                "statementBn": "প্রধান শিক্ষক শিক্ষার্থীদের ওপর রেগে গিয়েছিলেন।",
                "isTrue": False,
                "correctAnswer": "The head teacher praised all the students warmly.",
                "explanationBn": "প্রধান শিক্ষক তাদের প্রশংসা করেছিলেন।"
            },
            {
                "statement": "The garden had red roses and sunflowers.",
                "statementBn": "বাগানে লাল গোলাপ ও সূর্যমুখী ছিল।",
                "isTrue": True,
                "explanationBn": "বাগানে লাল গোলাপ ও সূর্যমুখী রোপণ করা হয়েছিল।"
            },
            {
                "statement": "Gardening teaches children nothing about nature.",
                "statementBn": "বাগান করা শিশুদের প্রকৃতি সম্পর্কে কিছুই শেখায় না।",
                "isTrue": False,
                "correctAnswer": "Gardening taught the children teamwork and nature care.",
                "explanationBn": "বাগান করার মাধ্যমে শিশুরা দলগত কাজ ও প্রকৃতির যত্ন নেওয়া শেখে।"
            }
        ],
        "shortQuestions": [
            {
                "question": "Who created the lovely garden and where was it?",
                "questionBn": "কারা সুন্দর বাগানটি তৈরি করেছিল এবং এটি কোথায় ছিল?",
                "modelAnswer": "The students of Class 5 created the lovely garden in front of their school building.",
                "modelAnswerBn": "পঞ্চম শ্রেণির শিক্ষার্থীরা তাদের বিদ্যালয় ভবনের সামনে সুন্দর বাগানটি তৈরি করেছিল।"
            },
            {
                "question": "What do the students do every morning before class starts?",
                "questionBn": "ক্লাস শুরু হওয়ার আগে প্রতিদিন সকালে শিক্ষার্থীরা কী করে?",
                "modelAnswer": "Every morning, they water the blooming plants and pull out weeds.",
                "modelAnswerBn": "প্রতিদিন সকালে তারা প্রস্ফুটিত গাছে পানি দেয় এবং আগাছা পরিষ্কার করে।"
            },
            {
                "question": "Which flowers and insects were mentioned in the passage?",
                "questionBn": "প্যাসেজে কোন কোন ফুল এবং কী কী কীটের কথা উল্লেখ আছে?",
                "modelAnswer": "Red roses and sunflowers were mentioned, along with a swarm of butterflies and honeybees.",
                "modelAnswerBn": "লাল গোলাপ ও সূর্যমুখী ফুল এবং প্রজাপতি ও মৌমাছির ঝাঁকের কথা উল্লেখ আছে।"
            },
            {
                "question": "Why did the head teacher praise the students?",
                "questionBn": "প্রধান শিক্ষক কেন শিক্ষার্থীদের প্রশংসা করেছিলেন?",
                "modelAnswer": "The head teacher praised the students for keeping the environment green and tidy.",
                "modelAnswerBn": "পরিবেশ সবুজ ও পরিপাটি রাখার জন্য প্রধান শিক্ষক শিক্ষার্থীদের প্রশংসা করেছিলেন।"
            },
            {
                "question": "What important lessons did the students learn from gardening?",
                "questionBn": "বাগান করার মাধ্যমে শিক্ষার্থীরা কী গুরুত্বপূর্ণ শিক্ষা পেয়েছিল?",
                "modelAnswer": "The students learned the value of teamwork and caring for Mother Nature.",
                "modelAnswerBn": "শিক্ষার্থীরা দলগত কাজ ও প্রকৃতির যত্ন নেওয়ার মূল্যবান শিক্ষা লাভ করেছিল।"
            }
        ],
        "composition": {
            "title": "Our School Garden",
            "titleBn": "আমাদের বিদ্যালয় বাগান",
            "instructions": "Write at least 5 sentences about your school garden answering the guiding questions.",
            "guidingQuestions": [
                "Does your school have a garden?",
                "Where is it located?",
                "What plants and flowers grow there?",
                "How do you take care of the garden?",
                "Why do you like your school garden?"
            ],
            "modelParagraph": "We have a beautiful flower and vegetable garden in front of our school. In our garden, we grow roses, marigolds, sunflowers, and green vegetables. My classmates and I water the plants and pull out weeds every morning. A colorful swarm of butterflies often comes to our garden. I love our school garden because it makes our school premises fresh and lively.",
            "modelParagraphBn": "আমাদের স্কুলের সামনে একটি সুন্দর ফুল ও শাকসবজির বাগান আছে। আমাদের বাগানে আমরা গোলাপ, গাঁদা, সূর্যমুখী ও শাকসবজি চাষ করি। আমার সহপাঠী ও আমি প্রতিদিন সকালে গাছে পানি দিই এবং আগাছা পরিষ্কার করি। রঙিন প্রজাপতির ঝাঁক প্রায়ই আমাদের বাগানে আসে। আমি আমাদের বিদ্যালয়ের বাগান খুব ভালোবাসি কারণ এটি আমাদের স্কুল প্রাঙ্গণকে সতেজ ও প্রাণবন্ত রাখে।"
        }
    },
    {
        "id": "creative-u3",
        "unitId": 3,
        "unitTitle": "Unit 3: Be Quiet, Please",
        "passageType": "seen",
        "passageTitle": "Polite Behavior and Etiquette in Daily Life",
        "passageText": "Good manners and politeness make our social life peaceful. In the classroom, students should listen attentively when the teacher explains a lesson. When we need someone's help, we should always say 'Please' and 'Thank you'. If we make an unintentional mistake, saying 'I am sorry' solves conflicts quickly. In hospitals, libraries, and prayer places, we must keep quiet so that sick patients and readers are not disturbed. Polite words are like keys that open people's hearts.",
        "passageTextBn": "ভদ্র আচরণ ও বিনম্রতা আমাদের সামাজিক জীবনকে শান্তিময় করে তোলে। শ্রেণীকক্ষে শিক্ষক যখন পাঠ বুঝিয়ে দেন তখন শিক্ষার্থীদের মনোযোগ দিয়ে শোনা উচিত। কারো সাহায্যের প্রয়োজন হলে সর্বদা 'Please' এবং 'Thank you' বলা উচিত। অনিচ্ছাকৃত ভুল হলে 'I am sorry' বললে বিরোধ দ্রুত মিটে যায়। হাসপাতাল, লাইব্রেরি এবং উপাসনালয়ে আমাদের শান্ত থাকা উচিত যাতে অসুস্থ রোগী ও পাঠকদের অসুবিধা না হয়। ভদ্র শব্দাবলি চাবির মতো যা মানুষের হৃদয় উন্মুক্ত করে।",
        "matching": [
            {"word": "Manners", "meaning": "Polite social behavior towards others", "distractors": ["Loud noise", "Careless running"]},
            {"word": "Attentively", "meaning": "Listening or watching with full concentration"},
            {"word": "Conflicts", "meaning": "Disagreements or arguments between people"},
            {"word": "Disturbed", "meaning": "Bothered or interrupted in peace"},
            {"word": "Polite", "meaning": "Showing good manners and respect"}
        ],
        "trueFalse": [
            {
                "statement": "Good manners cause quarrels among friends.",
                "statementBn": "ভালো আচরণ বন্ধুদের মাঝে ঝগড়া তৈরি করে।",
                "isTrue": False,
                "correctAnswer": "Good manners make our social life peaceful and pleasant.",
                "explanationBn": "ভালো আচরণ জীবনকে শান্তিময় করে তোলে।"
            },
            {
                "statement": "We should say 'Please' when asking for help.",
                "statementBn": "সাহায্য চাওয়ার সময় আমাদের 'Please' বলা উচিত।",
                "isTrue": True,
                "explanationBn": "অনুরোধ করতে 'Please' বলা ভদ্রতা।"
            },
            {
                "statement": "Saying 'I am sorry' helps to solve conflicts.",
                "statementBn": "'I am sorry' বললে বিরোধ মেটাতে সাহায্য করে।",
                "isTrue": True,
                "explanationBn": "ক্ষমা চাইলে সহজেই ভুল বোঝাবুঝি দূর হয়।"
            },
            {
                "statement": "Students should shout loudly in the hospital.",
                "statementBn": "শিক্ষার্থীদের হাসপাতালে জোরে চিৎকার করা উচিত।",
                "isTrue": False,
                "correctAnswer": "Students must keep quiet in hospitals and libraries.",
                "explanationBn": "হাসপাতালে অসুস্থ রোগীর স্বার্থে নীরব থাকা বাধ্যতামূলক।"
            },
            {
                "statement": "Polite words are compared to keys in the passage.",
                "statementBn": "প্যাসেজে বিনম্র শব্দকে চাবির সাথে তুলনা করা হয়েছে।",
                "isTrue": True,
                "explanationBn": "ভদ্র শব্দকে হৃদয়ের চাবির সাথে তুলনা করা হয়েছে।"
            },
            {
                "statement": "You do not need to listen when teachers speak.",
                "statementBn": "শিক্ষক কথা বললে তোমার শোনার প্রয়োজন নেই।",
                "isTrue": False,
                "correctAnswer": "Students should listen attentively when teachers speak.",
                "explanationBn": "শিক্ষকের কথা মনোযোগ দিয়ে শোনা উচিত।"
            }
        ],
        "shortQuestions": [
            {
                "question": "What makes our social life peaceful and pleasant?",
                "questionBn": "কী আমাদের সামাজিক জীবনকে শান্তিময় ও সুন্দর করে?",
                "modelAnswer": "Good manners and politeness make our social life peaceful and pleasant.",
                "modelAnswerBn": "ভালো শিষ্টাচার এবং বিনম্রতা আমাদের সামাজিক জীবনকে শান্তিময় করে তোলে।"
            },
            {
                "question": "What should we say when we ask for someone's help?",
                "questionBn": "কারো সাহায্য চাওয়ার সময় আমাদের কী বলা উচিত?",
                "modelAnswer": "We should say 'Please' when asking for help and 'Thank you' after receiving it.",
                "modelAnswerBn": "সাহায্য চাওয়ার সময় আমাদের 'Please' এবং সাহায্য পাওয়ার পর 'Thank you' বলা উচিত।"
            },
            {
                "question": "Where must we keep quiet and why?",
                "questionBn": "কোথায় আমাদের নীরব থাকা উচিত এবং কেন?",
                "modelAnswer": "We must keep quiet in hospitals, libraries, and prayer halls so that patients and readers are not disturbed.",
                "modelAnswerBn": "হাসপাতাল, লাইব্রেরি ও উপাসনালয়ে নীরব থাকা উচিত যাতে রোগী ও পাঠকরা বিরক্ত না হন।"
            },
            {
                "question": "How does saying 'I am sorry' help us?",
                "questionBn": "'I am sorry' বলা আমাদের কীভাবে সাহায্য করে?",
                "modelAnswer": "Saying 'I am sorry' helps us to solve conflicts and misunderstandings quickly.",
                "modelAnswerBn": "'I am sorry' বলা আমাদের দ্বন্দ্ব এবং ভুল বোঝাবুঝি দ্রুত সমাধান করতে সাহায্য করে।"
            },
            {
                "question": "Why are polite words compared to keys?",
                "questionBn": "বিনম্র শব্দাবলিকে কেন চাবির সাথে তুলনা করা হয়েছে?",
                "modelAnswer": "Polite words are compared to keys because they open people's hearts and earn their affection.",
                "modelAnswerBn": "বিনম্র শব্দাবলি চাবির মতো কারণ তা মানুষের মন জয় করে এবং স্নেহ ও শ্রদ্ধা অর্জন করে।"
            }
        ],
        "composition": {
            "title": "Good Manners in Classroom",
            "titleBn": "শ্রেণিকক্ষে উত্তম শিষ্টাচার",
            "instructions": "Write at least 5 sentences about good manners in the classroom answering the questions.",
            "guidingQuestions": [
                "Why are good manners important in school?",
                "How should you behave when your teacher enters?",
                "What words should you use when speaking to classmates?",
                "Why should you keep quiet during lessons?",
                "How do good manners help your future?"
            ],
            "modelParagraph": "Good manners are very important for every student in the classroom. When our teacher enters the room, we stand up and greet respectfully. We should always listen attentively to lessons without making unnecessary noise. When borrowing pens or erasers from friends, we must say 'Please' and 'Thank you'. Practicing good manners makes us beloved students and responsible human beings.",
            "modelParagraphBn": "শ্রেণিকক্ষে প্রতিটি শিক্ষার্থীর জন্য উত্তম শিষ্টাচার অত্যন্ত গুরুত্বপূর্ণ। শিক্ষক যখন কক্ষে প্রবেশ করেন তখন আমরা দাঁড়িয়ে সম্মান প্রদর্শন করি। অপ্রয়োজনীয় শব্দ না করে আমাদের পাঠ মনোযোগ সহকারে শোনা উচিত। বন্ধুদের কাছ থেকে কলম বা ইরেজার ধার নেওয়ার সময় 'Please' ও 'Thank you' বলতে হয়। ভালো শিষ্টাচার অনুশীলন আমাদের প্রিয় শিক্ষার্থী এবং দায়িত্বশীল মানুষ হিসেবে গড়ে তোলে।"
        }
    },
    {
        "id": "creative-u4",
        "unitId": 4,
        "unitTitle": "Unit 4: My Home District",
        "passageType": "seen",
        "passageTitle": "Discovering Kishoreganj: Land of History and Culture",
        "passageText": "Mamun's home district is Kishoreganj. It is situated about 145 kilometres northeast of Dhaka. The district comprises 13 upazilas and has a rich cultural heritage. The mighty river Narasunda flows across this charming town. Kishoreganj is world-famous for the historical Sholakia Eid Ground, where hundreds of thousands of people gather for Eid prayers. The magnificent Pagla Mosque is another sacred attraction. Furthermore, great historical personalities like the first female poet of Bengali literature Chandravati, renowned painter Zainul Abedin, and folklorist Upendrakishore Roy Chowdhury were born here.",
        "passageTextBn": "মামুনের নিজ জেলা কিশোরগঞ্জ। এটি ঢাকা থেকে প্রায় ১৪৫ কিলোমিটার উত্তর-পূর্বে অবস্থিত। জেলাটিতে ১৩টি উপজেলা রয়েছে এবং এর সমৃদ্ধ সাংস্কৃতিক ঐতিহ্য রয়েছে। মনোরম এই শহরের বুক চিরে বয়ে গেছে খরস্রোতা নরসুন্দা নদী। কিশোরগঞ্জ ঐতিহাসিক শোলাকিয়া ঈদগাহ ময়দানের জন্য বিশ্বখ্যাত, যেখানে লাখ লাখ মানুষ ঈদের নামাজ আদায় করতে সমবেত হন। দৃষ্টিনন্দন পাগলা মসজিদ আরেকটি পবিত্র আকর্ষণ। এছাড়াও বাংলা সাহিত্যের প্রথম নারী কবি চন্দ্রাবতী, বিখ্যাত চিত্রশিল্পী জয়নুল আবেদিন এবং শিশুসাহিত্যিক উপেন্দ্রকিশোর রায়চৌধুরীর মতো মহান ঐতিহাসিক ব্যক্তিরা এখানে জন্মগ্রহণ করেছিলেন।",
        "matching": [
            {"word": "Comprises", "meaning": "Consists of or is made up of", "distractors": ["Destroys completely", "Lacks anything"]},
            {"word": "Heritage", "meaning": "Valuable historical traditions passed through generations"},
            {"word": "Sacred", "meaning": "Holy and dedicated to religious purposes"},
            {"word": "Magnificent", "meaning": "Extremely beautiful and impressive"},
            {"word": "Renowned", "meaning": "Known or talked about by many people; famous"}
        ],
        "trueFalse": [
            {
                "statement": "Kishoreganj is located only 10 kilometres from Dhaka.",
                "statementBn": "কিশোরগঞ্জ ঢাকা থেকে মাত্র ১০ কিলোমিটার দূরে অবস্থিত।",
                "isTrue": False,
                "correctAnswer": "Kishoreganj is located about 145 kilometres northeast of Dhaka.",
                "explanationBn": "কিশোরগঞ্জ ঢাকা থেকে প্রায় ১৪৫ কিমি দূরে অবস্থিত।"
            },
            {
                "statement": "There are 13 upazilas in Kishoreganj district.",
                "statementBn": "কিশোরগঞ্জ জেলায় ১৩টি উপজেলা রয়েছে।",
                "isTrue": True,
                "explanationBn": "জেলাটিতে মোট ১৩টি উপজেলা আছে।"
            },
            {
                "statement": "The river Jamuna flows through the town of Kishoreganj.",
                "statementBn": "যমুনা নদী কিশোরগঞ্জ শহরের মধ্য দিয়ে প্রবাহিত হয়েছে।",
                "isTrue": False,
                "correctAnswer": "The river Narasunda flows across the town.",
                "explanationBn": "কিশোরগঞ্জ শহরের মধ্য দিয়ে নরসুন্দা নদী প্রবাহিত।"
            },
            {
                "statement": "Sholakia is famous for holding the largest Eid congregation.",
                "statementBn": "শোলাকিয়া দেশের বৃহত্তম ঈদ জামাতের জন্য বিখ্যাত।",
                "isTrue": True,
                "explanationBn": "শোলাকিয়ায় সবচেয়ে বড় ঈদের জামাত অনুষ্ঠিত হয়।"
            },
            {
                "statement": "Chandravati was the first female poet of Bengali literature.",
                "statementBn": "চন্দ্রাবতী বাংলা সাহিত্যের প্রথম নারী কবি ছিলেন।",
                "isTrue": True,
                "explanationBn": "চন্দ্রাবতী বাংলা সাহিত্যের আদি নারী কবি।"
            },
            {
                "statement": "Zainul Abedin was a famous cricketer.",
                "statementBn": "জয়নুল আবেদিন একজন বিখ্যাত ক্রিকেটার ছিলেন।",
                "isTrue": False,
                "correctAnswer": "Zainul Abedin was an internationally renowned painter.",
                "explanationBn": "জয়নুল আবেদিন ছিলেন বিশ্বখ্যাত চিত্রশিল্পী।"
            }
        ],
        "shortQuestions": [
            {
                "question": "Where is Kishoreganj located from Dhaka?",
                "questionBn": "কিশোরগঞ্জ ঢাকা থেকে কোথায় অবস্থিত?",
                "modelAnswer": "Kishoreganj is located about 145 kilometres northeast of Dhaka.",
                "modelAnswerBn": "কিশোরগঞ্জ ঢাকা থেকে প্রায় ১৪৫ কিলোমিটার উত্তর-পূর্বে অবস্থিত।"
            },
            {
                "question": "Which river flows through Kishoreganj town?",
                "questionBn": "কিশোরগঞ্জ শহরের মধ্য দিয়ে কোন নদী প্রবাহিত হয়েছে?",
                "modelAnswer": "The river Narasunda flows across Kishoreganj town.",
                "modelAnswerBn": "নরসুন্দা নদী কিশোরগঞ্জ শহরের মধ্য দিয়ে প্রবাহিত হয়েছে।"
            },
            {
                "question": "Why is Sholakia famous across Bangladesh?",
                "questionBn": "শোলাকিয়া কেন সমগ্র বাংলাদেশে বিখ্যাত?",
                "modelAnswer": "Sholakia is famous because the largest Eid prayer congregation takes place on its historical grounds.",
                "modelAnswerBn": "শোলাকিয়া বিখ্যাত কারণ এর ঐতিহাসিক ময়দানে বৃহত্তম ঈদের জামাত অনুষ্ঠিত হয়।"
            },
            {
                "question": "Name two famous persons born in Kishoreganj.",
                "questionBn": "কিশোরগঞ্জে জন্ম নেওয়া দুজন বিখ্যাত ব্যক্তির নাম বলো।",
                "modelAnswer": "The famous painter Zainul Abedin and the first Bengali female poet Chandravati were born in Kishoreganj.",
                "modelAnswerBn": "বিখ্যাত চিত্রশিল্পী জয়নুল আবেদিন এবং প্রথম নারী কবি চন্দ্রাবতী কিশোরগঞ্জে জন্মগ্রহণ করেছিলেন।"
            },
            {
                "question": "How many upazilas are there in Kishoreganj district?",
                "questionBn": "কিশোরগঞ্জ জেলায় কতটি উপজেলা রয়েছে?",
                "modelAnswer": "There are 13 upazilas in Kishoreganj district.",
                "modelAnswerBn": "কিশোরগঞ্জ জেলায় ১৩টি উপজেলা রয়েছে।"
            }
        ],
        "composition": {
            "title": "My Home District",
            "titleBn": "আমার নিজ জেলা",
            "instructions": "Write at least 5 sentences about your home district answering the guiding questions below.",
            "guidingQuestions": [
                "What is the name of your home district?",
                "Where is it situated in Bangladesh?",
                "What are the main rivers or famous places in your district?",
                "Who are some notable personalities born there?",
                "Why do you feel proud of your home district?"
            ],
            "modelParagraph": "The name of my home district is Kishoreganj. It is situated about 145 kilometres northeast of Dhaka. The river Narasunda flows across the town, and the famous Sholakia Eid Ground is located here. Great personalities like Shilpacharya Zainul Abedin and poet Chandravati were born in this land. I am very proud of my district because of its rich history, welcoming people, and cultural heritage.",
            "modelParagraphBn": "আমার নিজ জেলার নাম কিশোরগঞ্জ। এটি ঢাকা থেকে প্রায় ১৪৫ কিলোমিটার উত্তর-পূর্বে অবস্থিত। শহরের বুক চিরে নরসুন্দা নদী প্রবাহিত এবং বিখ্যাত শোলাকিয়া ঈদগাহ এখানে অবস্থিত। শিল্পাচার্য জয়নুল আবেদিন ও কবি চন্দ্রাবতীর মতো মহান ব্যক্তিরা এই মাটিতে জন্মগ্রহণ করেছিলেন। আমি আমার জেলা নিয়ে অত্যন্ত গর্বিত এর সমৃদ্ধ ইতিহাস, আন্তরিক মানুষ ও সাংস্কৃতিক ঐতিহ্যের জন্য।"
        }
    }
]

# Generate remaining units (5 to 20) with high quality curriculum content
units_info = [
    (5, "Student Council", "Democratic Elections in Primary School", "Students in Class 5 participated in the school council election to select their class leaders. Five students contested for different posts such as study monitor, sports leader, and cultural secretary. Every student cast their vote using a ballot paper into a sealed box. The election was fair and peaceful. Raju was elected as the council captain. The head teacher congratulated all participants and explained that leadership means serving others with honesty."),
    (6, "An Email from Indonesia", "Cultural Exchange between Aiman and Wayan", "Aiman received a warm email from his pen-friend Wayan who lives in Bali, Indonesia. Wayan wrote about Indonesian islands, traditional Batik clothes, and tropical fruits like durian and rambutan. Aiman wrote back describing Bangladesh's green paddy fields, the Royal Bengal Tiger, and the national fish Hilsa. Both friends shared photos of their schools. Writing emails helped them discover diverse Asian cultures and build a lifetime bond of global friendship."),
    (7, "The Sundarbans", "The Mangrove Wonderland of Bangladesh", "The Sundarbans is the largest mangrove forest in the world, located in the southwest of Bangladesh. It is intersected by hundreds of tidal rivers and creeks. The forest is the natural habitat of the majestic Royal Bengal Tiger, spotted deer, and saltwater crocodiles. Golpata and Sundari trees dominate the forest canopy. The Sundarbans also acts as a natural shield protecting coastal communities from severe sea storms and tidal surges."),
    (8, "A Field Trip to Remember", "Exploring the Historic Ruins of Mainamati", "Last month, the students of Class 5 went on a memorable educational study tour to Mainamati in Cumilla. They visited the ancient Buddhist monastery known as Shalban Vihara. They were amazed to see historical terracotta plaques, bronze sculptures, and ancient coins exhibited in the site museum. Their history teacher explained the rich archaeological heritage of ancient Bengal. The children returned home with unforgettable memories and renewed curiosity."),
    (9, "Get Ready to Listen", "Classroom Listening Skills and Audio Clues", "Listening attentively is a crucial skill for mastering English. During the morning English period, Mrs. Selina played an audio recording of everyday conversations. The students listened carefully to grasp the main idea and key details before writing their answers. They noticed how tone, pitch, and voice changes indicate whether a speaker is asking a question, making an invitation, or expressing astonishment. Regular listening practice builds fluent speech."),
    (10, "Poem: The Swing", "The Pure Joy of Swinging High in the Sky", "Swinging up in the air is one of the most delightful experiences for a child. When a swing goes up high, one can look over the school garden, green countryside, and riverbanks. The world looks bright, cheerful, and vast from above. As the swing drops down gently, cool breezes touch the child's smiling face. Robert Louis Stevenson's famous poem captures this universal childhood innocence and wonder of flying into blue skies."),
    (11, "Making Requests", "Using Polite Expressions at Home and School", "Politeness and warmth strengthen relationships between people. Whenever we ask for water, borrowing a notebook, or seeking directions, we should use 'Could you please' or 'Would you mind'. When responding, saying 'Certainly' or 'I would love to' demonstrates graciousness. If we cannot fulfill an invitation, we politely apologize with 'I am really sorry'. Courteous language creates harmony in our classrooms and families."),
    (12, "Eating Healthy", "Nutrition and Balanced Diet for Growing Children", "To stay healthy and perform well in school, students must consume a balanced diet. Food items from the four food groups provide essential nutrients: carbohydrates for energy, proteins for muscle growth, vitamins for disease prevention, and minerals for strong bones. Fresh green vegetables, seasonal fruits, eggs, and milk are far healthier than packaged junk snacks and soda. Drinking plenty of safe water keeps our bodies energized all day."),
    (13, "Quality Time Together", "Spending Meaningful Family Moments", "Modern life is busy, but spending meaningful time with family members brings true joy. In Niloy's household, family members gather every evening to share stories, assist with homework, and enjoy dinner together. Niloy helps his mother in the kitchen and plays carrom with his sister. On weekends, they tend to their rooftop garden and visit grandparents. These shared family rituals nurture affection, empathy, and security in young minds."),
    (14, "The Champion Girl", "Determination and Sportsmanship in Athletics", "Rupa is a fast runner from a small village who dreamed of winning the national school championship. Despite lacking expensive training shoes and modern facilities, she woke up at dawn to run along village mud roads. Her school sports teacher coached her with dedication. At the national championship in Dhaka, Rupa won the 100-meter gold medal. Her victory proved that dedication, perseverance, and hard work can overcome all obstacles."),
    (15, "Poem: The Secret Song", "Harmony between Wild Animals and Nature", "Every living creature in nature possesses a secret song of joy. The forest whispers through dancing leaves, while birds chant melodies from high tree branches. Deer leap gracefully across dewy grass, and tiny insects buzz in harmony. When human beings respect nature and avoid cutting down trees, the entire forest flourishes. The secret song reminds us that all creations are interconnected in the web of life."),
    (16, "The Giving Tree", "Selfless Love and Sacrifices of Trees", "Once, there was a loving banyan tree that cherished a young village boy. The boy would swing from its branches, eat sweet berries, and sleep peacefully under its green shade. As the boy grew into adulthood, he asked for timber to build a house, and the tree willingly offered its sturdy branches. Even when only an old stump remained, the tree offered its quiet seat for the weary old man. The story teaches true unconditional generosity."),
    (17, "The Air We Share", "Protecting Atmosphere and Combating Pollution", "Clean air is essential for the survival of humans, animals, and plants. Smoke from old vehicles, brick kilns, and burning plastic fills the atmosphere with toxic gases like carbon monoxide. When we breathe polluted air, we suffer from coughing, asthma, and lung diseases. To keep our atmosphere fresh, we must plant more leafy trees, stop dumping waste openly, and walk or cycle for short neighborhood trips."),
    (18, "Nakshi Kantha", "The Traditional Embroidered Quilt of Rural Bengal", "Nakshi Kantha is a century-old traditional folk art of rural Bangladesh. Village women stitch colorful artistic patterns onto layers of old cotton saris using colorful threads. Common motifs include lotus flowers, blooming creepers, elephants, peacocks, and rural village tales. It takes months of patient craftsmanship to complete a single quilt. Today, Nakshi Kantha is prized globally for its exquisite beauty and cultural heritage."),
    (19, "The Wind and the Sun", "Kindness is Stronger Than Harshness", "The North Wind and the Warm Sun engaged in an argument about who was stronger. Seeing a traveler walking down the road in a heavy overcoat, they agreed that whoever could make the traveler remove his coat would win. The Wind blew furiously with icy blasts, but the traveler only wrapped his coat tighter. Then the Sun shone gently with golden warmth. Feeling comfortably warm, the traveler took off his coat. Kindness achieved what force could not."),
    (20, "Writing a Story", "Elements of Plot, Characters and Creative Writing", "Writing an engaging story requires imagination and clear structure. Every good story has three essential parts: a captivating beginning that introduces characters and settings, a middle section with a conflict or problem, and a satisfying conclusion where the problem is resolved. Using connectors like 'Suddenly', 'After that', and 'Finally' helps narrative flow. Practicing creative writing allows Class 5 students to express their unique ideas.")
]

for unit_id, title, p_title, p_text in units_info:
    creative_exams.append({
        "id": f"creative-u{unit_id}",
        "unitId": unit_id,
        "unitTitle": f"Unit {unit_id}: {title}",
        "passageType": "seen",
        "passageTitle": p_title,
        "passageText": p_text,
        "passageTextBn": f"ইউনিট {unit_id}-এর মূল পাঠ্যভিত্তিক অনুচ্ছেদ। শিক্ষার্থীরা মনোযোগ দিয়ে পড়লে সবকয়টি প্রশ্নের সঠিক উত্তর লিখতে পারবে।",
        "matching": [
            {"word": "Essential", "meaning": "Completely necessary or needed", "distractors": ["Very harmful", "Cold weather"]},
            {"word": "Traditional", "meaning": "Following long-established customs"},
            {"word": "Courteous", "meaning": "Polite and respectful in behavior"},
            {"word": "Folk", "meaning": "Belonging to traditional rural culture"},
            {"word": "Perseverance", "meaning": "Continuous effort despite difficulties"}
        ],
        "trueFalse": [
            {
                "statement": f"The story of Unit {unit_id} highlights positive social and moral values.",
                "statementBn": f"ইউনিট {unit_id}-এর পাঠ্য ইতিবাচক সামাজিক ও নৈতিক মূল্যবোধ শেখায়।",
                "isTrue": True,
                "explanationBn": "পাঠ্যাংশটি শিক্ষার্থীদের ইতিবাচক মূল্যবোধ ও ভাষার দক্ষতা শেখায়।"
            },
            {
                "statement": "Trees and clean air are harmful for human beings.",
                "statementBn": "গাছপালা এবং পরিষ্কার বাতাস মানুষের জন্য ক্ষতিকর।",
                "isTrue": False,
                "correctAnswer": "Trees and clean air are vital for human survival.",
                "explanationBn": "পরিষ্কার বাতাস ও গাছপালা জীবনের জন্য অপরিহার্য।"
            },
            {
                "statement": "Working with dedication leads to success.",
                "statementBn": "একনিষ্ঠভাবে কাজ করলে সফলতা অর্জন করা যায়।",
                "isTrue": True,
                "explanationBn": "পরিশ্রম ও একনিষ্ঠতা সাফল্যের চাবিকাঠি।"
            },
            {
                "statement": "Students should never speak English in classroom.",
                "statementBn": "শ্রেণিকক্ষে শিক্ষার্থীদের কখনো ইংরেজি বলা উচিত নয়।",
                "isTrue": False,
                "correctAnswer": "Students should practice speaking English regularly.",
                "explanationBn": "নিয়মিত চর্চা করলে ইংরেজি ভাষার দক্ষতা বৃদ্ধি পায়।"
            },
            {
                "statement": "Teamwork makes difficult tasks easier to accomplish.",
                "statementBn": "দলগতভাবে কাজ করলে কঠিন কাজও সহজ হয়ে যায়।",
                "isTrue": True,
                "explanationBn": "দলগত প্রচেষ্টা সবসময় ভালো ফল বয়ে আনে।"
            },
            {
                "statement": "Kindness is more powerful than using brute force.",
                "statementBn": "হিংস্র বলপ্রয়োগের চেয়ে বিনম্র সদয় আচরণ বেশি শক্তিশালী।",
                "isTrue": True,
                "explanationBn": "বিনম্রতা ও ভালোবাসা শক্তি প্রয়োগের চেয়েও বেশি কার্যকর।"
            }
        ],
        "shortQuestions": [
            {
                "question": f"What is the central theme of Unit {unit_id}?",
                "questionBn": f"ইউনিট {unit_id}-এর মূল বিষয়বস্তু কী?",
                "modelAnswer": f"The central theme of Unit {unit_id} ({title}) focuses on {p_title.lower()}.",
                "modelAnswerBn": f"ইউনিট {unit_id}-এর মূল প্রতিপাদ্য হলো {title} এবং এর ব্যবহারিক শিখন।"
            },
            {
                "question": "What lessons can students learn from this passage?",
                "questionBn": "শিক্ষার্থীরা এই অনুচ্ছেদ থেকে কী শিক্ষা পেতে পারে?",
                "modelAnswer": "Students can learn moral responsibility, linguistic skills, and positive life attitudes.",
                "modelAnswerBn": "শিক্ষার্থীরা নৈতিক দায়িত্ববোধ, ভাষা ব্যবহারের দক্ষতা ও ইতিবাচক দৃষ্টিভঙ্গি অর্জন করতে পারে।"
            },
            {
                "question": "Why is regular practice important in learning English?",
                "questionBn": "ইংরেজি শেখার ক্ষেত্রে নিয়মিত অনুশীলন কেন জরুরি?",
                "modelAnswer": "Regular practice enhances vocabulary, corrects grammar, and builds speaking confidence.",
                "modelAnswerBn": "নিয়মিত অনুশীলন শব্দভাণ্ডার সমৃদ্ধ করে, ব্যাকরণ ঠিক রাখে এবং আত্মবিশ্বাস তৈরি করে।"
            },
            {
                "question": "How do cooperative activities help classmates in school?",
                "questionBn": "যৌথ কাজকর্ম স্কুলে সহপাঠীদের কীভাবে সাহায্য করে?",
                "modelAnswer": "Cooperative activities teach students empathy, mutual respect, and effective communication.",
                "modelAnswerBn": "যৌথ কাজকর্ম সহমর্মিতা, পারস্পরিক শ্রদ্ধা এবং সুন্দর যোগাযোগ স্থাপন শেখায়।"
            },
            {
                "question": "Write one good habit you should maintain every day.",
                "questionBn": "প্রতিদিন মেনে চলার মতো একটি ভালো অভ্যাসের কথা লেখো।",
                "modelAnswer": "One good habit is speaking truthfully and helping elders and friends with a polite smile.",
                "modelAnswerBn": "একটি ভালো অভ্যাস হলো সর্বদা সত্য কথা বলা এবং হাসিমুখে অন্যদের সাহায্য করা।"
            }
        ],
        "composition": {
            "title": f"My Thoughts on {title}",
            "titleBn": f"{title} সম্পর্কে আমার ভাবনা",
            "instructions": "Write at least 5 sentences about this topic by answering the guiding questions below.",
            "guidingQuestions": [
                f"What do you find interesting about {title}?",
                "How does this relate to your daily school or home life?",
                "What can you do to practice this learning?",
                "Why is this important for fifth graders?",
                "What is your resolution regarding this topic?"
            ],
            "modelParagraph": f"I learned many valuable lessons from {title}. It relates closely to our everyday life at school and at home. I will practice good communication, helpfulness, and discipline regularly. Learning these values helps us grow into responsible and knowledgeable citizens. I resolve to apply these noble ideals in my studies and social life.",
            "modelParagraphBn": f"আমি {title} থেকে অনেক মূল্যবান শিক্ষা লাভ করেছি। এটি আমাদের স্কুল ও পারিবারিক জীবনের সাথে নিবিড়ভাবে সম্পর্কিত। আমি নিয়মিত ভালো যোগাযোগ, পরোপকার ও নিয়মানুবর্তিতা চর্চা করব। এসব গুণাবলি আমাদের একজন সুনাগরিক হিসেবে গড়ে তোলে।"
        }
    })

print(f"Total Creative Exams generated: {len(creative_exams)}")

ts_content = f"""import {{ CreativeExamPassage }} from "../types/english";

export const creativeExamsData: CreativeExamPassage[] = {json.dumps(creative_exams, indent=2, ensure_ascii=False)};
"""

with open("src/data/creativeExamsData.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Successfully wrote src/data/creativeExamsData.ts!")
