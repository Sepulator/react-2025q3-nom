import { useEffect, useRef, type ReactNode, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  children: ReactNode;
  title: string;
}

export function Dialog({ children, isOpen, handleClose, title }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogNode = dialogRef.current;

    if (isOpen) {
      dialogNode?.showModal();
    } else {
      dialogNode?.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    const dialogNode = dialogRef.current;

    dialogNode?.addEventListener('close', handleClose);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      dialogNode?.removeEventListener('close', handleClose);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      handleClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <dialog ref={dialogRef} onClick={handleBackdropClick}>
      <article>
        <header>
          <button aria-label="Close" rel="prev" onClick={handleClose}></button>
          <h3>{title}</h3>
        </header>
        {children}
      </article>
    </dialog>,
    document.body
  );
}
