// components/ConfirmAl.jsx
import styles from '../pages/ListFeed/css/SaveChanges.module.css';
import styles2 from '../pages/ListFeed/css/delete.module.css';
import { Button } from '@nextui-org/button';
const ConfirmAl = ({ open, close }) => {
  const handleCloseModal = () => {
    close(false);
  };

  if (open) {
    return (
      <div className={styles.bodySC}>
        <div className={styles2.mainSC2}>
          <h2>¡Acción realizada!</h2>
          <Button className={styles.closeSC} onClick={handleCloseModal}>
            Close
          </Button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ConfirmAl;  // Exportación por defecto
