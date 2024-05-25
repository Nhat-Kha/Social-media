import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/AuthAction";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogOut = () => {
    dispatch(logout());
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  console.log("user id:", user);

  return (
    <>
      <nav className="bg-white w-full flex shadow justify-between items-center px-8 h-20 fixed top-0 left-0 z-50">
        <div className="flex items-center gap-3">
          <div className="inline-flex">
            <a className="_o6689fn" href="/">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="css-i6dzq1"
              >
                <circle cx="12" cy="5" r="3"></circle>
                <line x1="12" y1="22" x2="12" y2="8"></line>
                <path d="M5 12H2a10 10 0 0 0 20 0h-3"></path>
              </svg>
            </a>
          </div>

          {user !== null ? (
            <div className="relative hidden sm:block flex-shrink flex-grow-0">
              <input
                type="text"
                className="bg-purple-white bg-gray-100 rounded-lg border-0 p-3 w-full min-w-[310px]"
                placeholder="Search somthing..."
              />
              <div className="absolute top-0 right-0 p-4 pr-3 text-purple-lighter">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="flex-initial">
          <div className="flex justify-end items-center relative">
            <div className="flex mr-4 items-center">
              <div className="block relative">
                <button
                  type="button"
                  className="inline-block py-2 px-3 hover:bg-gray-200 rounded-full relative"
                >
                  <div className="flex items-center h-5">
                    <div className="_xpkakx">
                      <svg
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        className="block h-[16px] w-[16px] fill-current"
                      >
                        <path d="m8.002.25a7.77 7.77 0 0 1 7.748 7.776 7.75 7.75 0 0 1 -7.521 7.72l-.246.004a7.75 7.75 0 0 1 -7.73-7.513l-.003-.245a7.75 7.75 0 0 1 7.752-7.742zm1.949 8.5h-3.903c.155 2.897 1.176 5.343 1.886 5.493l.068.007c.68-.002 1.72-2.365 1.932-5.23zm4.255 0h-2.752c-.091 1.96-.53 3.783-1.188 5.076a6.257 6.257 0 0 0 3.905-4.829zm-9.661 0h-2.75a6.257 6.257 0 0 0 3.934 5.075c-.615-1.208-1.036-2.875-1.162-4.686l-.022-.39zm1.188-6.576-.115.046a6.257 6.257 0 0 0 -3.823 5.03h2.75c.085-1.83.471-3.54 1.059-4.81zm2.262-.424c-.702.002-1.784 2.512-1.947 5.5h3.904c-.156-2.903-1.178-5.343-1.892-5.494l-.065-.007zm2.28.432.023.05c.643 1.288 1.069 3.084 1.157 5.018h2.748a6.275 6.275 0 0 0 -3.929-5.068z"></path>
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {user !== null ? (
              <div className="block">
                <div className="inline relative">
                  <button
                    type="button"
                    className="inline-flex items-center relative px-2 border rounded-full hover:shadow-lg"
                    onClick={toggleDropdown}
                  >
                    <div className="pl-1">
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        className="block fill-none h-4 w-4 stroke-current stroke-[3] overflow-visible"
                      >
                        <g fill="none" fillRule="nonzero">
                          <path d="m2 16h28"></path>
                          <path d="m2 24h28"></path>
                          <path d="m2 8h28"></path>
                        </g>
                      </svg>
                    </div>

                    <div className="block flex-grow-0 flex-shrink-0 h-10 w-12 pl-5">
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        className="block h-full w-full fill-current"
                      >
                        <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
                      </svg>
                    </div>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                      <a
                        href={`/profile/${user.user._id}`}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      >
                        Profile
                      </a>
                      <a
                        href="/settings"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      >
                        Settings
                      </a>
                      <a
                        href="#!"
                        onClick={handleLogOut}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 hover:cursor-pointer"
                      >
                        Logout
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
