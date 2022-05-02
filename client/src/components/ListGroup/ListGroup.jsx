import React, {useState, useEffect} from 'react'
import axios from 'axios'

import BookingChildrenModal from '../BookingChildrenModal/BookingChildrenModal'

import './ListGroup.scss'

function ListGroup() {

  const [groups, setGroups] = useState([])

  const [isSow, setIsShow] = useState(false);
  const [groupId, setGroupId] = useState();
  const [idAddChildren, setIdAddChildren] = useState();
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
    }, 1500);

  }

  useEffect(() => {
    getGroups()
  },[])

  const handleDelete = async (id) => {
    await  axios.delete(`/api/groups/${id}`)
      .then(res => {
        console.log(res)
        console.log(res.data)
      })
    getGroups()
  }

  const handleDeleteChildren = async (userId, groupId) => {
    const id = [userId, groupId]
    await  axios.delete(`/api/groups/users/${id}`)
      .then(res => {
        console.log(res)
        console.log(res.data)
      })
    getGroups()
  }

  const handleAdd = (id) => {
    setIsShow(true)
    setIdAddChildren(id)
    setGroupId(id)
  };

  const Booking = async (children)=> {
    await  axios.put('/api/groups', {children, groupId})  
    getGroups()
  }

  const handleOpen = (id) => {
    const updateGroup = groups.map((group)=>{
      if(group._id === id){
          return {...group, showChildren: !group.showChildren}
      }
      return group
    })
    setGroups(updateGroup)
  }

  return (
  <>
    {loading

    ?<div className='group-children-loading'>
      <p className='group-children-loading-text'>Loading Group</p>
      <div className='group-children-loading-spiner'></div>
    </div>

    :<>
        {groups.length === 0

        ?<main className='group-children-none'>
            <p>Вы не создали группу</p>
          </main>
        :<main className='group-children'>
          <div className="group-children__wrapper">

            {groups.map((group, index) => (
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
                    <p>Категория: {group.age} лет</p>
                    <p>Специальность: {group.specialization}</p>
                    <p>Количество детей: {group.users.length}</p>
                  </div>
                  <div className='group__button-wrapper'>
                    <button className='group__add-children' onClick={()=>handleAdd(group._id)}>
                      + Добавить ребенка
                    </button>
                    <button className='group__button-open' onClick={()=>handleOpen(group._id)}>
                      {group.showChildren ? <p>Закрыть группу</p> : <p>Открыть группу</p>}
                    </button>
                  </div>
                  <button className='group__delete' onClick={()=>handleDelete(group._id)}>
                  </button>
                </div>


                <div className={group.showChildren ? "list-children__wrapper list-children__wrapper-open"  : "list-children__wrapper "}>
                  {group.users.map((user, index)=>(
                    
                    <div
                      className='children'
                      key={index}
                    >
                    {user.files === undefined 
                    ? <div 
                        className='children__image children__image-undefined' 
                      >
                      </div>
                    : <div 
                        className='children__image' 
                        style={{backgroundImage: `url(${URL.createObjectURL(user.files[0])})`}}
                      >
                      </div>
                    }
                    <div className='children__description'>
                      <p>Имя: {user.name}</p>
                      <p>Фамилия: {user.surname}</p>
                      <p>Возраст: {user.age}</p>
                      <p>Специальность: {user.specialization}</p>
                    </div>
                    <button className='children__delete' onClick={()=>handleDeleteChildren(user._id, group._id)}>
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
          Booking={Booking}
          />)}
      </>}
  </>
  )
}

export default ListGroup;
