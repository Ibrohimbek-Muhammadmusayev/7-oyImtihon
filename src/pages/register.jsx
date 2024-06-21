import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
    
export function Register() {
    const [email, setEmail] = useState([]);

    const Navigation = useNavigate();

    const [users, setUsers] = useState({
        email: '',
        password: '',
        username: '',
        photourl: '',
    });

    // console.log(users);

    const hendlesubmit = (e)=> {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, users.email, users.password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            setEmail(user);
            localStorage.setItem('userdata', user)
            localStorage.setItem('user', 'true')
            Navigation('/')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            // ..
        });

        console.log(email);

        if (email.length === 0) {
            Navigation('/')
        }
    }

    return (
        <div>
            <div className="m-auto">
                <div className="card mt-[150px] w-[384px] flex justify-center items-center m-auto  bg-base-100 shadow-xl">
                    <div className="card pr-[30px] pb-[20px] pl-[30px] w-96 bg-base-100 shadow-xl">
                        <div className="card-body items-center text-center">
                            <h1 className="text-[25px] card-title">Register</h1>
                        </div>
                        <form onSubmit={hendlesubmit} className="flex flex-col gap-[10px] mb-[30px]">
                            <label className="input-bordered flex flex-col gap-2">
                                <span className="flex">Username</span>
                                <input value={users.username} onChange={(e)=> setUsers((pref)=> ({...pref, username: e.target.value}))} type="text" className="w-[320px] h-[48px] border border-[#394E6A] rounded-[8px]"/>
                            </label>
                            <label className="input-bordered flex flex-col gap-2">
                                <span className="flex">Avatar</span>
                                <input value={users.photourl} onChange={(e)=> setUsers((pref)=> ({...pref, photourl: e.target.value}))} type="url" className="w-[320px] h-[48px] border border-[#394E6A] rounded-[8px]"/>
                            </label>
                            <label className="input-bordered flex flex-col gap-2">
                                <span className="flex">email</span>
                                <input value={users.email} onChange={(e)=> setUsers((pref)=> ({...pref, email: e.target.value}))} type="email" className="w-[320px] h-[48px] border border-[#394E6A] rounded-[8px]"/>
                            </label>
                            <label className="input-bordered flex flex-col gap-2">
                                <span className="flex">password</span>
                                <input value={users.password} onChange={(e)=> setUsers((pref)=> ({...pref, password: e.target.value}))} type="password" className="w-[320px] h-[48px] border border-[#394E6A] rounded-[8px]"/>
                            </label>
                            <button type="submit" className="btn mt-[24px] text-[#ffff] btn-info">REGISTER</button>
                            <div className="flex gap-[8px] items-center m-auto">
                                <p>Not a member yet? </p>
                                <NavLink className="text-lg text-center text-primary" to="/login">login</NavLink>
                            </div>
                        </form>
                    <div/>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Register