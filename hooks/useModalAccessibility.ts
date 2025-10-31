import React, { useEffect, useRef } from 'react';

export const useModalAccessibility = (isOpen: boolean, onClose: () => void, modalRef: React.RefObject<HTMLElement>) => {
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    previouslyFocusedElement.current = document.activeElement as HTMLElement;

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (firstElement) {
        firstElement.focus();
    }
    

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }

      if (e.key === 'Tab' && focusableElements.length > 0) {
        if (e.shiftKey) { // Shift + Tab
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else { // Tab
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if(previouslyFocusedElement.current && document.body.contains(previouslyFocusedElement.current)){
        previouslyFocusedElement.current.focus();
      }
    };
  }, [isOpen, onClose, modalRef]);
};
