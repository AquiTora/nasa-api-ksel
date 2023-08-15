import { useEffect, useState } from "react";
import { getAllAsteroids } from '../../Service/NASAapi';

const OrderLayout = ( { order } ) => {
    return (
        <div>
            <h1>{order.name}</h1>
        </div>
    )

}

const Basket = ( { order } ) => {
    const [orderData, setOrderData] = useState([]);

    const handleRequestOrder = async () => {
        let array = [];

        for (let f = 0; f < order.date.length; f++) {
            let data;
            const response = await getAllAsteroids(order.date[f], order.date[f]);
            data = response.near_earth_objects[`${order.date[f]}`];

            const result = data.filter((element) => element.id == order.id[f]);

            array.push(...result);
        }

        const newData = array.map((item) => {
            let asteroid = {
                id: item.id,
                name: item.name,
                size: item.estimated_diameter.meters.estimated_diameter_max,
                dangerRate: item.is_potentially_hazardous_asteroid,
                closeDistanceLunar: item.close_approach_data[0].miss_distance.lunar,
                closeDistanceKilo: item.close_approach_data[0].miss_distance.kilometers,
                closeDistanceDate: item.close_approach_data[0].close_approach_date,
                closeDistanceDate: item.close_approach_data[0].close_approach_date_full,
                orbitingBody: item.close_approach_data[0].orbiting_body,
                closeApproachData: item.close_approach_data[0].relative_velocity.kilometers_per_hour
            }

            return asteroid;
        })

        setOrderData([...orderData, ...newData]);
    }

    useEffect(() => {
        handleRequestOrder();
    }, []);

    console.log('Ебучий заказ приехал?', orderData); 

    return (
        <div>
            <h1>Заказ отправлен!</h1>
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