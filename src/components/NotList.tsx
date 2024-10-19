import React from 'react';
import { Note } from '../types';
import NotItem from './NotIcerigi';

interface NotListProps {
  notlar: Note[];
  notSil: (id: string) => void;
  notDuzenle: (not: Note) => void;
}

const NotList: React.FC<NotListProps> = ({ notlar, notSil, notDuzenle }) => {
  return (
    <div>
      {notlar.map((not) => (
        <NotItem key={not.id} not={not} notSil={notSil} notDuzenle={notDuzenle} />
      ))}
    </div>
  );
};

export default NotList;
