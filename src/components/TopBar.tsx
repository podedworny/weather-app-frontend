'use client';

import styles from './TopBar.module.css';
import {useTheme} from "next-themes";
import {useState, useEffect} from "react";


export default function TopBar() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <header className={styles.header}>
            <img src="/favicon.ico" alt="Ikona pogody" className={styles.icon} />
            <h1>Prognoza pogody</h1>
                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className={styles.themeToggle}
                    type="button"
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
        </header>
    );
}