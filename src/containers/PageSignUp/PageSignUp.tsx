import React, { FC, FormEvent, Fragment, useEffect, useState } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link } from "react-router-dom";
import axios, { isCancel, AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import tokenHandler from "utils/tokenHandler";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import PageLogin from "containers/PageLogin/PageLogin";

export interface PageSignUpProps {
  className?: string;
  callBack?: () => void;
  openModal?: boolean;
}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageSignUp: FC<PageSignUpProps> = ({
  className = "",
  callBack,
  openModal = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    let email = e.target[0].value;
    let password = e.target[1].value;
    axios
      .post(`${process.env.REACT_APP_API_DOMAIN}/api/user/signup`, {
        email,
        password,
      })
      .then((response) => {
        axios
          .post(`${process.env.REACT_APP_API_DOMAIN}/api/user/login`, {
            email,
            password,
          })
          .then((response) => {
            setIsLoading(false);
            tokenHandler.setToCookie("bint", response.data.token);
            callBack ? callBack() : navigate("/");
            // window.location.reload();
          })
          .catch((err) => {
            setIsLoading(false);
            toast.error("Something went wrong!", {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("Something went wrong!", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
  const [loginState, setLoginState] = useState({
    isStateFinalized: false,
    isLoggedIn: false,
    isAdmin: false,
  });

  useEffect(() => {
    let token = tokenHandler.searchInCookie("bint");
    if (token) {
      let decoded = tokenHandler.jwtDecode(token).payload;
      tokenHandler.isTokenValid(decoded.exp) && navigate("/account");

      setLoginState({
        isStateFinalized: true,
        isLoggedIn: tokenHandler.isTokenValid(decoded.exp),
        isAdmin: ["admin"].includes(decoded.role.toLowerCase()),
      });
    }
  }, [loginState.isStateFinalized]);
  const [loginModal, setLoginModal] = useState(false);
  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Sign up || Booking React Template</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Signup
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <img
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <form
            className="grid grid-cols-1 gap-6"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input type="password" className="mt-1" />
            </label>
            <ButtonPrimary type="submit" loading={isLoading}>
              Continue
            </ButtonPrimary>
          </form>

          {/* ==== */}
          {openModal ? (
            <span className="block text-center text-neutral-700 dark:text-neutral-300">
              Already have an account? {` `}
              <span
                className="cursor-pointer"
                onClick={() => {
                  // callBack && callBack();
                  setLoginModal(true);
                }}
              >
                Sign in
              </span>
            </span>
          ) : (
            <span className="block text-center text-neutral-700 dark:text-neutral-300">
              Already have an account? {` `}
              <Link to="/login">Sign in</Link>
            </span>
          )}
        </div>
      </div>
      <Transition appear show={loginModal} as={Fragment}>
        <Dialog
          as="div"
          className="HeroSearchFormMobile__Dialog relative z-50"
          onClose={() => setLoginModal(false)}
        >
          <div className="fixed inset-0 bg-neutral-100 dark:bg-neutral-900">
            <div className="flex h-full">
              <Transition.Child
                as={Fragment}
                enter="ease-out transition-transform"
                enterFrom="opacity-0 translate-y-52"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in transition-transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-52"
              >
                <Dialog.Panel className="relative h-full overflow-hidden flex-1 flex flex-col justify-between ">
                  <>
                    <div className="absolute left-4 top-4">
                      <button
                        className="focus:outline-none focus:ring-0"
                        onClick={() => setLoginModal(false)}
                      >
                        <XMarkIcon className="w-5 h-5 text-black dark:text-white" />
                      </button>
                    </div>
                    <PageLogin
                      openInModal={true}
                      callBack={() => setLoginModal(false)}
                    />
                  </>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default PageSignUp;
