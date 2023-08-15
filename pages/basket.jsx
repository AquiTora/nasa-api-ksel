import { useRouter } from 'next/router';
import Basket from '../components/Basket/Basket';

export default function basket() {
    const router = useRouter();
    const data = router.query;

    return (
        <div>
            <Basket 
                order={data}
            />
        </div>
    )
}