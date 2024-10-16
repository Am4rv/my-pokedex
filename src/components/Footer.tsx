// src/components/Footer.tsx
import React from 'react';
import styles from '../styles/footer.module.css';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <p>Pokédex App © 2024</p>
            <p>
                Creado por <a href="hhttps://github.com/Am4rv" target="_blank" rel="noopener noreferrer">Amaru Ríos</a>
            </p>
        </footer>
    );
};

export default Footer;