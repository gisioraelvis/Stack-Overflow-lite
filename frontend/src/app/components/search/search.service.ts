import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/constants';

@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private http: HttpClient) {}

  getSearchResults(searchTerm: string): Observable<any> {
    return this.http.get<any>(`${API_URL}/${searchTerm}`);
  }
}
