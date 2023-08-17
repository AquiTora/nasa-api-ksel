import Image from "next/image";
import { useEffect, useState } from "react";
import { getAllAsteroids } from '../../Service/NASAapi';
import { formData } from '../../Service/formData';
import styles from './Basket.module.css';

const OrderLayout = ( { order } ) => {
    const kilo = Math.ceil(order.closeDistanceKilo);
    const size = Math.ceil(order.size);

    return (
        <div>
            <h1>{order.closeDistanceDate}</h1>
            <div className={styles.infoDiv}>
                <div>
                    <p className={styles.distance}>
                        {kilo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} км
                    </p>
                </div>

                <Image 
                    className={styles.sizeImg}
                    src={
                        size > 500 && '/svg/astBig.svg' || '/svg/astSmall.svg'
                    }
                    width={size > 500 && 36 || 22}
                    height={size > 500 && 40 || 24}
                />
                
                <div className={styles.info}>
                    <p className={styles.name}>{order.name}</p>
                    <p>Ø {size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} м</p>
                </div>
            </div>
            {order.dangerRate && <p className={styles.status}>⚠ Опасен</p> || <p className={styles.status}>Безопасен</p>}
        </div>
    )
}

const Basket = ( { order } ) => {
    const [orderData, setOrderData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleRequestOrder = async () => {
        setIsLoading(true);
        const array = [];

        if (Array.isArray(order.date)) {
            for (let f = 0; f < order.date.length; f++) {
                try {
                    const response = await getAllAsteroids(order.date[f], order.date[f]);
                    const data = response.near_earth_objects[`${order.date[f]}`];
                    const result = data.filter((element) => element.id == order.id[f]);
                    array.push(...result);
                } finally {
                    setIsLoading(false);
                }                
            }
        } else {
            try {
                const response = await getAllAsteroids(order.date, order.date);
                const data = response.near_earth_objects[`${order.date}`];
                const result = data.filter((element) => element.id == order.id);

                array.push(...result);
            } finally {
                setIsLoading(false);
            }
        }
                
        const newData = formData(array);

        setOrderData([...orderData, ...newData]);
    }

    useEffect(() => {
        handleRequestOrder();
    }, []);

    return (
        <div className={styles.basket}>
            {isLoading && <h1 className={styles.head}>Загружаем заказ...</h1>}
            {!isLoading && <h1 className={styles.head}>Заказ отправлен!</h1>}
            <ul className={styles.list}>
                {orderData.map((item) => {
                    return (
                        <li key={item.id}>
                            <OrderLayout 
                                order={item}
                            />
                        </li>
                    )
                })}

            </ul>
        </div>
    )
}

export default Basket;