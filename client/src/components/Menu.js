import { ReactComponent as SettingsIcon } from '../assets/icons/settings.svg';
import { ReactComponent as HelpIcon } from '../assets/icons/help-circle.svg';
import { useComponentVisible } from '../hooks/useComponentVisible';
import SettingsModal from './SettingsModal';
import HelpModal from './HelpModal';
import styles from './Menu.module.css';

const Menu = ({ updateConfig, numPuzzlesFound }) => {
  const [
    settingsRef,
    isSettingsVisible,
    setIsSettingsVisible,
  ] = useComponentVisible(false);

  const [helpRef, isHelpVisible, setIsHelpVisible] = useComponentVisible(false);

  return (
    <nav className={styles.menu}>
      <div className={`${styles.item} ${styles.name}`}>
        puzzle<span className={styles.subname}>VISION</span>
      </div>
      <div className={styles.settings}>
        {numPuzzlesFound !== 0 && (
          <span className={styles.numPuzzlesFound}>{numPuzzlesFound}</span>
        )}
        <SettingsIcon
          onClick={() => setIsSettingsVisible(!isSettingsVisible)}
          className={`${styles.icon} ${styles.item} ${styles.settings} ${
            isSettingsVisible && styles.open
          }`}
        />
        <HelpIcon
          onClick={() => setIsHelpVisible(!isHelpVisible)}
          className={`${styles.icon} ${styles.item} ${styles.help} ${
            isHelpVisible && styles.open
          }`}
        />
        {isSettingsVisible && (
          <SettingsModal
            updateConfig={updateConfig}
            modalRef={settingsRef}
            isModalVisible={isSettingsVisible}
            setModalVisible={setIsSettingsVisible}
          />
        )}
        {isHelpVisible && <HelpModal modalRef={helpRef} />}
      </div>
    </nav>
  );
};

export default Menu;
