import { useState } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ photo }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const { largeImageURL, webformatURL, tags } = photo;
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt={tags}
        title={tags}
        loading="lazy"
        onClick={toggleModal}
      />
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  photos: PropTypes.array.isRequired,
  showModal: PropTypes.bool.isRequired,
};
