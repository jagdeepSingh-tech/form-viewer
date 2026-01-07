import React, { useState } from "react";
import "./AccordionSection.css";

export default function AccordionSection({ title, children, defaultExpanded = false }) {
    const [isOpen, setIsOpen] = useState(defaultExpanded);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="accordion-section">
            <div
                className="accordion-header"
                onClick={toggleOpen}
                aria-expanded={isOpen}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        toggleOpen();
                    }
                }}
            >
                <span>{title}</span>
                <span className={`accordion-caret ${isOpen ? "open" : ""}`}>
                    {isOpen ? "▼" : "▶"}
                </span>
            </div>
            {isOpen && (
                <div className="accordion-content">
                    {children}
                </div>
            )}
        </div>
    );
}
