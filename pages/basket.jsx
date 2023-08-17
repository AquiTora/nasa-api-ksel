import { useRouter } from 'next/router';
import Logo from '../components/Logo/Logo';
import Basket from '../components/Basket/Basket';

export default function basket() {
    const router = useRouter();
    const data = router.query;

    return (
        <div>
            <Logo />
            <Basket 
                order={data}
            />
        </div>
    )
}