import { useState } from 'react'
import styles from './todo-list.module.scss'
import cn from 'classnames'
import { AppDispatch } from '@/app/store/store'
import { useDispatch } from 'react-redux'
import { addTodo, changeTodoStatus, TodoType } from '@/app/store/AppParamsSlice'
import { SquarePlus } from 'lucide-react'

type TodoListType = {
    todos?: TodoType[]
}

const TodoList = ({ todos }: TodoListType) => {
    const dispatch = useDispatch<AppDispatch>()
    const [todo, setTodo] = useState<string>('')
    const [isFocused, setIsFocused] = useState<boolean>(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = (e.target.value as string)
        setTodo(rawValue)
    }

    const handleCheckboxChange = (todo: TodoType) => {
        dispatch(changeTodoStatus(todo))
    }

    return (<div className={styles.todo_list}>
        <div className={styles.add_todo}>
            <input
                type="text"
                value={todo}
                autoComplete='off'
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={cn(styles.new_todo, {
                    [styles.focus]: isFocused
                })}
                placeholder="Что нужно сделать?"
                name="new-todo"
                maxLength={50}
            />
            {todo && <SquarePlus className={styles.add_button} onClick={() => {
                dispatch(addTodo({
                    title: todo,
                    status: 'Активная',
                }))
                setTodo('')
                setIsFocused(false)
            }} />}
        </div>
        <div className={styles.list}>
            {todos && todos.map((todo, index) => {
                return <div key={index} className={styles.todo}>
                    <p className={cn({ [styles.line_through]: todo.status === 'Завершена' })}>{todo.title}</p>
                    <div className={styles.status}>
                        <p className={cn({
                            [styles.active]: todo.status === 'Активная',
                            [styles.inactive]: todo.status === 'Завершена'
                        })}>{todo.status}</p>
                        <input
                            className={styles.checkbox}
                            type="checkbox"
                            checked={todo.status === 'Активная' ? false : true}
                            onChange={() => {
                                handleCheckboxChange(todo)
                            }}
                        />
                    </div>
                </div>
            })}
        </div>
    </div>)
}

export default TodoList