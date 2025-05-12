import { Link } from "react-router-dom"
import AdminProduct from "../components/Main/AdminProduct"
import "../components/Styles/Dashboard.css"

function Dashboard() {
    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard">
                                Products
                            </Link>
                        </li>

                        <li>
                            <Link to="/orders">
                                Orders
                            </Link>
                        </li>

                    </ul>
                </nav>
            </header>

            <div className="dashboardmain">
        
                <AdminProduct />
            </div>
        </div>
    )
}

export default Dashboard