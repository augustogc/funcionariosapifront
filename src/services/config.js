import axios from 'axios'

export const http = axios.create({

    baseURL: 'http://localhost:52371/api/'
});

/* export const httpToken = axios.create({

    baseURL: 'http://localhost:52371/'
}); 
*/