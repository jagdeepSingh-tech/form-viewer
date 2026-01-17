import React, { useState } from "react";
import "./ConfirmationModal.css";

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    requiresTyping = false,
    typingConfirmText = "",
    isDangerous = false
}) {
    const [inputValue, setInputValue] = useState("");
    const [isConfirming, setIsConfirming] = useState(false);

    if (!isOpen) return null;

    const handleConfirm = async () => {
        if (requiresTyping && inputValue !== typingConfirmText) {
            return;
        }

        setIsConfirming(true);
        try {
            await onConfirm();
            handleClose();
        } catch (error) {
            console.error("Confirmation action failed:", error);
            setIsConfirming(false);
        }
    };

    const handleClose = () => {
        setInputValue("");
        setIsConfirming(false);
        onClose();
    };

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            handleClose();
        } else if (e.key === "Enter" && (!requiresTyping || inputValue === typingConfirmText)) {
            handleConfirm();
        }
    };

    const canConfirm = !requiresTyping || inputValue === typingConfirmText;

    return (
        <div className="confirmation-modal-overlay" onClick={handleClose}>
            <div
                className="confirmation-modal"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={handleKeyDown}
            >
                <div className="confirmation-modal__header">
                    <h2 className="confirmation-modal__title">{title}</h2>
                    <button
                        className="confirmation-modal__close"
                        onClick={handleClose}
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>

                <div className="confirmation-modal__body">
                    <p className="confirmation-modal__message">{message}</p>

                    {requiresTyping && (
                        <div className="confirmation-modal__input-group">
                            <label className="confirmation-modal__label">
                                Type <strong>{typingConfirmText}</strong> to confirm:
                            </label>
                            <input
                                type="text"
                                className="confirmation-modal__input"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={typingConfirmText}
                                autoFocus
                            />
                        </div>
                    )}
                </div>

                <div className="confirmation-modal__footer">
                    <button
                        className="confirmation-modal__button confirmation-modal__button--cancel"
                        onClick={handleClose}
                        disabled={isConfirming}
                    >
                        {cancelText}
                    </button>
                    <button
                        className={`confirmation-modal__button confirmation-modal__button--confirm ${isDangerous ? 'confirmation-modal__button--danger' : ''}`}
                        onClick={handleConfirm}
                        disabled={!canConfirm || isConfirming}
                    >
                        {isConfirming ? "Processing..." : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
