import Image from "next/image";
import Navbar from "../Navmenu";
import styles from "./css/index.module.css";
import { useState, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Input } from "@nextui-org/input";
import { TimeInput } from "@nextui-org/date-input";
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { SaveChange } from "./SaveChange";
import axios from "axios";
import { parseAbsoluteToLocal, Time, ZonedDateTime } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import EditHour from "./EditHour";
import { DeleteHour } from "./DeleteHour";


export default function Feed() {
  const [hoursList, setHoursList] = useState([
    { id: 1, hour: '7:00', timeType: 'Diaria', countFood: 200 },
    { id: 2, hour: '7:00', timeType: 'Semanal', countFood: 1400 },
    { id: 3, hour: '7:00', timeType: 'Mensual', countFood: 6000 },
  ]);

  const [feedList, setFeedList] = useState([]);
  const [openNewHour, setOpenNewHour] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [openEdit, setOpenEdit] = useState(false);
  const [itemValue, setItemValue] = useState([]);
  const [openModalS2, setOpenModalS2] = useState(false);


  const handleFeedList = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/feedlist');

      console.log(response.data.message)

      setFeedList(response.data.message[0]); // Update state when data is received
      setIsLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.log(`An error has occurred: ${error.message}`);
      setIsLoading(false); // Set loading to false even if there is an error
    }
  };

  const handleSelectedItem = (e) => {
    setOpenEdit(true);
    setItemValue(e)
  }

  const handleDeleteFeedHour = async (id) => {
    try {
      const response = await axios.delete('http://localhost:3000/api/feedlist', {
        data: {
          id: id, // Replace with the actual schedule ID you want to delete
        },
      })

      setOpenModalS2(true)
    } catch (error) {
      console.log("error")
    }
  }

  useEffect(() => {
    handleFeedList();
  }, []); // Only run once when component mounts

  const handleOpenHour = () => {
    setOpenNewHour((prevState) => !prevState);
  };

  return (
    <div>
      <div className={styles.catHours}>
      <h1>Lista de Usuarios</h1>
        <div className={styles.FoodTable}>
          
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th>Hora</th>
                <th>Nombre</th>
                <th>Cantidad en gramos</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {/* Only render feedList if it has data */}
              {!isLoading ? (
                feedList.length > 0 ? (
                  feedList.map((i) => (
                    <tr key={i.feeding_schedule_id}>
                      <td>{i.feeding_time}</td>
                      <td>{i.frequency_type}</td>
                      <td>{i.amount} G</td>
                      <td>
                        <button 
                        onClick={() => handleSelectedItem(i)}>Editar</button>
                        <button
                        onClick={() => handleDeleteFeedHour(i.feeding_schedule_id)}
                        >Eliminar</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4">No data available</td></tr>
                )
              ) : (
                <tr><td colSpan="4">Loading...</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.catHoursAlert}>
          <div style={{ display: "flex" }}>
            <Image src={'/images/Imágen 1.png'} width={100} height={100} />
            <h2 style={{ marginTop: '50px' }}>Queda un 60% del alimento en reservas</h2>
            <button onClick={handleOpenHour}>Añadir nuevo horario</button>
          </div>
        </div>
      </div>

      <div className={styles.nothingCat}>
        <div className={styles.faceCat}>
          <Image className={styles.faceCatImg} src={'/images/Imágen 4.png'} width={200} height={200} />
          <h2 className={styles.footerTitle}>¿Qué horario podría poner mi amo para comer? </h2>
        </div>
      </div>

      {openNewHour && <NewHour openModal={setOpenNewHour} />}
      <EditHour open={openEdit} close={setOpenEdit} value={itemValue} />    
      <DeleteHour open={openModalS2} close={setOpenModalS2}/>
  
      <Navbar />
      
    </div>
  );
}



const NewHour = ({ openModal }) => {
  const [openModalS, setOpenModalS] = useState(false);

  const [feedingTypes, setFeedingTypes] = useState([]);
  const [feedingTime, setFeedingTime] = useState(parseAbsoluteToLocal("2024-04-08T18:45:22Z")); // State for the feeding time
  const [selectedFeedingType, setSelectedFeedingType] = useState(null);
  const [grams, setGrams] = useState('');
  let formatter = useDateFormatter({ dateStyle: "short", timeStyle: "long" });

  const closeModal = () => {
    openModal(false);
  };

  const handleFeedingTypes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/feedlist?request=types');
      setFeedingTypes(response.data.message || []);
    } catch (error) {
      console.error('Error fetching feeding types:', error);
    }
  };

  const handleNewFeedHour = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/feedlist', {
        type: 'create',
        feedingTime: feedingTime,
        frequency: selectedFeedingType,
        foodAmount: grams
      })
       
      if (response.data.success) { 
        setOpenModalS(true)
      } else {
        console.log('Error')
      }
    } catch (error) {
      console.log(error.message)
    }
 

  }

  

  useEffect(() => {
    handleFeedingTypes(); // Fetch feeding types when the component mounts
  }, []);

  const animals = [
    { key: "cat", label: "Cat" },
    { key: "dog", label: "Dog" },
    { key: "elephant", label: "Elephant" },
    { key: "lion", label: "Lion" },
    { key: "tiger", label: "Tiger" },
    { key: "giraffe", label: "Giraffe" },
    { key: "dolphin", label: "Dolphin" },
    { key: "penguin", label: "Penguin" },
    { key: "zebra", label: "Zebra" },
    { key: "shark", label: "Shark" },
    { key: "whale", label: "Whale" },
    { key: "otter", label: "Otter" },
    { key: "crocodile", label: "Crocodile" },
  ];

  return (
    <div className={styles.NewHour}>
      <div className={styles.newHourClose}>
        <Button onClick={closeModal} style={{ backgroundColor: 'pink' }}>
          <CloseIcon sx={{ color: 'white' }} />
        </Button>
      </div>

      <div className={styles.newHourMain}>
        <h2>Editando horario</h2>
        <h3>Selecciona el horario</h3>

        <div className={styles.newHourBox}>
          <label style={{ marginRight: '200px' }}>Hora</label>
          <div className={styles.NHD}>
            <TimeInput
              label="Event Time"
              className={styles.TimePicker}
              onChange={(e) => {
                setFeedingTime(e.toString());
              }}
            />

          </div>

          <label style={{ marginRight: '150px' }}>Frecuencia</label>
          <div className={styles.NHD2}>
            <Select
              value={selectedFeedingType}
              label="Select a feeding type"
              className="max-w-xs"
            >
              {feedingTypes.length > 0 ? (
                feedingTypes.map((feedingType) => (
                  <SelectItem key={feedingType.frequency_id} 
                  onClick={() => setSelectedFeedingType(feedingType.frequency_id)}
                  value={feedingType.frequency_id}>
                    {feedingType.frequency_type} 
                  </SelectItem>
                ))
              ) : (
                animals.map((animal) => (
                  <SelectItem key={animal.key} value={animal.key}>
                    {animal.label}
                  </SelectItem>
                ))
              )}
            </Select>
          </div>

          <label>Cantidad en gramos</label>
          <div className={styles.NHD3}>
            <Input
              isRequired
              type="number"
              label="Gramos"
              className="max-w-xs"
              value={grams}
              onChange={(e) => setGrams(e.target.value)}
            />
          </div>

          <Button
            className={styles.NHDSaveB}
            onClick={() => {console.log({ feedingTime, selectedFeedingType, grams });
            handleNewFeedHour()}}
          >
            Guardar
          </Button>
        </div>
      </div>
      <SaveChange open={openModalS} close={setOpenModalS} />
      
      

    </div>
  );
};
