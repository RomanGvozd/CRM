import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Hour from './Hour/Hour'

import { days } from '../../../days'

import './Day.scss'

function Wednesday() {

    const [hours, setHours] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingHour, setLoadingHour] = useState(false)
  
  
    const getHours = async () => {
      setLoading(true)
      await axios.get('/api/days/wednesday')
        .then(res => {
          const data = res.data
          setHours(data)
      })
      setTimeout(() => {
        setLoading(false)
      }, 500);
    }
  
    useEffect(() => {
      getHours()
    },[]);
  
    const booking = async (children, hourTitle)=> {
      setLoading(true)
      await axios.put('/api/days/wednesday/booking', {children, hourTitle})
      getHours()
    }
  
    const unbooking = async (hourTitle)=> {
      setLoading(true)
      await axios.put('/api/days/wednesday/onbooking', {hourTitle})
      getHours()
    }

  return (
    <div className='day'>
        <div className={days() === "Среда" ? 'day__header-now day__header' : 'day__header'}>
            <p className='header__logo'>Среда</p>
        </div>
        {loading 
        ?<div className='main__content-loading'>
          <div className='main__content-loading-spiner'></div>
        </div>
        :<div className="main__content">
          {hours.map((hour, index) => (
            <Hour
              hour={hour}
              key={index}
              unbooking={unbooking}
              booking={booking}
            />			
          ))}
        </div>}
    </div>
  );
}

export default Wednesday;