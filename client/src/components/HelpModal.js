import MenuModal from './MenuModal';
import styles from './HelpModal.module.css';

const HelpModal = ({ modalRef }) => {
  return (
    <MenuModal modalRef={modalRef}>
      <div className={styles.help}>
        <div className={styles.moving}>
          <h1 className={styles.header}>Moving</h1>
          Click on the coordinate text next to a piece to start your move. Input
          the destination square, e.g. <span className={styles.square}>d4</span>
          , and submit.
          <br /> <br />
          To promote, include the first letter of the desired piece after the
          destination coordinate, e.g.&nbsp;
          <span className={styles.square}>a1Q</span> will move to a1 and promote
          to to Queen. (Knight&nbsp;=&nbsp;'N').
        </div>
        <a
          className={styles.github}
          href="https://github.com/seanssel/puzzle-vision"
          target="_blank"
          rel="noreferrer"
        >
          <h1 className={styles.header}>GitHub</h1>
        </a>
      </div>
    </MenuModal>
  );
};

export default HelpModal;
