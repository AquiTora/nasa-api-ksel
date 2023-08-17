import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from '../components/Logo/Logo';
import AsteroidPage from '../components/AsteroidPage/AsteroidPage';

export default function page(props) {
    const router = useRouter();
    
    return (
        <div>
            <Logo />
            <AsteroidPage 
                asteroid={router.query}
            />
            {/* <Link 
                href='/'
            >
                <button>На главную</button>
            </Link> */}
        </div>
    )
}