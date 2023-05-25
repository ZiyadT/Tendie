import { useState } from "react";
import './components.css';

export default function LoginForm(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value)
    setError("")
  };

  const handleChangePassword = (evt) => {
    setPassword(evt.target.value)
    setError("")
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
       // 1. POST our new user info to the server
       const fetchResponse = await fetch('/api/users/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password, })
      })

      // 2. Check "fetchResponse.ok". False means status code was 4xx from the server/controller action
      if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request')

      let token = await fetchResponse.json() // 3. decode fetch response: get jwt token from srv
      localStorage.setItem('token', token);  // 4. Stick token into localStorage

      const userDoc = JSON.parse(atob(token.split('.')[1])).user; // 5. Decode the token + put user document into state
      props.setUserInState(userDoc)
    } catch (err) {
      console.log("SignupForm error", err);
      setError("Sign Up Failed - Try Again");
    }
  };

  return (
      <form autoComplete="off" onSubmit={handleSubmit} className="sm:my-24">
        <div className='my-3 mx-auto w-4/5 text-left'>
          <div className='text-lg text-color'>E-mail</div>
          <input type="text" name="email" value={email} onChange={handleChangeEmail} required className='textbox-fill w-full px-1 focus:outline-0' />
        </div>
        <div className='my-3 mx-auto w-4/5 text-left'>
          <div className='text-lg text-color'>Password</div>
          <input type="password" name="password" value={password} onChange={handleChangePassword} required className='textbox-fill w-full px-1 focus:outline-0' />
        </div>
        <button type="submit" className='text-lg font-medium go-color'>Log in</button>
      </form>
  );
}