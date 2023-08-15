import Link from "next/link";

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
        <div>
            <h3>Корзина</h3>
            <p>астероида {order.length}</p>
            <Link 
                href={{
                    pathname: '/basket',
                    query: sendData
                }}
            >
                Отправить
            </Link>
        </div>
    )
}

export default Order;