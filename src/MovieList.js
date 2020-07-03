import React from 'react'
import { MovieCard } from './MovieCard'

export const MovieList = ({movies, setMoviesfiltered}) => {
    return (
        movies.map((movie, idx) => (
            <MovieCard key={movie.id} idx={idx} movie={movie} setMoviesfiltered={setMoviesfiltered}/>
        ))
        
    )
}
