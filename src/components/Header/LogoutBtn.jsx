import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth"
import { logout } from "../../store/authSlice"

function LogoutBtn() {

    const dispatch = useDispatch()

    function handleLogout() {
        authService.userLogout()
            .then(() => dispatch(logout()))
            .catch((e) => { console.error(e) })
    }

    return (
        <button className="inline-block py-6 px-2 duration-200 hover:bg-blue-100 rounded-full" onClick={handleLogout}>Logout</button>
    )
}

export default LogoutBtn