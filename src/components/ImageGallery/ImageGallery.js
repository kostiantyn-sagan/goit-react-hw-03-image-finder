import { Component } from 'react';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import pixabayAPI from '../../services/pixabay-api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class ImageGallery extends Component {
  static propTypes = {
    searchQuery: PropTypes.string.isRequired,
    onImageClick: PropTypes.func.isRequired,
  };

  state = {
    images: null,
    error: null,
    status: Status.IDLE,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;
    const prevImages = prevState.images;
    const { status, page, images: nextImages } = this.state;

    if (prevQuery !== nextQuery) {
      this.setState({ status: Status.PENDING, page: 1, images: null });

      pixabayAPI
        .fetchImages(nextQuery)
        .then(({ hits }) => {
          if (hits.length === 0) {
            return Promise.reject(
              new Error(
                `There are no images or photos for the search query ${nextQuery}`,
              ),
            );
          }

          this.setState(({ page }) => ({
            images: hits,
            status: Status.RESOLVED,
            page: page + 1,
          }));
        })
        .catch(error => {
          this.setState({ error, status: Status.REJECTED });
          toast.error(error.message);
        });
    }

    if (
      status === 'resolved' &&
      page > 2 &&
      prevImages.length !== nextImages.length
    ) {
      window.scrollBy({
        top: document.documentElement.clientHeight - 166,
        behavior: 'smooth',
      });
    }
  }

  handleLoadMoreBtn = () => {
    this.setState({ status: Status.PENDING });

    pixabayAPI
      .fetchImages(this.props.searchQuery, this.state.page)
      .then(({ hits }) => {
        this.setState(({ images, page }) => ({
          images: [...images, ...hits],
          status: Status.RESOLVED,
          page: page + 1,
        }));
      })
      .catch(error => {
        this.setState({ error, status: Status.REJECTED });
      });
  };

  render() {
    const { images, status, page } = this.state;
    const { onImageClick } = this.props;

    if (status === 'pending' && page === 1) {
      return (
        <Loader
          type="ThreeDots"
          height={80}
          width={80}
          visible={true}
          style={{ textAlign: 'center' }}
        />
      );
    }

    return (
      <>
        {images && (
          <ul className={s.ImageGallery}>
            {images.map(({ webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={webformatURL}
                webformatURL={webformatURL}
                description={tags}
                onImageClick={() => onImageClick(largeImageURL, tags)}
              />
            ))}
          </ul>
        )}
        {status === 'resolved' && (
          <Button handleLoadMoreBtn={this.handleLoadMoreBtn} />
        )}
        {status === 'pending' && (
          <Loader
            type="ThreeDots"
            height={80}
            width={80}
            visible={true}
            style={{ textAlign: 'center' }}
          />
        )}
      </>
    );
  }
}
