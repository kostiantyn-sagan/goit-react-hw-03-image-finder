import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  webformatURL,
  description,
  onImageClick,
}) {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={description}
        className={s.ImageGalleryItemImage}
        onClick={onImageClick}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
