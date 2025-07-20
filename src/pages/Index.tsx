import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../components/FirebaseAuthProvider';
import { Sun, Moon, Zap, BookOpen, Code, Users, Gauge, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

// Lazy load heavy modules
const EmbeddedSystemsChallenges = lazy(() => import('../components/EmbeddedSystemsChallenges'));
const Blog = lazy(() => import('../components/Blog'));

// Toast notification (simple custom)
const Toast = ({ message, show }) => (
  <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}> 
    <div className="bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-fade-in">
      <span role="img" aria-label="spark">⚡</span> {message}
    </div>
  </div>
);

const ScrollToTop = () => {
  const [show, setShow] = React.useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 200);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return show ? (
    <button
      aria-label="Scroll to top"
      className="fixed bottom-8 right-8 bg-yellow-300 text-black p-3 rounded-full shadow-lg hover:bg-yellow-400 transition z-50 animate-bounce"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
    </button>
  ) : null;
};

const ProgressBar = ({ percent }) => (
  <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden mt-2">
    <div className="h-full bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full transition-all" style={{ width: `${percent}%` }}></div>
  </div>
);

const StreakIndicator = ({ streak }) => (
  <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm ml-4 animate-pulse">
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 2v6m0 0l2-2m-2 2l-2-2m0 8a6 6 0 0012 0c0-3.31-2.69-6-6-6s-6 2.69-6 6z"/></svg>
    {streak} day streak
  </div>
);

