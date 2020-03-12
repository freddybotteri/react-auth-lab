import React, {PureComponent} from "react";
import { register } from '../api';
import { Link } from 'react-router-dom';



class Register extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            hasError: false,
            showSending: false,
            responseMessage: false,
            name:'',
            email: '',
            password:''
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
        if(app.name.length > 0 &&  app.email.length > 0 && app.password.length > 0){
            return true;
        } else {
            return false;
        }
    }
    handleSubmit(e){
        e.preventDefault();
        if(this.validation(this.state)){
            this.setState({showSending:true})
            register(this.state.name,this.state.email,this.state.password)
            .then(data => {
                console.log(data);
                this.setState({showSending:false})
                if(!data.auth){
                    this.setState({responseMessage:true})
                }else{
                    localStorage.setItem('token', data.token);
                    this.setState({responseMessage:false})
                    this.props.history.push('/usuarios')
                }
            }).catch(() => {
            });
        }else{
            this.setState({
                hasError:true
            });
        }
    }

    render() {
        const { showSending, name, email, password, hasError,responseMessage} = this.state;
        return (<div className="login-container">
              <div className="login-content">
                <h2 className="center"> Registro </h2>
                { showSending && (<span className="success"> Enviando .... </span> )}
                { responseMessage && (<span className="error"> Error en el servidor. </span> )}
                { hasError && (<div className="error"> Some fields are empty or contain an wrong values. </div>) }
                <form>
                    <label>Nombre</label>
                    <input type="text" value={name} onChange={this.handleChange("name")} minLength="3" maxLength="200"  required/>
                    <label>email</label>
                    <input type="email" value={email} onChange={this.handleChange("email")} minLength="3" maxLength="200"  required/>
                    <label>Password</label>
                    <input type="password" value={password} onChange={this.handleChange("password")} required/>
                    <input type="submit" onClick={this.handleSubmit} value="Submit" disabled={showSending}/>
                </form>
                <Link to="/" className="button-register center">Volver</Link>
              </div>
            </div>);
    }
}


export default Register;
