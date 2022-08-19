import React, { useEffect } from 'react';

import { Inav } from '../../types/navTypes';
import { Itodo } from '../../types/todoTypes';
import { Icategory } from '../../types/categoryTypes';
import { Iselect } from '../../types/selectTypes';

import './titleForm.scss'

// /. imports

interface propTypes {
    isEditable: boolean;
    inputTitleValue: string;
    setInputTitleValue: (arg: string) => void;
    navTemplatesData: Inav[];
    setNavTemplatesData: (arg: Inav[]) => void;
    currentNavID: number;
    todosData: Itodo[];
    setTodosData: (arg: Itodo[]) => void;
    setEditableStatus: (arg: boolean) => void;
    categoryTemplatesData: Icategory[];
    setCategoryTemplatesData: (arg: Icategory[]) => void;
    currentCategoryID: number;
    selectTemplatesData: Iselect[];
    setSelectTemplatesData: (arg: Iselect[]) => void;
    currentNavSelectID: number;
}

const TitleForm: React.FC<propTypes> = (props) => {

    const {
        isEditable,
        inputTitleValue,
        setInputTitleValue,
        navTemplatesData,
        setNavTemplatesData,
        currentNavID,
        todosData,
        setTodosData,
        setEditableStatus,
        categoryTemplatesData,
        setCategoryTemplatesData,
        currentCategoryID,
        selectTemplatesData,
        setSelectTemplatesData,
        currentNavSelectID,
    } = props;


    const formSubmitHandler = (e: React.FormEvent): void => {
        e.preventDefault();

        setNavTemplatesData([...navTemplatesData].map(item => { // update text, category in navTemplatesData[]
            if (item.id === currentNavID) {
                return {
                    ...item,
                    text: inputTitleValue,
                    category: inputTitleValue.toLocaleLowerCase().trim()
                };
            }
            return item;
        }));

        setSelectTemplatesData([...selectTemplatesData].map(item => { // update text, value in selectTemplatesData[]
            if (item.id === currentNavSelectID) {
                return {
                    ...item,
                    text: inputTitleValue, // displayed in UI
                    value: inputTitleValue.toLocaleLowerCase().trim() // logic
                };
            }
            return item;
        }));


        
        const currentCategoryFromNav = `#${[...navTemplatesData].find(item => item.id === currentNavID)?.category}`; // return string 'all/college'
        const currentCategoryFromNavSelect = `#${[...selectTemplatesData].find(item => item.id === currentNavSelectID)?.value}`;

        setTodosData([...todosData].map(item => { // update category name of todoData[] items of current category value
            if (item.category.toLocaleLowerCase() === currentCategoryFromNav) {
                return {
                    ...item,
                    category: inputTitleValue ? `#${(inputTitleValue.charAt(0).toUpperCase() + inputTitleValue.slice(1)).trim().replace(/#/gi, '')}` : '',
                };
            }
            if (item.category.toLocaleLowerCase() === currentCategoryFromNavSelect) {
                return {
                    ...item,
                    category: inputTitleValue ? `#${(inputTitleValue.charAt(0).toUpperCase() + inputTitleValue.slice(1)).trim().replace(/#/gi, '')}` : '',
                };
            }
            return item;
        }));


        setCategoryTemplatesData([...categoryTemplatesData].map(item => { // // update text, value in categoryTemplatesData[]
            if (item.id === currentCategoryID) {
                return {
                    ...item,
                    text: inputTitleValue.toLocaleLowerCase().trim(), // displayed in UI
                    value: inputTitleValue.toLocaleLowerCase().trim() // logic
                }
            }
            return item;
        }))

        // disable editing after submit form
        setEditableStatus(false);
    };


    useEffect(() => {
        const keyHandler = (e: KeyboardEvent): void => {
            if (e.code === 'Escape' && isEditable) {
                setEditableStatus(false);
            }
        }

        document.addEventListener('keydown', keyHandler);
        return () => {
            document.removeEventListener('keydown', keyHandler);
        };
    }, [isEditable])

    return (
        <div className="title">
            <form className="title__form" onSubmit={e => inputTitleValue && formSubmitHandler(e)}>
                {inputTitleValue === 'All' ?
                    <h1 className="title__input general">All</h1>
                    :
                    <input
                        className={isEditable ? 'title__input editable' : 'title__input'}
                        type="text"
                        title={`${inputTitleValue} Tasks`}
                        value={inputTitleValue}
                        onChange={e => setInputTitleValue(e.target.value)} />
                }
            </form>
        </div>
    );
};

export default TitleForm;