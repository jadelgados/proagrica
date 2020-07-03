import React, {useState} from 'react';
import './MovieCard.css';
import Modal from 'react-modal';
import { FaStar } from 'react-icons/fa';

export const MovieCard = ({idx, movie, setMoviesfiltered}) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isFavorite, setIsFavorite] = useState(movie.isFavorite);
    const [favoriteButtonText, setFavoriteButtonText] = useState(isFavorite ? 'Remove from favorites': 'Add to favorites');

    const handleButtonClick = (e) => {
        setIsFavorite(!isFavorite)
        setFavoriteButtonText(!isFavorite ? 'Remove from favorites': 'Add to favorites');

        setMoviesfiltered(movs => {
            const list = movs.map((item, j) => {
                if (j === idx) {
                item.isFavorite = !isFavorite;
                }
                return item;
            });
            return list;
        } );
    }

    return (
        <>
        
        <div className="card">
            <img  src={movie.image} alt={movie.name} />
            <div >
                <a href="#" onClick={() => setModalIsOpen(true)} className="title">{movie.name}</a>
                <h4>{movie.language}</h4>
                <h4>Premiered: {movie.premiered}</h4>
                <a href={movie.officialSite} target="_blank">Visit the offical site</a>
            </div>
            <div className={ movie.isFavorite ? 'isFav' : 'notIsFav'}>
            <h3><FaStar /></h3>
            </div>
        </div>
        <Modal isOpen={modalIsOpen}
                style={{
                    overlay: {
                      backgroundColor: 'rgba(22, 22, 22,0.75)'
                    },
                    content: {
                      position: 'absolute',
                      top: '40px',
                      left: '40px',
                      right: '40px',
                      bottom: '40px',
                      border: '1px solid #ccc',
                      background: '#fff',
                      overflow: 'auto',
                      WebkitOverflowScrolling: 'touch',
                      borderRadius: '4px',
                      outline: 'none',
                      padding: '20px'
                    }
                  }}>
            <div className="modal-content">
                <div>
                    <span className="close" onClick={() => setModalIsOpen(false)}>&times;</span>
                    <h1>{movie.name}</h1>
                    
                </div>
                
                <a href="#" onClick={handleButtonClick} >{favoriteButtonText}</a>
                <div>
                    <img src={movie.image} alt={movie.name}/>
                </div>
                <div dangerouslySetInnerHTML={{__html: movie.summary}}></div>

                <a href={`https://www.imdb.com/title/${movie.imdb}`} target="_blank" >View IMDB</a>
            </div>
        </Modal>
        </>
    )
}
