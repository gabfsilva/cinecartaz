import './header.css';
import { Link } from 'react-router-dom';

function Header() {
    return(
        <header>
            <Link className='logo' to='/' >CineCartaz</Link>
            <Link className='favoritos' to='/favoritos'>Filmes Favoritos</Link>
        </header>
    );
}

export default Header;