import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ open, onClose, children }) {
  console.log('<Modal/>');
  let dialogRef = useRef();

  function checkClickOutside(event) {
    // dialogRef is referring to everything outside the modal
    // event.target is something that the user clicks
    if (open && dialogRef.current === event.target) {
      dialogRef.current.close();
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', checkClickOutside);

    if (open) {
      dialogRef.current.showModal();
    }

    if (!open) {
      dialogRef.current.close();
    }

    return () => document.removeEventListener('mousedown', checkClickOutside);
  }, [open]);

  return createPortal(
    <dialog
      className="w-80 rounded-md bg-white p-4 shadow-md backdrop:bg-stone-950/50"
      ref={dialogRef}
      onClose={onClose}
    >
      {open ? children : null}
    </dialog>,
    document.getElementById('modal'),
  );
}
