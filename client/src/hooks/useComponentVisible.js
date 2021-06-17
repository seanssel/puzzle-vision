import { useState, useEffect, useRef } from 'react';

export const useComponentVisible = (initialVisibility) => {
  const [isVisible, setIsVisible] = useState(initialVisibility);
  const ref = useRef(null);

  const handleOuterClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsVisible(false);
      // e.stopPropagation();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOuterClick, true);
    return () => {
      document.removeEventListener('click', handleOuterClick, true);
    };
  });

  return [ref, isVisible, setIsVisible];
};
