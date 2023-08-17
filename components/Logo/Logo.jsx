import styles from './Logo.module.css';

const Logo = () => {
    return (
        <div className={styles.logo}>
            <h1 className={styles.title}>ARMAGEDDON 2023</h1>
            <p className={styles.text}>
                ООО "Команда им. Б. Уиллиса".
                <br/>
                Взрываем астероиды с 1998 года.
            </p>

            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Passion+One:wght@700;900&family=Roboto:wght@400;500&display=swap" rel="stylesheet"></link>
        </div>
    )
}

export default Logo;