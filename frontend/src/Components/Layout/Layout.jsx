import { Outlet } from 'react-router-dom'
import { Navbar, Footer } from '../'


function Layout() {

    return (
        <>
            <Navbar />
            <div className='px-4 md:px-16 bg-white'>
                <Outlet />
            </div>
            <Footer />

        </>
    )
}

export default Layout