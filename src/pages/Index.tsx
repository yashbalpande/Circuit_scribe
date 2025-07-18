import React, { useState, useEffect, useRef } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../components/FirebaseAuthProvider';
import EmbeddedSystemsChallenges from '../components/EmbeddedSystemsChallenges';
import Blog from '../components/Blog';

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

const Navbar = ({ setActiveSection, activeSection, badgeCount, streak, user, logout, loginWithGoogle, onLoginClick }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'embedded', label: 'Embedded' },
    { id: 'blog', label: 'Blog' },
    { id: 'simulations', label: 'Simulations' },
  ];
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white rounded-b-2xl shadow font-sans sticky top-0 z-40">
      <div className="flex items-center gap-2">
        <span className="inline-block -rotate-6 transition-transform duration-300 hover:scale-110 hover:drop-shadow-glow">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><path d="M18 3L12 21h6l-3 12 9-18h-6l3-12z" fill="#a78bfa" stroke="#7c3aed" strokeWidth="2" strokeLinejoin="round"/><circle cx="27" cy="9" r="2" fill="#fbbf24"/></svg>
        </span>
        <span className="font-heading text-2xl font-bold text-purple-700">CircuitCode</span>
        <StreakIndicator streak={streak} />
      </div>
      <div className="hidden md:flex gap-6 text-gray-700 font-medium items-center">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`hover:text-purple-600 transition bg-transparent px-2 py-1 rounded-full ${activeSection === item.id ? 'bg-purple-100 text-purple-800 font-bold shadow animate-bounce' : ''}`}
            aria-current={activeSection === item.id ? 'page' : undefined}
          >
            {item.label}
            {item.id === 'embedded' && badgeCount > 0 && (
              <span className="ml-2 bg-yellow-400 text-black rounded-full px-2 py-0.5 text-xs font-bold animate-pulse">{badgeCount}</span>
            )}
          </button>
        ))}
        {/* Removed Google Login button here */}
        {user ? (
          <div className="flex items-center gap-2">
            {user.photoURL && (
              <img src={user.photoURL} alt="avatar" className="w-8 h-8 rounded-full border" />
            )}
            <span className="font-bold text-purple-700">{user.displayName || user.email}</span>
            <button className="px-2 py-1 rounded hover:bg-purple-100 text-xs" onClick={logout}>Logout</button>
          </div>
        ) : null}
      </div>
      <button className="bg-yellow-300 text-black font-bold px-5 py-2 rounded-full shadow hover:bg-yellow-400 transition" onClick={onLoginClick}>Login</button>
    </nav>
  );
};

const Hero = () => (
  <section className="max-w-6xl mx-auto mt-10 bg-white rounded-3xl shadow-lg flex flex-col md:flex-row overflow-hidden animate-fade-in-up">
    {/* Left */}
    <div className="flex-1 p-10 flex flex-col justify-center bg-green-200">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 leading-tight animate-fade-in-up delay-100">
        Spark your learning & unlock the power of circuits
        <span className="inline-block align-middle ml-2 transition-transform duration-200 hover:rotate-12 hover:scale-125">
          <svg width="32" height="32" viewBox="0 0 36 36" fill="none"><path d="M18 3L12 21h6l-3 12 9-18h-6l3-12z" fill="#a78bfa" stroke="#7c3aed" strokeWidth="2" strokeLinejoin="round"/></svg>
        </span>
        ⚡
      </h1>
      <p className="text-lg text-gray-700 mb-6 animate-fade-in-up delay-200">
        Your friendly electrical engineering companion.
      </p>
      <button className="bg-purple-200 text-purple-800 font-bold px-8 py-3 rounded-full shadow hover:bg-purple-300 transition-all hover:scale-105 w-full md:w-auto animate-fade-in-up delay-300">
        Start Learning
      </button>
      <ProgressBar percent={70} />
    </div>
    {/* Right */}
    <div className="flex-1 relative flex flex-col items-center justify-center bg-purple-200 p-10 animate-fade-in-up delay-200">
      {/* Playful burst shape */}
      <svg className="absolute top-8 left-8 z-0" width="120" height="120" viewBox="0 0 120 120" fill="none">
        <polygon points="60,0 80,40 120,60 80,80 60,120 40,80 0,60 40,40" fill="#fbbf24" opacity="0.2"/>
      </svg>
      {/* Mascot or photo */}
      <div className="relative z-10 transition-transform duration-300 hover:scale-110 hover:drop-shadow-glow">
        <svg width="100" height="100" viewBox="0 0 120 120" className="drop-shadow-lg">
          <circle cx="60" cy="60" r="56" fill="#ede9fe" />
          <path d="M60 30L48 78h16l-8 24 24-48h-16l8-24z" fill="#a78bfa" stroke="#7c3aed" strokeWidth="3" strokeLinejoin="round"/>
          <ellipse cx="90" cy="45" rx="7" ry="7" fill="#fbbf24"/>
        </svg>
      </div>
      {/* Badges */}
      <div className="flex flex-col gap-3 mt-6 z-10">
        <span className="bg-yellow-300 text-black font-bold px-6 py-2 rounded-full shadow text-lg animate-fade-in-up delay-300">100+ Interactive Lessons</span>
        <span className="bg-cyan-300 text-black font-bold px-6 py-2 rounded-full shadow text-lg animate-fade-in-up delay-400">20k+ Learners</span>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-4 gap-6 bg-white rounded-2xl shadow p-8">
    {[
      { icon: "💡", title: "Hands-on Labs", desc: "Experiment with real circuits in your browser." },
      { icon: "⚡", title: "Instant Feedback", desc: "Get hints and see results as you learn." },
      { icon: "🧑‍🤝‍🧑", title: "Community", desc: "Learn and share with fellow makers." },
      { icon: "🏆", title: "Track Progress", desc: "Earn badges and celebrate your growth." }
    ].map((f, i) => (
      <div key={i} className="flex flex-col items-center text-center gap-2">
        <span className="text-3xl bg-yellow-200 rounded-full w-14 h-14 flex items-center justify-center mb-2">{f.icon}</span>
        <h3 className="font-bold text-lg">{f.title}</h3>
        <p className="text-gray-600 text-sm">{f.desc}</p>
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

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar setActiveSection={setActiveSection} activeSection={activeSection} badgeCount={badgeCount} streak={streak} user={user} logout={logout} loginWithGoogle={loginWithGoogle} onLoginClick={() => setShowLoginModal(true)} />
      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} loginWithGoogle={loginWithGoogle} handleEmailLogin={handleEmailLogin} handleEmailSignup={handleEmailSignup} />
      <Toast message={toastMessage} show={showToast} />
      <ScrollToTop />
      {activeSection === 'home' && <>
        <Hero />
        <DoodleDivider />
        <Features />
      </>}
      {activeSection === 'embedded' && (
        <div className="max-w-6xl mx-auto mt-10 p-4 bg-white rounded-2xl shadow">
          <EmbeddedSystemsChallenges />
        </div>
      )}
      {activeSection === 'blog' && (
        <div className="max-w-6xl mx-auto mt-10 p-4 bg-white rounded-2xl shadow">
          <Blog />
        </div>
      )}
      {activeSection === 'simulations' && <SimulationsSection />}
      <DoodleDivider />
      <Footer />
    </div>
  );
};

export default Index;
