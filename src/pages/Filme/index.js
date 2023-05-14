import { useEffect, useState } from 'react';
import { useParams, useNavigate, json } from 'react-router-dom';
import api from '../../services/api';
import './filme-info.css';
import { toast } from 'react-toastify';

function Filme() {
    const { id } = useParams();
    const navigation = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: 'bbd29501812a26f8bc4df2b5576bf0dc',
                    language: 'pt-BR',
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
                console.log(response.data)
            })
            .catch(()=>{
                console.log('Filme não encontrado!');
                navigation('/', { replace: true });
                return;
            })
        }
        loadFilme();
    }, [navigation, id]);

    function salvarFilme(){
        const filmesFav = localStorage.getItem("@cinecartaz");

        let filmesSalvos = JSON.parse(filmesFav) || [];

        const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id);

        if(hasFilme){
            toast.warn("Este filme já está na sua lista", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@cinecartaz", JSON.stringify(filmesSalvos));
        toast.success("Filme favoritado com sucesso!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });

    }

    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className='filme-info'>
          <h1>{filme.title}</h1>
          <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

          <strong>Data de Lançamento: {filme.release_date}</strong>
          <strong>IMDB: {filme.vote_average.toFixed(1)} / 10</strong>

          <h3>Sinopse:</h3>
          <span>{filme.overview}</span>
          
          <div className='area-buttons'>
            <button onClick={salvarFilme}>Salvar</button>
            <button>
                <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                    Trailer
                </a>
            </button>
          </div>
        </div>
    )
}

export default Filme;