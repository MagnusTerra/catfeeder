import styles from './css/SaveChanges.module.css'

import { Button } from '@nextui-org/button'


export const SaveChange =({open, close}) => {

    const handleCloseModal = () => {
        close(false)
    }


    if (open) {
        return (
            <div className={styles.bodySC}>
                <div className={styles.mainSC}>
                    <h2>¡Registro añadido con éxito!</h2>

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