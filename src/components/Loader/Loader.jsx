// import { Dna } from 'react-loader-spinner';
import css from './Loader.module.css';

// export const Loader = () => (
//   <div className={css.Loader}>
//     <Dna
//       visible={true}
//       height="80"
//       width="80"
//       ariaLabel="dna-loading"
//       wrapperStyle={{}}
//       wrapperClass="dna-wrapper"
//     />
//   </div>
// );
import { RotatingLines } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div className={css.Loader}>
      <RotatingLines
        strokeColor="#3f51b590"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
};
