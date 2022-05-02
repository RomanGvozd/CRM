import React, {useState} from 'react';
import {useDispatch} from "react-redux";

import Select from '../Select/Select';
import ModalAlert from '../ModalAlert/ModalAlert';

import {createItem} from "../../common/store/ListGroup/actions/actions";
import {addGroup} from "../../common/store/ListGroup/actions/actions";


import './CreateGroup.scss';

function CreateGroup() {
  const dispatch = useDispatch();

  const [name, setName] = useState();
  const [specialization, setSpecialization] = useState("Рисование");
  const [age, setAge] = useState("4-6");

  const [isShow, setIsShow] = useState(false);
  const optionsSpecialization = ["Танцы", "Лепка"];
  const optionsCategory = ["7-9", '10-13', '14-16', '17-18', '18+'];

  const hadleChangeName = ({target}) => setName(target.value);

  const handleCreate = () => {
    const values = { name: name, age: age, specialization: specialization };
    const data = new FormData();

    Object.keys(values).forEach((key) => {
      data.append(key, values[key]);
    });

    dispatch(addGroup(data));
    setIsShow(true);
    setInterval(() => setIsShow(false), 1500);
  };

  return (
    <main className='create-group'>
      <div className='group__wrapper'>
        <div className='group__form'>
          <input
            className='group__input'
            type="text"
            placeholder='Введите название группы' 
            onChange={hadleChangeName}/>
          <Select
            selected={age}
            setSelected={setAge}
            options={optionsCategory}
          />
          <Select
            selected={specialization}
            setSelected={setSpecialization}
            options={optionsSpecialization}
          />

          <button
            className='group__button'
            onClick={handleCreate}
          >
            Создать группу
          </button>
        </div>
      </div>
      {isShow && <ModalAlert alert={'Группа создана'}/>}
    </main>
  );
}

export default CreateGroup;