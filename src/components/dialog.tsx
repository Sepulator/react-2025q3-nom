import { type MouseEvent, type ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: ReactNode;
  handleClose: () => void;
  isOpen: boolean;
  title: string;
}

export function Dialog({ children, handleClose, isOpen, title }: Props) {
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
    const dialogNode = dialogRef.current;

    dialogNode?.addEventListener('close', handleClose);

    return () => {
      dialogNode?.removeEventListener('close', handleClose);
    };
  }, [handleClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      handleClose();
    }
  };

  return createPortal(
    <dialog onClick={handleBackdropClick} ref={dialogRef}>
      <article>
        <header>
          <button aria-label="Close" onClick={handleClose} rel="prev"></button>
          <h3>{title}</h3>
        </header>
        {children}
      </article>
    </dialog>,
    document.body
  );
}
