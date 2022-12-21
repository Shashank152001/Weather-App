import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  constructor(private http:HttpClient) { }
  getDataByCityName(data:string):Observable<any>{
    return this.http.get("https://api.openweathermap.org/data/2.5/weather?q="+data+"&appid=1d1d3c714721719ecd20a55d01a2bd8f")
  }
  getDataByCoordinates(latitude:number,longitude:number){
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=1d1d3c714721719ecd20a55d01a2bd8f`)
  }
}
