import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from '../components/Logo/Logo';
import AsteroidPage from '../components/AsteroidPage/AsteroidPage';

export default function page() {
    const router = useRouter();
    
    return (
        <div>
            <Logo />
            <AsteroidPage 
                asteroid={router.query}
            />
        </div>
    )
}