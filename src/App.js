import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginCard from "./components/Login";
import SignupCard from "./components/Signup"
import HomePage from './components/Home'

import './App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginCard />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/signup" element={< SignupCard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


// //import { Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
// import axios from 'axios'
// import { useFormik } from 'formik'
// import React, { useEffect, useState } from 'react'
// import * as Yup from "yup"
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';

// const initialValues = {
//   title: ""
// }

// const Home = () => {
//   const [data, setData] = useState();
//   const [editTodo, setEditTodo] = useState(null); // State to track the currently edited todo item

//   const userData = JSON.parse(localStorage.getItem('userData'));

//   useEffect(() => {
//     fetchData(userData.data.user_Id);
//   }, []);

//   const fetchData = async (user_Id) => {
//     try {
//       const response = await axios.get(`http://localhost:3000/auth/fetch?user_Id=${user_Id}`);
//       setData(response.data);
//     } catch (error) {
//       console.log('Error fetching data:', error);
//     }
//   };

//   const deleteTodoList = async (id) => {
//     try {
//       const userData = JSON.parse(localStorage.getItem('userData'));
//       const user_Id = userData.data.user_Id;
//       const response = await axios.delete(`http://localhost:3000/auth/deleteTodo?id=${id}&user_Id=${user_Id}`);
//       fetchData();
//       alert(response.data);
//     } catch (error) {
//       console.log("error while deleting the todo")
//     }
//   }

//   const updateTodoList = async (title, id) => {
//     try {
//       const userData = JSON.parse(localStorage.getItem('userData'));
//       const user_id = userData.data.user_Id;

//       const response = await axios.put(`http://localhost:3000/auth/editTodo`, {
//         id: id,
//         user_Id: user_id,
//         title: title
//       });
//       fetchData();
//       console.log(response);
//     } catch (error) {
//       console.log("Error while updating todo:", error);
//     }
//   };

//   const handleEdit = (todo) => {
//     setEditTodo(todo); // Set the todo item to be edited
//   };

//   const handleSave = () => {
//     updateTodoList(editTodo.title, editTodo.id);
//     setEditTodo(null); // Reset editTodo state after saving changes
//   };

//   var { values, errors, handleChange, handleSubmit } = useFormik({
//     initialValues: initialValues,
//     validationSchema: Yup.object().shape({
//       title: Yup.string().required("Please enter your Todo Task")
//     }),
//     onSubmit: async (values, helpers) => {
//       try {
//         const userData = JSON.parse(localStorage.getItem("userData"));
//         const response = await axios.post("http://localhost:3000/auth/todo", {
//           title: values.title,
//           user_Id: Number(userData.data.user_Id)
//         });
//         fetchData(userData.data.user_Id);
//         helpers.resetForm();
//       } catch (error) {
//         console.log("error", error)
//       }
//     }
//   });

//   return (
//     <React.Fragment>
//       <Grid container justifyContent='center' alignItems='center' style={{ minHeight: '100vh', background: 'pearlWhite', marginBottom: 200 }}>
//         <form onSubmit={handleSubmit}>
//           <Grid item xs={35} md={20} lg={30} >
//             <TextField
//               variant='outlined'
//               fullWidth
//               type='text'
//               label='Add Todo'
//               name='title'
//               value={values.title}
//               sx={{ marginBottom: 2 }}
//               onChange={handleChange}
//               error={errors.title ? true : false}
//               helperText={errors.title ? errors.title : null}
//             />
//             <Button variant='contained' type='submit'>submit</Button>
//           </Grid>
//         </form>
//       </Grid>
//       <Grid container justifyContent="center" style={{ marginBottom: 100 }}>
//         <Grid item xs={50} sm={8}>
//           <TableContainer component={Paper}>
//             <Table aria-label="simple table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Title</TableCell>
//                   <TableCell>Action</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {data && data.map((row, index) => (
//                   <TableRow key={index}>
//                     <TableCell scope="row">
//                       {editTodo && editTodo.id === row.id ? (
//                         <TextField
//                           fullWidth
//                           value={editTodo.title}
//                           onChange={(e) => setEditTodo({ ...editTodo, title: e.target.value })}
//                         />
//                       ) : (
//                         row.title
//                       )}
//                     </TableCell>
//                     <TableCell align="left">
//                       {editTodo && editTodo.id === row.id ? (
//                         <Button variant="contained" color="primary" onClick={handleSave}>
//                           Save
//                         </Button>
//                       ) : (
//                         <>
//                           <IconButton onClick={() => deleteTodoList(row.id)}>
//                             <DeleteIcon />
//                           </IconButton>
//                           <IconButton onClick={() => handleEdit(row)}>
//                             <EditIcon />
//                           </IconButton>
//                         </>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Grid>
//       </Grid>
//     </React.Fragment>
//   )
// }

// export default Home;

