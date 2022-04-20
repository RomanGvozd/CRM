import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import BookingChildrenModal from '../BookingChildrenModal/BookingChildrenModal';

import {addChildren} from "../../common/store/ListGroup/actions/actions";
import {deleteItem} from "../../common/store/ListGroup/actions/actions";
import {openGroupId} from "../../common/store/ListGroup/actions/actions";
import {deleteChildrenGroup} from "../../common/store/ListGroup/actions/actions";

import './ListGroup.scss';

function ListGroup() {
  const ListGroup = useSelector((store) => store.ListGroup);
  const dispatch = useDispatch();

  const [isSow, setIsShow] = useState(false);
  const [booking, setBooking] = useState(false);
  const [idAddChildren, setIdAddChildren] = useState();
  
  const handleDeleteGroup = (id) => {
    dispatch(deleteItem(id));
  };

  const handleDeleteChildren = (childrenId, groupId) => {
    dispatch(deleteChildrenGroup(childrenId, groupId));
  };

  const handleOpen = (id) => {
    dispatch(openGroupId(id));
  };

  const handleAdd = (id) => {
    setIsShow(true);
    setIdAddChildren(id)
  };

  const Booking = (children)=> {
    dispatch(addChildren(idAddChildren, children.id, children.name, children.surname, children.age, children.speciality, children.files[0],));
  }

  return (
    <>
    {ListGroup.length <= 0 
    ?<main className='group-children-none'>
        <p>
          Вы не создали группу
        </p>
      </main>
    :<main className='group-children'>
      <div className="group-children__wrapper">


        {ListGroup.map((group, index) => (
          <div
            className='group'
            key={index}
          >
            <div className='group__header'>
              <div 
                className='group__image' 
              >
              </div>
              <div className='group__description'>
                <h2>{group.name}</h2>
                <p>Категория: {group.category}</p>
                <p>Специальность: {group.selected}</p>
                <p>Количество детей: {group.childrens.length}</p>
              </div>
              <div className='group__button-wrapper'>
                <button className='group__add-children' onClick={()=>handleAdd(group.id)}>
                  + Добавить ребенка
                </button>
                <button className='group__button-open' onClick={()=>handleOpen(group.id)}>
                  {group.showChildren ? <p>Закрыть группу</p> : <p>Открыть группу</p>}
                </button>
              </div>
              <button className='group__delete' onClick={()=>handleDeleteGroup(group.id)}>
              </button>
            </div>


            <div className={group.showChildren ? "list-children__wrapper list-children__wrapper-open"  : "list-children__wrapper "}>
              {group.childrens.map((children, index)=>(
                <div
                  className='children'
                  key={index}
                >
                {children.files === undefined 
                ? <div 
                    className='children__image children__image-undefined' 
                  >
                  </div>
                : <div 
                    className='children__image' 
                    // style={{backgroundImage: `url(${URL.createObjectURL(children.files[0])})`}}
                  >
                  </div>
                }
                <div className='children__description'>
                  <p>Имя: {children.name}</p>
                  <p>Фамилия: {children.surname}</p>
                  <p>Возраст: {children.age}</p>
                  <p>Специальность: {children.speciality}</p>
                </div>
                <button className='children__delete' onClick={()=>handleDeleteChildren(children.id, group.id)}>
                </button>
              </div>
              ))}
            </div>


          </div>
        ))}
      </div>
    </main>}
     
    {isSow && (
      <BookingChildrenModal
      setIsShow={setIsShow}
      setBooking={setBooking}
      Booking={Booking}
      />)}
    </>
  );
}

export default ListGroup;
