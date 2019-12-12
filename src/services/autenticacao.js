//import { httpToken } from './config'
import axios from 'axios';
import qs from 'qs';

export const httpToken = axios.create();

 export default{

    autenticar:(logusuario) => {

        const data = qs.stringify({

            username: logusuario.Usuario,
            password: logusuario.Senha,
            grant_type: 'password',
            scope: 'offline_access'
        });

        const headers = {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'};
        
        return httpToken.post('http://localhost:52371/token', data, headers);
    }
} 