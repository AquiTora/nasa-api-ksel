import { useState } from 'react';
import { getAllAsteroids } from '../Service/NASAapi';
import Logo from '../components/Logo/Logo';
import AsteroidsCards from '../components/AsteroidsCards/AsteroidsCards';
import Order from '../components/Order/Order';

export async function getStaticProps() {
    const asteroids = await getAllAsteroids();

    return {
        props: {
            asteroids
        }
    }
}

export default function index( { asteroids } ) {
    const [order, setOrder] = useState([]);
    console.log('Заказ', order);
    console.log('asteroids', asteroids);
    
    return (
        <div>
            <Logo />
            <Order 
                order={order}
            />
            <AsteroidsCards 
                asteroids={asteroids}
                order={order}
                setOrder={setOrder}
            />
        </div>
    )
}