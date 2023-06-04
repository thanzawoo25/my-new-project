import { ReactNode } from "react";
import NavBar from "./NavBar"


interface Props{
    children:ReactNode
}

const Layout = ({children}:Props) => {
    return (
        <div>
            <NavBar />
            {children}
        </div>
    )
}

export default Layout;