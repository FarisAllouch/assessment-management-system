import React, { useState } from 'react';
import './login.scss';

const Login = () => {
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const toggleMode = () => {
        const newMode = mode === 'login' ? 'signup' : 'login';
        setMode(newMode);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            setError('Email and password are required.');
            return;
        }

        setError('');

        try {
            const response = await fetch('http://localhost/assessment-management-system-main/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }

            const data = await response.json();

        
            localStorage.setItem('userId', data.id);
            localStorage.setItem('role', data.role);

            // Uspješna prijava
            console.log('Login successful');
            console.log(data)

            // Redirekcija na željenu rutu
            if(data.role==='student'){
                window.location.href = '/coursesStudent';
            }
            else{
                window.location.href = '/courses';
            }
            

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className={`app app--is-${mode}`}>
            <div className={`form-block-wrapper form-block-wrapper--is-${mode}`} ></div>
            <section className={`form-block form-block--is-${mode}`}>
                <header className="form-block__header">
                    <h1>{mode === 'login' ? 'Welcome' : 'Sign up'}</h1>
                    <div className="form-block__toggle-block">
                        
                    </div>
                </header>
                <form onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}
                    <div className="form-block__input-wrapper">
                        <div className={`form-group form-group--${mode}`} style={{display:'grid', gap:'10px'}}>
                            {mode === 'login' ? (
                                <>
                                <div>
                                    
                                </div>
                                    <label htmlFor="">Email</label>
                                    <input
                                        style={{height:'30px'}}
                                        type="email"
                                        id="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <label htmlFor="">Passowrd</label>
                                    <input
                                         style={{height:'30px'}}
                                        type="password"
                                        id="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </>
                            ) : (
                                <>
                                    <input type="text" id="fullname" placeholder="Full Name" />
                                    <input type="email" id="email" placeholder="Email" />
                                    <input type="password" id="createpassword" placeholder="Password" />
                                    <input type="password" id="repeatpassword" placeholder="Repeat Password" />
                                </>
                            )}
                        </div>
                    </div>
                    <button className="button button--primary full-width" type="submit">{mode === 'login' ? 'Log In' : 'Sign Up'}</button>
                </form>
            </section>
        </div>
    );
};

export default Login;