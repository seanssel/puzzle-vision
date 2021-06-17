import styles from './MenuModal.module.css';

const MenuModal = ({ modalRef, children }) => {
  return (
    <div className={styles.modal} ref={modalRef}>
      {children}
    </div>
  );
};

export default MenuModal;
