import { getAllAsteroidsId, getAsteroidData } from '../Service/NASAapi';
import { useRouter } from 'next/router';
import Logo from '../components/Logo/Logo';

export default function page(props) {
    const router = useRouter();
    
    return (
        <div>
            <Logo />
            <div>
                <h1>{router.query.name}</h1>
                <p>{router.query.closeDistanceDate}</p>
                <p>{router.query.closeDistanceKilo}</p>
                <p>{router.query.closeDistanceLunar}</p>
                <p>{router.query.orbitingBody}</p>
                <p>{router.query.size}</p>
            </div>
        </div>
    )
}