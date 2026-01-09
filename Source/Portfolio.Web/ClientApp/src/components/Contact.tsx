import { useState } from 'react';
import type { FormEvent } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // Tutaj możesz dodać integrację z backendem
    // Na razie symulujemy wysyłanie
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          <span 
            style={{
              background: 'linear-gradient(to right, #6b21a8, #a855f7, #c084fc, #e9d5ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Kontakt
          </span>
        </h2>
        <div className="w-[1406px] mx-auto">
          {/* Contact Info */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-200 mb-4">
                Skontaktuj się ze mną
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Szukasz doświadczonego backend developera? Chętnie porozmawiam o Twoim projekcie!
              </p>
            </div>

            <div className="flex justify-between gap-8">
              <div 
                className="flex items-center gap-6 p-6 rounded-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 flex-1"
                style={{
                  border: '1px solid rgba(255, 248, 231, 0.15)',
                  backgroundColor: 'rgba(255, 248, 231, 0.03)'
                }}
              >
                <div 
                  className="w-16 h-16 flex items-center justify-center rounded-lg flex-shrink-0"
                  style={{
                    backgroundColor: 'rgba(168, 85, 247, 0.1)',
                    border: '1px solid rgba(168, 85, 247, 0.4)',
                    color: '#e9d5ff'
                  }}
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-300 text-lg mb-1">GitHub</div>
                  <a 
                    href="https://github.com/twoj-profil" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-300 transition-colors text-base"
                  >
                    github.com/twoj-profil
                  </a>
                </div>
              </div>

              <div 
                className="flex items-center gap-6 p-6 rounded-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 flex-1"
                style={{
                  border: '1px solid rgba(255, 248, 231, 0.15)',
                  backgroundColor: 'rgba(255, 248, 231, 0.03)'
                }}
              >
                <div 
                  className="w-16 h-16 flex items-center justify-center rounded-lg flex-shrink-0"
                  style={{
                    backgroundColor: 'rgba(168, 85, 247, 0.1)',
                    border: '1px solid rgba(168, 85, 247, 0.4)',
                    color: '#e9d5ff'
                  }}
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-300 text-lg mb-1">LinkedIn</div>
                  <a 
                    href="https://linkedin.com/in/twoj-profil" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-300 transition-colors text-base"
                  >
                    /in/twoj-profil
                  </a>
                </div>
              </div>

              <div 
                className="flex items-center gap-6 p-6 rounded-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 flex-1"
                style={{
                  border: '1px solid rgba(255, 248, 231, 0.15)',
                  backgroundColor: 'rgba(255, 248, 231, 0.03)'
                }}
              >
                <div 
                  className="w-16 h-16 flex items-center justify-center rounded-lg flex-shrink-0"
                  style={{
                    backgroundColor: 'rgba(168, 85, 247, 0.1)',
                    border: '1px solid rgba(168, 85, 247, 0.4)',
                    color: '#e9d5ff'
                  }}
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-300 text-lg mb-1">Email</div>
                  <a 
                    href="mailto:twoj@email.com" 
                    className="text-gray-400 hover:text-purple-300 transition-colors text-base"
                  >
                    twoj@email.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div 
            className="rounded-lg p-8 backdrop-blur-sm overflow-visible"
            style={{
              border: '1px solid rgba(255, 248, 231, 0.15)',
              backgroundColor: 'rgba(255, 248, 231, 0.03)'
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-gray-300 font-semibold mb-2">
                  Imię
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg focus:outline-none transition-all text-gray-300"
                  style={{
                    border: '1px solid rgba(255, 248, 231, 0.15)',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)'
                  }}
                  placeholder="Jan Kowalski"
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.6)';
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 248, 231, 0.15)';
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
                  }}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-300 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg focus:outline-none transition-all text-gray-300"
                  style={{
                    border: '1px solid rgba(255, 248, 231, 0.15)',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)'
                  }}
                  placeholder="jan@example.com"
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.6)';
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 248, 231, 0.15)';
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
                  }}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-300 font-semibold mb-2">
                  Wiadomość
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none transition-all resize-none text-gray-300"
                  style={{
                    border: '1px solid rgba(255, 248, 231, 0.15)',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)'
                  }}
                  placeholder="Twoja wiadomość..."
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.6)';
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 248, 231, 0.15)';
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full px-8 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-60"
                style={{
                  border: '1px solid rgba(168, 85, 247, 0.4)',
                  backgroundColor: 'rgba(168, 85, 247, 0.1)',
                  color: '#e9d5ff',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  if (status !== 'sending') {
                    e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.6)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.4)';
                }}
              >
                {status === 'sending' ? 'Wysyłanie...' : 'Wyślij wiadomość'}
              </button>

              {status === 'success' && (
                <div className="text-green-400 text-center font-semibold">
                  ✓ Wiadomość wysłana pomyślnie!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
