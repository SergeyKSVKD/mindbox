"use client"

import { useDispatch, useSelector } from 'react-redux'
import Header from './header/Header'
import TodoList from './todo-list/TodoList'
import styles from './todos.module.scss'
import { AppDispatch, RootState } from '@/app/store/store'
import { useEffect, useState } from 'react'
import { addTodos } from '@/app/store/AppParamsSlice'
import { LoaderCircle } from 'lucide-react'
import StatusBar from './status-bar/StatusBar'

const Todos = () => {
    const dispatch = useDispatch<AppDispatch>()
    const todos = useSelector((state: RootState) => state.AppState.todos)
    const filter = useSelector((state: RootState) => state.AppState.filter)
    const [isLoading, setIsLoading] = useState(true)
    const [visibleTodos, setVisibleTodos] = useState(todos)

    useEffect(() => {
        const todos = localStorage.getItem('todos')
        if (todos) {
            dispatch(addTodos(JSON.parse(todos)))
        }
        setTimeout(() => { setIsLoading(false) }, 2000)
    }, [])

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    useEffect(() => {
        switch (filter) {
            case 'Все':
                setVisibleTodos(todos)
                break;
            case 'Активные':
                setVisibleTodos(todos.filter(t => t.status === 'Активная'))
                break;
            case 'Завершенные':
                setVisibleTodos(todos.filter(t => t.status === 'Завершена'))
                break;
            default: setVisibleTodos(todos)
        }
    }, [filter, todos])

    return (<div className={styles.todos_container}>
        <Header title='Список задач' />
        {
            !isLoading ?
                <TodoList todos={visibleTodos} /> :
                <div className={styles.loader_wrapper}>
                    <LoaderCircle className={styles.loader} />
                </div>
        }
        <StatusBar todos={todos} />
    </div>)
}

export default Todos