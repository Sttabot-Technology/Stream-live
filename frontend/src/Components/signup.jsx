import React, { useRef } from 'react'
import { Grid } from '@material-ui/core'
import classes from './form.css'

export default function Signup() {
               const userName = useRef();
               const mailRef = useRef();
               const passRef = useRef();



               const submitHandler = async (submit) => {
                              submit.preventDefault();

                              console.log(userName.current.value, mailRef.current.value, passRef.current.value)

                              const data = await fetch("/users/register", {
                                             method: 'POST',
                                             body: JSON.stringify({
                                                            name: userName.current.value,
                                                            email: mailRef.current.value,
                                                            password: passRef.current.value,
                                             }),
                                             headers: {
                                                            "Content-Type": "application/json"
                                             }
                              })
                              const resData = await data.json();
                              console.log(resData);

               }



               return (
                              <Grid container spacing={2}>
                                             <Grid item md={12} xs={12}>
                                                            <form onSubmit={submitHandler} className={classes.formDesign}>
                                                                           <input type="text" placeholder="Username" ref={userName} /> <br />
                                                                           <input type="text" placeholder="Email" ref={mailRef} /> <br />
                                                                           <input type="text" placeholder="Password" ref={passRef} /> <br />
                                                                           <input className={classes.buttonForm} type="submit" />

                                                            </form>
                                             </Grid>
                              </Grid>
               )
}
