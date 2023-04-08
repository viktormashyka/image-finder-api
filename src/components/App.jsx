import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import PropTypes from 'prop-types';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { fetchPhotos } from 'api';
import { Loader } from './Loader/Loader';
import '../css/styles.css';

export const App = () => {
  const [photos, setPhotos] = useState([]);
  const [searchPhotos, setSearchPhotos] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    console.log('componentDidUpdate... ');
    if (!searchPhotos) return;
    const getImages = async () => {
      try {
        setIsLoading(true);
        const { images, pages } = await fetchPhotos({ searchPhotos, page });
        if (images.length === 0) {
          toast.info(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }
        if (page === 1) {
          setPages(pages);
        }
        setPhotos(prevPhotos => [...prevPhotos, ...images]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getImages();
  }, [page, searchPhotos]);

  const handleFormSubmit = searchPhotos => {
    setSearchPhotos(searchPhotos);
    setPage(1);
    setPhotos([]);
  };

  const loadMore = evt => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      {isLoading && <Loader />}
      {photos.length > 0 && <ImageGallery photos={photos} />}
      {!!pages && pages !== page && !isLoading && <Button onClick={loadMore} />}
      <ToastContainer autoClose={2000} />
    </div>
  );
};

App.propTypes = {
  photos: PropTypes.array.isRequired,
  searchPhotos: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pages: PropTypes.number.isRequired,
};
