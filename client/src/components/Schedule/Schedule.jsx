import React, {useState} from 'react';

import Monday from './days/Monday';
import Tuesday from './days/Tuesday';
import Wednesday from './days/Wednesday';
import Thursday from './days/Thursday';
import Friday from './days/Friday';
import Saturday from './days/Saturday';
import Sunday from './days/Sunday';

import './Schedule.scss';

function Schedule() {
    return (
        <main className='main'>
            <div className="main__content">
                    <Monday />
                    <Tuesday />
                    <Wednesday />
                    <Thursday />
                    <Friday />
                    <Saturday />
                    <Sunday />
			</div>
        </main>
    );
}

export default Schedule;