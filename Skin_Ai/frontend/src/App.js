import React, { useState, createContext, useContext, useRef, useEffect } from 'react';
import './App.css';

// Language Context
const LanguageContext = createContext();

const languages = [
  { code: 'en', name: 'English', native: 'English', flag: '\u{1F1FA}\u{1F1F8}' },
  { code: 'fr', name: 'French', native: 'Francais', flag: '\u{1F1EB}\u{1F1F7}' },
  { code: 'ar', name: 'Arabic', native: 'العربية', flag: '\u{1F1E6}\u{1F1EA}' },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '\u{1F1EA}\u{1F1F8}' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '\u{1F1E9}\u{1F1EA}' },
  { code: 'it', name: 'Italian', native: 'Italiano', flag: '\u{1F1EE}\u{1F1F9}' },
  { code: 'pt', name: 'Portuguese', native: 'Português', flag: '\u{1F1F5}\u{1F1F9}' },
  { code: 'ja', name: 'Japanese', native: '日本語', flag: '\u{1F1EF}\u{1F1F5}' },
  { code: 'zh', name: 'Chinese', native: '中文', flag: '\u{1F1E8}\u{1F1F3}' },
  { code: 'ru', name: 'Russian', native: 'Русский', flag: '\u{1F1F7}\u{1F1FA}' },
  { code: 'ko', name: 'Korean', native: '한국어', flag: '\u{1F1F0}\u{1F1F7}' }
];

const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);

  const getGeminiLanguagePrompt = () => {
    const prompts = {
      en: 'Please respond in English.',
      fr: 'Veuillez répondre en français.',
      ar: 'يرجى الرد باللغة العربية.',
      es: 'Por favor, responda en español.',
      de: 'Bitte antworten Sie auf Deutsch.',
      it: 'Si prega di rispondere in italiano.',
      pt: 'Por favor, responda em português.',
      ja: '日本語で答えてください。',
      zh: '请用中文回答。',
      ru: 'Пожалуйста, ответьте на русском языке.',
      ko: '한국어로 답변해 주세요.'
    };
    return prompts[currentLanguage.code];
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage, languages, getGeminiLanguagePrompt }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => useContext(LanguageContext);

