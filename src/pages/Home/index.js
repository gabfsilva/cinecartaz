import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from 'react-router-dom';
import './home.css';

// URL API: https://api.themoviedb.org/3/movie/now_playing?api_key=bbd29501812a26f8bc4df2b5576bf0dc&language=pt-BR

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: 'bbd29501812a26f8bc4df2b5576bf0dc',
          language: 'pt-BR',
          page: 1,
        },
      });
      //console.log(response.data.results.slice(0, 10));
      setFilmes(response.data.results.slice(0,10))
      setLoading(false);
      console.log(response.data.results)
    }

    loadFilmes();
  }, []);

  if(loading){
    return(
      <div className="loading">
        <h2>Carregando filmes...</h2>
      </div>
    )
  }

  return(
    <div className="container">
      <h1 className="lista-filmes">
        {filmes.map((filme)=> {
            return(
                <article key={filme.id}>
                    <strong>{filme.title}</strong>
                    <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                    <Link to={`/filme/${filme.id}`} >Ver detalhes</Link>
                </article>
            )
        })}
    </h1>
    </div>
  )
}

export default Home;
