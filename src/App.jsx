import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/global.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Events from './pages/Events';
import Contact from './pages/Contact';

function RoutesWithFade() {
  const location = useLocation();
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // fade out then in on every route change
    el.style.opacity = '0';
    const id = setTimeout(() => {
      el.style.opacity = '1';
    }, 10);
    return () => clearTimeout(id);
  }, [location.pathname]);

  return (
    <div
      ref={containerRef}
      className="route-fade"
      key={location.pathname}
      data-barba="container"
      data-barba-namespace="app"
      style={{ opacity: 1 }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <RoutesWithFade />
      <Footer />
    </Router>
  );
}

export default App;
