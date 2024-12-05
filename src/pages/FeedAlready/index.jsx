import Navbar from "../Navmenu";
import styles from "./css/index.module.css"
import {Button, Input} from "@nextui-org/react";

import Image from "next/image";

export default function FeedAlready () {


    return (
        <div>
           <div className={styles.infoCat}> 
                <Image 
                className={styles.catImgInfo}
                src={"/images/Imágen 5.png"} width={200} height={200}/>

                <Image 
                className={styles.cantImgLog}
                src={"/images/miau2.png"}
                width={200} height={200}
                />
           </div>

           <div className={styles.MainFA}>
                <h2 className={styles.MFATitle}>Ingresa la cantidad en gramos</h2>
                <Input type="number" label="Gramos G." placeholder="Ejemplo 200" 
                className={styles.inputMFA}/>
                <Button className={styles.buttonMFA}>!Alimentaaar</Button>
           </div>

            <Navbar/>
        </div>
    )
}