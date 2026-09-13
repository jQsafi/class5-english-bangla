import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, Key, Volume2, RotateCcw, HelpCircle } from 'lucide-react';
import { sendChatMessage, ChatMessage } from '../services/aiService';
import { speechService } from '../services/speechService';

interface AiTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUnitTitle?: string;
}

export const AiTutorModal: React.FC<AiTutorModalProps> = ({
  isOpen,
  onClose,
  currentUnitTitle,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `**Hello friend!** 👋 আমি তোমার **English Buddy** (স্মার্ট এআই শিক্ষক)।\n\n${
        currentUnitTitle ? `আমরা এখন **"${currentUnitTitle}"** অধ্যায়ে আছি।` : ''
      }\nতুমি আমাকে যেকোনো ইংরেজি শব্দের অর্থ, বাক্য তৈরি, পাঠের সারসংক্ষেপ বা ব্যাকরণ নিয়ে প্রশ্ন করতে পারো! নিচে থেকে যেকোনো একটি প্রম্পটে চাপ দিতে পারো:`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [customKey, setCustomKey] = useState(() => localStorage.getItem('class5_groq_key') || '');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    currentUnitTitle ? `"${currentUnitTitle}" অধ্যায়ের সারসংক্ষেপ বুঝিয়ে দাও` : 'একটি সহজ ইংরেজি গল্প শোনাও',
    '৫টি প্রয়োজনীয় শব্দের অর্থ ও বাক্য রচনা বলো',
    'সহজ বাংলায় গ্রামার নিয়ম বুঝিয়ে দাও',
    'আমাকে একটি আকর্ষণীয় ইংরেজি কুইজ প্রশ্ন করো',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const promptText = (textToSend || input).trim();
    if (!promptText || loading) return;

    const userMessage: ChatMessage = { role: 'user', content: promptText };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await sendChatMessage(updatedMessages, customKey);
      setMessages([...updatedMessages, { role: 'assistant', content: response }]);
    } catch (err: any) {
      setMessages([
        ...updatedMessages,
        { role: 'assistant', content: 'দুঃখিত, উত্তর পাওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveKey = () => {
    localStorage.setItem('class5_groq_key', customKey.trim());
    setShowKeyModal(false);
  };

  const speakText = (text: string) => {
    // Strip markdown formatting for audio
    const clean = text.replace(/[*_#`>]/g, '').trim();
    speechService.speak(clean);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col h-[90vh] max-h-[700px] overflow-hidden border border-indigo-100 z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur">
              <Sparkles size={20} className="text-amber-300 animate-spin" />
            </div>
            <div>
              <h3 className="font-bold text-base flex items-center gap-1.5">
                <span>ইংলিশ বন্ধু</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 font-normal font-english">
                  AI Tutor
                </span>
              </h3>
              <p className="text-xs text-indigo-100">পঞ্চম শ্রেণি ইংরেজি স্মার্ট এআই সহায়ক</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setShowKeyModal(!showKeyModal)}
              title="Groq API Key সেটিংস"
              className="p-2 rounded-lg text-indigo-100 hover:bg-white/10 hover:text-white transition-colors"
            >
              <Key size={18} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-indigo-100 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* API Key Drawer */}
        {showKeyModal && (
          <div className="p-3 bg-amber-50 border-b border-amber-200 text-xs text-amber-900 flex items-center gap-2">
            <input
              type="password"
              placeholder="Groq API Key (ঐচ্ছিক, gsk_...)"
              value={customKey}
              onChange={(e) => setCustomKey(e.target.value)}
              className="flex-1 px-3 py-1.5 bg-white border border-amber-300 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={handleSaveKey}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition-colors"
            >
              সংরক্ষণ
            </button>
          </div>
        )}

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
          {messages.map((m, idx) => {
            const isBot = m.role === 'assistant';
            return (
              <div
                key={idx}
                className={`flex gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}
              >
                {isBot && (
                  <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 shrink-0 mt-0.5">
                    <Bot size={16} />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    isBot
                      ? 'bg-white border border-slate-200 text-slate-800 shadow-sm'
                      : 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  }`}
                >
                  <div className="whitespace-pre-wrap font-bangla">{m.content}</div>

                  {isBot && (
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => speakText(m.content)}
                        className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-semibold"
                        title="ইংরেজি অংশ শুনে নাও"
                      >
                        <Volume2 size={13} />
                        <span>শুনুন</span>
                      </button>
                    </div>
                  )}
                </div>

                {!isBot && (
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User size={16} />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700">
                <Bot size={16} />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2.5 shadow-sm flex items-center gap-2 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce delay-100" />
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce delay-200" />
                <span>ইংলিশ বন্ধু উত্তর লিখছে...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(p)}
              disabled={loading}
              className="shrink-0 px-2.5 py-1 rounded-full text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors font-bangla"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="যেকোনো ইংরেজি শব্দ, বাক্য বা ব্যাকরণ নিয়ে প্রশ্ন করো..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white transition-colors shadow-sm"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};
