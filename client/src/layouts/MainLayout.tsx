import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'
import { SidebarProvider } from '../context/SidebarContext'
import Navbar from '../components/Navbar'
import { AuthProvider } from "../context/AuthContext";

function MainLayout() {
    return (
        <AuthProvider>
            <SidebarProvider>
                <div className="flex bg-gray-300 gap-0.5">
                    <SideBar />
                    <main className="h-screen flex-1 overflow-auto bg-gray-50">
                        <nav className='h-[10vh]'>
                            < Navbar />
                        </nav>
                        <section className='h-[90vh] overflow-auto'>
                            <Outlet />
                        </section>
                    </main>
                </div>
            </SidebarProvider>
        </AuthProvider>
    )
}

export default MainLayout
