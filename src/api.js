import axios from 'axios';
import PropTypes from 'prop-types';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29782836-0cb6e5c5167e525a8102df66c';

export const fetchPhotos = async ({ searchPhotos, page }) => {
  const per_page = 12;

  const url = `${BASE_URL}?key=${API_KEY}&q=${searchPhotos}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`;

  try {
    const response = await axios.get(url);

    const images = getNormalizedImages(response.data.hits);
    const pages = Math.ceil(response.data.totalHits / per_page);

    return { images, pages };
  } catch (error) {
    throw new Error(error);
  }
};

const getNormalizedImages = images => {
  const normalizedData = images.map(
    ({ id, tags, webformatURL, largeImageURL }) => {
      return { id, tags, webformatURL, largeImageURL };
    }
  );
  return normalizedData;
};

fetchPhotos.propTypes = {
  searchPhotos: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
};
