// src/components/LoadMoreButton.tsx
import React from 'react';
import styles from '../styles/index.module.css';

interface LoadMoreButtonProps {
    loading: boolean;
    onClick: () => void;
    disabled: boolean;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ loading, onClick, disabled }) => {
    return (
        <button onClick={onClick} disabled={disabled} className={styles.loadMoreButton}>
            {loading ? 'Cargando...' : 'Cargar más Pokémon'}
        </button>
    );
};

export default LoadMoreButton;