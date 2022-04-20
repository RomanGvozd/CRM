import React, {useState} from 'react';

import Hour from './Hour/Hour';

import { days } from '../../../days';

import './Day.scss';

function Thursday() {

    const [hours, setHours] = useState([
        {
            name: '8:00',
            booking: false
        },
        {
            name: '9:00',
            booking: false
        },
        {
            name: '10:00',
            booking: false
        },
        {
            name: '11:00',
            booking: false
        },
        {
            name: '12:00',
            booking: false
        },
        {
            name: '13:00',
            booking: false
        },
        {
            name: '14:00',
            booking: false
        },
        {
            name: '15:00',
            booking: false
        },
        {
            name: '16:00',
            booking: false
        },
        {
            name: '17:00',
            booking: false
        },
        {
            name: '18:00',
            booking: false
        },
        {
            name: '19:00',
            booking: false
        },
        {
            name: '20:00',
            booking: false
        },
    ]);

  return (
    <div className='day'>
        <div className={days() === "Четверг" ? 'day__header-now day__header' : 'day__header'}>
            <p className='header__logo'>Четверг</p>
        </div>
        <div className="main__content">
			{hours.map((hour, index) => (
				<Hour
                hour={hour}
                key={index}
                />			
			))}
		</div>
    </div>
  );
}

export default Thursday;