import { useState } from 'react';

function useActionSheet() {
  const [isOpen, setIsOpen] = useState(false);

  function show() {
    setIsOpen(true);
  }

  function hide() {
    setIsOpen(false);
  }

  return { isOpen, show, hide };
}

export default useActionSheet;
