import { type FC } from 'react';
import type { SheetType } from '../types';

interface Props {
  sheet: SheetType;
  onTitleChange: (value: string) => void;
}

const Sheet: FC<Props> = ({ sheet, onTitleChange }) => {
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTitleChange(e.target.value);
  };

  return (
    <div className="min-w-28 cursor-pointer rounded-2xl border border-white/70 bg-white/75 px-3 py-2 shadow-sm shadow-slate-200/70 backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:bg-white">
      <input
        onChange={handleChangeTitle}
        value={sheet.title}
        aria-label="نام صفحه"
        placeholder="نام صفحه"
        className="w-full cursor-text bg-transparent text-center text-xs font-bold text-slate-700 outline-0 placeholder:text-slate-400"
      />
    </div>
  );
};

export default Sheet;
