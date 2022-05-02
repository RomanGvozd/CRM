import React, { useState } from "react"
import { useDispatch } from "react-redux"

import ModalAlert from "../ModalAlert/ModalAlert"

import Select from "../Select/Select"

import { addUser } from "../../common/store/ListChildren/actions/actions"

import "./CreateChildren.scss"

const DEFAULT_FOMR_STATE = { name: "", surname: "", age: "" , number: ""}

function CreateChildren() {
  const dispatch = useDispatch()

  const [selected, setSelected] = useState("Рисование")
  const [images, setImages] = useState()

  const [formValues, setFormValues] = useState(DEFAULT_FOMR_STATE)

  const [isShow, setIsShow] = useState(false)
  const [drag, setDrag] = useState(false)

  const handleChange = ({ target }) => {
    const { name, value } = target
    setFormValues((state) => ({
      ...state,
      [name]: value,
    }))
  }
  const options = ["Танцы", "Лепка", "Вокал", "Гитара"]

  const handleCreate = () => {
    const values = { ...formValues, specialization: selected }
    const data = new FormData()

    Object.keys(values).forEach((key) => {
      data.append(key, values[key])
    })

    data.append("image", images[0])

    dispatch(addUser(data))

    setIsShow(true)
    setInterval(() => setIsShow(false), 1500)
  }

  const dragStartHandler = (e) => {
    e.preventDefault()
    setDrag(true)
  }

  const dragLeaveHandler = (e) => {
    e.preventDefault()
    setDrag(false)
  }

  const onDropHandler = (e) => {
    e.preventDefault()
    setImages(e.dataTransfer.files)
    setDrag(false)
  }

  return (
    <main className="create-children">
      <div className="children__wrapper">
        <div className="children__form">
          <input
            className="children__input"
            placeholder="Введите имя"
            name="name"
            value={formValues.name}
            onChange={handleChange}
          />
          <input
            className="children__input"
            type="text"
            name="surname"
            placeholder="Введите фамилию"
            value={formValues.surname}
            onChange={handleChange}
          />
          <input
            className="children__input"
            type="number"
            name="age"
            placeholder="Введите возраст"
            value={formValues.age}
            onChange={handleChange}
          />
          <input
            className="children__input"
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

          <button className="children__button" onClick={handleCreate}>
            Создать ребенка
          </button>
        </div>

        {drag ? (
          <div
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
            onDrop={(e) => onDropHandler(e)}
            className="children__drag-area"
          >
            <div className="drag__image"></div>
            <p className="drag__text">Отпустите фотографию</p>
          </div>
        ) : (
          <div
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
            className="children__drag"
          >
            <div className="drag__image"></div>
            <p className="drag__text">Перетащите фотографию</p>
          </div>
        )}
      </div>
      {isShow && <ModalAlert alert={"Ребенок создан"} />}
    </main>
  );
}

export default CreateChildren;
