import React from "react";
import { useToggle } from "../hooks/useToggle";

function MobileMenu({ items }) {
    const { isOpen, toggle, close } = useToggle();

    return (
        <div>
            <button className="mobile-menu-btn" onClick={toggle}>
                Menu
            </button>
            {isOpen && (
                <div className="mobile-menu">
                    <button className="close-menu" onClick={close}>
                        Close
                    </button>
                    <ul>
                        {items.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default MobileMenu;