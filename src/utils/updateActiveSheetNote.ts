import type { AppState, StickyNoteType } from '../types';

interface UpdateActiveSheetNoteProps {
  state: AppState;
  noteId: number;
  updateFn: (note: StickyNoteType) => StickyNoteType;
}

export function updateActiveSheetNote({
  state,
  noteId,
  updateFn,
}: UpdateActiveSheetNoteProps): AppState {
  return {
    ...state,
    sheets: state.sheets.map((sheet) =>
      sheet.id !== state.activeSheetId
        ? sheet
        : {
            ...sheet,
            stickyNotes: sheet.stickyNotes.map((note) =>
              note.id === noteId ? updateFn(note) : note
            ),
          }
    ),
  };
}
