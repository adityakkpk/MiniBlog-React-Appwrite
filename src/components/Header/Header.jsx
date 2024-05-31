import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isHide, setIsHide] = useState(true);

  const handleClick = () => {
    setIsHide(!isHide);
  }

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 bg-gray-900 shadow">
      <Container>
        <nav className="flex relative justify-between items-center">
          <div className="mr-4">
            <Link to="/">
              <Logo width="50px" />
            </Link>
          </div>
          <ul className="md:flex ml-auto gap-1 hidden">
            {navItems.map( (item) => 
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => {navigate(item.slug)}}
                    className="inline-bock px-6 py-2 duration-200 hover:text-blue-400 rounded-full"
                  >{item.name}</button>
                </li>
              ) : null
            )}
            { authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          <button onClick={handleClick} className="md:hidden">
            {isHide ? <img src="/menu.svg" alt="menu-icon" /> : <img src="/x.svg" alt="x-icon" />}
          </button>
          {isHide ? "" : 
            <ul className="absolute z-50 flex flex-col w-40 gap-1 md:hidden top-16 right-2 border rounded-xl duration-200 p-1 bg-transparent backdrop-blur-xl">
              {navItems.map( (item) => 
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => {navigate(item.slug)}}
                      className="inline-bock px-6 py-2 duration-200 hover:text-blue-400 rounded-xl hover:bg-gray-600 w-full"
                    >{item.name}</button>
                  </li>
                ) : null
              )}
              { authStatus && (
                <li className="hover:bg-gray-600 rounded-xl flex justify-center w-full">
                  <LogoutBtn />
                </li>
              )}
            </ul>
          }
        </nav>
      </Container>
    </header>
  );
}

export default Header;
