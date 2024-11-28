import React from "react";
import { motion } from "framer-motion";
import { usePageAnimation } from "../hooks/usePageAnimation";

function PageWrapper({ children }) {
    const { variants } = usePageAnimation();

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
        >
            {children}
        </motion.div>
    );
}

export default PageWrapper;