import { useState } from 'react';
import store from '../shared/storage/store';
import MenuModal from './MenuModal';
import SettingsInput from './SettingsInput';
import styles from './SettingsModal.module.css';

const SettingsModal = ({ updateConfig, modalRef, setModalVisible }) => {
  const config = store.getConfig();

  const [piecesRange, setPiecesRange] = useState(config.piecesRange);
  const [movesRange, setMovesRange] = useState(config.movesRange);
  const [ratingRange, setRatingRange] = useState(config.ratingRange);
  const [matesOnly, setMatesOnly] = useState(config.matesOnly);

  const updatePiecesRange = (key) => (e) => {
    setPiecesRange({ ...piecesRange, [key]: e.target.value });
  };

  const updateMovesRange = (key) => (e) => {
    setMovesRange({ ...movesRange, [key]: e.target.value });
  };

  const updateRatingRange = (key) => (e) => {
    setRatingRange({ ...ratingRange, [key]: e.target.value });
  };

  const updateMatesOnly = (e) => {
    setMatesOnly(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalVisible(false);
    updateConfig(piecesRange, movesRange, ratingRange, matesOnly);
  };

  return (
    <MenuModal modalRef={modalRef}>
      <form className={styles.settings} onSubmit={handleSubmit}>
        <h1 className={styles.header}>Total Pieces:</h1>
        <SettingsInput
          type="number"
          name="piecesMin"
          value={piecesRange.min}
          onChange={updatePiecesRange('min')}
        >
          min
        </SettingsInput>
        <SettingsInput
          type="number"
          name="piecesMax"
          value={piecesRange.max}
          onChange={updatePiecesRange('max')}
        >
          max
        </SettingsInput>

        <h1 className={styles.header}>Player Moves:</h1>
        <SettingsInput
          type="number"
          name="movesMin"
          value={movesRange.min}
          onChange={updateMovesRange('min')}
        >
          min
        </SettingsInput>
        <SettingsInput
          type="number"
          name="movesMax"
          value={movesRange.max}
          onChange={updateMovesRange('max')}
        >
          max
        </SettingsInput>

        <h1 className={styles.header}>Puzzle Rating:</h1>
        <SettingsInput
          type="number"
          name="ratingMin"
          value={ratingRange.min}
          onChange={updateRatingRange('min')}
        >
          min
        </SettingsInput>
        <SettingsInput
          type="number"
          name="ratingMax"
          value={ratingRange.max}
          onChange={updateRatingRange('max')}
        >
          max
        </SettingsInput>

        <SettingsInput
          type="checkbox"
          name="matesOnly"
          value={matesOnly}
          onChange={updateMatesOnly}
        >
          <h1 className={`${styles.header} ${styles.mates}`}>Mates Only:</h1>
        </SettingsInput>

        <input className={styles.submit} type="submit" value="Filter Puzzles" />
      </form>
    </MenuModal>
  );
};

export default SettingsModal;
