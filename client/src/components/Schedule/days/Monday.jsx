import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Hour from './Hour/Hour';

import { days } from '../../../days';

import './Day.scss';

function Monday() {

  const [hours, setHours] = useState([]);

  useEffect(() => {
    axios.get('/api/days/monday')
      .then(res => {
        const data = res.data
        setHours(data)
    })
  },[]);

  const unbooking = (hourTitle)=> {
    axios.put('/api/days/monday/onbooking', {hourTitle})

    axios.get('/api/days/monday')
    .then(res => {
      const data = res.data
      setHours(data)
  })
  }

  const booking = (children, hourTitle)=> {
    axios.put('/api/days/monday/booking', {children, hourTitle})

    axios.get('/api/days/monday')
    .then(res => {
      const data = res.data
      setHours(data)
  })
  }

  return (
    <div className='day'>
        <div className={days() === "Понедельник" ? 'day__header-now day__header' : 'day__header'}>
            <p className='header__logo'>Понедельник</p>
        </div>
        <div className="main__content">
			{hours.map((hour, index) => (
				<Hour
          hour={hour}
          key={index}
          unbooking={unbooking}
          booking={booking}
        />			
			))}
		</div>
    </div>
  );
}

export default Monday;