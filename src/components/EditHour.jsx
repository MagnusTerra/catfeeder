
import styles from "../pages/ListFeed/css/index.module.css";
import { useState, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Input } from "@nextui-org/input";
import { TimeInput } from "@nextui-org/date-input";
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { SaveChange } from "./SaveChange";
import axios from "axios";
import { parseAbsoluteToLocal} from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import {Time} from "@internationalized/date";


export default function EditHour ({openModal, open, close, value = []}) {
    const [openModalS, setOpenModalS] = useState(false);
    const [feedingTypes, setFeedingTypes] = useState([]);
    const [feedingTime, setFeedingTime] = useState(parseAbsoluteToLocal("2024-04-08T18:45:22Z")); // State for the feeding time
    const [selectedFeedingType, setSelectedFeedingType] = useState(null);
    const [grams, setGrams] = useState(null);

    const { feeding_time: rawTime } = value; // Get feeding_time from the value object
    const [hours, minutes] = rawTime ? rawTime.split(':').map(Number) : [0, 0]; 

    let formatter = useDateFormatter({ dateStyle: "short", timeStyle: "long" });
  
    const closeModal = () => {
        close(false);
    };
  
    const handleFeedingTypes = async () => {
      try {
        const response = await axios.get(`http://${process.env.NEXT_PUBLIC_HOST}:3000/api/feedlist?request=types`);
        setFeedingTypes(response.data.message || []);
      } catch (error) {
        console.error('Error fetching feeding types:', error);
      }
    };
  
    const handleNewFeedHour = async () => {
      try {
        const response = await axios.post(`http://${process.env.NEXT_PUBLIC_HOST}:3000/api/feedlist`, {
          type: 'update',
          id: value.feeding_schedule_id,
          feedingTime: feedingTime,
          frequency: selectedFeedingType,
          foodAmount: grams,
        })
         
        if (response.data.success) { 
          setOpenModalS(true)
        } else {
          console.log(response.data.error)
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
  
    if (open) {
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
                      placeholder={value.frequency_type}
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
                      placeholder={value.amount}
                      onChange={(e) => {setGrams(e.target.value); console.log({ feedingTime, selectedFeedingType, grams })}}
                    />
                  </div>
        
                  <Button
                    className={styles.NHDSaveB}
                    onClick={() => {
                    handleNewFeedHour()}}
                  >
                    Guardar
                  </Button>
                </div>
              </div>
              <SaveChange open={openModalS} close={setOpenModalS} />
            </div>
          );
    }

   
  };