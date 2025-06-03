import { toast } from 'react-toastify'
import styles from './confirmed.module.scss'

const ConfirmDelete = (handleDelete: any, text: string) => {
    toast(
        <div className={styles.confirmed}>
            <p className={styles.text}>{text}</p>
            <div>
                <button
                    onClick={() => {
                        toast.dismiss()
                        handleDelete()
                    }}
                    className={styles.yes}
                >
                    Да
                </button>
                <button
                    onClick={() => toast.dismiss()}
                    className={styles.no}
                >
                    Отмена
                </button>
            </div>
        </div>,
        {
            position: 'top-center',
            autoClose: false,
            closeButton: false,
            draggable: true,
            style: {
                width: '350px',
                height: '200px',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--light-primary)',
            }
        }
    )
}

export default ConfirmDelete