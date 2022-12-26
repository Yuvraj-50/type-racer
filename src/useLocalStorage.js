import React, { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [localstorageValue, setLocalstorageValue] = useState(() => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  function setValue(value) {
    localStorage.setItem(key, JSON.stringify(value));
    setLocalstorageValue((prev) => [...prev, value]);
  }
  return [localstorageValue, setValue];
}

export default useLocalStorage;
