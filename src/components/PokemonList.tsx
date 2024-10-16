// src/components/PokemonList.tsx
import React from 'react';
import PokemonCard from './PokemonCard';
import styles from '../styles/index.module.css';

export interface Pokemon {
    name: string;            // Nombre del Pokémon
    image: string;           // URL de la imagen del Pokémon
    types: string[];         // Tipos del Pokémon
    abilities: string[];     // Habilidades del Pokémon
    moves: string[];         // Movimientos del Pokémon

}

interface PokemonListProps {
    pokemonList: Pokemon[];  // Lista de Pokémon como prop
    onPokemonClick: (pokemon: Pokemon) => void; // Función para manejar clics en Pokémon
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemonList, onPokemonClick }) => {
    return (
        <div className={styles.grid}>
            {pokemonList.map((pokemon, index) => (
                <div key={index} onClick={() => onPokemonClick(pokemon)}>
                    <PokemonCard
                        name={pokemon.name}
                        image={pokemon.image}
                        types={pokemon.types}
                    />
                </div>
            ))}
        </div>
    );
};

export default PokemonList;