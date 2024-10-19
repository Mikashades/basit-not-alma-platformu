import React, { useState } from 'react';
import { Note } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface NotFormuProps {
  notEkle: (not: Note) => void;
}

const NotFormu: React.FC<NotFormuProps> = ({ notEkle }) => {
  const [baslik, setBaslik] = useState('');
  const [icerik, setIcerik] = useState('');

  const formuGonder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!baslik || !icerik) {
      alert('Tüm alanlar doldurulmalıdır.');
      return;
    }
    const yeniNot: Note = {
      id: uuidv4(),
      title: baslik,
      content: icerik,
      date: new Date().toLocaleDateString(),
      isFavorite: false,
      category: '',
      history: []
    };
    notEkle(yeniNot);
    setBaslik('');
    setIcerik('');
  };

  return (
    <form onSubmit={formuGonder} style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Not Başlığı"
        value={baslik}
        onChange={(e) => setBaslik(e.target.value)}
        style={{ marginBottom: '10px', padding: '10px' }}
      />
      <textarea
        placeholder="Notunuzu yazın..."
        value={icerik}
        onChange={(e) => setIcerik(e.target.value)}
        style={{ marginBottom: '10px', padding: '10px' }}
      />
      <button type="submit" style={{ padding: '10px', marginTop: '10px' }}>Ekle</button>
    </form>
  );
};

export default NotFormu;
