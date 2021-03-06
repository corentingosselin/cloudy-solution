import { HttpHeaders } from "@angular/common/http";
import { environment } from '@env/environment';

const URL_API = environment.apiUrl;
const USER_API = URL_API + 'user/';
const AUTH_API = URL_API + 'auth/';
const FILE_API = URL_API + 'file/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export { URL_API, AUTH_API, FILE_API,USER_API, httpOptions};