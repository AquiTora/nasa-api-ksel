import styles from './AsteroidPage.module.css';

const AsteroidPage = ({ asteroid }) => {
    return (
        <div className={styles.asteroidPage}>
            <h1>{asteroid.name}</h1>
            <p>Скорасть {asteroid.closeApproachData} км/ч</p>
            <p>Время максимального сближения {asteroid.closeDistanceDate}</p>
            <p>Расстояние до земли в километрах {asteroid.closeDistanceKilo}</p>
            <p>Орбита: {asteroid.orbitingBody}</p>
        </div>
    )
}

export default AsteroidPage;