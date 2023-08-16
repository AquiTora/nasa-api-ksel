import { useEffect, useState } from "react";
import { getAllAsteroids } from '../../Service/NASAapi';
import { formData } from '../../Service/formData';

const OrderLayout = ( { order } ) => {
    return (
        <div>
            <h1>{order.name}</h1>
            <p>{order.id}</p>
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
        <div>
            {isLoading && <h1>Загружаем заказ...</h1>}
            {!isLoading && <h1>Заказ отправлен!</h1>}
            <ul>
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