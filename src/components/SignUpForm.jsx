import { useState } from "react";

export default function SignUpForm(props) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")

  const handleChangeName = (evt) => {
    setName(evt.target.value)
    setError("")
  }

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value)
    setError("")
  }

  const handleChangePassword = (evt) => {
    setPassword(evt.target.value)
    setError("")
  }

  const handleChangeConfirm = (evt) => {
    setConfirm(evt.target.value)
    setError("")
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const fetchResponse = await fetch('/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, email: email, password: password })
      })
      if(!fetchResponse.ok) throw new Error('Fetch Failed - Bad Request ' + fetchResponse.status)
    
      let token = await fetchResponse.json()
      localStorage.setItem('token', token)

      const userDoc = JSON.parse(atob(token.split('.')[1])).user
      props.setUserInState(userDoc)
    } catch (err) {
      console.log("SignupForm error", err);
      setError("Sign Up Failed - Try Again");
    }
  };

  const disable = password !== confirm;
  return (
    <form autoComplete="off" onSubmit={handleSubmit} className="sm:my-12">
        <div className='my-3 mx-auto w-4/5 text-left'>
          <div className='text-lg text-color'>Name</div>
          <input type="text" name="name" value={name} onChange={handleChangeName} required className='textbox-fill w-full px-1 focus:outline-0' />
        </div>
        <div className='my-3 mx-auto w-4/5 text-left'>
          <div className='text-lg text-color'>E-mail</div>
          <input type="email" name="email" value={email} onChange={handleChangeEmail} required className='textbox-fill w-full px-1 focus:outline-0' />
        </div>
        <div className='my-3 mx-auto w-4/5 text-left'>
          <div className='text-lg text-color'>Password</div>
          <input type="password" name="password" value={password} onChange={handleChangePassword} required className='textbox-fill w-full px-1 focus:outline-0' />
        </div>
        <div className='my-3 mx-auto w-4/5 text-left'>
          <div className='text-lg text-color'>Confirm Password</div>
          <input type="password" name="confirm" value={confirm} onChange={handleChangeConfirm} required className='textbox-fill w-full px-1 focus:outline-0' />
        </div>
        <button type="submit" className='text-lg font-medium go-color'>Sign up</button>
      </form>
  )
}