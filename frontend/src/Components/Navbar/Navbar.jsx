import React from 'react'
import { NavLink } from 'react-router-dom';
import MyButton from '../MyButton/MyButton';
import mainLogo from "../../assets/Logos/main-logo.webp"
function Navbar() {

    const navbarItems = [
        {
            id: 1,
            title: "Home",
            route: "/"
        },
        {
            id: 2,
            title: "Free Courses",
            route: "/free-courses"
        },
        {
            id: 3,
            title: "Blogs",
            route: "/blogs"
        },
        {
            id: 4,
            title: "Contact Us",
            route: "/contact-us"
        }
    ];




    return (
        <nav className='flex justify-around bg-darkBlue text-white
         py-6 md:py-2 md:min-h-[16vh] items-center'>

            <div className="logo w-[18vw] md:w-[8vw] p-0 m-0">
                <NavLink to="/">
                    <img className='w-full scale-150' src={mainLogo} alt="" />
                </NavLink>
            </div>


            {/* Middle of Navbar on desktop */}
            <ul className='hidden md:flex justify-evenly'>
                {navbarItems.map((navItem) => (
                    <li 
                    className='mx-8 text-xl'
                    key={navItem.id}>
                        <NavLink to={navItem.route}>
                            {navItem.title}
                        </NavLink>
                    </li>
                ))}
            </ul>


            {/* Right Section of Navbar */}
            <div className='hidden md:flex'>
                <NavLink to={"/login"}>
                    <MyButton
                        children='Login'
                    />
                </NavLink>

                <NavLink to={"/signup"}>
                    <MyButton
                        children='Signup'
                        className='ml-4'
                    />
                </NavLink>
            </div>

        </nav>
    )
}

export default Navbar