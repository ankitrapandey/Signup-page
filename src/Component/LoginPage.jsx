

import React, { useState, useEffect } from 'react';

const LocalStorage = () => {
    const formdata = localStorage.getItem('formdata');
    return formdata ? JSON.parse(formdata) : [];
};

const LoginPage = () => {
    const [formdata, setFormdata] = useState({ username: '', email: '', password: '' });
    const [data, setData] = useState(LocalStorage());
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        // Fetch data from localStorage on component mount
        setData(LocalStorage());
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormdata(prevFormdata => ({
            ...prevFormdata,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedData = [...data, formdata];
        setData(updatedData);
        setFormdata({ username: '', email: '', password: '' });
        setSubmitted(true);
        localStorage.setItem('formdata', JSON.stringify(updatedData));
    };

    const isFormValid = () => {
        // Check if all fields are non-empty
        return formdata.username && formdata.email && formdata.password;
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        value={formdata.username}
                        onChange={handleChange}
                        name="username"
                        type="text"
                        placeholder="Username"
                    />
                    <br />
                    <input
                        style={{ marginTop: '6px' }}
                        value={formdata.email}
                        onChange={handleChange}
                        name="email"
                        type="email"
                        placeholder="Email"
                    />
                    <br />
                    <input
                        style={{ marginTop: '6px' }}
                        value={formdata.password}
                        onChange={handleChange}
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                    <br />
                    <button
                        className='bg-black h-[7vh] lg:w-[13vw] w-[40vw] text-white ml-7 mt-5'
                        type="submit"
                        disabled={!isFormValid()} // Disable button if form is not valid
                    >
                        Submit
                    </button>
                </div>
            </form>
            {submitted && data.length > 0 && (
                <div>
                    {data.map((item, index) => (
                        <div key={index}>
                            {item.username && <h2>UserName: {item.username}</h2>}
                            {item.email && <h2>Email: {item.email}</h2>}
                            {item.password && <h2>Password: {item.password}</h2>}
                        </div>
                    ))}
                </div>
            )}
            <a href="/forgetpassword">Forget Password</a>
        </>
    );
};

export default LoginPage;
