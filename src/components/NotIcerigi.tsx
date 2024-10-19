import React, { useState } from 'react';
import { Note } from '../types';

interface NotItemProps {
  not: Note;
  notSil: (id: string) => void;
  notDuzenle: (not: Note) => void;
}

const NotItem: React.FC<NotItemProps> = ({ not, notSil, notDuzenle }) => {
  const [duzenlemeYapiliyor, setDuzenlemeYapiliyor] = useState(false);
  const [duzenlenenIcerik, setDuzenlenenIcerik] = useState(not.content);
  const [duzenlenenBaslik, setDuzenlenenBaslik] = useState(not.title); 
  const [gosterGeçmiş, setGosterGeçmiş] = useState(false);

  const duzenlemeYap = () => {
    setDuzenlemeYapiliyor(!duzenlemeYapiliyor);
    if (duzenlemeYapiliyor) {
      not.history.push({
        content: not.content,
        title: not.title, 
        date: new Date().toLocaleString(),
      });
      notDuzenle({ ...not, content: duzenlenenIcerik, title: duzenlenenBaslik, isEdited: true });
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      {duzenlemeYapiliyor ? (
        <input
          type="text"
          value={duzenlenenBaslik}
          onChange={(e) => setDuzenlenenBaslik(e.target.value)}
          placeholder="Başlığı düzenleyin"
          style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
        />
      ) : (
        <h3>{not.title}</h3>
      )}

      {duzenlemeYapiliyor ? (
        <textarea
          value={duzenlenenIcerik}
          onChange={(e) => setDuzenlenenIcerik(e.target.value)}
          style={{ width: '100%', minHeight: '80px' }}
        />
      ) : (
        <p dangerouslySetInnerHTML={{ __html: yazistil(not.content) }}></p>
      )}

      <p>{not.date} {not.isEdited && "(düzenlendi)"}</p>
      <button onClick={duzenlemeYap} style={{ marginRight: '10px' }}>
        {duzenlemeYapiliyor ? 'Kaydet' : 'Düzenle'}
      </button>
      <button onClick={() => notSil(not.id)} style={{ marginLeft: '10px' }}>Sil</button>

      {not.history.length > 0 && (
        <div>
          <button onClick={() => setGosterGeçmiş(!gosterGeçmiş)} style={{ marginTop: '10px' }}>
            {gosterGeçmiş ? 'Gizle' : 'Eski Halini Göster'}
          </button>
          {gosterGeçmiş && (
            <ul>
              {not.history.map((entry, index) => (
                <li key={index}>
                  {entry.date} - Başlık: {entry.title} - İçerik: {entry.content}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

const yazistil = (icerik: string) => {
  return icerik
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>') // kalın ve yatay
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // kalın
    .replace(/\*(.*?)\*/g, '<em>$1</em>') // yatay
    .replace(/__(.*?)__/g, '<u>$1</u>') // altı çizili
    .replace(/~~(.*?)~~/g, '<del>$1</del>') // üstü çizili (karalanmış)
    .replace(/```(.*?)```/g, '<pre><code>$1</code></pre>') // kod bloğu
    .replace(/`(.*?)`/g, '<code>$1</code>'); // kare içinde
};

export default NotItem;
