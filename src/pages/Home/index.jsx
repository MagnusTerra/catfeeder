import styles from './css/index.module.css'
import Navbar from '../Navmenu'
import Image from 'next/image'
import { useRouter } from 'next/router'
export default function Home () {

    const router = useRouter();

    const handleRedirect  = (page) => {
        if (page === 'ListFeed') {
            router.push('/ListFeed')
        } else if (page === 'FeedAlready') {
            router.push('/FeedAlready')
        } else {
            router.push('/Home')
        }
    }


    return (
        <div>
            

            <div className={styles.CatDiv}>
                    
                <div>
                    <Image src={'/images/miau2.png'} className={styles.MainCatMiau} width={200} height={200}/>           
                    <Image src={'/images/Img2.png'} className={styles.MainCat} width={200} height={200}/>
                </div>
            </div>

            <div className={styles.MenuCatOption}>
                <div>
                    <h1>¿Que deseas hacer?</h1>

                    <div className={styles.MiauButtons}>
                        <div style={{display:'flex'}}>
                            <labe><Image src={'/images/IMG_2899.PNG'} width={100} height={100}/></labe>
                            <button className={styles.MiauButtonsB}
                                onClick={() => handleRedirect('ListFeed')}
                            >Programar Horario de alimentacion</button>
                        </div>
                        {/*  */}
                        <div style={{display:'flex', marginTop: '20px'}}>
                            <labe><Image src={'/images/IMG_2898.PNG'} width={100} height={100}/></labe>
                            <button className={styles.MiauButtonsB}
                                onClick={() => handleRedirect('FeedAlready')}
                            >Alimentar ya</button>
                        </div>
                        {/** */}
                        <div style={{display:'flex', marginTop: '20px'}}>
                            <labe><Image src={'/images/IMG_2897.PNG'} width={100} height={100}/></labe>
                            <button className={styles.MiauButtonsB}
                                onClick={() => handleRedirect('')}
                            >Comida Disponible</button>
                        </div>
                    </div>
                </div>
            </div>
            <Navbar/>
        </div>
    )
}