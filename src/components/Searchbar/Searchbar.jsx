import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [searchPhotos, setSearchPhotos] = useState('');

  const handleChange = evt => {
    setSearchPhotos(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (searchPhotos.trim() === '') {
      return toast.info('Input search name please ...');
    }
    onSubmit(searchPhotos);

    setSearchPhotos('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          value={searchPhotos}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  searchPhotos: PropTypes.string.isRequired,
};