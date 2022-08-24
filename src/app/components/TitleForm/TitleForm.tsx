import React, { useState, useEffect } from 'react';

import { useAppDispatch } from '../../../store/hooks';

import {
    editCurrentCategoryTemplateItem,
    editCategoryOFCurrentTodosDataItem,
    setInputTitleValue,
    setFilterProp
} from '../../../store/slices/todoSlice';
import {
    editCurrentNavTemplateItem,
    editCurrentNavSelectTemplateItem
} from '../../../store/slices/navSlice';

import './titleForm.scss';

// /. imports

interface propTypes {
    refEl: any;
    isEditable: boolean;
    inputTitleValue: string;
    setEditableStatus: (arg: boolean) => void;
    currentNavID: number;
    currentNavSelectID: number;
    currentCategoryID: number;
    filterProp: string;
    navTemplatesData: any[];
    selectTemplatesData: any[]
}

const TitleForm: React.FC<propTypes> = (props) => {

    const {
        refEl,
        isEditable,
        inputTitleValue,
        setEditableStatus,
        currentNavID,
        currentNavSelectID,
        currentCategoryID,
        filterProp,
        navTemplatesData,
        selectTemplatesData
    } = props;

    const [inputValue, setInputValue] = useState<string>(inputTitleValue);

    const dispatch = useAppDispatch();

    useEffect(() => {  // update inputValue
        setInputValue(inputTitleValue);
    }, [inputTitleValue]);

    useEffect(() => { 
        !isEditable && setInputValue(inputTitleValue); // exit from edit without save when form is not submitted
        !isEditable && !inputValue && setInputValue(inputTitleValue); // set prev value when save without value
    }, [isEditable, inputTitleValue, inputValue]);


    const formSubmitHandler = (e: React.FormEvent): void => {
        e.preventDefault();
        console.log('SUBMITTED')

        dispatch(setFilterProp({ filterProp: inputValue.toLowerCase().trim() })); // update filterProp
        dispatch(setInputTitleValue({ title: inputValue.trim() })); // update title__form text content value

        dispatch(editCurrentNavTemplateItem({  // update text, category in navTemplatesData[]
            id: [...navTemplatesData].find(item => item.category === filterProp).id,
            text: inputValue.trim(),
            category: inputValue.toLocaleLowerCase().trim()
        }));

        dispatch(editCurrentNavSelectTemplateItem({ // update text, value in selectTemplatesData[]
            id: [...selectTemplatesData].find(item => item.value.toLowerCase() === filterProp).id,
            text: inputValue.trim(), // displayed in UI
            value: inputValue.trim() // logic
        }));

        dispatch(editCurrentCategoryTemplateItem({  // update text, value in categoryTemplatesData[] / Modal.tsx
            id: currentCategoryID,
            text: inputValue.toLocaleLowerCase().trim(), // displayed in UI
            value: inputValue.toLocaleLowerCase().trim() // logic
        }));

        dispatch(editCategoryOFCurrentTodosDataItem({ // update category value of each todosData[] item who prev category is equal prev title value
            categoryProp: filterProp,
            categoryValue: inputValue ? inputValue.toLocaleLowerCase().trim() : ''
        }));

        // disable editing after submit form
        setEditableStatus(false);
    };

    return (
        <div className="title">
            <form className="title__form" onSubmit={e => inputValue && formSubmitHandler(e)}>
                {inputValue === 'All' ?
                    <h1 className="title__input general">All</h1>
                    :
                    <input
                        ref={refEl}
                        className={isEditable ? 'title__input editable' : 'title__input'}
                        type="text"
                        title={`${inputValue} Tasks`}
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                    />
                }
            </form>
        </div>
    );
};

export default TitleForm;