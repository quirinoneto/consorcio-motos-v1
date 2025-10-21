import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimulacaoService {
  
  private mockApiURL = 'https://jsonplaceholder.typicode.com/posts'; // URL fictícia para simulação

  constructor(private http: HttpClient) {}

  getSimulacoes(): Observable<any[]> {
    return this.http.get<any[]>(this.mockApiURL);
  }

  enviarSimulacao(dados: any): Observable<any> {
    return this.http.post<any>(this.mockApiURL, dados);
  }
}
