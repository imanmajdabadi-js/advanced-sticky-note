import type { Action, ActionTypes, AppState } from '../types';

type ReducerActionType = Record<ActionTypes, (oldState: AppState, action: Action) => AppState>;

const handlers: ReducerActionType = {
  SidebarColorSelected: handleSidebarColorSelected,
  StickyNoteMouseDown: (oldState, action) => ({
    ...oldState,
    selectedNoteId: action.payload,
  }),
  StickyNoteChangeTitle: handleStickyNoteChangeTitle,
  StickyNoteIncreasZindex: handleIncreaseZindexStickyNote,
};

const reducer = (oldState: AppState, action: Action): AppState => {
  const fn = handlers[action.type];
  if (fn) {
    return fn(oldState, action);
  }
  return oldState;

  // return handlers[action.type]?.(oldState, action) ?? oldState;
};

function handleSidebarColorSelected(oldState: AppState, action: Action) {
  return {
    ...oldState,
    selectedColor: action.payload === oldState.selectedColor ? null : action.payload,
  };
}

function handleStickyNoteChangeTitle(oldState: AppState, action: Action) {
  const { text, noteId } = action.payload;
  return {
    ...oldState,
    sheets: oldState.sheets.map((sheet) =>
      sheet.id !== oldState.activeSheetId
        ? sheet
        : {
            ...sheet,
            stickyNotes: sheet.stickyNotes.map((note) =>
              note.id === noteId ? { ...note, title: text } : note
            ),
          }
    ),
  };
}

function handleIncreaseZindexStickyNote(oldState: AppState, action: Action) {
  const { noteId } = action.payload;
  const currentSheet = oldState.sheets.find((sheet) => sheet.id === oldState.activeSheetId);
  const zindexArray = currentSheet!.stickyNotes.map((note) => note.zIndex);
  const maxZindex = Math.max(...zindexArray);

  return {
    ...oldState,
    action: currentSheet?.stickyNotes.map((note) =>
      note.id === noteId ? note : { ...note, zIndex: maxZindex + 1 }
    ),
  };
}

export default reducer;
