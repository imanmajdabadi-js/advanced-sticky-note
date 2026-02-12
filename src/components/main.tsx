import { useEffect, useRef, useState } from 'react';
import { useStickyNotesStorage } from '../hooks/useStickyNotesStorage';
import type { SheetType, StickyNoteType } from '../types';
import AddSheetButton from './AddSheet';
import DeleteStickyNotesButton from './DeleteStickyNotesButton';
import SheetList from './SheetList';
import Sidebar from './Sidebar';
import StickyNote, { type TitleChangeEventArg } from './StickyNote';

function Main() {
  const initialSheets: SheetType[] = [
    {
      id: 1,
      title: 'Sheet 1',
      stickyNotes: [
        {
          id: 1,
          title: 'Note 1',
          color: 'green',
          width: 100,
          height: 100,
          positionX: 50,
          positionY: 100,
          zIndex: 2,
        },
        {
          id: 2,
          title: 'Note 2',
          color: 'red',
          width: 100,
          height: 100,
          positionX: 200,
          positionY: 150,
          zIndex: 5,
        },
      ],
    },
  ];
  const { sheets, setSheets } = useStickyNotesStorage(initialSheets);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [resizeDirections, setResizeDirections] = useState<
    'top' | 'left' | 'bottom' | 'right' | 'topLeft' | 'topRight' | null
  >(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [offestX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<StickyNoteType['color'] | null>(null);
  const [activeSheetId, setActiveSheetId] = useState<number>(1);

  const handleSelectSheet = (id: number) => {
    setActiveSheetId(id);
  };

  const handleAddSheet = () => {
    const newSheet: SheetType = {
      id: Math.random(),
      title: `Sheet ${sheets.length + 1}`,
      stickyNotes: [],
    };
    setSheets((prev) => [...prev, newSheet]);
    setActiveSheetId(newSheet.id);
  };

  const handleTitleChange = (id: number, value: string) => {
    setSheets((prev) =>
      prev.map((sheet) => (sheet.id === id ? { ...sheet, title: value } : sheet))
    );
  };

  const handleColorClick = (color: StickyNoteType['color']) => {
    if (color === selectedColor) {
      setSelectedColor(null);
    } else {
      setSelectedColor(color);
    }
  };

  const handleTitleChangeStickyNote = (arg: TitleChangeEventArg) => {
    setSheets((prev) =>
      prev.map((sheet) =>
        sheet.id !== activeSheetId
          ? sheet
          : {
              ...sheet,
              stickyNotes: sheet.stickyNotes.map((note) =>
                note.id === arg.noteId ? { ...note, title: arg.text } : note
              ),
            }
      )
    );
  };

  const handleStickyNoteClick = (id: number) => {
    setSelectedColor(null);
    setSelectedNoteId(id);
    const currentSheet = sheets.find((sheet) => sheet.id === activeSheetId);

    const zIndexes = currentSheet!.stickyNotes.map((note) => note.zIndex);
    const maxZindex = Math.max(...zIndexes);

    setSheets((prev) =>
      prev.map((sheet) =>
        sheet.id !== activeSheetId
          ? sheet
          : {
              ...sheet,
              stickyNotes: sheet.stickyNotes.map((note) =>
                note.id === id ? { ...note, zIndex: maxZindex + 1 } : note
              ),
            }
      )
    );
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectedColor) {
      const width = 100;
      const height = 100;
      const rect = e.currentTarget.getBoundingClientRect();
      let x = e.clientX - rect.left - width / 2;
      let y = e.clientY - rect.top - height / 2;
      const maxX = document.body.clientWidth - width / 2;
      const maxY = document.body.clientHeight - height / 2;
      const minX = rect.left + width / 2;
      const minY = rect.top + height / 2;
      if (e.clientX > maxX) {
        x = x - width / 2;
      }
      if (e.clientY > maxY) {
        y = y - height / 2;
      }

      if (e.clientX < minX) {
        x = x + width / 2;
      }

      if (e.clientY < minY) {
        y = y + height / 2;
      }
      const newSticky: StickyNoteType = {
        title: '',
        color: selectedColor,
        height: height,
        id: Math.random(),
        positionX: x,
        positionY: y,
        width: width,
        zIndex: 1,
      };
      const nextState = sheets.map((sheet) => {
        if (sheet.id === activeSheetId) {
          return { ...sheet, stickyNotes: [...sheet.stickyNotes, newSticky] };
        } else {
          return sheet;
        }
      });
      setSheets(nextState);
      setSelectedNoteId(newSticky.id);
      setSelectedColor(null);
    }
  };

  const handleRightClickOnStickyNote = (e: React.MouseEvent<HTMLDivElement>, noteId: number) => {
    e.preventDefault();
    if (!selectedNoteId) return;

    deleteNote(noteId);

    setSelectedNoteId(null);
  };

  function deleteNote(id: number) {
    setSheets((prev) =>
      prev.map((sheet) =>
        sheet.id === activeSheetId
          ? {
              ...sheet,
              stickyNotes: sheet.stickyNotes.filter((note) => note.id !== id),
            }
          : sheet
      )
    );
  }

  const handleMouseDown = (noteId: number, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setOffsetX(e.clientX - rect.left);
    setOffsetY(e.clientY - rect.top);
    const currentSheet = sheets.find((sheet) => sheet.id === activeSheetId);
    const zIndexes = currentSheet!.stickyNotes.map((note) => note.zIndex);
    const maxZindex = Math.max(...zIndexes);

    setSheets((prev) =>
      prev.map((sheet) =>
        sheet.id !== activeSheetId
          ? sheet
          : {
              ...sheet,
              stickyNotes: sheet.stickyNotes.map((note) =>
                note.id === noteId ? { ...note, zIndex: maxZindex + 1 } : note
              ),
            }
      )
    );

    setSelectedNoteId(noteId);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isResizing) return;
    if (!isDragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - rect.left - offestX;
    let y = e.clientY - rect.top - offsetY;

    const currentSheet = sheets.find((sheet) => sheet.id === activeSheetId);
    const currentNote = currentSheet?.stickyNotes.find((n) => n.id === selectedNoteId);
    const noteWidth = currentNote?.width ?? 100;

    const noteHeight = currentNote?.height ?? 100;

    const maxX = rect.width - noteWidth;
    const maxY = rect.height - noteHeight;
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > maxX) x = maxX;
    if (y > maxY) y = maxY;

    setSheets((prev) =>
      prev.map((sheet) =>
        sheet.id !== activeSheetId
          ? sheet
          : {
              ...sheet,
              stickyNotes: sheet.stickyNotes.map((note) =>
                selectedNoteId === note.id
                  ? {
                      ...note,
                      positionX: x,
                      positionY: y,
                    }
                  : note
              ),
            }
      )
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Delete' && selectedNoteId) {
      deleteNote(selectedNoteId);
      setSelectedNoteId(null);
    }
  };

  const handleDeleteStickyNotesClick = (sheetId: number) => {
    setSheets((prev) =>
      prev.map((sheet) => (sheet.id === sheetId ? { ...sheet, stickyNotes: [] } : sheet))
    );
  };

  const handleStickyTopBorderMouseDown = (id: number) => {
    setResizeDirections('top');

    setIsResizing(true);
    setIsDragging(false);
    setSelectedNoteId(id);
  };

  const handleStickyBottomBorderMouseDown = (id: number) => {
    setResizeDirections('bottom');
    setIsResizing(true);
    setIsDragging(false);
    setSelectedNoteId(id);
  };
  const handleStickyRightBorderMouseDown = (id: number) => {
    setResizeDirections('right');
    setIsResizing(true);
    setIsDragging(false);
    setSelectedNoteId(id);
  };

  const handleStickyLeftBorderMouseDown = (id: number) => {
    setResizeDirections('left');
    setIsResizing(true);
    setIsDragging(false);
    setSelectedNoteId(id);
  };

  const handleLeftTopCornerMouseDown = (id: number) => {
    setIsResizing(true);
    setSelectedNoteId(id);
    setResizeDirections('topLeft');
  };

  const handleRightTopCornerMouseDown = (id: number) => {
    setIsResizing(true);
    setSelectedNoteId(id);
    setResizeDirections('topRight');
  };

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setSelectedColor(null);
      }
    });

    function onMouseUp() {
      setIsResizing(false);
      setIsDragging(false);
    }

    function onMouseMove(e: MouseEvent) {
      if (isDragging) return;
      if (!isResizing) return;
      const activeSheet = sheets.find((sheet) => sheet.id === activeSheetId);
      const selectedStickyNote = activeSheet!.stickyNotes.find(
        (stickyNote) => stickyNote.id === selectedNoteId
      );
      if (resizeDirections === 'top') {
        const deltaTop = selectedStickyNote!.positionY - e.clientY;
        const newHeight = selectedStickyNote!.height + deltaTop;
        const newPositionY = selectedStickyNote!.positionY - deltaTop;

        const newSheets = sheets.map((sheet) => {
          if (sheet.id !== activeSheetId) {
            return sheet;
          } else {
            return {
              ...sheet,
              stickyNotes: sheet.stickyNotes.map((note) => {
                if (note.id !== selectedNoteId) {
                  return note;
                } else {
                  return {
                    ...note,
                    height: newHeight,
                    positionY: newPositionY,
                  };
                }
              }),
            };
          }
        });

        setSheets(newSheets);
      } else if (resizeDirections === 'right') {
        const a = selectedStickyNote!.width + selectedStickyNote!.positionX;
        const rect = containerRef!.current!.getBoundingClientRect();
        const b = e.clientX - rect.left;
        const deltaRight = b - a;

        const newWidth = selectedStickyNote!.width + deltaRight;

        const newSheets = sheets.map((sheet) => {
          if (sheet.id !== activeSheetId) {
            return sheet;
          } else {
            return {
              ...sheet,
              stickyNotes: sheet.stickyNotes.map((note) => {
                if (note.id !== selectedNoteId) {
                  return note;
                } else {
                  return {
                    ...note,
                    width: newWidth,
                  };
                }
              }),
            };
          }
        });

        setSheets(newSheets);
      } else if (resizeDirections === 'bottom') {
        const deltaBottom =
          e.clientY - (selectedStickyNote!.positionY + selectedStickyNote!.height);
        const newHeight = selectedStickyNote!.height + deltaBottom;
        const newSheets = sheets.map((sheet) => {
          if (sheet.id !== activeSheetId) {
            return sheet;
          } else {
            return {
              ...sheet,
              stickyNotes: sheet.stickyNotes.map((note) => {
                if (note.id !== selectedNoteId) {
                  return note;
                } else {
                  return {
                    ...note,
                    height: newHeight,
                  };
                }
              }),
            };
          }
        });

        setSheets(newSheets);
      } else if (resizeDirections === 'left') {
        const rect = containerRef!.current!.getBoundingClientRect();
        const newPostionX = e.clientX - rect.left;
        const newWidth = selectedStickyNote!.positionX - newPostionX + selectedStickyNote!.width;

        const newSheets = sheets.map((sheet) => {
          if (sheet.id !== activeSheetId) {
            return sheet;
          } else {
            return {
              ...sheet,
              stickyNotes: sheet.stickyNotes.map((note) => {
                if (note.id !== selectedNoteId) {
                  return note;
                } else {
                  return {
                    ...note,
                    width: newWidth,
                    positionX: newPostionX,
                  };
                }
              }),
            };
          }
        });

        setSheets(newSheets);
      } else if (resizeDirections === 'topLeft') {
        const rect = containerRef!.current!.getBoundingClientRect();
        const newPostionX = e.clientX - rect.left;
        const newWidth = selectedStickyNote!.positionX - newPostionX + selectedStickyNote!.width;
        const deltaTop = selectedStickyNote!.positionY - e.clientY;
        const newHeight = selectedStickyNote!.height + deltaTop;
        const newPositionY = selectedStickyNote!.positionY - deltaTop;
        const newSheets = sheets.map((sheet) => {
          if (sheet.id !== activeSheetId) {
            return sheet;
          } else {
            return {
              ...sheet,
              stickyNotes: sheet.stickyNotes.map((note) => {
                if (note.id !== selectedNoteId) {
                  return note;
                } else {
                  return {
                    ...note,
                    height: newHeight,
                    positionY: newPositionY,
                    width: newWidth,
                    positionX: newPostionX,
                  };
                }
              }),
            };
          }
        });

        setSheets(newSheets);
      } else if (resizeDirections === 'topRight') {
        const deltaTop = selectedStickyNote!.positionY - e.clientY;
        const newHeight = selectedStickyNote!.height + deltaTop;
        const newPositionY = selectedStickyNote!.positionY - deltaTop;

        const a = selectedStickyNote!.width + selectedStickyNote!.positionX;
        const rect = containerRef!.current!.getBoundingClientRect();
        const b = e.clientX - rect.left;
        const deltaRight = b - a;

        const newWidth = selectedStickyNote!.width + deltaRight;

        const newSheets = sheets.map((sheet) => {
          if (sheet.id !== activeSheetId) {
            return sheet;
          } else {
            return {
              ...sheet,
              stickyNotes: sheet.stickyNotes.map((note) => {
                if (note.id !== selectedNoteId) {
                  return note;
                } else {
                  return {
                    ...note,
                    width: newWidth,
                    height: newHeight,
                    positionY: newPositionY,
                  };
                }
              }),
            };
          }
        });

        setSheets(newSheets);
      }
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [isResizing]);

  const activeSheet = sheets.find((sheet) => sheet.id === activeSheetId);

  return (
    <div className=" flex min-h-screen bg-linear-to-r from-slate-900 to-slate-700">
      <div className="max-w-32 bg-linear-to-r from-violet-200 to-pink-200 flex flex-col flex-1 z-50">
        <Sidebar selectedColor={selectedColor} onClick={handleColorClick} />
      </div>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onClick={handleContainerClick}
        className=" relative flex-1"
      >
        {activeSheet?.stickyNotes.map((note) => (
          <StickyNote
            onRightTopCornerMouseDown={handleRightTopCornerMouseDown}
            onLeftTopCornerMouseDown={handleLeftTopCornerMouseDown}
            onLeftBorderMouseDown={handleStickyLeftBorderMouseDown}
            onRightBorderMouseDown={handleStickyRightBorderMouseDown}
            onBottomBorderMouseDown={handleStickyBottomBorderMouseDown}
            onTopBorderMouseDown={handleStickyTopBorderMouseDown}
            onKeyDown={handleKeyDown}
            selected={note.id === selectedNoteId}
            onMouseDown={handleMouseDown}
            onContextMenu={handleRightClickOnStickyNote}
            onStickyNoteClick={handleStickyNoteClick}
            onTitleChange={handleTitleChangeStickyNote}
            key={note.id}
            item={note}
          />
        ))}

        <div className="p-4 absolute right-0 bottom-0 flex items-center">
          <SheetList
            activeSheetId={activeSheetId}
            sheets={sheets}
            onTitleChange={handleTitleChange}
            onSelectSheet={handleSelectSheet}
          />
          <div className="flex items-center space-x-2">
            <AddSheetButton onAddSheet={handleAddSheet} />
          </div>
        </div>
        <DeleteStickyNotesButton onDelete={() => handleDeleteStickyNotesClick(activeSheetId)} />
      </div>
    </div>
  );
}

export default Main;
