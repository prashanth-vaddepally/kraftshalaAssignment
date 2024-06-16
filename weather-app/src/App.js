import React, {Component} from 'react'
import './App.css'

class App extends Component {
  state = {
    location: '',
    weatherData: [],
    error: '',
    darkMode: false,
  }

  apiKey = 'de7eecb4bc5008e99af7c4d37a7c3729'

  fetchWeather = async () => {
    const {location, weatherData} = this.state
    if (location === '') {
      alert('Please enter a location')
      return
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${this.apiKey}`,
      )
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`)
      }

      const data = await response.json()
      this.setState({
        weatherData: [...weatherData, data],
        error: '',
      })
    } catch (error) {
      this.setState({
        error: error.message,
        weatherData: [],
      })
    }
  }

  handleInputChange = e => {
    this.setState({location: e.target.value})
  }

  toggleDarkMode = () => {
    this.setState(prevState => ({darkMode: !prevState.darkMode}))
  }

  render() {
    const {location, weatherData, error, darkMode} = this.state

    return (
      <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
        <h1>Weather App</h1>
        <button className="toggle-btn" onClick={this.toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <div className="input-group">
          <input
            type="text"
            value={location}
            onChange={this.handleInputChange}
            placeholder="Enter city name or zip code"
          />
          <button onClick={this.fetchWeather}>Get Weather</button>
        </div>
        {error && <p className="error">{error}</p>}
        <div className="weather-info-container">
          {weatherData.map((data, index) => (
            <div key={index} className="weather-info">
              <p>Location: {data.name}</p>
              <p>Temperature: {data.main.temp} °C</p>
              <p>Humidity: {data.main.humidity}%</p>
              <p>Wind Speed: {data.wind.speed} m/s</p>
              <p>Description: {data.weather[0].description}</p>
              <p>Date and Time: {new Date().toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default App
