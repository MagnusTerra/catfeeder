import styles from '../ListFeed/css/SaveChanges.module.css'
import styles2 from '../ListFeed/css/delete.module.css'
import { Button } from '@nextui-org/button'


export default function ConfirmAl ({open, close})  {

    const handleCloseModal = () => {
        close(false)
    }


    if (open) {
        return (
            <div className={styles.bodySC}>
                <div className={styles2.mainSC2}>
                    <h2>¡Accion realizada!</h2>

                    <Button
                        className={styles.closeSC}
                        onClick={handleCloseModal}
                    >
                        Close 
                    </Button>
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
  
}