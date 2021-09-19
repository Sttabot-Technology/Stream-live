import React, { useRef, useState } from 'react'
import { Grid } from '@material-ui/core'
import classes from './form.module.css';
import axios from 'axios'


export default function Signup() {
               const userName = useRef();
               const mailRef = useRef();
               const passRef = useRef();

               const [signup, setSignup] = useState(false);


               const submitHandler = async (submit) => {
                              submit.preventDefault();

                              console.log(userName.current.value, mailRef.current.value, passRef.current.value)

                              // const data = await fetch("http://localhost:5000/users/register", {
                              //                method: 'POST',
                              //                body: JSON.stringify({
                              //                               name: userName.current.value,
                              //                               email: mailRef.current.value,
                              //                               password: passRef.current.value,
                              //                }),
                              //                headers: {
                              //                               "Content-Type": "application/json"
                              //                }
                              // })
                              // const resData = await data.json();
                              // console.log(`resData`, resData);

                              axios.post('http://localhost:5000/users/register', {
                                             name: userName.current.value,
                                             email: mailRef.current.value,
                                             password: passRef.current.value
                              })

               }

               const changeHandler = () => {
                              setSignup(!signup)
               }




               return (
                              <Grid container spacing={2}>
                                             <Grid item md={4}></Grid>
                                             <Grid item md={4} xs={12}>


                                                            <form onSubmit={submitHandler} className=

                                                                           {classes.formDesign}>
                                                                           {signup ? <p> Login </p> : <p> Signup</p>}
                                                                           <input className={classes.fields} type="text" placeholder="Username" ref={userName} /> <br />
                                                                           <input className={classes.fields} type="text" placeholder="Email" ref={mailRef} /> <br />
                                                                           <input className={classes.fields} type="text" placeholder="Password" ref={passRef} /> <br />
                                                                           <input className={classes.buttonForm} type="submit"



                                                                           />

                                                                           <button onClick={changeHandler} > {signup ? 'Sign Up' : 'Sign in'}  </button>

                                                            </form>
                                             </Grid>
                                             <Grid item md={4}></Grid>
                              </Grid>
               )
}