const LoginModal = ({ open, onClose, loginWithGoogle, handleEmailLogin, handleEmailSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
  return open ? (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm animate-fade-in-up">
        <h2 className="text-xl font-bold mb-4 text-center">{mode === 'signin' ? 'Sign in to CircuitCode' : 'Sign up for CircuitCode'}</h2>
        <form onSubmit={e => {
          e.preventDefault();
          if (mode === 'signin') {
            handleEmailLogin({ email, password });
          } else {
            handleEmailSignup({ name, email, password });
          }
        }} className="space-y-4">
          {mode === 'signup' && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              autoComplete="name"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            autoComplete="email"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            autoComplete="current-password"
            required
          />
          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-full shadow transition">
            {mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
        <div className="my-4 text-center text-gray-400">or</div>
        <button
          className="w-full flex items-center justify-center gap-2 bg-purple-200 hover:bg-purple-300 text-purple-800 font-bold px-6 py-3 rounded-full shadow mb-4"
          onClick={loginWithGoogle}
        >
          <FcGoogle className="text-2xl" /> Sign in with Google
        </button>
        <div className="flex justify-between mt-2 text-sm">
          <button className="text-gray-500 hover:underline" onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}>
            {mode === 'signin' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
          <button className="text-gray-500 hover:underline" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  ) : null;
};

// Dark mode toggle
const DarkModeToggle = ({ darkMode, setDarkMode }) => (
  <button
    aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    className="ml-4 p-2 rounded-full hover:bg-purple-100 transition focus:outline-none focus:ring-2 focus:ring-purple-400"
    onClick={() => {
      setDarkMode((prev) => {
        const newMode = !prev;
        if (newMode) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        }
        return newMode;
      });
    }}
  >
    {darkMode ? <Sun /> : <Moon />}
  </button>
);

// Mascot SVG (lightning bolt with face)
const Mascot = () => (
  <motion.svg
    width="64" height="64" viewBox="0 0 64 64" fill="none"
    initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', bounce: 0.5, duration: 1 }}
    className="drop-shadow-lg"
    aria-label="CircuitCode mascot"
  >
    <g>
      <path d="M32 6L20 38h10l-6 20 18-32h-10l6-20z" fill="#fbbf24" stroke="#f59e42" strokeWidth="2" strokeLinejoin="round"/>
      <ellipse cx="44" cy="18" rx="3" ry="3" fill="#fff"/>
      <ellipse cx="44" cy="18" rx="1.2" ry="1.2" fill="#333"/>
      <ellipse cx="36" cy="22" rx="3" ry="3" fill="#fff"/>
      <ellipse cx="36" cy="22" rx="1.2" ry="1.2" fill="#333"/>
      <path d="M38 28q2 2 4 0" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
    </g>
  </motion.svg>
);

// Responsive Navbar with hamburger
const Navbar = ({ setActiveSection, activeSection, badgeCount, streak, user, logout, loginWithGoogle, onLoginClick, darkMode, setDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'embedded', label: 'Embedded' },
    { id: 'blog', label: 'Blog' },
    { id: 'simulations', label: 'Simulations' },
  ];
  return (
    <nav className="flex items-center justify-between px-4 md:px-8 py-4 bg-white dark:bg-gray-900 rounded-b-2xl shadow font-sans sticky top-0 z-40">
      <div className="flex items-center gap-2">
        <span className="inline-block -rotate-6 transition-transform duration-300 hover:scale-110 hover:drop-shadow-glow">
          <Mascot />
        </span>
        <span className="font-heading text-2xl font-extrabold text-purple-700 dark:text-yellow-200">CircuitCode</span>
        <StreakIndicator streak={streak} />
      </div>
      <div className="hidden md:flex gap-6 text-gray-700 dark:text-gray-200 font-medium items-center">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`relative hover:text-purple-600 dark:hover:text-yellow-300 transition bg-transparent px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 min-h-[44px] min-w-[44px] ${activeSection === item.id ? 'bg-purple-100 dark:bg-yellow-200 text-purple-800 dark:text-yellow-900 font-bold shadow' : ''}`}
            aria-current={activeSection === item.id ? 'page' : undefined}
            aria-label={item.label}
          >
            {item.label}
            {activeSection === item.id && <motion.span layoutId="nav-underline" className="absolute left-0 right-0 -bottom-1 h-1 rounded bg-gradient-to-r from-yellow-400 to-pink-500" />}
            {item.id === 'embedded' && badgeCount > 0 && (
              <span className="ml-2 bg-yellow-400 text-black rounded-full px-2 py-0.5 text-xs font-bold animate-pulse">{badgeCount}</span>
            )}
          </button>
        ))}
        {user ? (
          <div className="flex items-center gap-2">
            {user.photoURL && (
              <img src={user.photoURL} alt="User avatar" className="w-8 h-8 rounded-full border" />
            )}
            <span className="font-bold text-purple-700 dark:text-yellow-200">{user.displayName || user.email}</span>
            <button className="px-2 py-1 rounded hover:bg-purple-100 dark:hover:bg-yellow-200 text-xs" onClick={logout}>Logout</button>
          </div>
        ) : null}
      </div>
      <button className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400" aria-label="Open menu" onClick={() => setMenuOpen(v => !v)}>
        <Menu className="h-7 w-7 text-purple-700 dark:text-yellow-200" />
      </button>
      <button className="hidden md:block bg-yellow-300 text-black font-bold px-5 py-2 rounded-full shadow hover:bg-yellow-400 transition min-h-[44px] min-w-[44px]" onClick={onLoginClick}>Login</button>
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg rounded-b-2xl flex flex-col items-center py-4 z-50 animate-fade-in-up">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); setMenuOpen(false); }}
              className={`w-full text-lg py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 ${activeSection === item.id ? 'bg-purple-100 dark:bg-yellow-200 text-purple-800 dark:text-yellow-900 font-bold shadow' : ''}`}
              aria-current={activeSection === item.id ? 'page' : undefined}
              aria-label={item.label}
            >
              {item.label}
            </button>
          ))}
          {!user && <button className="w-full bg-yellow-300 text-black font-bold px-5 py-2 rounded-full shadow hover:bg-yellow-400 transition min-h-[44px] min-w-[44px] mt-2" onClick={() => { setMenuOpen(false); onLoginClick(); }}>Login</button>}
        </div>
      )}
    </nav>
  );
};

