import React, { useState } from "react";
import Modal from "./Modal";

function ModalToggle() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleModal = () => setIsVisible((prev) => !prev);

    return (
        <div>
            <button onClick={toggleModal}>Open Modal</button>
            <Modal isVisible={isVisible} onClose={toggleModal}>
                <p>This is the modal content!</p>
            </Modal>
        </div>
    );
}

export default ModalToggle;