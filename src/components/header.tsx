import React from 'react';
import styles from '../styles/header.module.css'; // Asegúrate de tener este archivo de estilos
import Image from 'next/image';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <Image className='styles.title'
                src="/pokedex.png"
                alt="Pokédex"
                width={450}
                height={100}
            />
        </header>
    );
}

export default Header;