const Hero = ({ setActiveSection }) => (
  <motion.section
    className="max-w-6xl mx-auto mt-10 bg-white dark:bg-gray-900 rounded-3xl shadow-lg flex flex-col md:flex-row overflow-hidden px-4 py-10 md:py-20 my-12"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
  >
    <div className="flex-1 flex flex-col justify-center gap-6">
      <h1 className="font-heading text-5xl md:text-6xl font-extrabold text-purple-800 dark:text-yellow-200 mb-2 leading-tight">
        Welcome to CircuitCode!
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold text-pink-600 dark:text-yellow-400 mb-2">Explore real-world electrical engineering stories, tutorials, and student journeys.
</h2>
      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-6">
        Dive into hands-on projects, simulation tips, and community insights. Learn, share, and grow with fellow makers!
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <motion.button
          className="flex-1 bg-purple-200 dark:bg-yellow-200 text-purple-800 dark:text-yellow-900 font-bold px-8 py-3 rounded-full shadow hover:bg-purple-300 dark:hover:bg-yellow-300 transition-all hover:scale-105 text-lg min-h-[48px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-purple-400 flex items-center justify-center gap-2"
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setActiveSection('blog')}
          aria-label="Start Learning"
        >
          <Gauge className="inline-block mr-2 text-purple-600 dark:text-yellow-700" aria-hidden="true" />
          <span>Start Learning</span>
        </motion.button>
        <motion.button
          className="flex-1 bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold px-8 py-3 rounded-full shadow hover:brightness-110 transition-all hover:scale-105 text-lg min-h-[48px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-pink-400 flex items-center justify-center gap-2"
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setActiveSection('embedded')}
          aria-label="Code Challenges"
        >
          <Code className="inline-block mr-2 text-white" aria-hidden="true" />
          <span>Code Challenges</span>
        </motion.button>
      </div>
      <div className="flex items-center gap-3 mt-6">
        <Mascot />
        <span className="text-lg text-gray-500 dark:text-gray-300">Meet Sparky, your learning buddy!</span>
      </div>
    </div>
    <div className="flex-1 flex items-center justify-center">
      {/* Custom SVG circuit board illustration */}
      <svg viewBox="0 0 320 180" width="320" height="180" fill="none" aria-label="Circuit board illustration" className="w-full max-w-md drop-shadow-2xl rounded-2xl animate-fade-in-up" role="img">
        <rect x="10" y="20" width="300" height="140" rx="24" fill="#e0e7ff" />
        <rect x="40" y="60" width="40" height="20" rx="6" fill="#a5b4fc" />
        <rect x="100" y="60" width="60" height="20" rx="6" fill="#fbbf24" />
        <rect x="180" y="60" width="30" height="20" rx="6" fill="#fca5a5" />
        <rect x="230" y="60" width="50" height="20" rx="6" fill="#6ee7b7" />
        <circle cx="70" cy="120" r="10" fill="#f472b6" />
        <rect x="120" y="110" width="40" height="12" rx="4" fill="#a7f3d0" />
        <rect x="180" y="110" width="60" height="12" rx="4" fill="#fde68a" />
        {/* Traces */}
        <path d="M60 80 Q60 100 70 120" stroke="#6366f1" strokeWidth="3" fill="none" />
        <path d="M120 70 Q120 100 140 116" stroke="#f59e42" strokeWidth="3" fill="none" />
        <path d="M200 70 Q200 100 210 116" stroke="#f472b6" strokeWidth="3" fill="none" />
        <path d="M255 80 Q255 100 240 116" stroke="#6ee7b7" strokeWidth="3" fill="none" />
        {/* Chips */}
        <rect x="150" y="40" width="20" height="10" rx="2" fill="#6366f1" />
        <rect x="200" y="40" width="16" height="10" rx="2" fill="#fbbf24" />
      </svg>
    </div>
  </motion.section>
);

