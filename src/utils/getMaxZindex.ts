import type { AppState } from '../types';

export function getMaxZindex(state: AppState): number {
  const activeSheet = state.sheets.find((sheet) => sheet.id === state.activeSheetId);
  const zindexArray = activeSheet!.stickyNotes.map((note) => note.zIndex);
  return Math.max(...zindexArray);
}
