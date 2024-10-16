/* eslint-disable @next/next/no-img-element */
// src/components/PokemonCard.tsx

import React from 'react';
import styles from '../styles/index.module.css';

interface PokemonCardProps {
    name: string;            // Nombre del Pokémon
    image: string;           // URL de la imagen del Pokémon
    types: string[];         // Tipos del Pokémon
}

// Componente funcional que representa una carta de Pokémon
const PokemonCard: React.FC<PokemonCardProps> = ({ name, image, types }) => {
    return (
        <div className={styles.card}>
            <img src={image} alt={name} className={styles.image} />
            <h3>{name}</h3>
            <div className={styles.types}> {/* Contenedor para los tipos */}
                {types.map((type, index) => (
                    <span key={index} className={`${styles.type} ${styles[type]}`}>{type}</span> // Mostrar cada tipo
                ))}
            </div>
        </div>
    );
};

export default PokemonCard;