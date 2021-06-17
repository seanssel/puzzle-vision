import { getPieceSVG } from '../shared/chess/pieces';
import styles from './Piece.module.css';

const Piece = ({ color, role, children }) => {
  const SVG = getPieceSVG(color, role);
  return (
    <div className={styles.piece}>
      <SVG className={styles.icon} />
      {children}
    </div>
  );
};

export default Piece;
