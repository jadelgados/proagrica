

import React, {useState, useEffect} from 'react'
import Modal from 'react-modal';

import './ChallengeApp.css';
import { MovieList } from './MovieList';

Modal.setAppElement('#root');

export const ChallengeApp = () => {

    const [inputValue, setInputValue] = useState('');
    const [buttonValue, setButtonValue] = useState('View Favorites');
    const [OnlyFavorites, setOnlyFavorites] = useState(false);
    const [MoviesArray, setMoviesArray] = useState([]);
    const [Moviesfiltered, setMoviesfiltered] = useState([]);
    
    useEffect( () => {
        getMovies();
    }, [] )


    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        const filter = MoviesArray.filter(m => m.name.toUpperCase().indexOf(e.target.value.toUpperCase())>=0);
        setMoviesfiltered(e.target.value == '' ? MoviesArray : filter);
    }

    const handleButtonClick = (e) => {
        setButtonValue(OnlyFavorites ? 'View Favorites': 'View All');
        setOnlyFavorites(!OnlyFavorites)
        if(!OnlyFavorites){
            const filter = MoviesArray.filter(m => m.isFavorite);
            setMoviesfiltered(filter);
        }
        else{
            setMoviesfiltered(MoviesArray);
        }
    }

    const getMovies = async() => {
        const url = 'http://api.tvmaze.com/shows';
        const resp = await fetch(url);
        const data = await resp.json();

        const list = data.map ( mv => {
            return {
                id: mv.id,
                name: mv.name,
                language: mv.language,
                image: mv.image.medium,
                summary: mv.summary,
                officialSite: mv.officialSite,
                premiered: mv.premiered,
                imdb: mv.externals.imdb,
                isFavorite: false
        }
        });

        setMoviesArray(list);
        setMoviesfiltered(list);
        
    }

    return (
        <div className="header">
            <h1>My TV Shows</h1>
            <input className="search" placeholder="Type to filter..." type="text"
                value={inputValue}
                onChange={handleInputChange}
            />
            <br />
            <input type="button" 
                    value= {buttonValue}
                    onClick= {handleButtonClick} />
            <MovieList movies={Moviesfiltered} setMoviesfiltered={setMoviesfiltered}/>
        </div>
    )
}
