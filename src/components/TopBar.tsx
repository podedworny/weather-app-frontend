import styles from './TopBar.module.css';

export default function TopBar() {
    return (
        <header className={styles.header}>
            <img src="/favicon.ico" alt="Ikona pogody" className={styles.icon} />
            <h1>Prognoza pogody</h1>
        </header>
    );
}