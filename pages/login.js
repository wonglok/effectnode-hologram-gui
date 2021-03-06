import { useState } from "react";
import { emailConsumerLogin, loginGithub, loginGoogle } from "../vfx/api/fire";
// import { SiteConfig } from "../../vfx/api/siteConfig";
import router from "next/router";

export default function Login({ done }) {
  let [cta, setCTA] = useState({
    disabled: false,
    text: "Email Me Login Link",
  });

  let goGame =
    done ||
    (() => {
      router.router.push(`/places`);
    });
  return (
    <div className="w-full h-full bg-black bg-opacity-50">
      <div className="font-sans">
        <div className="relative min-h-screen flex flex-col sm:justify-center items-center ">
          <div className="relative sm:max-w-sm w-full">
            <div className="card bg-purple-800 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
            <div className="card bg-blue-800 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
            <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-300 shadow-md">
              <label
                htmlFor=""
                className="block mt-3 text-gray-900 text-center font-semibold text-2xl"
              >
                Metaverse Login
              </label>
              <form
                method="#"
                action="#"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (e.target[0]?.value) {
                    let email = e.target[0]?.value;
                    setCTA({
                      text: `Sending Yo Login Email...`,
                      disabled: true,
                    });
                    emailConsumerLogin({ email }).then(
                      () => {
                        setCTA({
                          text: `Sent, Please check your inbox / spambox...`,
                          disabled: false,
                        });
                      },
                      () => {
                        setCTA({
                          text: `Error dear...`,
                          disabled: false,
                        });

                        setTimeout(() => {
                          setCTA({
                            text: `let's try again, dear ????`,
                            disabled: false,
                          });
                        }, 1000);
                      }
                    );
                  }
                }}
                className="mt-10"
              >
                <div>
                  <input
                    type="email"
                    placeholder="Please enter email dear ????"
                    className="mt-1 px-4 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                  ></input>
                </div>

                <div className="mt-7">
                  <button
                    disabled={cta.disabled}
                    className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                  >
                    {cta.text}
                  </button>
                </div>
              </form>

              <div className="flex mt-7 items-center text-center">
                <hr className="border-gray-300 border-1 w-full rounded-md" />
                <label className="block font-medium text-sm text-gray-600 w-full">
                  OR
                </label>
                <hr className="border-gray-300 border-1 w-full rounded-md" />
              </div>

              <div className="flex mt-7 justify-center w-full">
                <button
                  onClick={() => {
                    loginGithub().then(() => {
                      goGame();
                    });
                  }}
                  className="mr-5 bg-blue-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                >
                  Github
                </button>

                <button
                  onClick={() => {
                    loginGoogle().then(() => {
                      goGame();
                    });
                  }}
                  className="bg-red-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                >
                  Google
                </button>
              </div>

              <div className="mt-7"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
