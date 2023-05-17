import propTypes from 'prop-types';
import css from './Button.module.css';

// export const Button = ({ onClick }) => (
//   <button className={css.Button} onClick={onClick} type="button">
//     Load more
//   </button>
// );
// Button.propTypes = {
//   onClick: propTypes.func.isRequired,
// };

export const Button = ({ onloadMore }) => {
  return (
    <button type="button" className={css.Button} onClick={onloadMore}>
      Load more
    </button>
  );
};

Button.propTypes = {
  loadMore: propTypes.func,
};
