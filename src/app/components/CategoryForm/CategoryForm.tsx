import React, { useState, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { switchFormVisibleStatus } from '../../../store/slices/todoSlice';

import { addNewCategoryItem } from '../../../store/slices/todoSlice';
import { addNavTemplateItem, addNewSelectItem } from '../../../store/slices/navSlice';

import './categoryForm.scss';

// /. imports 


const CategoryForm: React.FC = () => {

    const { isFormVisible } = useAppSelector(state => state.todoSlice);

    const dispatch = useAppDispatch();

    const [inputValue, setInputValue] = useState<string>('');

    const formRef = useRef<HTMLFormElement>(null!);

    const formSubmitHandler = (e: React.FormEvent): void => {
        e.preventDefault();

        dispatch(addNavTemplateItem({
            id: +new Date(),
            text: inputValue.charAt(0).toUpperCase() + inputValue.slice(1).trim(),
            category: inputValue.trim().toLocaleLowerCase(),
            link: '#',
            isActive: false
        }))

        dispatch(addNewCategoryItem({
            id: +new Date(),
            text: inputValue.trim(),
            value: inputValue.trim().toLocaleLowerCase(),
            name: 'category'
        }));

        dispatch(addNewSelectItem({
            id: +new Date(),
            text: inputValue.charAt(0).toUpperCase() + inputValue.slice(1).trim(),
            value: inputValue.trim().toLocaleLowerCase()
        }));

        dispatch(switchFormVisibleStatus({ status: false }));

        // clear the input value after the extend arrays logic has worked
        formRef.current.reset();
        setInputValue('');
    };

    return (
        <div className="category">

            <button className={isFormVisible ? 'category__button visible' : 'category__button'} onClick={() => dispatch(switchFormVisibleStatus({ status: !isFormVisible }))}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 1V11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1 6H11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Add group</span>
            </button>

            {isFormVisible &&
                <form ref={formRef} className="category__form" onSubmit={e => inputValue && formSubmitHandler(e)} >

                    <input className="input category__input"
                        type="text"
                        placeholder="Name of new group"
                        onChange={e => setInputValue(e.target.value)}
                        required
                    />

                    <button className="category__button category__button--form">Create</button>

                </form>
            }
        </div>
    );
};

export default CategoryForm;