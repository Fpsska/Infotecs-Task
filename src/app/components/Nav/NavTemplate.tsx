import React, { useState, useEffect } from 'react';

import { Inav } from '../../types/navTypes';
import { Itodo } from '../../types/todoTypes';

// /. imports

interface propTypes {
    id: number;
    text: string;
    category: string;
    link: string;
    isActive: boolean;
    navTemplatesData: Inav[];
    setNavTemplatesData: (arg: Inav[]) => void;
    todosData: Itodo[];
    setTodosData: (arg: Itodo[]) => void;
    filteredTodosData: Itodo[];
    setFilteredTodosData: (arg: Itodo[]) => void;
    setTitle: (arg: string) => void
}

// /. interfaces

const NavTemplate: React.FC<propTypes> = (props) => {

    const {
        id,
        text,
        category,
        link,
        isActive,
        navTemplatesData,
        setNavTemplatesData,
        todosData,
        setTodosData,
        filteredTodosData,
        setFilteredTodosData,
        setTitle
    } = props;

    const [todoCount, setTodoCount] = useState<number>(0);

    useEffect(() => { // set current todo items count for each category
        const array = todosData.filter(item => item.category.toLocaleLowerCase() === category);
        setTodoCount(array.length);
    }, [todosData]);

    const filterTodoItems = (): void => {
        switch (category) {
            case 'all':
                setNavTemplatesData(navTemplatesData.map(item => item.id === id ? { ...item, isActive: true } : { ...item, isActive: false }));

                setFilteredTodosData(todosData);

                setTitle(text);
                break;
            case 'groceries':
                setNavTemplatesData(navTemplatesData.map(item => item.id === id ? { ...item, isActive: true } : { ...item, isActive: false }));

                setFilteredTodosData([...todosData].filter(item => item.category.toLocaleLowerCase() === category));

                setTitle(text);
                break;
            case 'college':
                setNavTemplatesData([...navTemplatesData].map(item => item.category === category ? { ...item, isActive: true } : { ...item, isActive: false }));

                setFilteredTodosData([...todosData].filter(item => item.category.toLocaleLowerCase() === category));

                setTitle(text);
                break;
            case 'payments':
                setNavTemplatesData([...navTemplatesData].map(item => item.category === category ? { ...item, isActive: true } : { ...item, isActive: false }));

                setFilteredTodosData([...todosData].filter(item => item.category.toLocaleLowerCase() === category));

                setTitle(text);
                break;
            default:
                setNavTemplatesData([...navTemplatesData].map(item => item.category === 'all' ? { ...item, isActive: true } : { ...item, isActive: false }));
                setFilteredTodosData(todosData);
                setTitle('All');
        }
    };

    return (
        <li className="nav__item">
            <a className={isActive ? 'nav__link active' : 'nav__link'}
                href={link}
                onClick={filterTodoItems}
            >
                {text}{' '}({category === 'all' ? todosData.length : todoCount})
            </a>
        </li>
    );
};

export default NavTemplate;