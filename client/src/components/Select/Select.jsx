import React, {useState} from 'react'

import './Select.scss';

const Select = ({selected, setSelected, options}) => {

    const [isActive, setIsActive] = useState(false);
    
    return(
        <div className='select'>
            <div 
            className={isActive ? 'select__button select__button-active' : 'select__button'}
            onClick={() => setIsActive(!isActive)}
            >
            {selected}
            </div>
            {isActive && (
                <div className='select__content'>
                    {options.map(option => (
                        <div 
                        className='content__item'
                        onClick={
                            (e) => {
                                setIsActive(false)
                                setSelected(option)
                            }
                        }
                        >
                        {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Select;