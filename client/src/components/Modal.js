import React from "react";

function Modal({ isOpen, toggle,children }) {
  if (isOpen) {
    return (
      <div className="modal-canvas" onClick={toggle}>
        <div className="modal-body" onClick={(e)=>{e.stopPropagation()}}>
          {children}
          
        </div>
      </div>
    );
  }
  return null;
}

export default Modal;
