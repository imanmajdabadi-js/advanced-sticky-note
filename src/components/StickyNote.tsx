import { type FC } from 'react';
import type { StickyNoteType } from '../types';

export interface TitleChangeEventArg {
  text: string;
  noteId: number;
}

interface Props {
  item: StickyNoteType;
  onTitleChange: (arg: TitleChangeEventArg) => void;
  onStickyNoteClick: (id: number) => void;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement>, id: number) => void;
  onMouseDown: (id: number, e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp?: () => void;
  selected: boolean;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onTopBorderMouseDown: (id: number, e: React.MouseEvent<HTMLDivElement>) => void;
  onBottomBorderMouseDown: (id: number, e: React.MouseEvent<HTMLDivElement>) => void;
  onLeftBorderMouseDown: (id: number, e: React.MouseEvent<HTMLDivElement>) => void;
  onRightBorderMouseDown: (id: number, e: React.MouseEvent<HTMLDivElement>) => void;
  onLeftTopCornerMouseDown: (id: number, e: React.MouseEvent<HTMLDivElement>) => void;
  onRightTopCornerMouseDown: (id: number, e: React.MouseEvent<HTMLDivElement>) => void;
}

const noteThemes: Record<
  StickyNoteType['color'],
  {
    surface: string;
    text: string;
    tape: string;
  }
> = {
  yellow: {
    surface: 'bg-gradient-to-br from-amber-100 via-yellow-200 to-orange-200',
    text: 'text-amber-950 placeholder:text-amber-700/50',
    tape: 'bg-amber-300/70',
  },
  green: {
    surface: 'bg-gradient-to-br from-emerald-100 via-teal-200 to-cyan-200',
    text: 'text-teal-950 placeholder:text-teal-700/50',
    tape: 'bg-teal-300/70',
  },
  blue: {
    surface: 'bg-gradient-to-br from-sky-100 via-blue-200 to-indigo-200',
    text: 'text-slate-950 placeholder:text-blue-700/50',
    tape: 'bg-blue-300/70',
  },
  purple: {
    surface: 'bg-gradient-to-br from-violet-100 via-purple-200 to-fuchsia-200',
    text: 'text-purple-950 placeholder:text-purple-700/50',
    tape: 'bg-purple-300/70',
  },
  pink: {
    surface: 'bg-gradient-to-br from-rose-100 via-pink-200 to-fuchsia-200',
    text: 'text-rose-950 placeholder:text-rose-700/50',
    tape: 'bg-pink-300/70',
  },
  red: {
    surface: 'bg-gradient-to-br from-rose-200 via-red-200 to-orange-200',
    text: 'text-red-950 placeholder:text-red-700/50',
    tape: 'bg-red-300/70',
  },
  orange: {
    surface: 'bg-gradient-to-br from-orange-100 via-amber-200 to-red-200',
    text: 'text-orange-950 placeholder:text-orange-700/50',
    tape: 'bg-orange-300/70',
  },
  indigo: {
    surface: 'bg-gradient-to-br from-indigo-400 via-violet-400 to-slate-500',
    text: 'text-white placeholder:text-white/60',
    tape: 'bg-white/30',
  },
};

