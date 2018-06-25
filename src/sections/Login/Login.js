import React, { Component } from 'react';
import Cookie from '../tools/Cookies';
import './Login.scss';
import $ from 'jquery';
//import { Redirect } from 'react-router'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: "",
            passwd: ""
        }
    }

    render() {
        return (
            <div className="form-container">
                <form className="form-login" onSubmit={this.athorization}>
                    <h2>Signin</h2>
                    <div className="form-group">
                        <label>User:</label>
                        <input id="user" className="user-login form-control" type="text" value={this.state.user} onChange={this.inputChange} />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input id="passwd" className="pass-login form-control" type="password" value={this.state.passwd} onChange={this.inputChange} />
                    </div>
                    <input className="btn" type="submit" value="Submit" disabled={!this.validate()} />
                </form>
            </div>
        )
    }

    validate() {
        return this.state.user.length > 0 && this.state.passwd.length > 0;
    }

    inputChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    athorization = e => {
        e.preventDefault();
        $.ajax({
            type: 'GET',
            url: `http://localhost:1212/service/login/${this.state.user}/${this.state.passwd}`,
            success: (res) => {
                if(res.auth){
                    Cookie.setCookie("name",res.name,1);
                    Cookie.setCookie("id",res.id,1);
                    if(res.user==="admi"){
                        this.props.history.push('/admin');
                    }else{
                        this.props.history.push('/Books');
                    }
                }
            },
            error: function (xhr, status, err) { }
        });
        // envia el parametro rol con el rol que regrese el rest
        //     fetch(``, {
        //         method: "GET",
        //         headers: {
        //             Accept: "application/json",
        //             'Content-Type': "application/json"
        //         },
        //         body: {

        //         }


        //     }).then((response) => {
        //         if (response.ok) {

        //         } else {

        //         }
        //     }).catch(() => {

        //     })
    }
}
export default Login;