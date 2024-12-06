// components/ConfirmAl.jsx
import styles from '../pages/ListFeed/css/SaveChanges.module.css';
import styles2 from '../pages/ListFeed/css/delete.module.css';
import { Button } from '@nextui-org/button'


export default function DeleteHour ({open, close}) {

    const handleCloseModal = () => {
        close(false)
    }


    if (open) {
        return (
            <div className={styles.bodySC}>
                <div className={styles2.mainSC2}>
                    <h2>¡Registro eliminado con éxito!</h2>

                    <Button
                        className={styles.closeSC}
                        onClick={handleCloseModal}
                    >
                        Close 
                    </Button>
                </div>
            </div>
        )
    }
  
}