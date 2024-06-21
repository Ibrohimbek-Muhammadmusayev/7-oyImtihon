import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
export function Login() {
    const Navigation = useNavigate();
    const [login, setLogin] = useState([]);
    const [error, setError] = useState('');

    const [users, setUsers] = useState({
        email: '',
        password: '',
    });


    const hendleSubmit = (e)=> {
        e.preventDefault()
        signInWithEmailAndPassword(auth, users.email, users.password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('login', user);
            setLogin(user)
            Navigation('/')
            localStorage.setItem('user', 'true')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            setError(errorMessage)
        });

       
    }

    return (
        <div>
            <div className="card m-auto mt-[200px] pr-[30px] pb-[20px] pl-[30px] w-96 bg-base-100 shadow-xl">
                <div className="card-body items-center text-center">
                    <h1 className="text-[25px] card-title">Login</h1>
                </div>
                <form onSubmit={hendleSubmit} className="flex flex-col gap-[10px] mb-[30px]">
                    <label className="flex flex-col gap-2">
                        <span className="flex">email</span>
                        <input value={users.email} onChange={(e)=> setUsers((pref)=> ({...pref, email: e.target.value}))} type="email" className="w-[320px] h-[48px] border border-[#394E6A] rounded-[8px]"/>
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="flex">password</span>
                        <input value={users.password} onChange={(e)=> setUsers((pref)=> ({...pref, password: e.target.value}))} type="password" className="w-[320px] h-[48px] border border-[#394E6A] rounded-[8px]"/>
                    </label>
                    <p>{error}</p>
                    <div className="mt-[32px] gap-[16px] flex flex-col">
                        <button type="submit" className="btn btn-info">LOGIN</button>
                        <NavLink to={'/'}><button type="submit" className="btn w-[320px] btn-primary">GUEST USER</button></NavLink>
                        <div className="flex gap-[8px] items-center m-auto">
                            <p>Not a member yet? </p>
                            <NavLink className="text-lg text-center text-primary" to="/register">register</NavLink>
                        </div>
                    </div>
                </form>
                <div/>
            </div>
        </div>
    )
}

export default Login