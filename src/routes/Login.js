import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService} from '../fbase';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();

    const onChange = (event) => {
        if(event.target.name === "email") {
            setEmail(event.target.value);
            console.log(email);
        } else if(event.target.name === "password") {
            setPassword(event.target.value);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        
        try {
            let data = await authService.signInWithEmailAndPassword(email, password);
            navigate('/');
        }
        catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
        <form onSubmit={onSubmit}>
            <input type="email" name="email" placeholder='Email' required value={email} onChange={onChange} />
            <input type="password" name="password" placeholder='Password' required value={password} onChange={onChange}/>
            <input type="submit" value="Log In" />
        </form>

        <div>
        </div>
    </div>
  )
}

export default Login