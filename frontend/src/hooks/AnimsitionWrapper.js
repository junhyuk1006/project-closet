import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AnimsitionWrapper = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // 페이지 로드 시 fade-in 애니메이션 클래스 추가
        document.body.classList.add("fade-in");

        const handleLinkClick = (event) => {
            event.preventDefault();
            const targetUrl = event.currentTarget.getAttribute("href");

            // fade-out 애니메이션 클래스 추가
            document.body.classList.remove("fade-in");
            document.body.classList.add("fade-out");

            setTimeout(() => {
                // 애니메이션 완료 후 페이지 이동
                navigate(targetUrl);
            }, 800); // fade-out 애니메이션 지속 시간에 맞춤
        };

        // .animsition-link 클래스에 클릭 이벤트 리스너 추가
        const links = document.querySelectorAll(".animsition-link");
        links.forEach((link) => link.addEventListener("click", handleLinkClick));

        return () => {
            // 컴포넌트 언마운트 시 이벤트 리스너 제거
            links.forEach((link) => link.removeEventListener("click", handleLinkClick));
        };
    }, [navigate]);

    return <>{children}</>;
};

export default AnimsitionWrapper;