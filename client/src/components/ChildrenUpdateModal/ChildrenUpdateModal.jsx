import React, {useState} from 'react'
import axios from 'axios'

import Select from '../Select/Select'

import './ChildrenUpdateModal.scss'

function ChildrenUpdateModal({children, setIsShow, getUsers}) {
    const DEFAULT_FOMR_STATE = {
        name: `${children.name}`, 
        surname: `${children.surname}`, 
        age: `${children.age}` , 
        number: `${children.number}`
    }

    const [loading, setLoading] = useState(false)
    const [formValues, setFormValues] = useState(DEFAULT_FOMR_STATE)

    const [selected, setSelected] = useState("Рисование")
    const options = ["Танцы", "Лепка", "Вокал", "Гитара"]

    const handleChange = ({ target }) => {
        const { name, value } = target
        setFormValues((state) => ({
            ...state,
            [name]: value,
        }))
    }

    const handleClose = ()=> {
        setIsShow(false)
    }

    const handleSave = async ()=> {
        await axios.put('/api/users', {children, formValues, selected})  
        setIsShow(false)
        getUsers()
    }

    return (
    <div className='background-modal'>
        {loading 
        ?<div className='modal-loading'>
            <div className='modal-loading-spiner'></div>
        </div>
        :<div className='modal-update'>
                <button className="modal__delete" onClick={handleClose}>
                </button>
            <div
                className='modal__children'
                key={children.id}
            >
            <div className='modal__children-wrapper'>
                {children.img === undefined 
                ? <div 
                    className='modal__children__image modal__children__image-undefined' 
                >
                </div>
                : <div 
                    className='modal__children__image' 
                    style={{backgroundImage: `url(${children.img})`}}
                >
                </div>}
                <button className="modal__children__button" onClick={handleSave}>
                    Сохранить
                </button>
            </div>

                <div className='modal__children__description'>
                    <input
                        className="modal__children__input"
                        placeholder="Введите имя"
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                    />
                    <input
                        className="modal__children__input"
                        type="text"
                        name="surname"
                        placeholder="Введите фамилию"
                        value={formValues.surname}
                        onChange={handleChange}
                    />
                    <input
                        className="modal__children__input"
                        type="number"
                        name="age"
                        placeholder="Введите возраст"
                        value={formValues.age}
                        onChange={handleChange}
                    />
                    <input
                        className="modal__children__input"
                        type="number"
                        name="number"
                        placeholder="Введите номер телефона"
                        value={formValues.number}
                        onChange={handleChange}
                    />
                    <Select
                        selected={selected}
                        setSelected={setSelected}
                        options={options}
                    />
                    </div>
                </div>
        </div>}
    </div>
    )
}


export default ChildrenUpdateModal;