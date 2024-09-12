import React from 'react';
import './PageSelector.css'; // 

const PageSelector = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="page-selector">
            <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
                {"<<"} {/* Ir a la primera página */}
            </button>
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                {"<"} {/* Retroceder una página */}
            </button>
            <span>{currentPage} of {totalPages}</span>
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                {">"} {/* Avanzar una página */}
            </button>
            <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
                {">>"} {/* Ir a la última página */}
            </button>
        </div>
    );
};

export default PageSelector;
