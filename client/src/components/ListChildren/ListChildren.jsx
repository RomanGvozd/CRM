import React, {useState, useEffect} from 'react'
import axios from 'axios'

import ChildrenUpdateModal from '../ChildrenUpdateModal/ChildrenUpdateModal'

import './ListChildren.scss'

function ListChildren({inputValue}) {
  const [childrens, setChildrens] = useState([])
  const [children, setChildren] = useState()
  const [loading, setLoading] = useState(false)
  const [isShow, setIsShow] = useState(false)

  const getUsers = async () => {
    setLoading(true)
    await axios.get('/api/users')
    .then(res => {
        setChildrens(res.data)
    })
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }

  useEffect(() => {
    getUsers()
  },[])

  const handleDelete = async (id) => {
    await axios.delete(`/api/users/${id}`)
    getUsers()
  }

  const handleUpdate = (children) => {
    setChildren(children)
    setIsShow(true)
  }

  let filteredChildrens = childrens.filter(children=>{
    return children.name.toLowerCase().includes(inputValue.toLowerCase())
  })

  return (
  <>
    {loading 
    
    ?<div className='list-children-loading'>
      <p className='list-children-loading-text'>Loading Users</p>
      <div className='list-children-loading-spiner'></div>
    </div>

    :<>
        {childrens.length === 0 

        ?<main className='list-children-none'>
            <p>Вы не создали ребенка</p>
        </main>

        : <main className='list-children'>
            <div className="list-children__wrapper">
              {filteredChildrens.map((children, index) => (
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
                  <div className='children__group-button'>
                    <button className='children__delete' onClick={()=>handleDelete(children._id)}>
                    </button>
                    <button className='children__update' onClick={()=>handleUpdate(children)}>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>}
      </>}
      {isShow && <ChildrenUpdateModal children={children} setIsShow={setIsShow} getUsers={getUsers}/>}
  </>
  );
}


export default ListChildren;