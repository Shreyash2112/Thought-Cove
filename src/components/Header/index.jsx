import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { Logo, Container } from "../index"
import LogoutBtn from "./LogoutBtn"

function Header() {

    const authStatus = useSelector((state) => state.auth.status)

    const navigate = useNavigate()

    const navItems = [
        {
            name: "Home",
            slug: '/',
            active: true
        },
        {
            name: "Login",
            slug: '/login',
            active: !authStatus
        },
        {
            name: "Signup",
            slug: '/signup',
            active: !authStatus
        },
        {
            name: "All posts",
            slug: '/all-posts',
            active: authStatus
        },
        {
            name: "Add post",
            slug: '/add-post',
            active: authStatus
        }
    ]

    function handleClick(path) {
        return () => {
            navigate(path)
        }
    }

    return (
        <header className="z-50 fixed top-0 w-full py-2 bg-header shadow">
            <Container>
                <nav className="flex items-center justify-between">
                    <div className="pr-4">
                        <Link to="/">
                            <Logo width="150px" />
                        </Link>
                    </div>
                    <ul className="flex w-md items-center justify-between">
                        {navItems.map((item) => (
                            item.active ? (
                                <li key={item.slug}>
                                    <button
                                        onClick={handleClick(item.slug)}
                                        className="text-xs md:text-base px-2 py-1 md:px-4 md:py-2 duration-200 hover:bg-gray-700 rounded-full cursor-pointer"
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        ))}
                        <li>
                            {authStatus && <LogoutBtn />}
                        </li>
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header