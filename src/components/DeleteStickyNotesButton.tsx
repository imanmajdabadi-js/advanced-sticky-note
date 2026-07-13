import { type FC } from 'react';

interface Props {
  onDelete: () => void;
}
const DeleteStickyNotesButton: FC<Props> = ({ onDelete }) => {
  const handleDelete = () => {
    onDelete();
  };

  return (
    <button
      onClick={handleDelete}
      type="button"
      className="absolute left-5 top-5 z-40 cursor-pointer rounded-2xl border border-red-200/80 bg-white/80 px-4 py-2 text-xs font-bold text-red-600 shadow-[0_14px_34px_rgba(185,28,28,0.12)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:bg-red-50"
    >
      پاک کردن همه
    </button>
  );
};

export default DeleteStickyNotesButton;
