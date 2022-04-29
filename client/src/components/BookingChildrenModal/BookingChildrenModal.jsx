import React, {useState, useEffect} from 'react'
import axios from 'axios'

import './BookingChildrenModal.scss'

function BookingChildrenModal({setIsShow, setBooking, Booking}) {
    const [childrens, setChildrens] = useState([])
    const [loading, setLoading] = useState(false)

    const getUsers = async () => {
        setLoading(true)
        await axios.get('/api/users')
        .then(res => {
            const data = res.data
            setChildrens(data)
        })
        setTimeout(() => {
            setLoading(false)
          }, 1000);
    }

    useEffect(() => { 
        getUsers()
    },[]);

    const handleBooking = (children)=> {
        setIsShow(false)
        Booking(children)
    }

    return (
        <div className='background-modal'>
            {loading 
            ?<div className='modal-loading'>
                <div className='modal-loading-spiner'></div>
            </div>
            :<div className='modal'>
                {childrens.length === 0 && <p>Вы еще не создали детей</p>}
                    {childrens.map((children, index) => (
                    <div
                        className='children'
                        key={index}
                    >
                        {children.files === undefined 
                        ?<div 
                            className='children__image children__image-undefined' 
                        >
                        </div>
                        : <div 
                            className='children__image' 
                            style={{backgroundImage: `url(${URL.createObjectURL(children.files[0])})`}}
                            >
                        </div>
                        }
                        <div className='children__description'>
                            <p>Имя: {children.name}</p>
                            <p>Фамилия: {children.surname}</p>
                            <p>Возраст: {children.age}</p>
                            <p>Специальность: {children.specialization}</p>
                        </div>
                        <button className='children__booking' onClick={()=>handleBooking(children)}>Забронировать</button>
                    </div>
                    ))}
                <button className='modal__delete' onClick={()=>setIsShow(false)}>
                </button>
            </div>}
        </div>
    );
}

export default BookingChildrenModal;