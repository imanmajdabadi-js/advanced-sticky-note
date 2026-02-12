import type { Action, ActionTypes, AppState } from '../types';
import { getMaxZindex } from '../utils/getMaxZindex';
import { updateActiveSheetNote } from '../utils/updateActiveSheetNote';

type ReducerActionType = Record<ActionTypes, (oldState: AppState, action: Action) => AppState>;

const handlers: ReducerActionType = {
  SidebarColorSelected: handleSidebarColorSelected,
  StickyNoteMouseDown: (oldState, action) => ({
    ...oldState,
    selectedNoteId: action.payload === oldState.activeSheetId ? null : action.payload,
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
  const { noteId, title } = action.payload;
  return updateActiveSheetNote({
    state: oldState,
    noteId,
    updateFn: (note) => ({
      ...note,
      title,
    }),
  });
}

function handleIncreaseZindexStickyNote(oldState: AppState, action: Action) {
  const { noteId } = action.payload;

  const maxZ = getMaxZindex(oldState);

  return updateActiveSheetNote({
    state: oldState,
    noteId,
    updateFn: (note) => ({
      ...note,
      zIndex: maxZ + 1,
    }),
  });
}

export default reducer;
