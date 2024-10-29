import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'



const Weather = () => {

    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false);

    const getIconUrl = (iconCode) => {
        return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    };
    

    const search = async (city) => {
        if(city === ""){
            alert("Enter City Name");
            return;
        }
        try {
            // console.log(process.env.REACT_APP_API_KEY);
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
            const response = await fetch(url);
            const data= await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }
            console.log(data);
            
            setWeatherData({
                humidity: data.main.humidity,
                windspeed: data.wind.speed,
                temperature : Math.floor(data.main.temp),
                location: data.name,
                icon : data.weather[0].icon
            })
        } catch (error) {
            setWeatherData(false);
            console.error("Error in fetching weather data");
        }
    }
   
  return (
    <div className="container">
        <div className="weather">
            <div className="inputwrapper">
                <input ref={inputRef} type="text" placeholder='Search'/>
                <div className="image">
                <img src={`${process.env.PUBLIC_URL}/searchicon.png`} alt="" onClick={()=> search(inputRef.current.value)}/>
                </div>
            </div>
            {weatherData?<>
                <div className="center">
                <img src={getIconUrl(weatherData.icon)} alt="" />
                <p className='temperature'>{weatherData.temperature}°C</p>
                <p className='location'>{weatherData.location}</p>
            </div>
            <div className="foot">
                <div className="humidity">
                <img src={`${process.env.PUBLIC_URL}/humidity.png`}  alt="" />
                    <div className="humpart">
                        <h1>{weatherData.humidity} %</h1>
                        <h2>Humidity</h2>
                    </div>
                </div>
                <div className="windspeed">
                <img src={`${process.env.PUBLIC_URL}/windspeed.png`}  alt="" />
                    <div className="windpart">
                        <h1>{weatherData.windspeed} Km/h</h1>
                        <h2>Wind Speed</h2>
                    </div>
                </div>
            </div>
            </>:<></>}
            
           
        </div>
    </div>
  )
}

export default Weather