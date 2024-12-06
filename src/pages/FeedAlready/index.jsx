import axios from "axios";
import Navbar from "../Navmenu";
import styles from "./css/index.module.css"
import {Button, Input} from "@nextui-org/react";

import Image from "next/image";
import { useState } from "react";
import ConfirmAl from "../../components/ConfirmAl"; // Importa ConfirmAl

export default function FeedAlready () {
    const [grams, setGrams] = useState('');
    const [openModal, setOpenModal] = useState(false);

    const hadleFeedAlready = async () => {
        try {
            const response = await axios.post(`http://${process.env.NEXT_PUBLIC_EL}:5000`, {
                amount: grams
            });
            setOpenModal(true);
        } catch (error) {
            console.error("Error", error);
        }
    };
    

    return (
        <div>
           <div className={styles.infoCat}> 
                <Image 
                className={styles.catImgInfo}
                src={"/images/Img5.png"} width={200} height={200}/>

                <Image 
                className={styles.cantImgLog}
                src={"/images/miau2.png"}
                width={200} height={200}
                />
           </div>

           <div className={styles.MainFA}>
                <h2 className={styles.MFATitle}>Ingresa la cantidad en gramos</h2>
                <Input type="number" label="Gramos G." placeholder="Ejemplo 200"  onChange={(e) => {setGrams(e.target.value); console.log(grams)}}
                className={styles.inputMFA}/>
                <Button className={styles.buttonMFA} onClick={hadleFeedAlready}>!Alimentaaar</Button>
           </div>

            <Navbar/>
            <ConfirmAl open={openModal} close={setOpenModal}/>
        </div>
    )
}