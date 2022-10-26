import { useState, useEffect } from "react";
import { Loader } from "./Loader/Loader";
import { fetchImages } from 'API';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Searchbar } from "./Searchbar/Searchbar";
import { Modal } from "./Modal/Modal";
import css from './App.module.css';

export const App = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [request, setRequest] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [largeImageURL, setLargeImageURL] = useState('');

    useEffect(() => {
        if (request === '') {
            return;
        }
        setLoading(true);
        fetchImages(request, page)
            .then(data =>
                setItems(prev => [...prev, ...data.hits]))
            .catch(error => {
                setError(error)
            })
            .finally(() => setLoading(false))
    }, [request, page]);

    const loadMore = () => {
        setPage(prev => prev + 1)
    };
    
    const handleFormSubmit = req => {
        if (request !== req) {
            setRequest(req);
            setPage(1);
            setItems([]);
        }
    };

    const modalIsOpen = () => setModalOpen(true);
    const modalIsClose = () => setModalOpen(false);

    const goLargeImg = img => {
        setLargeImageURL(img);
        modalIsOpen();
    };

    const isItems = Boolean(items.length);
    
    return (
        <div className={css.App}>
            <Searchbar onSubmit={handleFormSubmit} />
            {loading && <Loader />}
            {error && <p>Restart page or modify the request</p>}
            {isItems && <ImageGallery items={items} goLargeImg={goLargeImg} />}
            {isItems && <Button onClick={loadMore} />}
            {modalOpen && <Modal largeImageURL={largeImageURL} modalClose={modalIsClose} />}
        </div>
    )
}
