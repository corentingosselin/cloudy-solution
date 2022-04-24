import { HttpHeaders } from "@angular/common/http";
import { environment } from '@env/environment';

const URL_API = environment.apiUrl;

const AUTH_API = URL_API + 'auth/';
const FILE_API = URL_API + 'file/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

//file header option
const fileHeaderOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data',
  })
};

export { URL_API, AUTH_API, FILE_API, httpOptions, fileHeaderOptions};