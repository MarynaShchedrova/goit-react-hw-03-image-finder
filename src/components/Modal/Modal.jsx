import css from './Modal.module.css';
import propTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
// export const Modal = ({ src, alt, handleClose }) => (
//   <div className={css.Overlay} onClick={handleClose}>
//     <div className={css.Modal}>
//       <img src={src} alt={alt} />
//     </div>
//   </div>
// );

// Modal.propTypes = {
//   src: propTypes.string.isRequired,
//   alt: propTypes.string.isRequired,
//   handleClose: propTypes.func.isRequired,
// };

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={css.Overlay} onClick={this.handleBackDropClick}>
        <div className={css.Modal}>
          <img src={this.props.largeImageURL} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: propTypes.func,
  largeImageUrl: propTypes.string.isRequired,
};
