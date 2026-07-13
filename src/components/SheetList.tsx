import { type FC } from 'react';
import type { SheetType } from '../types';
import Sheet from './Sheet';

interface Props {
  sheets: SheetType[];
  activeSheetId?: number;
  onTitleChange: (id: number, value: string) => void;
  onSelectSheet: (id: number) => void;
}

const SheetList: FC<Props> = ({
  sheets,
  activeSheetId,
  onTitleChange,
  onSelectSheet,
}) => {
  return (
    <div className="flex max-w-[calc(100vw_-_150px)] items-center gap-2 overflow-x-auto rounded-3xl border border-white/70 bg-white/65 p-2 shadow-[0_18px_45px_rgba(15,23,42,0.12)] backdrop-blur-2xl sm:max-w-[min(62vw,620px)]">
      {sheets.map((sheet) => (
        <div
          key={sheet.id}
          className={`cursor-pointer rounded-2xl transition duration-200 ${
            sheet.id === activeSheetId
              ? 'bg-cyan-100/80 p-1 ring-2 ring-cyan-300/80 shadow-lg shadow-cyan-200/70'
              : 'p-1 hover:bg-slate-100'
          }`}
          onClick={() => onSelectSheet(sheet.id)}
        >
          <Sheet
            sheet={sheet}
            onTitleChange={(value) => onTitleChange(sheet.id, value)}
          />
        </div>
      ))}
    </div>
  );
};

export default SheetList;
