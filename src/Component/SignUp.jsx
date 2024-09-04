import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';

// Utility function to fetch data from localStorage
const localStorageData = () => {
    const formData = localStorage.getItem('formdata');
    if (formData) {
        return JSON.parse(formData);
    }
    return [];
};

const SignUp = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [data, setData] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const fetchedData = localStorageData();
        setData(fetchedData);
        setSubmitted(false);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const matched = data.filter(
            (item) => item.email === formData.email
            // You can uncomment and use this line if you need to match the password
            // && item.password === formData.password
        );

        if (matched.length > 0) {
            alert('Matched');
        } else {
            alert('Unmatched');
        }

        setFormData({ username: '', email: '', password: '' });
        setSubmitted(true);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField
                    sx={{
                        width: {
                            xs: '100%',
                            sm: '80%',
                            md: '60%',
                            lg: '40%',
                        },
                    }}
                    label="Username"
                    name="username"
                    variant="outlined"
                    margin="normal"
                    value={formData.username}
                    onChange={handleChange}
                />
                <br />
                <TextField
                    sx={{
                        width: {
                            xs: '100%',
                            sm: '80%',
                            md: '60%',
                            lg: '40%',
                        },
                    }}
                    label="Email"
                    name="email"
                    variant="outlined"
                    margin="normal"
                    value={formData.email}
                    onChange={handleChange}
                />
                <br />
                <TextField
                    sx={{
                        width: {
                            xs: '100%',
                            sm: '80%',
                            md: '60%',
                            lg: '40%',
                        },
                    }}
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={formData.password}
                    onChange={handleChange}
                />
                <Button
                    sx={{
                        marginTop: '5rem',
                        width: {
                            xs: '100%',
                            sm: '80%',
                            md: '60%',
                            lg: '20%',
                        },
                    }}
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Submit
                </Button>
            </form>
            {submitted && (
                <div>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Submitted Data
                    </Typography>
                    {data.map((item, index) => (
                        <div key={index}>
                            <Typography>Username: {item.username}</Typography>
                            <Typography>Email: {item.email}</Typography>
                            <Typography>Password: {item.password}</Typography>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SignUp;
