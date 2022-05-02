import React, {useState} from 'react'

import BookingChildrenModal from '../../../BookingChildrenModal/BookingChildrenModal'
import BookingGroupModal from '../../../BookingGroupModal/BookingGroupModal'

import './Hour.scss'

function Hour({hour, unbooking, booking}) {

  const [isSow, setIsShow] = useState(false)
  const [isSowModalChildren, setIsShowModalChildren] = useState(false)
  const [isSowModalGroup, setIsShowModalGroup] = useState(false)

  const [hourTitle, setHourTitle] = useState()

  const handleUnbooking = (hourTitle)=> {
    unbooking(hourTitle)
  }

  const Booking = (children)=> {
    booking(children, hourTitle)
  }

  const BookingGroup = (group)=> {
    booking(group, hourTitle)
  }

  const handleBooking = (hourTitle)=> {
    setIsShow(false)
    setIsShowModalChildren(true)
    setHourTitle(hourTitle)
  }

  const handleBookingGroup = (hourTitle)=> {
    setIsShow(false)
    setIsShowModalGroup(true)
    setHourTitle(hourTitle)
  }

  return (
    <>
      <div className='hour'>
        <div className='hour__header'>
            {hour.title}
        </div>
        <div className={hour.booking ? 'hour__body hour__body-booking' : 'hour__body'}>
          {hour.booking 
          ? (
            <>
              <div className='body__button-unbooking' onClick={()=>handleUnbooking(hour.title)}>
              </div>
              <p>{hour.user.name}</p>
              <p>{hour.user.surname}</p>
              <p>{hour.user.age} лет</p>
              <p>{hour.user.specialization}</p>
              <div 
                className='hour__image hour__image-undefined' 
                >
              </div>
            </>
          ) 
          : (
            <div className='body__button-open' onClick={()=>setIsShow(true)}></div>
          )}

          {isSow 
          ? <div className='body__wrapper-button'>
              <div>
                <button className='body__button' onClick={()=>handleBookingGroup(hour.title)}>Забронировать группу</button>
                <button className='body__button' onClick={()=>handleBooking(hour.title)}>Забронировать ребенка</button>
              </div>
              <button className='body__button-close' onClick={()=>setIsShow(false)}></button>
            </div>

          : <></>}
      </div>

      </div>

      {isSowModalChildren && (
      <BookingChildrenModal 
      setIsShow={setIsShowModalChildren}
      Booking={Booking}
      />)}

      {isSowModalGroup && (
      <BookingGroupModal 
      setIsShow={setIsShowModalGroup}
      Booking={BookingGroup}
      />)}
    </>
  );
}



export default Hour;
