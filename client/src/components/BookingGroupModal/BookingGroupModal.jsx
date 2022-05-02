import React, {useState, useEffect} from 'react'
import axios from 'axios'

import './BookingGroupModal.scss'

function BookingGroupModal({setIsShow, setBooking, Booking}) {
    const [groups, setGroups] = useState([])
    const [loading, setLoading] = useState(false)

    const getGroups = async () => {
        setLoading(true)
        await axios.get('/api/groups')
        .then(res => {
            const data = res.data
            setGroups(data)
        })
        setTimeout(() => {
            setLoading(false)
          }, 1000);
    }

    useEffect(() => { 
        getGroups()
    },[]);

    const handleBooking = (group)=> {
        setIsShow(false)
        Booking(group)
    }

    return (
        <div className='background-modal'>
            {loading 
            ?<div className='modal-loading'>
                <div className='modal-loading-spiner'></div>
            </div>
            :<div className='modal'>
                {groups.length === 0 && <p>Вы еще не создали группу</p>}
                    {groups.map((group, index) => (
                    <div
                        className='group'
                        key={index}
                    >
                        {group.files === undefined 
                        ?<div 
                            className='group__image group__image-undefined' 
                        >
                        </div>
                        : <div 
                            className='group__image' 
                            style={{backgroundImage: `url(${URL.createObjectURL(group.files[0])})`}}
                            >
                        </div>
                        }
                        <div className='group__description'>
                            <p>Имя: {group.name}</p>
                            <p>Возраст: {group.age}</p>
                            <p>Специальность: {group.specialization}</p>
                            <p>Количество детей: {group.users.length}</p> 
                        </div>
                        <button className='group__booking' onClick={()=>handleBooking(group)}>Забронировать</button>
                    </div>
                    ))}
                <button className='modal__delete' onClick={()=>setIsShow(false)}>
                </button>
            </div>}
        </div>
    );
}

export default BookingGroupModal;