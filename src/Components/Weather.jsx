import React, { useState,useRef } from 'react'
import { useEffect } from 'react'
import './Weather.css'
import srch_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'



const Weather = () =>
    {

            const[weatherData,setweather]=useState(false);
            const[message,setmsg]=useState('');
            const inputr=useRef();

            const allIcons=
            {
                "01d":clear_icon,
                "01n":clear_icon,
                "02d":cloud_icon,
                "02n":cloud_icon,
                "03d":cloud_icon,
                "03n":cloud_icon,
                "04d":drizzle_icon,
                "04n":drizzle_icon,
                "09d":rain_icon,
                "09n":rain_icon,
                "10d":rain_icon,
                "10n":rain_icon,
                "13d":snow_icon,
                "13n":snow_icon,
                "50d":snow_icon,
                "50n":snow_icon,
            }
            
            const search= async(city)=>
            {
                if(city=="")
                    alert("Enter the City name");
                else               
                {
                try
                {   
                    const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

                    const res=await fetch(url);
                    const data=await res.json();
                    if(!res.ok)
                        {alert(data.message);
                        return;}
                    
                    const icon=allIcons[data.weather[0].icon] || clear_icon;
                    console.log(data);
                    setweather({
                        humidity:data.main.humidity,
                        windSpeed:data.wind.speed,
                        temperature:Math.floor(data.main.temp),
                        location:data.name,
                        icon:icon,
                        temp:data.weather[0].icon,
                    })

                }
                catch(error)
                {

                }}
                inputr.current.value = '';
            }

            useEffect(() => {
                if (weatherData && weatherData.temp) {
                    let bgImage = '';
                    let message=' ';
                    switch (weatherData.temp) {
                        case "01d":
                        case "01n":
                            message = 'Clear Sky';
                            bgImage = 'url("sunnyimg.jpg") no-repeat center center fixed';
                            break;
                        case "02d":
                        case "02n":
                            message = 'Few Clouds';
                            bgImage = 'url("cloud.avif") no-repeat center center fixed';
                            break;
                        case "03d":
                        case "03n":
                            message = 'Scattered Clouds';
                            bgImage = 'url("cloud.avif") no-repeat center center fixed';
                            break;
                        case "04d":
                        case "04n":
                            message = 'Broken Clouds';
                            bgImage = 'url("overc.avif") no-repeat center center fixed';
                            break;
                        case "09d":
                        case "09n":
                            message = 'Shower Rain';
                            bgImage = 'url("rain.jpg") no-repeat center center fixed';
                            break;
                        case "10d":
                        case "10n":
                            message = 'Rain';
                            bgImage = 'url("rain.jpg") no-repeat center center fixed';
                            break;
                        case "11d":
                        case "11n":
                            message='Thunderstorm';
                            bgImage = 'url("storm.jpg") no-repeat center center fixed'; // Default background
                            break;
                        case "13d":
                        case "13n":
                            message='Snow';
                            bgImage = 'url("snow.jpg") no-repeat center center fixed'; // Default background
                            break;
                        case "50d":
                        case "50n":
                            message='Mist';
                            bgImage = 'url("mist.webp") no-repeat center center fixed'; // Default background
                            break;
                        default:
                            message='Clear sky';
                            bgImage = 'url("sunnyimg.jpg") no-repeat center center fixed'; // Default background
                            break;
                    }
            
                    document.body.style.background = bgImage;
                    document.body.style.backgroundSize = 'cover';
                    setmsg(message);
                }
            }, [weatherData]);
                   
            
            const handleKeyPress = (event) => {
                if (event.key === 'Enter') {
                    search(inputr.current.value);
                }
            };

  return (
    <div className='weather'>
        <div className="srch">
            <input type='text' placeholder='Search' ref={inputr} onKeyPress={handleKeyPress}/>
            <img src={srch_icon} alt="srch_icon" onClick={()=>{search(inputr.current.value)}}/>
        </div>


        {weatherData?<>
        <img className='wicon' src={weatherData.icon} alt="" />
        <p className='temp'>{weatherData.temperature}°C</p>
        <p className='loc'>{weatherData.location}</p>
        <div className="data">
            <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>

            <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                    <p>{weatherData.windSpeed} Km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>  
        <div className="sts">
            <p>{message}</p>
        </div>
    
        </>
        :<></>}
    </div>
        
  )
}

export default Weather
