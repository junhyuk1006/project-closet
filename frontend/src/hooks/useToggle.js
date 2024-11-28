import { useState } from "react";

export function useToggle(initialState = false) {
    const [isOpen, setIsOpen] = useState(initialState);

    const toggle = () => setIsOpen((prev) => !prev);
    const close = () => setIsOpen(false);

    return { isOpen, toggle, close };
}