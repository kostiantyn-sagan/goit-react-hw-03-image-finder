import { Component } from 'react';
import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

export default class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchQuery: '',
  };

  handleQueryChange = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      toast.error('Enter your search term.');
      return;
    }

    this.props.onSubmit(this.state.searchQuery);
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <ImSearch />
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleQueryChange}
          />
        </form>
      </header>
    );
  }
}
