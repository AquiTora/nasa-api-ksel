import Link from "next/link";
import styles from './Order.module.css';

const Order = ( { order } ) => {
    const id = order.map((item) => {
        return item.id
    });
    const date = order.map((item) => {
        return item.date
    });
    const sendData = {
        id: id,
        date: date
    }

    return (
        <div className={styles.order}>
            <div className={styles.orderInfoDiv}>
                <h3 className={styles.title}>Корзина</h3>
                <p className={styles.text}>{order.length} астероидов</p>
            </div>
            
            <Link 
                className={styles.link}
                href={{
                    pathname: '/basket',
                    query: sendData
                }}
            >
                <button className={styles.linkButtn}>Отправить</button> 
            </Link>
        </div>
    )
}

export default Order;