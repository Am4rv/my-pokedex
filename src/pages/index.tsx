// src/pages/index.tsx
import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/Footer';
import { getPokemonList, getPokemonByNamePartial } from '../service/pokemon';
import PokemonList from '../components/PokemonList';
import SearchBar from '../components/SearchBar';
import LoadMoreButton from '../components/LoadMoreButton';
import styles from '../styles/index.module.css';
import Modal from '../components/Modal';

// Definición de tipos para el Pokémon

interface Pokemon {
  name: string;
  image: string;
  types: string[];
  abilities: string[];
  moves: string[];
}

// Props que recibe el componente Home
interface HomeProps {
  initialPokemonList: Pokemon[];
}

// Componente principal de la aplicación
const Home: React.FC<HomeProps> = ({ initialPokemonList }) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>(initialPokemonList);
  const [filteredPokemonList, setFilteredPokemonList] = useState<Pokemon[]>(initialPokemonList);
  const [offset, setOffset] = useState<number>(40);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searching, setSearching] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const openModal = (pokemon: Pokemon) => {
    setSelectedPokemon({
      ...pokemon,
      abilities: pokemon.abilities ?? [], // Copiar habilidades
      moves: pokemon.moves ?? [],
    });
    setModalOpen(true);
    console.log(pokemon);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPokemon(null);
  };
  // Funciones
  const loadMorePokemon = async () => {
    setLoading(true);

    // Obtener la nueva lista de Pokémon
    const newPokemonList: Pokemon[] = await getPokemonList(40, offset);

    // Filtrar Pokémon duplicados (basado en el nombre del Pokémon)
    const uniqueNewPokemonList = newPokemonList.filter(newPokemon =>
      !pokemonList.some(existingPokemon => existingPokemon.name === newPokemon.name)
    );

    // Si hay Pokémon únicos nuevos, los añadimos a la lista
    if (uniqueNewPokemonList.length > 0) {
      setPokemonList((prevList) => [...prevList, ...uniqueNewPokemonList]);
    }

    // Actualizar el offset para la siguiente carga
    setOffset((prevOffset) => prevOffset + 40);
    setLoading(false);
  };

  const searchPokemon = async (term: string) => {
    const limit = 1000;
    let offset = 0;
    let allResults: Pokemon[] = [];

    if (term === '') {
      setFilteredPokemonList(pokemonList);
    } else {
      setSearching(true);
      // Realizar búsqueda de Pokémon por nombre
      while (true) {
        const filteredList = await getPokemonByNamePartial(term, limit, offset);
        allResults = [...allResults, ...filteredList];

        if (filteredList.length === 0 || allResults.length > 0) {
          break;
        }

        offset += limit;
      }

      setFilteredPokemonList(allResults);
      setSearching(false);
    }

  };

  useEffect(() => { // Cargar más Pokémon al inicio
    searchPokemon(searchTerm);
  }, [searchTerm, pokemonList]);

  return (
    <>
      <div className={styles.pageContainer}>
        <Header />
        <main className={styles.main}>
          <h2>Lista de Pokémon</h2>

          {/* Barra de búsqueda */}
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          {/* Lista de Pokémon filtrados */}
          {searching ? <p>Buscando Pokémon...</p> :
            (<PokemonList pokemonList={filteredPokemonList} onPokemonClick={openModal}
            />)}

          {/* Botón de cargar más Pokémon */}
          <LoadMoreButton
            loading={loading}
            onClick={loadMorePokemon}
            disabled={loading || searchTerm !== ''}
          />
        </main>

        <Modal
          open={modalOpen}
          onClose={closeModal}
          pokemon={selectedPokemon}
        />

        <Footer />
      </div>
    </>
  );
};

// Obtener la lista inicial de Pokémon desde el servidor
export async function getServerSideProps() {
  const initialPokemonList = await getPokemonList(80, 0);
  return {
    props: {
      initialPokemonList,
    },
  };
}

export default Home;