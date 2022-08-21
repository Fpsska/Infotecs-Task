import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';

import { fetchTodosData } from '../../app/api/fetchTodosData';

import { Itodo } from '../../app/types/todoTypes';
import { Icategory } from '../../app/types/categoryTypes';

import { getRandomArrElement } from '../../app/helpers/getRandomArrElement';

// /. imports

interface todoSliceState {
    todosData: any[];
    categoryTemplatesData: Icategory[];
    isTodosDataLoading: boolean;
    isFormVisible: boolean;
    isTodosDataEmpty: boolean;
    status: string;
    error: any;
    title: string;
    inputTitleValue: string;
    currentCategoryID: number;
    currentTodoID: number;
    filterProp: string
}

// /. interfaces

const initialState: todoSliceState = {
    todosData: [],
    categoryTemplatesData: [
        {
            id: 1,
            name: 'category',
            text: 'groceries',
            value: 'groceries'
        },
        {
            id: 2,
            name: 'category',
            text: 'college',
            value: 'college'
        },
        {
            id: 3,
            name: 'category',
            text: 'payments',
            value: 'payments'
        },
        {
            id: 4,
            name: 'category',
            text: 'none',
            value: ''
        }
    ],
    isTodosDataLoading: true,
    isFormVisible: false,
    isTodosDataEmpty: true,
    status: '',
    error: null,
    title: 'All',
    inputTitleValue: '',
    currentCategoryID: 1,
    currentTodoID: 1,
    filterProp: '#all'
};

// /. initialState


const todoSlice = createSlice({
    name: 'todoSlice',
    initialState,
    reducers: {
        switchTodosDataLoadingStatus(state, action: PayloadAction<{ status: boolean }>) {
            const { status } = action.payload;
            state.isTodosDataLoading = status;
        },
        addNewTodosItem(state, action: PayloadAction<any>) {
            state.todosData.push(action.payload);
        },
        removeTodosItem(state, action: PayloadAction<{ id: number }>) {
            const { id } = action.payload;
            state.todosData = state.todosData.filter(item => item.id !== id);
        },
        findTodosItemByName(state, action: PayloadAction<{value: string}>) { 
            const { value } = action.payload;
            const validTodos = state.todosData.filter(item => RegExp(value.trim(), 'gi').test(item.title))
        },

        setFilterProp(state, action: PayloadAction<{ filterProp: string }>) {
            const { filterProp } = action.payload;
            state.filterProp = filterProp;
        },
        editCurrentTodosDataItem(state, action: PayloadAction<{ id: number, title: string, category: string, status: string }>) {
            const { id, title, category, status } = action.payload;

            const currentTodoItem = state.todosData.find(item => item.id === id);
            if (currentTodoItem) {
                currentTodoItem.title = title;
                currentTodoItem.category = category;
                currentTodoItem.status = status;
                currentTodoItem.editable = false;
            }
        },
        editCategoryOFCurrentTodosDataItem(state, action: PayloadAction<{ categoryProp: string, categoryValue: string }>) {
            const { categoryProp, categoryValue } = action.payload; // //  categoryProp - logic / categoryValue - UI

            const validTodosArray = state.todosData.filter(item => item.category.toLowerCase() === categoryProp)
            if (validTodosArray) {
                validTodosArray.map(item => item.category = categoryValue);
            }
        },
        switchTodosItemEditableStatus(state, action: PayloadAction<{ id: number, status: boolean }>) {
            const { id, status } = action.payload;
            state.todosData.map(item => item.id === id ? item.editable = status : item);
        },
        switchTodosItemCompleteStatus(state, action: PayloadAction<{ id: number, status: boolean }>) {
            const { id, status } = action.payload;

            const currentTodoItem = state.todosData.find(item => item.id === id);
            if (currentTodoItem) {
                currentTodoItem.completed = !status;
            }
        },
        setTitle(state, action: PayloadAction<{ title: string }>) {
            const { title } = action.payload;
            state.title = title;
        },
        setInputTitleValue(state, action: PayloadAction<{ title: string }>) {
            const { title } = action.payload;
            state.inputTitleValue = title;
        },
        setCurrentCategoryID(state, action: PayloadAction<{ id: number }>) {
            const { id } = action.payload;
            state.currentCategoryID = id;
        },
        addNewCategoryItem(state, action: PayloadAction<any>) {
            state.categoryTemplatesData.push(action.payload);
        },
        editCurrentCategoryTemplateItem(state, action: PayloadAction<{ id: number, text: string, value: string }>) {
            const { id, text, value } = action.payload;

            const currentCategoryItem = state.categoryTemplatesData.find(item => item.id === id);
            if (currentCategoryItem) {
                currentCategoryItem.text = text;
                currentCategoryItem.value = value;
            }
        },
        setCurrentTodoID(state, action: PayloadAction<{ id: number }>) {
            const { id } = action.payload;
            state.currentTodoID = id;
        },
        switchFormVisibleStatus(state, action: PayloadAction<{ status: boolean }>) {
            const { status } = action.payload;
            state.isFormVisible = status;
        },
        switchTodosDataEmptyStatus(state, action: PayloadAction<{ status: boolean }>) {
            const { status } = action.payload;
            state.isTodosDataEmpty = status;
        }
    },
    extraReducers: {
        [fetchTodosData.pending.type]: (state) => {
            state.status = 'loading';
        },
        [fetchTodosData.fulfilled.type]: (state, action: PayloadAction<Itodo[]>) => {
            state.todosData = action.payload;
            state.todosData.map(item => {
                item.category = getRandomArrElement(['#Groceries', '#College', '#Payments', '']);
                item.status = getRandomArrElement(['waiting', 'process', 'done', '']);
                item.completed = false;
                item.editable = false;
            });

            console.log('todosData>', state.todosData)
            state.status = 'success';
        },
        [fetchTodosData.rejected.type]: (state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
});

export const {
    switchTodosDataLoadingStatus,
    addNewTodosItem,
    removeTodosItem,
    findTodosItemByName,

    setFilterProp,

    editCurrentTodosDataItem,
    editCategoryOFCurrentTodosDataItem,
    switchTodosItemEditableStatus,
    switchTodosItemCompleteStatus,
    setTitle,
    setInputTitleValue,
    setCurrentCategoryID,
    addNewCategoryItem,
    editCurrentCategoryTemplateItem,
    setCurrentTodoID,
    switchFormVisibleStatus,
    switchTodosDataEmptyStatus
} = todoSlice.actions;

export default todoSlice.reducer;