// Language Switcher Component
const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage, setCurrentLanguage, languages } = useLanguage();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (lang) => {
    setCurrentLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button className="language-toggle" onClick={() => setIsOpen(!isOpen)}>
        <svg className="globe-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
        <span className="current-flag">{currentLanguage.flag}</span>
        <svg className={`chevron-icon ${isOpen ? 'rotated' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div className={`language-dropdown ${isOpen ? 'open' : ''}`}>
        <div className="dropdown-header">Select Language</div>
        <div className="language-options">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${currentLanguage.code === lang.code ? 'active' : ''}`}
              onClick={() => handleSelect(lang)}
            >
              <span className="option-flag">{lang.flag}</span>
              <div className="option-text">
                <span className="option-name">{lang.name}</span>
                <span className="option-native">{lang.native}</span>
              </div>
              {currentLanguage.code === lang.code && (
                <svg className="check-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Header Component
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          Smart Skin Insight
        </div>

        <nav className="nav">
          <ul className="nav-links">
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
          </ul>
          <LanguageSwitcher />
          <div className="user-greeting">
            <div className="user-avatar">M</div>
            <span>Hello Marta</span>
          </div>
          <button className="btn btn-primary">Get Started</button>
        </nav>

        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3E2522" strokeWidth="2">
            {mobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
          <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
          <div className="mobile-language-row">
            <LanguageSwitcher />
          </div>
          <button className="btn btn-primary" style={{ marginTop: '16px', width: '100%' }}>
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

// Hero Component
const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
            AI-Powered Skin Analysis
          </div>
          <h1 className="hero-title">
            Understand Your <span>Skin</span> Like Never Before
          </h1>
          <p className="hero-text">
            Record a short video of your skin inflammation and let our AI provide detailed analysis, personalized care routines, and nutrition guidance.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Start Analysis</button>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-container">
            <div className="hero-card hero-card-main">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3E2522" strokeWidth="2">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </div>
              <h3 className="card-title">Skin Analysis</h3>
              <p className="card-text">AI processing your video...</p>
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
            </div>
            <div className="hero-card hero-card-float top">
              <h4 className="card-title" style={{ fontSize: '14px', marginBottom: '4px' }}>Inflammation Level</h4>
              <p className="card-text" style={{ color: '#D3A376', fontWeight: '600' }}>Moderate</p>
            </div>
            <div className="hero-card hero-card-float bottom">
              <h4 className="card-title" style={{ fontSize: '14px', marginBottom: '4px' }}>Recommended</h4>
              <p className="card-text">Hydration routine</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// How It Works Component
const HowItWorks = () => {
  const steps = [
    { number: 1, title: 'Record Video', text: 'Capture a 10-30 second video of your skin concern', icon: 'video' },
    { number: 2, title: 'AI Analysis', text: 'Our AI processes and analyzes your skin condition', icon: 'cpu' },
    { number: 3, title: 'Get Insights', text: 'Receive detailed explanation and classification', icon: 'lightbulb' },
    { number: 4, title: 'Care Routine', text: 'Get personalized skincare and nutrition guidance', icon: 'heart' }
  ];

  const renderIcon = (icon) => {
    const icons = {
      video: <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />,
      cpu: <><rect width="16" height="16" x="4" y="4" rx="2" /><path d="M9 9h6v6H9z" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" /></>,
      lightbulb: <><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></>,
      heart: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    };
    return icons[icon];
  };

  return (
    <section id="how-it-works" className="section how-it-works">
      <div className="container">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">Four simple steps to better understand your skin health</p>
        <div className="steps-grid">
          {steps.map((step) => (
            <div key={step.number} className="step-card">
              <div className="step-number">{step.number}</div>
              <div className="step-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3E2522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {renderIcon(step.icon)}
                </svg>
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-text">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Features Component
const Features = () => {
  const features = [
    { title: 'Video Analysis', text: 'Advanced AI examines your skin video frame by frame for accurate assessment', icon: 'scan' },
    { title: 'Nutrition Guidance', text: 'Get food recommendations that support your skin health from within', icon: 'apple' },
    { title: 'Adaptive Routines', text: 'Skincare routines that evolve with your skin condition over time', icon: 'refresh' },
    { title: 'Detailed Explanations', text: 'Understand the reasoning behind every recommendation we make', icon: 'book' },
    { title: 'Progress Tracking', text: 'Monitor your skin improvement journey with visual timelines', icon: 'chart' },
    { title: 'Multi-Language', text: 'Get insights in English, French, or Darija for better understanding', icon: 'globe' }
  ];

  const renderIcon = (icon) => {
    const icons = {
      scan: <><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><path d="M7 12h10" /></>,
      apple: <><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" /><path d="M10 2c1 .5 2 2 2 5" /></>,
      refresh: <><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" /></>,
      book: <><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></>,
      chart: <><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></>,
      globe: <><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></>
    };
    return icons[icon];
  };

  return (
    <section id="features" className="section features">
      <div className="container">
        <h2 className="section-title">Powerful Features</h2>
        <p className="section-subtitle">Everything you need for comprehensive skin care guidance</p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3E2522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {renderIcon(feature.icon)}
                </svg>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-text">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Component
const Testimonials = () => {
  const testimonials = [
    { name: 'Sarah M.', title: 'Verified User', text: 'This app helped me understand my eczema triggers. The nutrition tips made a real difference!', initial: 'S' },
    { name: 'Ahmed K.', title: 'Verified User', text: 'I love that I can get explanations in Darija. It makes everything so much clearer.', initial: 'A' },
    { name: 'Claire D.', title: 'Verified User', text: 'The personalized care routines adapt as my skin improves. Truly intelligent!', initial: 'C' }
  ];

  return (
    <section id="testimonials" className="section testimonials">
      <div className="container">
        <h2 className="section-title">What Users Say</h2>
        <p className="section-subtitle">Join thousands who have transformed their skin care journey</p>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="star" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonial.initial}</div>
                <div>
                  <div className="author-name">{testimonial.name}</div>
                  <div className="author-title">{testimonial.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Component
const CTA = () => {
  return (
    <section className="section cta">
      <div className="container">
        <h2 className="section-title">Ready to Transform Your Skin Care?</h2>
        <p className="section-subtitle">Start your journey to healthier skin with AI-powered insights today.</p>
        <button className="btn btn-primary btn-large">Get Started Free</button>
        <div className="cta-disclaimer">
          <p><strong>Disclaimer:</strong> Smart Skin Insight provides educational information only and is not a substitute for professional medical advice, diagnosis, or treatment.</p>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              Smart Skin Insight
            </div>
            <p>AI-powered skin analysis for better understanding of your skin health and personalized care guidance.</p>
          </div>
          <div className="footer-column">
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#pricing">Pricing</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#disclaimer">Medical Disclaimer</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>2025 Smart Skin Insight. All rights reserved.</p>
          <div className="social-links">
            <a href="#twitter" className="social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#instagram" className="social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a href="#linkedin" className="social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <Header />
        <Hero />
        <HowItWorks />
        <Features />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
