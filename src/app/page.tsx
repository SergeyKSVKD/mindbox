import "./globals.scss"
import Todos from "./components/todos/Todos";
import StoreLayout from "./store/StoreLayout";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (<>
    <StoreLayout>
      <Todos />
    </StoreLayout>
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </>
  )
}
