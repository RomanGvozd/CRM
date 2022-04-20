import React, {useState} from 'react';
import {useDispatch} from "react-redux";

import Select from '../Select/Select';
import ModalAlert from '../ModalAlert/ModalAlert';

import {createItem} from "../../common/store/ListGroup/actions/actions";

import './CreateGroup.scss';

function CreateGroup() {
  const dispatch = useDispatch();

  const [name, setName] = useState();
  const [selected, setSelected] = useState("Рисование");
  const [category, setCategory] = useState("4-6 лет");

  const [isShow, setIsShow] = useState(false);
  const options = ["Танцы", "Лепка"];
  const optionsCategory = ["7-9 лет", '10-13 лет', '14-16 лет', '17-18 лет'];

  const hadleChangeName = ({target}) => setName(target.value);

  const handleCreate = () => {
    dispatch(createItem(name, category, selected));
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
            selected={category}
            setSelected={setCategory}
            options={optionsCategory}
          />
          <Select
            selected={selected}
            setSelected={setSelected}
            options={options}
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