import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth"
import { logout } from "../../store/authSlice"
import { useNavigate } from "react-router-dom"

function LogoutBtn() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleLogout() {
        authService.userLogout()
            .then(() => dispatch(logout()))
            .catch((e) => { console.error(e) })
            .finally(() => navigate(0))
    }

    return (
        <button className="text-xs md:text-base px-2 py-1 md:px-4 md:py-2 duration-200 hover:bg-gray-700 rounded-full cursor-pointer" onClick={handleLogout}>Logout</button>
    )
}

export default LogoutBtn