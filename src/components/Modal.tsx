/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { Pokemon } from './PokemonList';
import styles from '../styles/modal.module.css';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    pokemon: Pokemon | null;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, pokemon }) => {
    const [showMoves, setShowMoves] = useState(false);

    if (!open || !pokemon) return null;

    const toggleMoves = () => {
        setShowMoves(prevState => !prevState);
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>{pokemon.name}</h2>
                <img src={pokemon.image} alt={pokemon.name} className={styles.image} />
                <h3>Tipos:</h3>
                <p>{pokemon.types.join('-')}</p>
                <h3>Habilidades:</h3>
                <ul className={styles.abilitiesList}>
                    {pokemon.abilities.map((ability, index) => (
                        <li key={index} className={styles.abilityItem}>{ability}</li>
                    ))}
                </ul>
                <button onClick={toggleMoves}>
                    {showMoves ? 'Ocultar Movimientos' : 'Mostrar Movimientos'}
                </button>
                {showMoves && (
                    <>
                        <h3>Movimientos:</h3>
                        <ul className={styles.abilitiesList}>
                            {pokemon.moves.map((moves, index) => (
                                <li key={index} className={styles.abilityItem}>{moves}</li>
                            ))}
                        </ul>
                    </>
                )}
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default Modal;