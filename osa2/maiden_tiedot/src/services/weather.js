import axios from 'axios'
const baseUrl = 'http://api.weatherapi.com/v1/current.json'
const api_key = process.env.REACT_APP_API_KEY

const getWeather = (city) => {
    const request = axios.get(`${baseUrl}?key=${api_key}&q=${city}`)
    return request.then(response => response.data)
}

export default { getWeather }