import React, { FC, Fragment, useEffect, useState } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import { Link, useLocation } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import axios, { isCancel, AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";
import tokenHandler from "utils/tokenHandler";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import PageSignUp from "containers/PageSignUp/PageSignUp";

export interface PageLoginProps {
  className?: string;
  openInModal?: boolean;
  callBack?: () => void;
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

const PageLogin: FC<PageLoginProps> = ({
  className = "",
  openInModal = false,
  callBack,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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

  const location = useLocation();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    let email = e.target[0].value;
    let password = e.target[1].value;

    axios
      .post(`${process.env.REACT_APP_API_DOMAIN}/api/user/login`, {
        email,
        password,
      })
      .then((response) => {
        setIsLoading(false);
        tokenHandler.setToCookie("bint", response.data.token);
        const queryParams = new URLSearchParams(location.search);

        callBack ? callBack() : navigate("/");
        // window.location.reload();
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("Something went wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const [signUpModal, setSignUpModal] = useState(false);

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Login || Booking React Template</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
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
                <Link to="/forgot-pass" className="text-sm">
                  Forgot password?
                </Link>
              </span>
              <Input type="password" className="mt-1" />
            </label>
            <ButtonPrimary type="submit">Continue</ButtonPrimary>
          </form>

          {/* ==== */}
          {openInModal ? (
            <span className="block text-center text-neutral-700 dark:text-neutral-300">
              New user? {` `}
              <span
                className="cursor-pointer"
                onClick={() => {
                  setSignUpModal(true);
                }}
              >
                Create an account
              </span>
            </span>
          ) : (
            <span className="block text-center text-neutral-700 dark:text-neutral-300">
              New user? {` `}
              <Link to="/signup">Create an account</Link>
            </span>
          )}
        </div>
      </div>
      <Transition appear show={signUpModal} as={Fragment}>
        <Dialog
          as="div"
          className="HeroSearchFormMobile__Dialog relative z-50"
          onClose={() => setSignUpModal(false)}
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
                        onClick={() => setSignUpModal(false)}
                      >
                        <XMarkIcon className="w-5 h-5 text-black dark:text-white" />
                      </button>
                    </div>

                    <PageSignUp callBack={callBack} openModal={true} />
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

export default PageLogin;
