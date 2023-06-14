import React, {useState} from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import './pages.css'

export default function AuthPage(props) {
  const [showLogin, setShowLogin] = useState(true)

  return (
    <main className="AuthPage overflow-hidden">
        <div className="flex justify-center items-center h-screen main-background">
            <div className="w-4/5 h-4/5 text-center secondary-background shadow-md shadow-black sm:flex sm:w-3/5 sm:h-3/5">
                <div className="h-1/2 border-b main-line sm:w-2/3 sm:h-full sm:border-none">
                    <div className="text-5xl py-10 font-semibold sm:text-left sm:mx-12"><span className="logo-color">Tendie</span>.</div>
                    <div className="px-5 py-5 text-color">
                        Stock visualization tool with up-to-date news
                    </div> 
                    <div className="py-5 text-color">
                        Designed and built by Chap. Powered by NewsAPI.
                    </div>
                </div>
                <div className="h-1/2 sm:w-1/3 sm:border-l sm:main-line sm:h-full">
                    {showLogin ? (
                        <LoginForm setUserInState={props.setUserInState} />
                    ) : (
                        <SignUpForm setUserInState={props.setUserInState} />
                    )}
                    {showLogin ? (
                        <p className="py-2">Need an account? <span className="font-medium text-color cursor-pointer" onClick={() => setShowLogin(!showLogin)}>Sign up</span></p>
                    ) : (
                        <p className="py-2">Have an account? <span className="font-medium text-color cursor-pointer" onClick={() => setShowLogin(!showLogin)}>Log in</span></p>
                    )}
                </div>
            </div>
        </div>
      
    </main>
  );
}