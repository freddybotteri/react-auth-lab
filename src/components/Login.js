import React, {PureComponent} from "react";
import { login } from '../api';
import { Link } from 'react-router-dom';


class Login extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            hasError: false,
            showSending: false,
            responseMessage: false,
            email:'',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange (field) {
        return (event) => {
            this.setState({
                [field]: event.target.value
            })    
        }
    }

    validation(app){
        if(app.email.length > 0 && app.password.length > 0){
            return true;
        } else {
            return false;
        }
    }
    handleSubmit(e){
        e.preventDefault();
        if(this.validation(this.state)){
            this.setState({showSending:true})
            login(
                this.state.email,
                this.state.password
            ).then(data => {
                console.log(data);
                this.setState({showSending:false})
                if(!data.auth){
                    this.setState({responseMessage:true})
                }else{
                    localStorage.setItem('token', data.token);
                    this.setState({responseMessage:false})
                    this.props.history.push('/usuarios')
                }
            });
        }else{
            this.setState({
                hasError:true
            });
        }
    }

    render() {
        const { showSending, email, password, hasError,responseMessage} = this.state;
        return (<div className="login-container">
              <div className="login-content">
                <h2 className="center"> Ingreso </h2>
                { showSending && (<span className="success"> Enviando .... </span> )}
                { responseMessage && (<span className="error"> No se encuentra en el sistema. </span> )}
                { hasError && (<div className="error"> Hay campos vacio. </div>) }
                <form>
                    <label>Correo electronico</label>
                    <input type="text" value={email} onChange={this.handleChange("email")} minLength="3" maxLength="200"  required/>
                    <label>password</label>
                    <input  type="text" value={password} onChange={this.handleChange("password")} required/>
                    <input type="submit" onClick={this.handleSubmit} value="Submit" disabled={showSending}/>
                </form>
                <Link to="/register" className="button-register center">Registrarse</Link>
              </div>
              
            </div>);
    }
}


export default Login;
