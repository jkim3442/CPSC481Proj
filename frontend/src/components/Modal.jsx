import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { motion, AnimatePresence } from 'framer-motion';

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
    <motion.dialog
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 30, opacity: 0 }}
      className="w-80 rounded-md bg-white p-4 shadow-md backdrop:bg-stone-950/50"
      ref={dialogRef}
      onClose={onClose}
    >
      {open ? children : null}
    </motion.dialog>,
    document.getElementById('modal'),
  );
}
