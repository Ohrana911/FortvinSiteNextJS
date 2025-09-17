import React, { ReactNode, useEffect } from 'react';

type ModalWindowProps = {
    isOpen: boolean;
    onClose: () => void;
    setFormType?: (type: "login" | "register") => void;
    children: ReactNode;
};

const ModalWindow: React.FC<ModalWindowProps> = ({ isOpen, onClose, setFormType, children }) => {
    useEffect(() => {
        if (!isOpen) return;
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    aria-label="Close modal"
                    style={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        background: 'transparent',
                        border: 'none',
                        fontSize: 24,
                        cursor: 'pointer',
                    }}
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default ModalWindow;