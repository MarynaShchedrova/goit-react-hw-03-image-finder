import css from './Loader.module.css';

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
