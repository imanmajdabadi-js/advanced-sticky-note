import { useContext, type FC } from 'react';
import DispatchContext from '../context/DispatchContext';
import type { StickyNoteType } from '../types';

export interface TitleChangeEventArg {
  text: string;
  noteId: number;
}

interface Props {
  item: StickyNoteType;
  selected: boolean;
  onTitleChange?: (arg: TitleChangeEventArg) => void;
  onStickyNoteClick?: (id: number) => void;
  onContextMenu?: (e: React.MouseEvent<HTMLDivElement>, id: number) => void;
  onMouseUp?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onTopBorderMouseDown?: (id: number, e: React.MouseEvent<HTMLDivElement>) => void;
  onBottomBorderMouseDown?: (id: number, e: React.MouseEvent<HTMLDivElement>) => void;
  onLeftBorderMouseDown?: (id: number, e: React.MouseEvent<HTMLDivElement>) => void;
  onRightBorderMouseDown?: (id: number, e: React.MouseEvent<HTMLDivElement>) => void;
  onLeftTopCornerMouseDown?: (id: number, e: React.MouseEvent<HTMLDivElement>) => void;
  onRightTopCornerMouseDown?: (id: number, e: React.MouseEvent<HTMLDivElement>) => void;
}

const StickyNote: FC<Props> = ({
  item,
  selected,
  onTitleChange,
  onStickyNoteClick,
  onContextMenu,
  onKeyDown,
  onMouseUp,
  onBottomBorderMouseDown,
  onLeftBorderMouseDown,
  onTopBorderMouseDown,
  onLeftTopCornerMouseDown,
  onRightBorderMouseDown,
  onRightTopCornerMouseDown,
}) => {

  const {dispatch} = useContext(DispatchContext);


  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTitleChange?.({ text: e.target.value, noteId: item.id });
  };

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onContextMenu?.(e, item.id);
  };

  const handleStickyNoteClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onStickyNoteClick?.(item.id);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // onMouseDown?.(item.id, e);
    dispatch({
      type: 'StickyNoteMouseDown',
      payload: item.id
    });
  };

  const handleBorderTopMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onTopBorderMouseDown?.(item.id, e);
  };

  const handleBorderBottomMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onBottomBorderMouseDown?.(item.id, e);
  };

  const handleBorderLeftMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onLeftBorderMouseDown?.(item.id, e);
  };

  const handleRightBorderMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onRightBorderMouseDown?.(item.id, e);
  };

  const handleLeftTopCornerMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onLeftTopCornerMouseDown?.(item.id, e);
  };

  const handleRightTopCornerMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onRightTopCornerMouseDown?.(item.id, e);
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseUp={onMouseUp}
      onMouseDown={handleMouseDown}
      onContextMenu={handleRightClick}
      onClick={handleStickyNoteClick}
      style={{
        width: item.width,
        height: item.height,
        zIndex: item.zIndex,
        position: 'absolute',
        top: item.positionY,
        left: item.positionX,
        background: item.color,
      }}
      className="flex items-center rounded-lg "
    >
      {selected && (
        <>
          <div
            className="absolute cursor-ns-resize top-0 h-2 w-full bg-linear-to-r from-teal-400 to-yellow-200"
            onMouseDown={handleBorderTopMouseDown}
          />

          <div
            onMouseDown={handleBorderBottomMouseDown}
            className="absolute cursor-ns-resize bottom-0 h-2 w-full bg-linear-to-r from-teal-400 to-yellow-200"
          />
          <div
            onMouseDown={handleBorderLeftMouseDown}
            className="absolute cursor-ew-resize left-0 h-full w-2 bg-linear-to-r from-teal-400 to-yellow-200"
          />
          <div
            onMouseDown={handleRightBorderMouseDown}
            className="absolute cursor-ew-resize right-0 h-full w-2 bg-linear-to-r from-teal-400 to-yellow-200"
          />

          <div
            onMouseDown={handleLeftTopCornerMouseDown}
            className="absolute cursor-nw-resize left-0 top-0 w-2 h-2 z-50 bg-linear-to-r from-pink-500 to-rose-500"
          />

          <div
            onMouseDown={handleRightTopCornerMouseDown}
            className="absolute cursor-ne-resize right-0 top-0 w-2 h-2 z-50 bg-linear-to-r from-pink-500 to-rose-500"
          />
          <div className="absolute cursor-sw-resize bottom-0  w-2 h-2 z-50 bg-linear-to-r from-pink-500 to-rose-500" />
          <div className="absolute cursor-se-resize right-0 bottom-0  w-2 h-2 z-50 bg-linear-to-r from-pink-500 to-rose-500" />
        </>
      )}
      {selected ? (
        <input
          autoFocus
          value={item.title}
          className="w-24 border-none outline-0 text-center mx-auto text-white"
          onChange={handleTextChange}
          type="text"
        />
      ) : (
        <label className="mx-auto">{item.title}</label>
      )}
    </div>
  );
};

export default StickyNote;