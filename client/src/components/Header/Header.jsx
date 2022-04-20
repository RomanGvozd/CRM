import React from 'react';
import { Link } from "react-router-dom";

import './Header.scss';
const days = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
  ];

let today = new Date();
let day = String(today.getDate()).padStart(2, '0');
let month = String(today.getMonth() + 1).padStart(2, '0'); 
let year = today.getFullYear();

let n = today.getDay();

today = day + '/' + month + '/' + year;

function Header() {
    return (
        <header className='header'>
            <div className='header__wrapper-logo'>
                <h1 className='header__logo'>CRM</h1>
                <p className='header__day'>{`${days[n]} ${day}`}</p>
            </div>

            <nav className='header__nav'>
                <ul className='nav__list'>
                    <li className='nav__item'>
                        <Link to="/group">
                            <button className='button-create'>
                                + Создать группу
                            </button>
                        </Link>
                    </li>
                    <li className='nav__item'>
                        <Link to="/children">
                            <button className='button-create'>
                                + Создать ребенка
                            </button>
                        </Link>
                    </li>
                    <li className='nav__item'> 
                        <Link to="/">
                            <button className='button-list'>
                                Расписание
                            </button>
                        </Link>                     
                    </li>
                    <li className='nav__item'> 
                        <Link to="/list-group">
                            <button className='button-list'>
                                Список групп
                            </button>
                        </Link>                     
                    </li>
                    <li className='nav__item'> 
                        <Link to="/list-children">
                            <button className='button-list'>
                                Список детей
                            </button>
                        </Link>                     
                    </li>
                </ul>
                <input className='header__input' placeholder='Поиск'>
                </input>
            </nav>
        </header>
    );
}

export default Header;
