// получаем информацию об астеройдах
export const getAllAsteroids = async () => {
    // получаем текущую дату
    const today: Date = new Date();
    const getYear: string = today.toLocaleDateString('default', { year: 'numeric' });
    const getMonth: string = today.toLocaleDateString('default', { month: '2-digit' });
    const getDay: string = today.toLocaleDateString('default', { day: '2-digit' });
    const currentDate: string = getYear + '-' + getMonth + '-' + getDay;
    
    // формируем url запроса
    const url: string = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=' + currentDate + '&end_date=2023-08-20&api_key=kczEXhrExmLkRFpCO9se3DEuMv2fwQLjblrXV1fT';

    // делаем запрос
    const res: Response = await fetch(url, {
        method: 'GET'
    })

    // получаем нужные данные
    const data = await res.json();

    return data;
}