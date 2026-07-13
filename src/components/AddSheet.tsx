import { Add } from 'iconsax-reactjs';
import { type FC } from 'react';

interface Props {
  onAddSheet: () => void;
}

const AddSheetButton: FC<Props> = ({ onAddSheet }) => {
  return (
    <button
      type="button"
      onClick={onAddSheet}
      aria-label="افزودن صفحه"
      title="افزودن صفحه"
      className="grid h-12 w-12 cursor-pointer place-items-center rounded-2xl border border-white/70 bg-slate-950 text-white shadow-[0_16px_30px_rgba(15,23,42,0.22)] transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
    >
      <Add size={22} color="#FFFFFF" />
    </button>
  );
};

export default AddSheetButton;
