import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import KvizKalaNera01 from './pages/KvizKalaNera01';

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* Navigacioni meni koji je vidljiv na svakoj stranici */}
        <nav style={{ padding: '10px', backgroundColor: '#f0f0f0', display: 'flex', gap: '15px' }}>
          <Link to="/">Početna</Link>
          <Link to="/about">O nama</Link>
          <Link to="/contact">Kontakt</Link>
          <Link to="/kviz">KvizKalaNera01</Link>
        </nav>

        {/* Prikaz stranice u zavisnosti od URL adrese */}
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/kviz" element={<KvizKalaNera01 />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;