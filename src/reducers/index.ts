import type { Action, ActionTypes, AppState } from '../types';

type ReducerActionType = Record<ActionTypes, (oldState: AppState, action: Action) => AppState>;

const handlers: ReducerActionType = {
  SidebarColorSelected: handleSidebarColorSelected,
  StickyNoteMouseDown: (oldState, action) => ({
    ...oldState,
    selectedNoteId: action.payload,
  }),
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

export default reducer;