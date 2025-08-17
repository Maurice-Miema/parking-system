import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'
import { SidebarProvider } from '../context/SidebarContext'

function MainLayout() {
    return (
        <SidebarProvider>
            <div className="flex bg-gray-300 gap-0.5">
                <SideBar />
                <main className="h-screen flex-1 overflow-auto bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </SidebarProvider>
    )
}

export default MainLayout
