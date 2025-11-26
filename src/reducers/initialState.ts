import type { AppState } from "../types";

const initialState: AppState = {
  sheets: [
    {
      id: 1,
      title: 'Sheet 1',
      stickyNotes: [
        {
          id: 1,
          width: 100,
          height: 100,
          positionX: 450,
          positionY: 100,
          zIndex: 2,
          color: 'green',
          title: 'Note 1',
        },
        {
          id: 2,
          width: 150,
          height: 120,
          positionX: 200,
          positionY: 150,
          zIndex: 5,
          color: 'red',
          title: 'Note 2',
        },
      ],
    },
    {
      id: 2,
      title: "Sheet 2",
      stickyNotes: [
        {
          id: 1,
          width: 150,
          height: 120,
          positionX: 200,
          positionY: 150,
          zIndex: 5,
          color: 'yellow',
          title: 'Sheet 2',
        }
      ]
    },
    {
      id: 3,
      title: "Sheet 3",
      stickyNotes: []
    }
  ],
  activeSheetId: 1,
  selectedColor: null,
  selectedNoteId: null,
  offestX: 0,
  offsetY: 0,
  isDragging: false,
  resizeDirections: null,
  isResizing: false,
}

export default initialState