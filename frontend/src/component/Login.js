


import React, { Component } from 'react'
import { useState } from 'react';
// import axios from '../api/axios';
// import { Axios } from 'axios';
import axios from '../api/axios';

const signupUrl = '/login';
let myres;

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {

      email: "",
      psd: "",

    };
    this.state = { open: true };
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // document.getElementById("userexist").style.display = "none";
      const { email, psd } = this.state;
      console.log(email, psd);

      const response = await axios.post(signupUrl, JSON.stringify({  uemail: email, upassword: psd }), {
        crossDomain: true,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
       myres = JSON.stringify(response?.data);

      if (myres == '{"error":"User not found"}') {


        console.log("matched");
        document.getElementById("userexist").style.display = "flex";
        document.getElementById("userexist").style.color = "red";
        document.getElementById("userexist").innerHTML = "User not found";
      }
      else if (myres == '{"status":"error","error":"Invalid password"}') {

        document.getElementById("userexist").style.color = "red";
        document.getElementById("userexist").innerHTML = "Invalid password";
      }
    
      // else if(JSON.stringify(response?.data.status)=="ok"){
        console.log(JSON.stringify(response?.data.status));
      // }
      if (response?.data.status=="ok"){
        console.log("successfulu loged in");
        alert("successfulu loged in");
        window.localStorage.setItem("token",response?.data.data);
        window.location.href="./dashboard";

      }
     
   




    } catch (error) {
      console.log(error.message);

    }
  }



  render() {
    // const [open, setOpen] = this.useState(true);


    return (
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" style={this.state.open ? { display: "flex" } : { display: "none" }} aria-modal="true">

        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <form onSubmit={this.handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                  <div className="sm:flex sm:items-start">
                    {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              
              <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z" />
              </svg>

            </div> */}

                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">

                      <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">Create account</h3>

             



                      <input required placeholder='Email' className="footer" type="email" onChange={(e) => this.setState({ email: e.target.value })} />
                      <input required placeholder='Password' className="footer" type="password" onChange={(e) => this.setState({ psd: e.target.value })} />
                     

                      <div className="mt-2">
                        <p id="success" className="text-sm text-gray-500">Fill all details properly to get successfully login</p>
                        <p id='userexist' className="text-sm text-gray-500"></p>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="submit" className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Submit</button>
                  <button type="button" onClick={() =>

                  //  this.setState({open: false})
                  {
                    this.setState({ open: false })
                    console.log("heloo");

                  }

                  } className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>



                </div>
              </form>

            </div>

          </div>

        </div>

      </div >
    )
  }
}

export default Login