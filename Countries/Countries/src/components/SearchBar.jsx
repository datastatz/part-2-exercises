import React, { useEffect, useState } from 'react'
import axios from 'axios' // We used this library to fetch data




const SearchBar = () => {

  //API key
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;



    // State for creating state for the search term
    const [searchTerm, setSearchTerm] = useState(''); 

    // State that stores the fetched country data
    const [countries, setCountries] = useState([]); 

    // Handler for the input
    const handleInputChange = (event) => {
      setSearchTerm(event.target.value) // Updating the state with the user's input
    }

    // Selected country, stores the country the user clicks on
    const [selectedCountry, setSelectedCountry] = useState(null)

    // State for waether
    const [weather, setWeather] = useState(null);

    const filteredCountries = countries.filter((country) => {
      return country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    })

    const oneCountry = filteredCountries.length === 1 ? filteredCountries[0] : null;

    console.log(searchTerm) // For debugging purposes, works!

    // Fetching country data at the beginning when app runs
    useEffect( () => {
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then((response) => {
          setCountries(response.data) //Saving the countries in state
        })
        .catch((error) => {
          console.error('Could not fetch country data from server', error) // Error handling
        })
    }, []) //Empty dependency array ensures this will only run when App is first rendered


    // New useEffect 
    useEffect(() => {
      if (oneCountry) {
        const capital = oneCountry.capital[0];
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`;
        axios
          .get(weatherUrl)
          .then((response) => {
            setWeather(response.data);
          })
          .catch((error) => {
            console.error("Error fetching weather data:", error);
          });
      }
    }, [oneCountry, apiKey]); // Runs when oneCountry changes



    return (
      <div>
          <form>
              <input type="text" 
              placeholder="Enter a country" 
              value={searchTerm}  // Bind the input value to state
              onChange={handleInputChange} // This handles changes to the input
              />
          </form> 
        
          {/* Conditional rendering for the filtered results */}
          {filteredCountries.length > 10 ? (
            <p>Too many matches, specify another filter</p>
          ) : oneCountry ? (
            // Display details if there is exactly one country
            <div>
              <h2>{oneCountry.name.common}</h2>
              <p>capital: {oneCountry.capital[0]}</p>
              <p>area: {oneCountry.area}</p>
              <br />
              <img src={oneCountry.flags.png} width="200"/>
  
              <p><strong>Languages:</strong></p>
              <ul>
                {Object.values(oneCountry.languages).map((language, index) => (
                  <li key={index}>{language}</li>
                ))}
              </ul>
            </div>
          ) : (
            <ul>
              {filteredCountries.map((country) => (
                <li key={country.name.common}>
                  {country.name.common} 
                  <button onClick={() => setSelectedCountry(country)}>Show</button>
                </li>
              ))}
            </ul>
          )}
  
          {/* Show details when "Show" button is clicked */}
          {selectedCountry && (
            <div>
              <h2>{selectedCountry.name.common}</h2>
              <p>capital: {selectedCountry.capital[0]}</p>
              <p>area: {selectedCountry.area}</p>
              <br />
              <img src={selectedCountry.flags.png} width="200"/>
  
              <p><strong>Languages:</strong></p>
              <ul>
                {Object.values(selectedCountry.languages).map((language, index) => (
                  <li key={index}>{language}</li>
                ))}
              </ul>
            </div>
          )}

          {weather && (
            <div>
              <h3>Weather in {oneCountry.capital[0]}</h3>
              <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
            </div>
          )}

      </div>
    );
  };

export default SearchBar
