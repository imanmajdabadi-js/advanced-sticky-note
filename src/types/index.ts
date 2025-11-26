export interface StickyNoteType {
  width: number;
  height: number;
  positionX: number;
  positionY: number;
  zIndex: number;
  color: 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'indigo' | 'orange' | 'pink';
  title: string;
  id: number;
}

export interface SheetType {
  id: number;
  title: string;
  stickyNotes: StickyNoteType[];
}

export interface AppState {
  sheets: SheetType[],
  activeSheetId: number,
  selectedColor: StickyNoteType['color'] | null,
  selectedNoteId: number | null,
  offestX: number,
  offsetY: number,
  isDragging: boolean,
  resizeDirections: 'top' | 'left' | 'bottom' | 'right' | 'topLeft' | 'topRight' | null,
  isResizing: boolean,
}


export type ActionTypes = 'SidebarColorSelected' | 'StickyNoteMouseDown'


export interface Action {
  type: ActionTypes;
  payload: any | null
}