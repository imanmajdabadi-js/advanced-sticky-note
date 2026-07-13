import type { FC } from 'react';
import type { StickyNoteType } from '../types';

interface Props {
  onClick: (color: StickyNoteType['color']) => void;
  selectedColor: StickyNoteType['color'] | null;
}

const colorOptions: {
  color: StickyNoteType['color'];
  label: string;
  className: string;
}[] = [
  {
    color: 'yellow',
    label: 'کهربایی',
    className: 'bg-gradient-to-br from-amber-200 via-yellow-300 to-orange-300',
  },
  {
    color: 'green',
    label: 'نعنایی',
    className: 'bg-gradient-to-br from-emerald-200 via-teal-300 to-cyan-300',
  },
  {
    color: 'blue',
    label: 'آسمانی',
    className: 'bg-gradient-to-br from-sky-200 via-blue-300 to-indigo-300',
  },
  {
    color: 'purple',
    label: 'بنفش',
    className: 'bg-gradient-to-br from-violet-200 via-purple-300 to-fuchsia-300',
  },
  {
    color: 'pink',
    label: 'صورتی',
    className: 'bg-gradient-to-br from-rose-200 via-pink-300 to-fuchsia-300',
  },
  {
    color: 'red',
    label: 'مرجانی',
    className: 'bg-gradient-to-br from-rose-300 via-red-300 to-orange-300',
  },
  {
    color: 'orange',
    label: 'نارنجی',
    className: 'bg-gradient-to-br from-orange-200 via-amber-300 to-red-300',
  },
  {
    color: 'indigo',
    label: 'نیلی',
    className: 'bg-gradient-to-br from-indigo-200 via-violet-300 to-slate-400',
  },
];

const Sidebar: FC<Props> = ({ onClick, selectedColor }) => {
  const handleClick = (color: StickyNoteType['color']) => {
    onClick(color);
  };

  return (
    <aside className="flex h-full w-20 flex-col items-center gap-3 border-l border-white/60 bg-white/75 px-2 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-2xl sm:w-28 sm:gap-4 sm:px-3 sm:py-5">
      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-950 text-lg font-black text-white shadow-xl shadow-slate-300/60 sm:h-11 sm:w-11">
        ن
      </div>

      <div className="text-center">
        <p className="text-[11px] font-bold text-slate-500">رنگ یادداشت</p>
        <p className="mt-1 hidden text-[10px] leading-4 text-slate-400 sm:block">
          انتخاب کن، بعد روی بوم بزن
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {colorOptions.map((item) => {
          const isSelected = item.color === selectedColor;

          return (
            <button
              key={item.color}
              type="button"
              onClick={() => handleClick(item.color)}
              title={item.label}
              aria-label={`رنگ ${item.label}`}
              className={`h-8 w-8 cursor-pointer rounded-2xl border transition duration-200 sm:h-9 sm:w-9 ${item.className} ${
                isSelected
                  ? 'scale-110 border-slate-950 shadow-[0_0_0_4px_rgba(15,23,42,0.10),0_14px_24px_rgba(15,23,42,0.24)]'
                  : 'border-white/90 shadow-md shadow-slate-200/80 hover:-translate-y-0.5 hover:shadow-lg'
              }`}
            />
          );
        })}
      </div>

      <div className="mt-auto hidden h-16 w-full rounded-3xl border border-dashed border-slate-200 bg-slate-50/80 p-2 text-center text-[10px] leading-5 text-slate-400 sm:block">
        کلیک راست روی یادداشت برای حذف
      </div>
    </aside>
  );
};

export default Sidebar;
