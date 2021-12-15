import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import ImageGallery from './components/ImageGallery';
import Modal from './components/Modal';
import Searchbar from './components/Searchbar';

export default class App extends Component {
  state = {
    showModal: false,
    searchQuery: '',
    largeImageURL: '',
    largeImageDescr: '',
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  showLargeImage = (url, descr) => {
    this.setState({ largeImageURL: url, largeImageDescr: descr });
    this.toggleModal();
  };

  render() {
    const { showModal, largeImageURL, largeImageDescr } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          searchQuery={this.state.searchQuery}
          onImageClick={this.showLargeImage}
        />
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={largeImageDescr} />
          </Modal>
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
