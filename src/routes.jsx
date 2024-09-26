// src/AppRouter.js
import { Routes, Route, Navigate } from "react-router-dom"
import SignUp from "./pages/SignUp"
import LogIn from "./pages/LogIn"
import Dashboard from "./pages/Dashboard"
import CheckEmail from "./pages/CheckEmail"
import Reset from "./pages/Reset"
import PageNotFound from "./pages/PageNotFound"
import DashboardCalendar from "./pages/DashboardCalendar"
import Invoice from "./pages/Invoice"
import Product from "./pages/Product"
import EditInvoice from "./pages/EditInvoice"
import InvoiceDetail from "./pages/InvoiceDetail"
import CreateInvoice from "./pages/CreateInvoice"
import CreateProduct from "./pages/CreateProduct"
import Layout from "./components/layout/Layout"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { authenticateUser } from "./redux/slices/authSlice"

function ProtectedRoute({ WrappedComponent, redirectTo }) {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

    useEffect(() => {
        if (isAuthenticated === null) {
            dispatch(authenticateUser())
        }
    }, [isAuthenticated])

    if (isAuthenticated === false) {
        return <Navigate to="/" replace />
    }
    if (redirectTo && isAuthenticated) {
        return <Navigate to={redirectTo} replace />
    }

    return WrappedComponent
}
// function HandleLogin({ WrappedComponent }) {
//     const dispatch = useDispatch()
//     const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
//     if (redirectTo && isAuthenticated) {
//         return <Navigate to={redirectTo} replace />
//     }
//     return WrappedComponent
// }
function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/checkemail" element={<CheckEmail />} />
            <Route path="/reset/:id" element={<Reset />} />
            <Route element={<Layout />}>
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute WrappedComponent={<Dashboard />} />
                    }
                />
                <Route
                    path="/dashboard/calendar"
                    element={
                        <ProtectedRoute
                            WrappedComponent={<DashboardCalendar />}
                        />
                    }
                />
                <Route
                    path="/dashboard/Create"
                    element={
                        <ProtectedRoute WrappedComponent={<CreateInvoice />} />
                    }
                />
                <Route
                    path="/dashboard/List"
                    element={<ProtectedRoute WrappedComponent={<Invoice />} />}
                />
                 <Route
                    path="/dashboard/product"
                    element={<ProtectedRoute WrappedComponent={<Product />} />}
                />
                <Route
                    path="/dashboard/product/create"
                    element={<ProtectedRoute WrappedComponent={<CreateProduct />} />}
                />
                <Route
                    path="/dashboard/List/edit/:id"
                    element={
                        <ProtectedRoute WrappedComponent={<EditInvoice />} />
                    }
                />

                <Route
                    path="/dashboard/List/detail/:id"
                    element={
                        <ProtectedRoute WrappedComponent={<InvoiceDetail />} />
                    }
                />
                <Route
                    path="/login"
                    element={
                        <ProtectedRoute
                            WrappedComponent={<Dashboard />}
                            redirectTo="/dashboard"
                        />
                    }
                />
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}

export default AppRouter
