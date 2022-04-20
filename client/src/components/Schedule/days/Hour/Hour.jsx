import React, {useState} from 'react';

import BookingChildrenModal from '../../../BookingChildrenModal/BookingChildrenModal';

import './Hour.scss';

function Hour({hour}) {

  const [isSow, setIsShow] = useState(false);
  const [isSowModalChildren, setIsShowModalChildren] = useState(false);
  const [booking, setBooking] = useState(hour.booking);

  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [age, setAge] = useState();
  const [speciality, setSpeciality] = useState();
  const [files, setFiles] = useState();

  const Booking = (children)=> {
    setName(children.name);
    setSurname(children.surname);
    setAge(children.age);
    setSpeciality(children.speciality);
    setFiles(children.files[0]);
  }

  const handleBooking = ()=> {
    setIsShow(false);
    setIsShowModalChildren(true);
    
  }

  return (
    <>
      <div className='hour'>
        <div className='hour__header'>
            {hour.name}
        </div>
        <div className={booking ? 'hour__body hour__body-booking' : 'hour__body'}>

          {booking 
          ? (
            <>
              <div className='body__button-unbooking' onClick={()=>setBooking(false)}>
              </div>
              <p>{name}</p>
              <p>{surname}</p>
              <p>{age} лет</p>
              <p>{speciality}</p>
              {files === undefined 
              ? <div 
                  className='hour__image hour__image-undefined' 
                >
                </div>
              : <div 
                  className='hour__image' 
                  style={{backgroundImage: `url(${URL.createObjectURL(files)})`}}
                >
                </div>
              }
            </>
          ) 
          : (
            <div className='body__button-open' onClick={()=>setIsShow(true)}></div>
          )}

          {isSow 
          ? <div className='body__wrapper-button'>
              <div>
                <button className='body__button'>Забронировать группу</button>
                <button className='body__button' onClick={handleBooking}>Забронировать ребенка</button>
              </div>
              <button className='body__button-close' onClick={()=>setIsShow(false)}></button>
            </div>

          : <></>}
        </div>
      </div>

      {isSowModalChildren && (
      <BookingChildrenModal 
      setIsShow={setIsShowModalChildren} 
      setBooking={setBooking}
      Booking={Booking}
      />)}
    </>
  );
}



export default Hour;
