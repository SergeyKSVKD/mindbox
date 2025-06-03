import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { produce } from 'immer'

type TodoStatusType = 'Активная' | 'Завершена'

export type TodoType = {
    status: TodoStatusType,
    title: string
}

export type ActiveFilterType = 'Все' | 'Активные' | 'Завершенные'

export interface AppI {
    todos: TodoType[],
    filter: ActiveFilterType
}

const initialState: AppI = {
    todos: [],
    filter: 'Все',
}

const AppParamsSlice = createSlice({
    name: '@app',
    initialState,
    reducers: {
        addTodos: (state, action: PayloadAction<TodoType[]>) => {
            state.todos = [...action.payload]
        },
        addTodo: (state, action: PayloadAction<TodoType>) => {
            state.todos = [...state.todos, action.payload]
        },
        changeTodoStatus: produce((state, action: PayloadAction<TodoType>) => {
            state.todos = state.todos.map((todo: TodoType) => {
                if (todo.title === action.payload.title) {
                    return {
                        ...todo,
                        status: todo.status === 'Активная' ? 'Завершена' : 'Активная',
                    };
                }
                return todo;
            })
        }),
        deleteCompletedTodo: produce((state) => {
            state.todos = state.todos.filter((todo: TodoType) => {
                if (todo.status !== 'Завершена') {
                    return todo
                }
            })
        }),
        changeActiveFilter: (state, action: PayloadAction<ActiveFilterType>) => {
            state.filter = action.payload
        }
    },
})

export const AppParamsReducer = AppParamsSlice.reducer
export const {
    addTodos,
    addTodo,
    changeTodoStatus,
    deleteCompletedTodo,
    changeActiveFilter,
} = AppParamsSlice.actions