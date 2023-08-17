import Link from "next/link";
import Image from "next/image";
import styles from './AsteroidsCards.module.css';
import { useState, useEffect } from "react";
import { getAllAsteroids } from '../../Service/NASAapi';
import { formData } from '../../Service/formData';

const CardLayout = ( { card, order, setOrder, kiloDistance } ) => {
    const [inBasket, setInBasket] = useState(false);
    const kilo = Math.ceil(card.closeDistanceKilo);
    const lunar = Math.ceil(card.closeDistanceLunar);
    const size = Math.ceil(card.size);

    const handleMakeOrder = (item) => {
        setInBasket(true);
        setOrder([...order, item]);
    }
    
    return (
        <div>
            <Link 
                className={styles.cardLink}
                href={{
                    pathname: `/${card.name}`,
                    query: card
                }}
            >
                <h1 className={styles.cardTitle}>{card.closeDistanceDate}</h1>
            </Link>
            <div className={styles.infoDiv}>
                <div>
                    {
                        kiloDistance && 
                        <p className={styles.distance}>
                            {kilo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} км
                        </p>
                        ||
                        <p className={styles.lunarDistance}>
                            {lunar.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} лунных орбит
                        </p>
                    } 
                    <img 
                        className={styles.arrow}
                        src='/svg/arrow.svg'
                        width={kiloDistance && 100 || 130}
                    />
                </div>
                

                <Image 
                    className={styles.sizeImg}
                    src={
                        size > 500 && '/svg/astBig.svg' || '/svg/astSmall.svg'
                    }
                    width={size > 500 && 36 || 22}
                    height={size > 500 && 40 || 24}
                />

                <div>
                    <p className={styles.name}>{card.name}</p>
                    <p>Ø {size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} м</p>
                </div>
            </div>

            <div className={styles.orderBtnDiv}>
                <button 
                    className={inBasket ? styles.orderBtnBlock : styles.orderBtn}
                    onClick={() => handleMakeOrder(card)}
                >
                    {inBasket && <>В КОРЗИНЕ</> || <>ЗАКАЗАТЬ</>}
                </button>
                {card.dangerRate && <p >⚠ Опасен</p> || <p className={styles.status}>Безопасен</p>}
            </div>            
            
        </div>
    )
}
 
const AsteroidsCards = ( { asteroids, order, setOrder } ) => {
    
    const today = new Date();
    const [count, setCount] = useState(0);
    today.setDate(today.getDate() + count);
    const [year, setYear] = useState(today.toLocaleDateString('default', { year: 'numeric' }));
    const [month, setMonth] = useState(today.toLocaleDateString('default', { month: '2-digit' }));
    const [day, setDay] = useState(today.toLocaleDateString('default', { day: '2-digit' }));
    const [currentDate, setCurrentDate] = useState();
    const [finalDate, setFinalDate] = useState(`${year}-${month}-${day}`);

    const [cards, setCards] = useState([]);
    console.log('asteroids', cards);

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [kiloDistance, setKiloDistance] = useState(true);

    // формируем стартовый набор астероидов
    function handleCreateCards(asteroids) {
        const data = formData(asteroids[`${finalDate}`], finalDate);

        setCurrentDate(finalDate);
        setCards(data);
    }
    
    useEffect(() => {
        handleCreateCards(asteroids.near_earth_objects);
    }, []);

    // добавляем новые астероиды по мере прокрутки
    const handleAddCards = (data, newDate) => {
        if (newDate === currentDate) {
            return;
        }

        const newData = formData(data, newDate);

        setCards([...cards, ...newData]);
    }

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            setCount(count + 1);
            setDay(today.toLocaleDateString('default', { day: '2-digit' }));
            setMonth(today.toLocaleDateString('default', { month: '2-digit' }))
            setYear(today.toLocaleDateString('default', { year: 'numeric' }));

            setFinalDate(`${year}-${month}-${day}`);

            const response = await getAllAsteroids(finalDate);

            handleAddCards(response.near_earth_objects[`${finalDate}`], finalDate);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
            return;
        }

        fetchData();
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

    // меняем режим отображения дистанции
    const handleChangeDistanceView = () => {
        kiloDistance ? setKiloDistance(false) : setKiloDistance(true);
    }

    return (
        <div className={styles.asteroidsCards}>
            <h1 className={styles.title}>Ближайшие подлёты астероидов</h1>
            <div className={styles.switch}>
                <button 
                    className={kiloDistance ? styles.switchBtn_active : styles.switchBtn}
                    onClick={handleChangeDistanceView}
                >
                    в километрах
                </button>
                |
                <button 
                    className={!kiloDistance ? styles.switchBtn_active : styles.switchBtn}
                    onClick={handleChangeDistanceView}
                >
                    в лунных орбитах
                </button>
            </div>
            <div>
                <ul className={styles.list}>
                    {cards.map((item) => {
                        return (
                            <li key={item.id}>
                                <CardLayout 
                                    card={item}
                                    order={order}
                                    setOrder={setOrder}    
                                    kiloDistance={kiloDistance}                            
                                />
                            </li>
                        )
                    })}
                </ul>
            </div>
            
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {/* Нужно будет обозначить конец 7 дней */}            
        </div>
    )
}

export default AsteroidsCards;