import React, { useState, useEffect } from 'react';

import { Itodo } from '../../types/todoTypes';

import { useFetchTodosData } from '../../api/useFetchTodosData';
import { useAreaHandler } from '../../hooks/useAreaHandler';

import Nav from '../Nav/Nav';
import SelectMenu from '../SelectMenu/SelectMenu';
import Form from '../Form/Form';
import TodoList from '../Todo/TodoList';
import Preloader from '../Preloader/Preloader';
import Burger from '../Burger/Burger';
import Modal from '../Modal/Modal';

import '../../assets/styles/_styles.scss';
import '../../assets/styles/_media.scss';
import './App.css';

// /. imports


const App: React.FC = () => {

  // give number argument for define limit of tetched todo items (5 as default)
  const { todosData, setTodosData, isDataTLoading, fetchTodosData } = useFetchTodosData(5);


  const [filteredTodosData, setFilteredTodosData] = useState<Itodo[]>([]);

  const [isDataEmpty, setDataEmtyStatus] = useState<boolean>(true);

  const [isBurgerVisible, setBurgerVisibleStatus] = useState<boolean>(false);

  const [title, setTitle] = useState<string>('All');
  const [currentTodoID, setCurrentTodoID] = useState<number>(todosData[0]?.id);

  const { refEl, isVisible, setVisibleStatus } = useAreaHandler({ initialStatus: false });


  const openBurger = (e: React.SyntheticEvent): void => {
    e.stopPropagation();  // for correct work of burger hide/show logic
    setBurgerVisibleStatus(true);
  };

  useEffect(() => { // call at initial render
    fetchTodosData();
  }, []);

  useEffect(() => {
    todosData.length === 0 ? setDataEmtyStatus(true) : setDataEmtyStatus(false); // check length of todosData[] for handle display alternative content
    setFilteredTodosData(todosData);
  }, [todosData]);

  useEffect(() => {
    filteredTodosData.length === 0 ? setDataEmtyStatus(true) : setDataEmtyStatus(false);
    // console.log('filteredTodosData', filteredTodosData)
  }, [filteredTodosData]);

  useEffect(() => { // remove editable css-class when modal is hidden
    !isVisible && setTodosData([...todosData].map(item => item.id === currentTodoID ? { ...item, editable: false } : item));
  }, [isVisible]);

  return (
    <div className="App">
      <div className="page">

        <div className="page__wrapper">

          <div className="page__burger" ref={refEl}>
            <Burger
              isBurgerVisible={isBurgerVisible}
              setBurgerVisibleStatus={setBurgerVisibleStatus}
            />
          </div>

          <div className="page__modal" ref={refEl}>
            {isVisible &&
              <Modal
                todosData={todosData}
                setTodosData={setTodosData}
                setVisibleStatus={setVisibleStatus}
                currentTodoID={currentTodoID}
              />
            }
          </div>

          <div className="page__nav">
            <SelectMenu
              todosData={todosData}
              setFilteredTodosData={setFilteredTodosData}
              setTitle={setTitle}
              isDataTLoading={isDataTLoading}
            />
            <Nav
              todosData={todosData}
              setTodosData={setTodosData}
              filteredTodosData={filteredTodosData}
              setFilteredTodosData={setFilteredTodosData}
              setTitle={setTitle}
              isDataTLoading={isDataTLoading}
            />
          </div>
          <div className="page__content">

            {!isBurgerVisible &&
              <button className="page__button" onClick={(e) => openBurger(e)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_8368_6965)">
                    <path d="M16.0002 5H0.000244141V4H16.0002V5ZM16.0002 13H0.000244141V12H16.0002V13ZM16.0002 8.99218H0.000244141V8H16.0002V8.99218Z" fill="" />
                  </g>
                  <defs>
                    <clipPath id="clip0_8368_6965">
                      <rect width="16" height="16" fill="white" transform="translate(0.000244141)" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            }

            <div className="page__header">
              <h1 className="page__title">{title} Tasks</h1>

              <Form
                role={'search'}
                text={'Find a task'}
                todosData={todosData}
                setFilteredTodosData={setFilteredTodosData}
                isDataTLoading={isDataTLoading}
              />
            </div>

            <div className="page__list">
              {isDataTLoading ?
                <div className="page__preloader"><Preloader /></div> :
                isDataEmpty ?
                  <h2 className="page__title page__title--empty">no matches</h2> :
                  <TodoList
                    todosData={todosData}
                    setTodosData={setTodosData}
                    filteredTodosData={filteredTodosData}
                    setFilteredTodosData={setFilteredTodosData}
                    setVisibleStatus={setVisibleStatus}
                    setCurrentTodoID={setCurrentTodoID}
                  />
              }
            </div>

            <div className="page__footer">
              <Form
                role={'add'}
                text={'Add a new task inside'}
                todosData={todosData}
                setTodosData={setTodosData}
                isDataTLoading={isDataTLoading}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
