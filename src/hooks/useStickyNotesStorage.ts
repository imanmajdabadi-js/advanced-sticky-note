import { useEffect, useState } from 'react';
import type { SheetType } from '../types';

export function useStickyNotesStorage(initialSheets: SheetType[]) {
  const [sheets, setSheets] = useState<SheetType[]>(initialSheets);

  useEffect(() => {
    const save = localStorage.getItem('stickyNotes');
    if (save) {
      try {
        setSheets(JSON.parse(save));
      } catch {
        setSheets(initialSheets);
      }
    } else {
      setSheets(initialSheets);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('stickyNotes', JSON.stringify(sheets));
  }, [sheets]);
  return { sheets, setSheets };
}
