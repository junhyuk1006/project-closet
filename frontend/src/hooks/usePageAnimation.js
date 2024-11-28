import { useEffect } from "react";
import { motion } from "framer-motion";

export function usePageAnimation() {
    return {
        variants: {
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 1.5 } },
            exit: { opacity: 0, transition: { duration: 0.8 } },
        },
    };
}