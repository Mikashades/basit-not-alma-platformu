import React, { useState, useEffect } from 'react';
import NotFormu from './components/NotFormu';
import NotList from './components/NotList';
import { Note } from './types';

const Uygulama: React.FC = () => {
  const [notlar, setNotlar] = useState<Note[]>([]);
  const [aramaTerimi, setAramaTerimi] = useState(''); 
  const [filtrelenmisNotlar, setFiltrelenmisNotlar] = useState<Note[]>([]);

  useEffect(() => {
    const kaydedilmisNotlar = localStorage.getItem('notlar');
    if (kaydedilmisNotlar) {
      setNotlar(JSON.parse(kaydedilmisNotlar));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notlar', JSON.stringify(notlar));
    setFiltrelenmisNotlar(notlar.filter(not => not.title.includes(aramaTerimi) || not.content.includes(aramaTerimi)));
  }, [notlar, aramaTerimi]);

  const notEkle = (yeniNot: Note) => {
    setNotlar(prevNotlar => [...prevNotlar, yeniNot]);
  };

  const notSil = (id: string) => {
    setNotlar(prevNotlar => prevNotlar.filter(not => not.id !== id));
  };

  const notDuzenle = (guncellenenNot: Note) => {
    setNotlar(prevNotlar => prevNotlar.map(not => not.id === guncellenenNot.id ? guncellenenNot : not));
  };

  const aramaYap = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAramaTerimi(e.target.value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Not Alma Websitesi</h1>

      <input
        type="text"
        placeholder="Notları Ara..."
        value={aramaTerimi}
        onChange={aramaYap}
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />

      <NotFormu notEkle={notEkle} />

      <NotList notlar={filtrelenmisNotlar} notSil={notSil} notDuzenle={notDuzenle} />
    </div>
  );
};

export default Uygulama;
