import propTypes from 'prop-types';
import css from './Searchbar.module.css';
import { Component } from 'react';
// export const Searchbar = ({ onSubmit }) => (
//   <header className={css.Searchbar}>
//     <form className={css.SearchForm} onSubmit={onSubmit}>
//       <button type="submit" className={css.SearchFormButton}>
//         <span className={css.SearchFormButtonLabel}>Search</span>
//       </button>

//       <input
//         name="inputForSearch"
//         className={css.SearchFormInput}
//         type="text"
//         autoComplete="off"
//         autoFocus
//         placeholder="Search images and photos"
//       />
//     </form>
//   </header>
// );
export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = e => {
    // const { name, value } = e.currentTarget;
    // this.setState({ [name]: value });
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      return alert('Please enter something :)');
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form onSubmit={this.handleSubmit} className={css.SearchForm}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchQuery"
            value={this.state.searchQuery}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: propTypes.func,
};
Searchbar.propTypes = {
  onSubmit: propTypes.func,
};
