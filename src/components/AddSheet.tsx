import { Add } from 'iconsax-reactjs';
import { type FC } from 'react';

interface Props {
  onAddSheet?: () => void;
}

const AddSheetButton: FC<Props> = ({ onAddSheet }) => {
  return (
    <Add
      className="cursor-pointer"
      size={24}
      color="#37d67a"
      onClick={onAddSheet}
    />
  );
};

export default AddSheetButton;
