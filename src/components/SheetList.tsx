import { type FC } from 'react';
import type { SheetType } from '../types';
import Sheet from './Sheet';

interface Props {
  sheets: SheetType[];
  activeSheetId?: number;
  onTitleChange?: (id: number, value: string) => void;
  onSelectSheet?: (id: number) => void;
}

const SheetList: FC<Props> = ({ sheets, activeSheetId, onTitleChange, onSelectSheet }) => {
  return (
    <div className="flex items-center space-x-2 p-4">
      {sheets.map((sheet) => (
        <div
          key={sheet.id}
          className={`cursor-pointer p-2 rounded ${
            sheet.id === activeSheetId ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => onSelectSheet?.(sheet.id)}
        >
          <Sheet sheet={sheet} onTitleChange={(value) => onTitleChange?.(sheet.id, value)} />
        </div>
      ))}
    </div>
  );
};

export default SheetList;
