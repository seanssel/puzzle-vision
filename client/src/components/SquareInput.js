import styles from './SquareInput.module.css';

const SquareInput = ({ square, makeMove, inputRef, error }) => {
  // const [helpVisible, setHelpVisible] = useState(false);

  const handleMove = (e) => {
    e.preventDefault();
    makeMove(inputRef.current.value);
  };

  return (
    <div className={styles.main}>
      {square ? (
        <form className={styles.move} onSubmit={handleMove}>
          Your move:
          <span className={styles.startSquare}>{`${square} -> `}</span>
          <input
            type="text"
            className={`${styles.endSquare} ${error && styles.error}`}
            ref={inputRef}
            autoFocus
            onFocus={(e) => e.currentTarget.select()}
          />
          <input className={styles.submit} type="submit" value="Submit Move" />
        </form>
      ) : (
        <div className={styles.info}>Click a square to move</div>
      )}
    </div>
  );
};

export default SquareInput;