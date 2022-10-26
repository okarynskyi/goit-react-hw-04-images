import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("modal-root")

export const Modal = ({ modalClose, largeImageURL }) => {
    useEffect(() => {
        const onEsc = ({ code }) => {
        if (code === "Escape") {
            modalClose();
        }
    }
        window.addEventListener('keydown', onEsc);
        return () => {
            window.removeEventListener('keydown', onEsc);
        }
    }, [modalClose])

    const onBackdrop = ({ target, currentTarget, code }) => {
        if (target === currentTarget) {
            modalClose();
        }
    }
    
    return createPortal(
        <div className={css.Overlay} onClick={onBackdrop}>
            <div className={css.Modal}>
                <img src={largeImageURL} alt={largeImageURL} />
            </div>
        </div>,
        modalRoot
    );
}

Modal.propTypes = {
  modalClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};