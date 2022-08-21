import React from 'react';

import { useAppDispatch } from '../../../store/hooks';

import {
    setCurrentCategoryID,
    switchTodosItemEditableStatus,
    setTitle
} from '../../../store/slices/todoSlice';
import { setCurrentNavSelectID } from '../../../store/slices/navSlice';

import { Iselect } from '../../types/selectTypes';

import SelectTemplate from './SelectTemplate';

import './select.scss';

// /. imports

interface propTypes {
    selectTemplatesData: Iselect[];
    currentTodoID: number;
    isDataTLoading: boolean;
    error: any
}

// /. interfaces

const SelectMenu: React.FC<propTypes> = (props) => {

    const {
        selectTemplatesData,
        currentTodoID,
        isDataTLoading,
        error
    } = props;

    const dispatch = useAppDispatch();

    const selectMenuHandler = (value: string): void => {
        switch (value) {
            case 'all':
                dispatch(setTitle({ title: 'All' }));
                dispatch(switchTodosItemEditableStatus({ id: currentTodoID, status: false }));

                // dispatch(setCurrentNavSelectID([...selectTemplatesData].find(item => item.value === value)?.id));
                // dispatch(setCurrentCategoryID([...selectTemplatesData].find(item => item.value === value)?.id));
                break;
            case value:
                dispatch(setTitle({ title: value.charAt(0).toUpperCase() + value.slice(1) }));
                dispatch(switchTodosItemEditableStatus({ id: currentTodoID, status: false }));

                // dispatch(setCurrentNavSelectID([...selectTemplatesData].find(item => item.value === value)?.id));
                // dispatch(setCurrentCategoryID([...selectTemplatesData].find(item => item.value === value)?.id));
                break;
            default:
                dispatch(setTitle({ title: 'All' }));
                dispatch(switchTodosItemEditableStatus({ id: currentTodoID, status: false }));

            // dispatch(setCurrentNavSelectID([...selectTemplatesData].find(item => item.value === value)?.id));
            // dispatch(setCurrentCategoryID([...selectTemplatesData].find(item => item.value === value)?.id));
        };
    };

    return (
        <select className="nav-select"
            onChange={e => !isDataTLoading && !error && selectMenuHandler(e.target.value)}
            defaultValue={selectTemplatesData[0].value}
            disabled={isDataTLoading || error}
        >
            {selectTemplatesData.map((item: Iselect) => {
                return (
                    <SelectTemplate
                        key={item.id}
                        text={item.text}
                        value={item.value}
                    />
                );
            })}
        </select>
    );
};

export default SelectMenu;