const Features = () => (
  <section className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-4 gap-6 bg-white dark:bg-gray-900 rounded-2xl shadow p-8">
    {[
      { icon: "💡", title: "Hands-on Labs", desc: "Experiment with real circuits in your browser." },
      { icon: "⚡", title: "Instant Feedback", desc: "Get hints and see results as you learn." },
      { icon: "🧑‍🤝‍🧑", title: "Community", desc: "Learn and share with fellow makers." },
      { icon: "🏆", title: "Track Progress", desc: "Earn badges and celebrate your growth." }
    ].map((f, i) => (
      <div key={i} className="flex flex-col items-center text-center gap-2">
        <span className="text-3xl bg-yellow-200 rounded-full w-14 h-14 flex items-center justify-center mb-2">{f.icon}</span>
        <h3 className="font-bold text-lg">{f.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{f.desc}</p>
      </div>
    ))}
  </section>
);

const DoodleDivider = () => (
  <svg viewBox="0 0 1440 100" className="w-full h-16 my-8" fill="none">
    <path d="M0,0 C480,100 960,0 1440,100 L1440,100 L0,100 Z" fill="#ede9fe" />
  </svg>
);

const Footer = () => (
  <footer className="text-center py-6 mt-10 text-gray-500 text-sm">
    © {new Date().getFullYear()} CircuitCode. Made with ⚡ and curiosity.
  </footer>
);

// Placeholder components for sections
const EmbeddedSection = () => <div className="max-w-6xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow text-center text-xl">Embedded Systems Content Coming Soon!</div>;
const BlogSection = () => <div className="max-w-6xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow text-center text-xl">Blog Content Coming Soon!</div>;
const SimulationsSection = () => <div className="max-w-6xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow text-center text-xl">Simulations Content Coming Soon!</div>;

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [badgeCount, setBadgeCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, logout, loginWithGoogle } = useAuth();
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    // Simulate fetching badge and streak data
    const fetchData = async () => {
      setBadgeCount(Math.floor(Math.random() * 100));
      setStreak(Math.floor(Math.random() * 10) + 1);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user && user.displayName) {
      setToastMessage(`Welcome, ${user.displayName}!`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  }, [user]);

  useEffect(() => {
    if (user && showLoginModal) {
      setShowLoginModal(false);
    }
  }, [user, showLoginModal]);

  const handleToast = (message, show = true) => {
    setToastMessage(message);
    setShowToast(show);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Placeholder email login/signup handlers
  const handleEmailLogin = ({ email, password }) => {
    setToastMessage(`Welcome, ${email}! (Email login not yet implemented)`);
    setShowToast(true);
    setShowLoginModal(false);
    setTimeout(() => setShowToast(false), 3000);
  };
  const handleEmailSignup = ({ name, email, password }) => {
    setToastMessage(`Welcome, ${name || email}! (Sign up not yet implemented)`);
    setShowToast(true);
    setShowLoginModal(false);
    setTimeout(() => setShowToast(false), 3000);
  };

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }
  }, [setDarkMode]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans">
      <Navbar setActiveSection={setActiveSection} activeSection={activeSection} badgeCount={badgeCount} streak={streak} user={user} logout={logout} loginWithGoogle={loginWithGoogle} onLoginClick={() => setShowLoginModal(true)} darkMode={darkMode} setDarkMode={setDarkMode} />
      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} loginWithGoogle={loginWithGoogle} handleEmailLogin={handleEmailLogin} handleEmailSignup={handleEmailSignup} />
      <Toast message={toastMessage} show={showToast} />
      <ScrollToTop />
      {activeSection === 'home' && <>
        <Hero setActiveSection={setActiveSection} />
        <DoodleDivider />
        <Features />
      </>}
      {activeSection === 'embedded' && (
        <Suspense fallback={<div className="max-w-6xl mx-auto mt-10 p-4 bg-white rounded-2xl shadow text-center text-xl">Loading...</div>}>
          <EmbeddedSystemsChallenges />
        </Suspense>
      )}
      {activeSection === 'blog' && (
        <Suspense fallback={<div className="max-w-6xl mx-auto mt-10 p-4 bg-white rounded-2xl shadow text-center text-xl">Loading...</div>}>
          <Blog />
        </Suspense>
      )}
      {activeSection === 'simulations' && <SimulationsSection />}
      <DoodleDivider />
      <Footer />
    </div>
  );
};

export default Index;
