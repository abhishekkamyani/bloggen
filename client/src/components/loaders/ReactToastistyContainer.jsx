import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ReactToastistyContainer() {
    return (
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="colored"
            transition:Bounce
        />
    )
}