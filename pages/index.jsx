import { useState } from 'react';
import { getAllAsteroids } from '../Service/NASAapi';
import Logo from '../components/Logo/Logo';
import AsteroidsCards from '../components/AsteroidsCards/AsteroidsCards';

export async function getStaticProps() {
    const asteroids = await getAllAsteroids();

    return {
        props: {
            asteroids
        }
    }
}

export default function index( { asteroids } ) {
    const [limit, setLimit] = useState(4);

    return (
        <div>
            <Logo />
            <AsteroidsCards 
                asteroids={asteroids}
            />
        </div>
    )
}