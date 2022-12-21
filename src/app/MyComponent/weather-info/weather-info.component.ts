import { Component, OnInit } from '@angular/core';
import {WeatherDataService} from './../../services/weather-data.service'
@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.css']
})
export class WeatherInfoComponent implements OnInit {

  showDetailsBtn: boolean = false;
  isShowCity: boolean = true;
  weatherData: any = [];
  temperature!: number;
  feelsTemperature!: number;
  temperature_max!: number;
  temperature_min!:number;
  humidity!: number;
  weatherDescription: string = '';
  cityName: string = '';
  countryCode: string = '';
  latitude!: number;
  longitude!: number;

  constructor(private weatherinfo: WeatherDataService) { }

  ngOnInit(): void {
  }
  getDetailsByName(data: any) {
    if (data.trim()) {
      this.showDetailsBtn = true;
      setTimeout(() => {
        this.weatherinfo.getDataByCityName(data).subscribe((res) => {
          this.weatherData = res;
          this.temperature = Math.round(this.weatherData.main.temp - 273.15);
          this.feelsTemperature = Math.round(this.weatherData.main.feels_like - 273.15);
          this.temperature_max=Math.round(this.weatherData.main.temp_max - 273.15);
          this.temperature_min=Math.round(this.weatherData.main.temp_min - 273.15);
          this.humidity = this.weatherData.main.humidity;
          this.weatherDescription = this.weatherData.weather[0].description;
          this.cityName = this.weatherData.name;
          this.countryCode = this.weatherData.sys.country;
          console.log(this.weatherData);
          this.showDetailsBtn = !this.showDetailsBtn;
          this.isShowCity = false;
        });
      }, 3000);
    }
    else {
      alert("Please enter valid city name.")
    }
  }
  getDetailsByCoords() {
    if (window.navigator.geolocation) {
      this.showDetailsBtn = true;
      window.navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.fetchData(this.latitude, this.longitude);
      });
    }
    else {
      alert("Oops there is a problem");
    }
  }
  fetchData(latitude: number, longitude: number) {
    setTimeout(() => {
      this.weatherinfo.getDataByCoordinates(latitude, longitude).subscribe((res) => {
        this.weatherData = res;
        console.log(this.weatherData);
        this.temperature = Math.round(this.weatherData.main.temp);
        this.feelsTemperature = Math.round(this.weatherData.main.feels_like);
        this.humidity = this.weatherData.main.humidity;
        this.temperature_max=Math.round(this.weatherData.main.temp_max);
        this.temperature_min=Math.round(this.weatherData.main.temp_min);
        this.weatherDescription = this.weatherData.weather[0].description;
        this.cityName = this.weatherData.name;
        this.countryCode = this.weatherData.sys.country;
        this.showDetailsBtn = !this.showDetailsBtn;
        this.isShowCity = false;
      })
    }, 3000);
  }
  navigateToCity() {
    this.isShowCity = true;
  }
}
