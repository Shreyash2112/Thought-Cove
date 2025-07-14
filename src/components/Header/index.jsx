import { useSelector } from "react-redux"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { Logo, Container, LogoutBtn } from "../index"

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
        <header className="py-3 bg-gray-500 shadow">
            <Container>
                <nav className="flex">
                    <div className="pr-4">
                        <Link to="/">
                            <Logo width="100px" />
                        </Link>
                    </div>
                    <ul className="flex ml-auto">
                        {navItems.map((item) => (
                            item.active ? (
                                <li key={item.slug}>
                                    <button
                                        onClick={handleClick(item.slug)}
                                        className="inline-block px=6 py-2 duration-200 hover:bg-blue-200 rounded-full"
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