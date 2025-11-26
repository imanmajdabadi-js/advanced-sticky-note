import type { SheetType, StickyNoteType } from '../types';
import AddSheetButton from './AddSheet';
import DeleteStickyNotesButton from './DeleteStickyNotesButton';
import SheetList from './SheetList';
import Sidebar from './Sidebar';
import StickyNote from './StickyNote';

interface Props {
  activeSheet?: SheetType;
  selectedColor: StickyNoteType['color'] | null;
  selectedNoteId: number | null;
  activeSheetId: number;
  sheets: SheetType[];
}

const Wrapper: React.FC<Props> = ({
  activeSheet,
  selectedColor,
  selectedNoteId,
  sheets,
  activeSheetId,
}) => {
  return (
    <div className=" flex min-h-screen bg-linear-to-r from-slate-900 to-slate-700">
      <div className="max-w-32 bg-linear-to-r from-violet-200 to-pink-200 flex flex-col flex-1 z-50">
        <Sidebar selectedColor={selectedColor} />
      </div>
      <div
        className=" relative flex-1"
      >
        {activeSheet?.stickyNotes.map((note) => (
          <StickyNote
            selected={note.id === selectedNoteId}
            key={note.id}
            item={note}
          />
        ))}

        <div className="p-4 absolute right-0 bottom-0 flex items-center">
          <SheetList
            activeSheetId={activeSheetId}
            sheets={sheets}
          />
          <div className="flex items-center space-x-2">
            <AddSheetButton />
          </div>
        </div>
        <DeleteStickyNotesButton  />
      </div>
    </div>
  );
};

export default Wrapper;