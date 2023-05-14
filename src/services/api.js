import axios from 'axios';

// URL da API: https://api.themoviedb.org/3/movie/now_playing?api_key=bbd29501812a26f8bc4df2b5576bf0dc&language=pt-BR
// Base da URL: https://api.themoviedb.org/3/

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;