import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number = 300) => {
  const [newTerm, setNewTerm] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setNewTerm(value), delay);
    return () => clearTimeout(id);
  });

  return newTerm;
};
