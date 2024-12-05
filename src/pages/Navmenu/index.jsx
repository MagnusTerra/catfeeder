// Importa las rutas
import Link from 'next/link';
import { useRouter } from 'next/router';
import style from './css/index.module.css'
import Image from 'next/image';
import Divider, { dividerClasses } from '@mui/material/Divider';
import Button from '@mui/material/Button';

export default function Navbar({selected}) {

    const router = useRouter();
    const currentPath = router.pathname;


    const handleUserLogin = () => {
        router.push('/Home')
    }

    return (
        <div>
        <nav className={style.navBar}>
            <ul>
                <li> <Image className={style.IconMenu} src={'/images/IMG_2809.PNG'} width={300} height={300}
                onClick={handleUserLogin} alt='Go Home' /></li>
                <li><div className={style.divider}></div></li>
                <li><Link className={currentPath === '/FeedAlready'  ? style.alinkYes :style.alink} href={'/ListFeed'}>Horarios de Comida</Link></li>
                <li><div className={style.divider}></div></li>
                <li><Link className={currentPath === '/ListFeed'  ? style.alinkYes :style.alink} href={'/FeedAlready'}>Alimentar ya</Link></li>
            </ul>
        </nav>
        </div>
    );
}
