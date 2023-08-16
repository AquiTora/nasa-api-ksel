// получаем информацию об астеройдах
export const getAllAsteroids = async (newDateStart: string, newDateFinal: string) => {
    // определяем стартовую дату
    const today = new Date();
    const getYear = today.toLocaleDateString('default', { year: 'numeric' });
    const getMonth = today.toLocaleDateString('default', { month: '2-digit' });
    const getDay = today.toLocaleDateString('default', { day: '2-digit' });
    let currentDate = newDateStart ? newDateStart : getYear + '-' + getMonth + '-' + getDay;

    // определяем конечную дату
    let finalDate = newDateFinal ? newDateFinal : currentDate;
    
    // формируем url запроса
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${currentDate}&end_date=${finalDate}&api_key=kczEXhrExmLkRFpCO9se3DEuMv2fwQLjblrXV1fT`;

    // делаем запрос
    const res = await fetch(url, {
        method: 'GET'
    })

    // получаем нужные данные
    const data = await res.json();

    return data;
}