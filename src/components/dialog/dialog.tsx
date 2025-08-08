import { useEffect, useRef, type ReactNode } from 'react';
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
    const dialogNode = dialogRef.current;

    dialogNode?.addEventListener('close', handleClose);

    return () => {
      dialogNode?.removeEventListener('close', handleClose);
    };
  }, [handleClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      handleClose();
    }
  };

  return createPortal(
    <dialog ref={dialogRef} onClick={handleBackdropClick}>
      <article>
        <header>
          <button aria-label="Close" rel="prev" onClick={handleClose}></button>
          <h3>{title}</h3>
        </header>
        {children}
        <footer>
          <button className="secondary" onClick={handleClose}>
            Cancel
          </button>
          <button onClick={handleClose}>Confirm</button>
        </footer>
      </article>
    </dialog>,
    document.body
  );
}
