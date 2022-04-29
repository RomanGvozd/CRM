import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {deleteItem} from "../../common/store/ListChildren/actions/actions";

import './ListChildren.scss';

function ListChildren() {
  const [childrens, setChildrens] = useState([]);

  useEffect(() => {
    axios.get('/api/users')
      .then(res => {
        const data = res.data
        setChildrens(data)
      })
  },[]);

  const handleDelete = (id) => {
    axios.delete(`/api/users/${id}`)
      .then(res => {
        console.log(res)
        console.log(res.data)
      })
      axios.get('/api/users')
      .then(res => {
        const data = res.data
        setChildrens(data)
      })
  };

  return (
    <>
    {childrens.length === 0 

    ?<main className='list-children-none'>
        <p>Вы не создали ребенка</p>
    </main>

    : <main className='list-children'>
        <div className="list-children__wrapper">
          {childrens.map((children, index) => (
            <div
              className='children'
              key={children.id}
            >
              {children.img === undefined 
              ? <div 
                  className='children__image children__image-undefined' 
                >
                </div>
              : <div 
                  className='children__image' 
                  style={{backgroundImage: `url(${children.img})`}}
                >
                </div>
              }

              <div className='children__description'>
                <p>Имя: {children.name}</p>
                <p>Фамилия: {children.surname}</p>
                <p>Возраст: {children.age}</p>
                <p>Номер телефона: {children.number}</p>
                <p>Специальность: {children.specialization}</p>
              </div>
              <button className='children__delete' onClick={()=>handleDelete(children._id)}>
              </button>
            </div>
          ))}
        </div>
      </main>}
    </>   
  );
}


export default ListChildren;