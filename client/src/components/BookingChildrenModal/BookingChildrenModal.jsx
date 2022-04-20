import React from 'react';
import {useSelector} from "react-redux";

import './BookingChildrenModal.scss';

function BookingChildrenModal({setIsShow, setBooking, Booking}) {
    const ListChildren = useSelector((store) => store.ListChildren); 

    const handleBooking = (children)=> {
        setBooking(true);
        setIsShow(false);
        Booking(children);
    }

    return (
        <div className='background-modal'>
            <div className='modal'>
                {ListChildren.lenght === undefined ? <p>Вы еще не создали детей</p> : <></>}
                    {ListChildren.map((children, index) => (
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
                            <p>Специальность: {children.speciality}</p>
                        </div>
                        <button className='children__booking' onClick={()=>handleBooking(children)}>Забронировать</button>
                    </div>
			        ))}
                <button className='modal__delete' onClick={()=>setIsShow(false)}>
                </button>
            </div>
        </div>
    );
}

export default BookingChildrenModal;