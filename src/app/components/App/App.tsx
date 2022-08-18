import React, { useState, useEffect, useContext } from 'react';

import { MyContext } from '../Layout/Layout';

import { useAreaHandler } from '../../hooks/useAreaHandler';

import Nav from '../Nav/Nav';
import SelectMenu from '../SelectMenu/SelectMenu';
import Form from '../Form/Form';
import TodoList from '../Todo/TodoList';
import Preloader from '../Preloader/Preloader';
import Burger from '../Burger/Burger';
import Modal from '../Modal/Modal';
import CategoryForm from '../CategoryForm/CategoryForm';

import '../../assets/styles/_styles.scss';
import '../../assets/styles/_media.scss';
import './App.css';


// /. imports


const App: React.FC = () => {

  const {
    todosData,
    setTodosData,
    filteredTodosData,
    setFilteredTodosData,
    isDataTLoading,
    error,
    title,
    setTitle
  } = useContext(MyContext);

  const [isDataEmpty, setDataEmptyStatus] = useState<boolean>(true);

  const [isBurgerVisible, setBurgerVisibleStatus] = useState<boolean>(false);

  const [currentTodoID, setCurrentTodoID] = useState<number>(todosData[0]?.id);

  const { refEl, isVisible, setVisibleStatus } = useAreaHandler({ initialStatus: false });


  useEffect(() => {
    todosData.length === 0 ? setDataEmptyStatus(true) : setDataEmptyStatus(false); // check length of todosData[] for handle display alternative content
    // console.log('todosData', todosData)
  }, [todosData]);

  useEffect(() => {
    filteredTodosData.length === 0 ? setDataEmptyStatus(true) : setDataEmptyStatus(false);
    // console.log('!!! filteredTodosData', filteredTodosData)
  }, [filteredTodosData]);

  useEffect(() => { // remove editable css-class when modal is hidden
    !isVisible && setTodosData([...todosData].map(item => item.id === currentTodoID ? { ...item, editable: false } : item));
  }, [isVisible]);


  const openBurger = (e: React.SyntheticEvent): void => {
    e.stopPropagation();  // for correct work of burger hide/show logic
    setBurgerVisibleStatus(true);
  };

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
              error={error}
            />
            <Nav />
            <div className="page__category-form"> <CategoryForm /> </div>
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
              <h1 className="page__title" title={`${title} Tasks`}>{title} Tasks</h1>

              <Form
                role={'search'}
                text={'Find a task'}
                todosData={todosData}
                setTodosData={setTodosData}
                setFilteredTodosData={setFilteredTodosData}
                isDataTLoading={isDataTLoading}
                error={error}
              />
            </div>

            <div className="page__list">
              {isDataTLoading ?
                <div className="page__preloader"><Preloader /></div> :
                error ?
                  <h2 className="page__message">Error: {error}</h2> :
                  isDataEmpty ?
                    <>
                      {
                        title === 'All' ?
                          <h2 className="page__message">Task list is empty</h2>
                          :
                          <h2 className="page__message">{title} task list is empty</h2>
                      }
                    </>
                    :
                    <TodoList
                      todosData={todosData}
                      setTodosData={setTodosData}
                      filteredTodosData={filteredTodosData}
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
                setFilteredTodosData={setFilteredTodosData}
                isDataTLoading={isDataTLoading}
                error={error}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
