import { useState } from 'react';
import style from './css/index.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Login() {
  const router = useRouter();
  const [isShaking, setIsShaking] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [inputSelected1, setInputSelected1] = useState(false);
  const [inputSelected2, setInputSelected2] = useState(false);
  const [userInfoLog, setUserInfoLog] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // to handle button loading state
  const [error, setError] = useState(null); // to handle login error messages

  const handleLogin = async () => {
    setLoading(true); // Disable the button while logging in
    setError(null); // Clear previous errors
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        userName: userInfoLog.username,
        userPassword: userInfoLog.password
      });
      
      if (response.status === 200) {
        // Assuming the API returns success status when login is successful
        router.push("/Home");
      } else {
        setError('Login failed, please try again.');
      }
    } catch (error) {
      setError('An error occurred, please try again later.');
    } finally {
      setLoading(false); // Enable the button again
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfoLog((prev) => ({
      ...prev, // Retain the other field
      [name]: value, // Update the current input's value
    }));
    console.log(userInfoLog)
  };

  const handleClick = () => {
    setIsShaking(true);
    const audio = new Audio('/sound/gato-38924.mp3');
    audio.play();
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
      setPlaying(false);
      setIsShaking(false); // Remove the shake effect after animation
    }, 1000); // Match the animation duration (0.5s)
  };

  const handleInputSelect = () => {
    setInputSelected1((state) => !state);
  };

  const handleInputSelect2 = () => {
    setInputSelected2((state) => !state);
  };

  return (
    <div className={style.loginBody}>
      <Image
        src={isShaking ? "/images/IMG_2800.PNG" : "/images/Imágen 3.png"}
        alt="Logo"
        width={300}
        height={200}
        className={isShaking ? style.shake : style.mainImage}
        onClick={handleClick}
      />

      <div className={style.loginMainCo}>
        <div className={style.loginCat}>
          <Image
            src="/images/Imágen 6.png"
            alt="MainLogo"
            width={200}
            height={200}
            className={style.MainLogo}
          />
          <h1>Smart CatFeeder</h1>
          <h1>Inicia Sesion</h1>

          <form className={style.catLoginMainForm}>
            <label className={style.catLoginForm}>Ingrese su Usuario</label>
            <input
              type='text'
              placeholder='Email or UserName'
              value={userInfoLog.username}
              onFocus={handleInputSelect}
              onBlur={handleInputSelect}
              onChange={handleInputChange}
              name="username"
            />
            {inputSelected1 && (
              <Image
                src={'/images/Imágen 5.png'}
                width={40}
                height={30}
                style={{
                  position: 'absolute',
                  marginTop: '5px',
                  top: '2px',
                  right: '165px',
                  zIndex: 1000
                }}
              />
            )}

            <br />
            <label className={style.catLoginForm2} title='nice'>
              Ingrese tu Contraseña
            </label>
            <input
              type='password'
              placeholder='Password'
              name="password"
              value={userInfoLog.password}
              onFocus={handleInputSelect2}
              onBlur={handleInputSelect2}
              onChange={handleInputChange}
            />
            {inputSelected2 && (
              <Image
                src={'/images/Imágen 5.png'}
                width={40}
                height={30}
                style={{
                  position: 'absolute',
                  marginTop: '5px',
                  top: '102px',
                  right: '165px',
                  zIndex: 1000
                }}
              />
            )}
          </form>

          {error && <div className={style.error}>{error}</div>} {/* Display error message */}
          
          <button
            className={style.formButton}
            onClick={handleLogin}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Cargando...' : 'Ingresar'}
          </button>
        </div>
      </div>

      <div className={style.loginContent}></div>

      <div className={style.loginMainText}>
        Este sitio web está diseñado para controlar y configurar un alimentador automático para gatos de manera remota y sencilla. 
        Presenta un diseño amigable y atractivo, pensado tanto para amantes de los gatos como para usuarios con diferentes niveles de 
        experiencia tecnológica.
      </div>
    </div>
  );
}
