import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  localStorageId = 'angularFinalProject';

  constructor() {
  }

  create(key: string) {
    const temp = JSON.stringify({'key': key});
    localStorage.setItem(this.localStorageId, temp );
  }

  getKey() {
    const ls = localStorage.getItem(this.localStorageId);
    const data = JSON.parse(ls);
    return data.key;
  }

  getStatus(): boolean {
    const ls = localStorage.getItem(this.localStorageId);
    return ls ? true : false;
  }

  remove() {
    localStorage.removeItem(this.localStorageId);
  }
}
