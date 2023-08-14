import { useState, useEffect } from "react";
import { getAllAsteroids } from '../../Service/NASAapi';

const CardLayout = ( { card } ) => {
    return (
        <div>
            <h1>{card.closeDistanceDate}</h1>
            <p>{card.closeDistanceKilo}</p>
            <p>{card.name}</p>
            <p>{card.size}</p>
            <button>Заказать</button>
            <p>Опасен</p>
        </div>
    )
}
 
const AsteroidsCards = ( {asteroids} ) => {
    const today = new Date();
    const year = today.toLocaleDateString('default', { year: 'numeric' });
    const month = today.toLocaleDateString('default', { month: '2-digit' });
    const day = today.toLocaleDateString('default', { day: '2-digit' });
    const [currentDate, setCurrentDate] = useState(`${year}-${month}-${day}`);
    const [finalDate, setFinalDate] = useState(`${year}-${month}-${day}`);
    console.log('puk');
    const [cards, setCards] = useState([]);
    const [lastScrollY, setLastScrolY] = useState(0);
    const [scrollLimit, setScrollLimit] = useState(1000);

    const [show, setShow] = useState(true);

    // формируем стартовый набор астероидов
    function handleCreateCards(asteroids) {
        const data = asteroids[`${currentDate}`].map((item) => {
            let asteroid = {
                id: item.id,
                name: item.name,
                size: item.estimated_diameter.meters.estimated_diameter_max,
                dangerRate: item.is_potentially_hazardous_asteroid,
                closeDistanceLunar: item.close_approach_data[0].miss_distance.lunar,
                closeDistanceKilo: item.close_approach_data[0].miss_distance.kilometers,
                closeDistanceDate: item.close_approach_data[0].close_approach_date
            }

            return asteroid;
        });

        // setFinalDate(`${year}-${month}-${day}`);        
        setCards(data);
    }
    
    useEffect(() => {
        handleCreateCards(asteroids.near_earth_objects);
    }, []);

    // console.log('Полученные карточки', cards);

    // добавляем новые астероиды по мере прокрутки
    const handleAddAsteroids = () => {
        if (typeof window !== 'undefined') {
            if (window.scrollY >= scrollLimit) {
                // setScrollLimit(scrollLimit + 1000);
                // console.log('Новый лимит', scrollLimit);

                // let newDay = Number(day) + 1;
                // let newDate = `${year}-${month}-${newDay}`
                // console.log('Новый date будет', newDate);
                // setFinalDate(newDate);
                // console.log('Новый date настал', finalDate);

                setShow(false);
                console.log('test', show);
                console.log('Текущий скрол', window.scrollY);
            } else {
                setShow(true);
                console.log('test', show);
                console.log('Текущий скрол', window.scrollY);
            }

            setLastScrolY(window.scrollY);
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleAddAsteroids);

            return () => {
                window.removeEventListener('scroll', handleAddAsteroids);
            };
        }
    }, []);

    return (
        <div>
            <ul>
                {cards.map((item) => {
                    return (
                        <li key={item.id}>
                            <CardLayout 
                                card={item}
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default AsteroidsCards;