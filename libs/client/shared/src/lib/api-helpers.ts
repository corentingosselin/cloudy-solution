import { HttpHeaders } from "@angular/common/http";

const URL_API = 'http://localhost:8080/';

const AUTH_API = URL_API + 'auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export { URL_API, AUTH_API, httpOptions };