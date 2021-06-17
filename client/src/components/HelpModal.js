import MenuModal from './MenuModal';
import styles from './HelpModal.module.css';

const HelpModal = ({ modalRef }) => {
  return (
    <MenuModal modalRef={modalRef}>
      <div className={styles.help}>
        <div className={styles.moving}>
          <h1>Moving</h1>
          Input the destination square, e.g.{' '}
          <span className={styles.square}>d4</span>
          .
          <br />
          To promote, include the first letter of the desired piece after the
          destionation square, e.g.&nbsp;
          <span className={styles.square}>a1Q</span> (Knight&nbsp;=&nbsp;'N').
        </div>
      </div>
    </MenuModal>
  );
};

export default HelpModal;