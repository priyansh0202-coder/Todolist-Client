import React from 'react'
import { Button, Card, CardActions, CardContent, Grid, TextField } from "@mui/material"
import { NavLink, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/authReducer'

const initialValues = {
    email: "",
    password: ""
}

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    // const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const { values, errors, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object().shape({
            email: Yup.string().email("Must be a valid email").required('Email is required').matches(/@[^,]*\./, " is not in correct format"),
            password: Yup.string().required('Password is required')
        }),
        onSubmit: async (values, helpers) => {
            try {
                const response = await axios.post("https://todo-server-three-navy.vercel.app/auth/login", values);
                localStorage.setItem('userData', JSON.stringify(response.data));
                // console.log("local", localStorage)
                dispatch(login({ token: response.data.data.token }))
                console.log("testing", login({ token: response.data.data.token }))
                navigate("/home")
                alert("Login User succesfully")
            } catch (error) {
                console.log("error", error)
                alert(error.response.data)
            }
        }
    });

    return (
        <React.Fragment>
            <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                <Grid item>
                    <Card sx={{ maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
                        <CardContent>
                            <h3>Login</h3>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    variant='outlined'
                                    fullWidth
                                    label='Email'
                                    type='email'
                                    id='email'
                                    name='email'
                                    sx={{ marginBottom: 2 }}
                                    onChange={handleChange}
                                    value={values.email}
                                    error={errors.email ? true : false}
                                    helperText={errors.email ? errors.email : null}
                                />
                                <TextField
                                    variant='outlined'
                                    fullWidth
                                    label="Password"
                                    type='password'
                                    id='password'
                                    name='password'
                                    sx={{ marginBottom: 2 }}
                                    onChange={handleChange}
                                    value={values.password}
                                    error={errors.password ? true : false}
                                    helperText={errors.password ? errors.password : null}
                                />
                                <Button variant='contained' type='submit'>Submit</Button>
                            </form>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center' }}>
                            <NavLink to="/signup" underline="hover" style={{ textDecoration: 'none' }}>
                                Don't have an account? Sign up
                            </NavLink>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Login

