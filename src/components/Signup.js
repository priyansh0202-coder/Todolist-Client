import React from 'react'
import { Button, Card, CardActions, CardContent, Grid, TextField } from "@mui/material"
import { NavLink } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const initialValues = {
    name: "",
    email: "",
    password: ""
}

const Signup = () => {
    const navigate = useNavigate()

    const { values, errors, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email("Must be a valid email").required('Email is required').matches(/@[^,]*\./, " is not in correct format"),
            password: Yup.string().required('Password is required')
        }),
        onSubmit: async (values, helpers) => {
            try {
                const response = await axios.post("https://todo-server-three-navy.vercel.app/auth/signup", values);
                console.log(response)
                helpers.resetForm();
                alert("register user succesfully")
                navigate("/");
            } catch (error) {
                console.log("error", error)
                alert(error.response.data)
            }
        }
    });
    // console.log(values)

    return (
        <React.Fragment>
            <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                <Grid item>
                    <Card sx={{ maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
                        <CardContent>
                            <h3>Signup</h3>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    variant='outlined'
                                    fullWidth
                                    label='name'
                                    type='name'
                                    id='name'
                                    name='name'
                                    sx={{ marginBottom: 2 }}
                                    value={values.name}
                                    onChange={handleChange}
                                    error={errors.name ? true : false}
                                    helperText={errors.name ? errors.name : null}
                                />
                                <TextField
                                    variant='outlined'
                                    fullWidth
                                    label='email'
                                    type='email'
                                    id='email'
                                    name='email'
                                    sx={{ marginBottom: 2 }}
                                    value={values.email}
                                    onChange={handleChange}
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
                                    value={values.password}
                                    onChange={handleChange}
                                    error={errors.password ? true : false}
                                    helperText={errors.password ? errors.password : null}
                                />

                                <Button variant='contained' type='submit'>Submit</Button>
                            </form>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center' }}>
                            <NavLink to="/" underline="hover" style={{ textDecoration: 'none' }}>
                                You have an account ? login
                            </NavLink>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Signup

