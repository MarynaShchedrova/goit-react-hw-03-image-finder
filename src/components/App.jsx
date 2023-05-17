import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from '../api/fetchImages';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import React from 'react';

// export class App extends Component {
//   state = {
//     images: [],
//     isLoading: false,
//     currentSearch: '',
//     pageNr: 1,
//     modalOpen: false,
//     modalImg: '',
//     modalAlt: '',
//   };

//   handleSubmit = async e => {
//     e.preventDefault();
//     this.setState({ isLoading: true });
//     const inputForSearch = e.target.elements.inputForSearch;
//     if (inputForSearch.value.trim() === '') {
//       return;
//     }
//     const response = await fetchImages(inputForSearch.value, 1);
//     this.setState({
//       images: response,
//       isLoading: false,
//       currentSearch: inputForSearch.value,
//       pageNr: 1,
//     });
//   };

//   handleClickMore = async (query, page) => {
//     this.setState({ isLoading: true });
//     if (!query) {
//       return;
//     }
//     try {
//       const { hits, totalHits } = await fetchImages(query, page);
//       console.log(hits, totalHits);
//       this.setState(prevState => ({
//         images: [...prevState.images, ...hits],
//         loadMore: this.state.page < Math.ceil(totalHits / this.state.per_page),
//       }));
//     } catch (error) {
//       this.setState({ error: error.message });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   handleImageClick = e => {
//     this.setState({
//       modalOpen: true,
//       modalAlt: e.target.alt,
//       modalImg: e.target.name,
//     });
//   };

//   handleModalClose = () => {
//     this.setState({
//       modalOpen: false,
//       modalImg: '',
//       modalAlt: '',
//     });
//   };

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.handleModalClose();
//     }
//   };

//   async componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   render() {
//     return (
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: '1fr',
//           gridGap: '16px',
//           paddingBottom: '24px',
//         }}
//       >
//         {this.state.isLoading ? (
//           <Loader />
//         ) : (
//           <React.Fragment>
//             <Searchbar onSubmit={this.handleSubmit} />
//             <ImageGallery
//               onImageClick={this.handleImageClick}
//               images={this.state.images}
//             />
//             {this.state.images.length && (
//               <Button onClick={this.handleClickMore} />
//             )}
//           </React.Fragment>
//         )}
//         {this.state.modalOpen ? (
//           <Modal
//             src={this.state.modalImg}
//             alt={this.state.modalAlt}
//             handleClose={this.handleModalClose}
//           />
//         ) : null}
//       </div>
//     );
//   }
// }
export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    per_page: 12,
    isLoading: false,
    loadMore: false,
    error: null,
    showModal: false,
    largeImageURL: 'largeImageURL',
    id: null,
  };

  componentDidUpdate(_, prevState) {
    console.log(prevState.page);
    console.log(this.state.page);
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.getImages(searchQuery, page);
    }
  }

  getImages = async (query, page) => {
    this.setState({ isLoading: true });
    if (!query) {
      return;
    }
    try {
      const { hits, totalHits } = await fetchImages(query, page);
      console.log(hits, totalHits);
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        loadMore: this.state.page < Math.ceil(totalHits / this.state.per_page),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  formSubmit = searchQuery => {
    this.setState({
      searchQuery,
      images: [],
      page: 1,
      loadMore: false,
    });
  };

  onloadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = largeImageURL => {
    console.log(largeImageURL);
    this.setState({
      showModal: true,
      largeImageURL: largeImageURL,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { images, isLoading, loadMore, page, showModal, largeImageURL } =
      this.state;
    return (
      <>
        <Searchbar onSubmit={this.formSubmit} />

        {isLoading ? (
          <Loader />
        ) : (
          <ImageGallery images={images} openModal={this.openModal} />
        )}

        {loadMore && <Button onloadMore={this.onloadMore} page={page} />}

        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
        )}
      </>
    );
  }
}
