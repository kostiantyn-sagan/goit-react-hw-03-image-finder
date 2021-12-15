import PropTypes from 'prop-types';
import s from './Button.module.css';

export default function Button({ handleLoadMoreBtn }) {
  return (
    <button type="submit" className={s.Button} onClick={handleLoadMoreBtn}>
      Load more
    </button>
  );
}

Button.propTypes = {
  handleLoadMoreBtn: PropTypes.func.isRequired,
};
