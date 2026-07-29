import { useState } from 'react';
import { pitanja as pitanjaIzvor } from '../assets/pitanjaKviz';

const shuffleQuestions = (lista) => {
  const pomesana = [...lista];
  for (let i = pomesana.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pomesana[i], pomesana[j]] = [pomesana[j], pomesana[i]];
  }
  return pomesana.slice(0, 15);
};

export default function KvizKalaNera01() {
  const [pitanja] = useState(() => shuffleQuestions(pitanjaIzvor));
  const [trenutniIndeks, setTrenutniIndeks] = useState(0);
  const [izabraniOdgovor, setIzabraniOdgovor] = useState('');
  const [brojTacnih, setBrojTacnih] = useState(0);
  const [kvizZavrsen, setKvizZavrsen] = useState(false);

  if (pitanja.length === 0) {
    return <div style={styles.loading}>Učitavanje testa...</div>;
  }

  const trenutnoPitanje = pitanja[trenutniIndeks];

  const handleSledecePitanje = () => {
    if (!izabraniOdgovor) {
      alert("Molimo izaberite odgovor pre prelaska na sledeće pitanje.");
      return;
    }

    // Provera tačnosti
    if (izabraniOdgovor === trenutnoPitanje.tacanOdgovor) {
      setBrojTacnih(prev => prev + 1);
    }

    // Prelazak dalje ili kraj
    if (trenutniIndeks + 1 < pitanja.length) {
      setTrenutniIndeks(prev => prev + 1);
      setIzabraniOdgovor(''); // Resetuj selekciju za sledeće pitanje
    } else {
      setKvizZavrsen(true);
    }
  };

  const restartujKviz = () => {
    window.location.reload(); // Najlakši način da se sve ponovo promeša i resetuje
  };

  if (kvizZavrsen) {
    const procenat = Math.round((brojTacnih / pitanja.length) * 100);
    return (
      <div style={styles.kontejner}>
        <div style={styles.kartica}>
          <h2>Test je završen!</h2>
          <hr style={styles.linija} />
          <p style={styles.rezultatText}>
            Tačni odgovori: <strong>{brojTacnih}</strong> od <strong>{pitanja.length}</strong>
          </p>
          <p style={styles.rezultatText}>Procenat uspešnosti: <strong>{procenat}%</strong></p>
          <button style={styles.dugmeRestart} onClick={restartujKviz}>Pokreni ponovo</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.kontejner}>
      <div style={styles.kartica}>
        <div style={styles.zaglavlje}>
          <span>Pitanje {trenutniIndeks + 1} od {pitanja.length}</span>
          <span style={styles.progres}>Napredak: {Math.round(((trenutniIndeks) / pitanja.length) * 100)}%</span>
        </div>
        
        <h3 style={styles.pitanjeTekst}>{trenutnoPitanje.tekst}</h3>
        
        <div style={styles.opcijeKontejner}>
          {trenutnoPitanje.opcije.map((opcija, indeks) => (
            <label 
              key={indeks} 
              style={{
                ...styles.opcijaLabel,
                backgroundColor: izabraniOdgovor === opcija ? '#e3f2fd' : '#fff',
                borderColor: izabraniOdgovor === opcija ? '#2196f3' : '#ccc'
              }}
            >
              <input
                type="radio"
                name="odgovor"
                value={opcija}
                checked={izabraniOdgovor === opcija}
                onChange={(e) => setIzabraniOdgovor(e.target.value)}
                style={styles.radio}
              />
              {opcija}
            </label>
          ))}
        </div>

        <button style={styles.dugmeSledece} onClick={handleSledecePitanje}>
          {trenutniIndeks === pitanja.length - 1 ? "Završi test" : "Sledeće pitanje"}
        </button>
      </div>
    </div>
  );
}

// Jednostavan CSS unutar JS-a da sve izgleda uredno i moderno
const styles = {
  kontejner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    fontFamily: 'Arial, sans-serif',
    padding: '20px'
  },
  kartica: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    padding: '30px',
    maxWidth: '600px',
    width: '100%'
  },
  zaglavlje: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#666',
    fontSize: '14px',
    marginBottom: '20px'
  },
  pitanjeTekst: {
    fontSize: '20px',
    color: '#333',
    marginBottom: '25px'
  },
  opcijeKontejner: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '30px'
  },
  opcijaLabel: {
    display: 'flex',
    alignItems: 'center',
    padding: '14px',
    border: '2px solid #ccc',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.2s ease'
  },
  radio: {
    marginRight: '12px',
    transform: 'scale(1.2)'
  },
  dugmeSledece: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  dugmeRestart: {
    marginTop: '20px',
    padding: '12px 24px',
    backgroundColor: '#2196f3',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  rezultatText: {
    fontSize: '18px',
    margin: '10px 0'
  },
  linija: {
    border: '0',
    height: '1px',
    backgroundColor: '#eee',
    margin: '20px 0'
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '20px'
  }
};