const StickyNote: FC<Props> = ({
  item,
  onTitleChange,
  onStickyNoteClick,
  onContextMenu,
  selected,
  onMouseDown,
  onKeyDown,
  onMouseUp,
  onBottomBorderMouseDown,
  onLeftBorderMouseDown,
  onTopBorderMouseDown,
  onLeftTopCornerMouseDown,
  onRightBorderMouseDown,
  onRightTopCornerMouseDown,
}) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTitleChange({ text: e.target.value, noteId: item.id });
  };

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onContextMenu(e, item.id);
  };
  const handleStickyNoteClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onStickyNoteClick(item.id);
  };
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onMouseDown(item.id, e);
  };

  const handleBorderTopMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onTopBorderMouseDown(item.id, e);
  };

  const handleBorderBottomMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onBottomBorderMouseDown(item.id, e);
  };

  const handleBorderLeftMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onLeftBorderMouseDown(item.id, e);
  };

  const handleRightBorderMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onRightBorderMouseDown(item.id, e);
  };

  const handleLeftTopCornerMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onLeftTopCornerMouseDown(item.id, e);
  };

  const handleRightTopCornerMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onRightTopCornerMouseDown(item.id, e);
  };

  const theme = noteThemes[item.color];

  return (
    <div
      tabIndex={0}
      aria-label="یادداشت قابل جابه‌جایی"
      title="برای جابه‌جایی بکشید"
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
      }}
      className={`group flex cursor-grab select-none items-center rounded-2xl border p-3 shadow-[0_18px_35px_rgba(15,23,42,0.18)] outline-none transition duration-200 active:cursor-grabbing ${theme.surface} ${
        selected
          ? 'border-white/90 ring-4 ring-slate-950/15 shadow-[0_24px_50px_rgba(15,23,42,0.28)]'
          : 'border-white/70 hover:-translate-y-0.5 hover:shadow-[0_22px_42px_rgba(15,23,42,0.22)]'
      }`}
    >
      <div
        className={`pointer-events-none absolute left-1/2 top-0 h-5 w-14 -translate-x-1/2 -translate-y-1/2 rotate-[-2deg] rounded-md ${theme.tape} shadow-sm backdrop-blur-sm`}
      />

      <div
        className={`pointer-events-none absolute right-3 top-3 grid grid-cols-2 gap-1 opacity-35 transition group-hover:opacity-70 ${
          item.color === 'indigo' ? 'text-white' : 'text-slate-700'
        }`}
        aria-hidden="true"
      >
        <span className="h-1 w-1 rounded-full bg-current" />
        <span className="h-1 w-1 rounded-full bg-current" />
        <span className="h-1 w-1 rounded-full bg-current" />
        <span className="h-1 w-1 rounded-full bg-current" />
        <span className="h-1 w-1 rounded-full bg-current" />
        <span className="h-1 w-1 rounded-full bg-current" />
      </div>

      <div className="pointer-events-none absolute inset-x-3 top-3 h-px bg-white/50" />

      {selected && (
        <>
          <div
            className="absolute top-0 h-2 w-full cursor-ns-resize rounded-t-2xl bg-gradient-to-r from-slate-950 via-cyan-500 to-emerald-300"
            onMouseDown={handleBorderTopMouseDown}
          />

          <div
            onMouseDown={handleBorderBottomMouseDown}
            className="absolute bottom-0 h-2 w-full cursor-ns-resize rounded-b-2xl bg-gradient-to-r from-emerald-300 via-cyan-500 to-slate-950"
          />
          <div
            onMouseDown={handleBorderLeftMouseDown}
            className="absolute left-0 h-full w-2 cursor-ew-resize rounded-l-2xl bg-gradient-to-b from-slate-950 via-cyan-500 to-emerald-300"
          />
          <div
            onMouseDown={handleRightBorderMouseDown}
            className="absolute right-0 h-full w-2 cursor-ew-resize rounded-r-2xl bg-gradient-to-b from-emerald-300 via-cyan-500 to-slate-950"
          />

          <div
            onMouseDown={handleLeftTopCornerMouseDown}
            className="absolute left-0 top-0 z-50 h-4 w-4 cursor-nw-resize rounded-br-xl rounded-tl-2xl bg-slate-950 shadow-lg"
          />

          <div
            onMouseDown={handleRightTopCornerMouseDown}
            className="absolute right-0 top-0 z-50 h-4 w-4 cursor-ne-resize rounded-bl-xl rounded-tr-2xl bg-slate-950 shadow-lg"
          />
          <div
            onMouseDown={handleBorderBottomMouseDown}
            className="absolute bottom-0 z-50 h-4 w-4 cursor-ns-resize rounded-bl-2xl rounded-tr-xl bg-slate-950 shadow-lg"
          />
          <div
            onMouseDown={handleBorderBottomMouseDown}
            className="absolute bottom-0 right-0 z-50 h-4 w-4 cursor-ns-resize rounded-br-2xl rounded-tl-xl bg-slate-950 shadow-lg"
          />
        </>
      )}
      {selected ? (
        <input
          autoFocus
          value={item.title}
          placeholder="ایده..."
          className={`relative z-10 mx-auto h-full w-full cursor-text border-none bg-transparent text-center text-sm font-bold leading-6 outline-0 ${theme.text}`}
          onChange={handleTextChange}
          type="text"
        />
      ) : (
        <span className={`relative z-10 mx-auto line-clamp-4 break-words px-1 text-center text-sm font-bold leading-6 ${theme.text}`}>
          {item.title || 'یادداشت تازه'}
        </span>
      )}
    </div>
  );
};

export default StickyNote;
