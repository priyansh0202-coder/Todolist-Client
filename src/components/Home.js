import { Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from "yup"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom'
import ButtonAppBar from "../components/Navbar"

const initialValues = {
    title: ""
}

const Home = () => {

    const [open, setOpen] = useState(false)
    const [editItemId, setEditItemId] = useState(null)

    const [data, setData] = useState([]);
    const [edit, setEdit] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const userData = JSON.parse(localStorage.getItem('userData'));
    // const [user, currentUser] = useState(userData.data.name)


    useEffect(() => {
        fetchData(userData.data.user_Id);
    }, []);

    const fetchData = async (userId) => {
        try {
            const response = await axios.get(`https://todo-server-three-navy.vercel.app/auth/fetch?user_Id=${userId}`);
            setData(response.data);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    const deleteTodoList = async (id) => {
        try {
            const response = await axios.delete(`https://todo-server-three-navy.vercel.app/auth/deleteTodo?id=${id}&user_Id=${userData.data.user_Id}`);
            if (response.status === 200) {
                const updatedData = data.filter(item => item.id !== id);
                setData(updatedData);
                alert(response.data);
            }
        } catch (error) {
            console.log("error while deleting the todo:", error);
        }
    }

    const { values, errors, handleChange, handleSubmit, setValues } = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object().shape({
            title: Yup.string().required("Please enter your Todo Task")
        }),
        onSubmit: async (values, helpers) => {
            try {
                const userData = JSON.parse(localStorage.getItem("userData"));
                if (edit) {
                    const response = await axios.put(`https://todo-server-three-navy.vercel.app/auth/editTodo`, {
                        id: updateId,
                        user_Id: userData.data.user_Id,
                        title: values.title
                    });
                    if (response.status === 200) {
                        setEdit(false);
                        setUpdateId(null);
                        fetchData(userData.data.user_Id);
                        helpers.resetForm();
                        alert("Todo has been updated successfully ")
                    }
                } else {
                    const response = await axios.post("https://todo-server-three-navy.vercel.app/auth/todo", {
                        title: values.title,
                        user_Id: userData.data.user_Id
                    });
                    if (response.status === 200) {
                        fetchData(userData.data.user_Id);
                        helpers.resetForm();
                    }
                    alert("Your Todo has been Added to the table ")
                }
            } catch (error) {
                console.log("error", error)
            }
        }
    });

    const updateTodoList = async (title, id) => {
        try {
            setValues({ ...values, title: title });
            setEdit(true);
            setUpdateId(id);
            handleClickOpen(id)
        } catch (error) {
            console.log("Error while updating todo:", error);
        }
    };

    const handleClickOpen = (id) => {
        setOpen(true)
        setEditItemId(id)

    }

    const handleClose = () => {
        setOpen(false)
        setEditItemId(null)
    }



    return (
        <React.Fragment>
            <ButtonAppBar />

            <Grid container justifyContent='center' alignItems='top' style={{ minHeight: '50vh', background: 'pearlWhite', marginTop: 100 }}>
                <Button variant="outlined" onClick={handleClickOpen} style={{ height: 35, marginTop: 35 }}>
                    Add Todo here
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <form onSubmit={handleSubmit}>
                        <Grid item xs={35} md={20} lg={30} >

                            <DialogTitle>Todo-list</DialogTitle>
                            <DialogContent style={{ width: 400 }}>
                                <TextField
                                    variant='outlined'
                                    fullWidth
                                    type='text'
                                    label='Add Todo'
                                    name='title'
                                    value={values.title}
                                    sx={{ marginBottom: 2 }}
                                    onChange={handleChange}
                                    error={errors.title ? true : false}
                                    helperText={errors.title ? errors.title : null}
                                />
                                <Button variant='contained' type='submit' onClick={handleClose}>Submit</Button>
                            </DialogContent>
                        </Grid>
                    </form>
                </Dialog>
            </Grid>
            <Grid container justifyContent="center" style={{ marginBottom: 100 }}>
                <Grid item xs={30} sm={5}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align='left'>Title</TableCell>
                                    {/* <TableCell align='center' >Name: {user}</TableCell> */}
                                    <TableCell align='right'>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data && data.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell scope="row">{row.title}</TableCell>
                                        <TableCell align="left">
                                            <div style={{ textAlign: "right" }}>  <IconButton onClick={() => deleteTodoList(row.id)}><DeleteIcon /></IconButton>
                                                <IconButton onClick={() => updateTodoList(row.title, row.id)}><EditIcon /></IconButton></div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Home;

