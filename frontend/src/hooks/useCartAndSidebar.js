import { useState } from "react";

function useCartAndSidebar() {
    const [isCartOpen, setIsCartOpen] = useState(false); // 장바구니 열림 상태
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 사이드바 열림 상태

    // 장바구니 열기/닫기 토글
    const toggleCart = () => {
        setIsCartOpen((prev) => !prev);
    };

    // 사이드바 열기/닫기 토글
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return {
        isCartOpen,
        toggleCart,
        isSidebarOpen,
        toggleSidebar,
    };
}

export default useCartAndSidebar;