// src/service/pokemon.ts

interface Move {
    move: {
        name: string;
    };
}

interface Ability {
    ability: {
        name: string;
    };
}

export interface PokemonDetails {
    name: string;
    sprites: {
        front_default: string;
    };
    types: { type: { name: string } }[];
    moves: Move[];
    abilities: Ability[];
}

export interface Pokemon {
    name: string;
    image: string;
    types: string[];
    abilities: string[];
    moves: string[];
}

// Obtiene una lista de Pokémon con un límite y desplazamiento (paginación)
export const getPokemonList = async (limit: number = 20, offset: number = 0): Promise<Pokemon[]> => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const data = await res.json();

        const pokemonDetails = await Promise.all(
            data.results.map(async (pokemon: { name: string; url: string }) => {
                const res = await fetch(pokemon.url);
                const details: PokemonDetails = await res.json();
                return {
                    name: details.name,
                    image: details.sprites.front_default,
                    types: details.types.map(t => t.type.name),
                    abilities: details.abilities.map(a => a.ability.name),
                    moves: details.moves.map(m => m.move.name),
                };
            })
        );

        return pokemonDetails;
    } catch (error) {
        console.error("Error fetching Pokémon:", error);
        return [];
    }
};

// Función para buscar Pokémon por nombre
export const getPokemonByNamePartial = async (term: string, limit: number = 100, offset: number = 0): Promise<Pokemon[]> => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const data = await res.json();

        const pokemonDetails = await Promise.all(
            data.results.map(async (pokemon: { name: string; url: string }) => {
                const res = await fetch(pokemon.url);
                const details: PokemonDetails = await res.json();

                return {
                    name: details.name,
                    image: details.sprites.front_default,
                    types: details.types.map(t => t.type.name),
                    abilities: details.abilities.map(a => a.ability.name),
                    moves: details.moves.map(m => m.move.name),
                };
            })
        );

        // Filtramos los Pokémon que contienen el término de búsqueda
        return pokemonDetails.filter(pokemon =>
            pokemon.name.toLowerCase().includes(term.toLowerCase())
        );
    } catch (error) {
        console.error("Error fetching Pokémon:", error);
        return [];
    }
};

// Función para obtener detalles del Pokémon
export const getPokemonDetails = async (name: string): Promise<PokemonDetails | null> => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const details: PokemonDetails = await res.json();

        return {
            ...details,
        };
    } catch (error) {
        console.error("Error fetching Pokémon details:", error);
        return null;
    }
};