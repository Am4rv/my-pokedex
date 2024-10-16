// src/components/TypeFilter.tsx

import React from 'react';

interface TypeFilterProps {
    types: string[];
    selectedType: string;
    onTypeChange: (type: string) => void;
}

const TypeFilter: React.FC<TypeFilterProps> = ({ types, selectedType, onTypeChange }) => {
    return (
        <div>
            <label htmlFor="typeFilter">Filtrar por tipo:</label>
            <select id="typeFilter" value={selectedType} onChange={(e) => onTypeChange(e.target.value)}>
                <option value="">Todos</option>
                {types.map((type) => (
                    <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)} {/* Capitalizar el primer carácter */}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TypeFilter;