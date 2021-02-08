import React from "react";
import { useGlobalContext } from "./context";

const Modal = () => {
  const { modal, closeModal, correctQuestion, questions } = useGlobalContext();

  return (
    <div className={`${modal ? "modal-container isOpen" : "modal-container"}`}>
      <div className="modal-content">
        <h2>Thank you for playing!</h2>
        <p>
          {((correctQuestion / questions.length) * 100).toFixed(0)}% of your
          answers were correct
        </p>
        <button className="close-btn" onClick={closeModal}>
          Play again
        </button>
      </div>
    </div>
  );
};

export default Modal;
