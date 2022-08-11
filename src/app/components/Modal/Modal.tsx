import React, { useState } from 'react';

import { Itodo } from '../../types/todoTypes';

import './modal.scss';

// /. imports 

interface propTypes {
    todosData: Itodo[],
    setTodosData: (arg: any[]) => any;
    setModalVisibleStatus: (arg: boolean) => void;
    currentTodoID: number
}

// /. interfaces

const Modal: React.FC<propTypes> = ({ todosData, setTodosData, setModalVisibleStatus, currentTodoID }) => {

    const [inputValue, setInputValue] = useState<string>('');
    const [inputRadioValue, setInputRadioValue] = useState<string>('');

    const formSubmitHandler = (e: React.SyntheticEvent): any => {
        e.preventDefault();

        setTodosData([...todosData].map(item => {
            if (item.id === currentTodoID) {
                return {
                    ...item,
                    title: inputValue,
                    category: inputRadioValue ? `#${inputRadioValue.charAt(0).toUpperCase() + inputRadioValue.slice(1)}` : 'uncategorized', // set upperCase for 1st letter of getted inputRadioValue
                    status: '',
                    editable: false
                };
            } else {
                return item;
            }
        }));
        setModalVisibleStatus(false);
    };

    const closeModal = (): void => {
        setTodosData([...todosData].map(item => item.id === currentTodoID ? { ...item, editable: false } : item)); // for remove editable css-class
        setModalVisibleStatus(false);
    };

    return (
        <div className="modal">

            <button className="modal__button modal__button--close" onClick={closeModal}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.11639 7.99994L2.55833 12.558L3.44222 13.4419L8.00027 8.88382L12.5583 13.4419L13.4422 12.558L8.88416 7.99994L13.4422 3.44188L12.5583 2.558L8.00027 7.11605L3.44222 2.558L2.55833 3.44188L7.11639 7.99994Z" fill="" />
                </svg>
            </button>

            <div className="modal__wrapper">

                <form className="modal__form" onSubmit={e => formSubmitHandler(e)}>

                    <fieldset className="modal__inputs">
                        <legend className="modal__title">Title:</legend>
                        <input
                            className="modal__input"
                            type="text"
                            placeholder="Write new task title inside"
                            onChange={e => setInputValue(e.target.value)}
                            required
                        />
                    </fieldset>

                    <fieldset className="modal__categories">
                        <legend className="modal__title">Category:</legend>

                        <label className="modal__label">
                            <input className="modal__radio" type="radio" name="category" value="groceries" onChange={e => setInputRadioValue(e.target.value)} />
                            <span className="modal__radio--fake"></span>
                            groceries
                        </label>
                        <label className="modal__label">
                            <input className="modal__radio" type="radio" name="category" value="college" onChange={e => setInputRadioValue(e.target.value)} />
                            <span className="modal__radio--fake"></span>
                            college
                        </label>
                        <label className="modal__label">
                            <input className="modal__radio" type="radio" name="category" value="payments" onChange={e => setInputRadioValue(e.target.value)} />
                            <span className="modal__radio--fake"></span>
                            payments
                        </label>
                        <label className="modal__label">
                            <input className="modal__radio" type="radio" name="category" value="" onChange={e => setInputRadioValue(e.target.value)} />
                            <span className="modal__radio--fake"></span>
                            none
                        </label>
                    </fieldset>

                    <div className="modal__controllers">
                        <button className="modal__button modal__button--save">Ok</button>
                        <button className="modal__button modal__button--cancel" onClick={closeModal}>Cancel</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Modal;