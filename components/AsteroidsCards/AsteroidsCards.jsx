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
    const [count, setCount] = useState(0);
    today.setDate(today.getDate() + count);
    const [year, setYear] = useState(today.toLocaleDateString('default', { year: 'numeric' }));
    const [month, setMonth] = useState(today.toLocaleDateString('default', { month: '2-digit' }));
    const [day, setDay] = useState(today.toLocaleDateString('default', { day: '2-digit' }));
    const [currentDate, setCurrentDate] = useState();
    const [finalDate, setFinalDate] = useState(`${year}-${month}-${day}`);

    const [cards, setCards] = useState([]);

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // формируем стартовый набор астероидов
    function handleCreateCards(asteroids) {
        const data = asteroids[`${finalDate}`].map((item) => {
            let asteroid = {
                id: item.id,
                date: finalDate,
                name: item.name,
                size: item.estimated_diameter.meters.estimated_diameter_max,
                dangerRate: item.is_potentially_hazardous_asteroid,
                closeDistanceLunar: item.close_approach_data[0].miss_distance.lunar,
                closeDistanceKilo: item.close_approach_data[0].miss_distance.kilometers,
                closeDistanceDate: item.close_approach_data[0].close_approach_date
            }

            return asteroid;
        });

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

        const newData = data.map((item) => {
            let asteroid = {
                id: item.id,
                date: newDate,
                name: item.name,
                size: item.estimated_diameter.meters.estimated_diameter_max,
                dangerRate: item.is_potentially_hazardous_asteroid,
                closeDistanceLunar: item.close_approach_data[0].miss_distance.lunar,
                closeDistanceKilo: item.close_approach_data[0].miss_distance.kilometers,
                closeDistanceDate: item.close_approach_data[0].close_approach_date
            }

            return asteroid;
        });

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
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {/* Нужно будет обозначить конец 7 дней */}
        </div>
    )
}

export default AsteroidsCards;