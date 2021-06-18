import { useState } from 'react';
import { PIECES_LIMIT, MOVES_LIMIT } from '../shared/config/defaults';
import store from '../shared/storage/store';
import MenuModal from './MenuModal';
import SettingsInput from './SettingsInput';
import styles from './SettingsModal.module.css';

const SettingsModal = ({ updateConfig, modalRef, setModalVisible }) => {
  const config = store.getConfig();

  const [piecesRange, setPiecesRange] = useState(config.piecesRange);
  const [movesRange, setMovesRange] = useState(config.movesRange);
  const [matesOnly, setMatesOnly] = useState(config.matesOnly);

  const updatePiecesRange = (key) => (e) => {
    setPiecesRange({ ...piecesRange, [key]: e.target.value });
  };

  const updateMovesRange = (key) => (e) => {
    setMovesRange({ ...movesRange, [key]: e.target.value });
  };

  const updateMatesOnly = (e) => {
    setMatesOnly(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalVisible(false);
    updateConfig(piecesRange, movesRange, matesOnly);
  };

  return (
    <MenuModal modalRef={modalRef}>
      <form className={styles.settings} onSubmit={handleSubmit}>
        <h1>Total Pieces:</h1>
        <SettingsInput
          type="number"
          name="piecesMin"
          value={piecesRange.min}
          onChange={updatePiecesRange('min')}
          limit={PIECES_LIMIT}
        >
          min
        </SettingsInput>
        <SettingsInput
          type="number"
          name="piecesMax"
          value={piecesRange.max}
          onChange={updatePiecesRange('max')}
          limit={PIECES_LIMIT}
        >
          max
        </SettingsInput>
        <h1>Player Moves:</h1>
        <SettingsInput
          type="number"
          name="movesMin"
          value={movesRange.min}
          onChange={updateMovesRange('min')}
          limit={MOVES_LIMIT}
        >
          min
        </SettingsInput>
        <SettingsInput
          type="number"
          name="movesMax"
          value={movesRange.max}
          onChange={updateMovesRange('max')}
          limit={MOVES_LIMIT}
        >
          max
        </SettingsInput>
        <SettingsInput
          type="checkbox"
          name="matesOnly"
          value={matesOnly}
          onChange={updateMatesOnly}
        >
          <h1 className={`${styles.info} ${styles.mates}`}>Mates Only:</h1>
        </SettingsInput>
        <input className={styles.submit} type="submit" value="Filter Puzzles" />
      </form>
    </MenuModal>
  );
};

export default SettingsModal;
