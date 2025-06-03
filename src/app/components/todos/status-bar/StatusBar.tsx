import { ActiveFilterType, changeActiveFilter, deleteCompletedTodo, TodoType } from '@/app/store/AppParamsSlice'
import styles from './status-bar.module.scss'
import cn from 'classnames'
import { AppDispatch, RootState } from '@/app/store/store'
import { useDispatch, useSelector } from 'react-redux'
import pluralize from '@/app/utils/pluralize'
import ConfirmDelete from '../../confirmed/ConfirmDelete'
import { toast } from 'react-toastify'
import { toastOption } from '../../confirmed/toasts-option'

type TodoListType = {
    todos: TodoType[]
}

const StatusBar = ({ todos }: TodoListType) => {
    const dispatch = useDispatch<AppDispatch>()
    const filter = useSelector((state: RootState) => state.AppState.filter)
    const buttons: ActiveFilterType[] = ['Все', 'Активные', 'Завершенные']
    const forms = ["задача", "задачи", "задач"]
    const count = todos.reduce((acc, todo) => {
        return todo.status === 'Активная' ? acc + 1 : acc;
    }, 0)
    const completed = todos.filter(todo => todo.status === 'Завершена')

    return (<div className={styles.status_bar}>
        <div className={styles.top_bar}>
            <p>{`Незавершенных: ${pluralize(count, forms)}`}</p>
            <div className={styles.filter}>
                {buttons.map((button) => {
                    return (<button
                        key={button}
                        className={cn(styles.filter_button, {
                            [styles.active]: filter === button
                        })}
                        onClick={() => dispatch(changeActiveFilter(button))}
                    >
                        {button}
                    </button>)
                })}
            </div>
        </div>
        <div className={styles.bottom_bar}>
            <button
                className={cn({
                    [styles.disabled]: completed.length === 0
                })}
                onClick={() => ConfirmDelete(() => {
                    dispatch(deleteCompletedTodo())
                    toast.success("Завершенные задачи удалены!", toastOption)
                }, 'Вы уверены, что хотите удалить завершенные задачи?')}
                disabled={completed.length === 0}
            >Удалить завершенные задачи</button>
        </div>
    </div>
    )
}

export default StatusBar