import React, { Component } from 'react';
import { getUsuarios } from '../api';
import Loading from './Loading';
import Item from './Item';
import Header from './Header';
import isEmpty from "lodash/isEmpty";
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      usuarios: null,
      error:null,
      showAdd: false
    };

    this.handlerCerrarsession = this.handlerCerrarsession.bind(this);

  }
  async componentDidMount() {
    this.setState({ isLoading: true });
    try{
      if(localStorage.getItem('token')) {
        const usuarios = await getUsuarios(localStorage.getItem('token'));
        this.setState({ usuarios , isLoading: false });
      }
      
      this.setState({isLoading: false });
    } catch(error){
      this.setState({ error, isLoading: false });
    }
    return true;
  }

  handlerCerrarsession() {
    localStorage.clear();
    this.props.history.push('/')
  }

  renderList() {
    const { usuarios } = this.state;
    console.log(usuarios);

    if (!isEmpty(usuarios)) {
      return usuarios.map((usuario,i) => {
        return (<Item key={i} data={usuario}/>)
      })
    }else{
      return <div className ="nonToken">No tiene permitido entrar aqui.</div>
    }
  }

  render() {
    const { usuarios,  isLoading, error } = this.state;
    if (isLoading) {
      return <Loading message="Cargando ..."/>;
    }
    if (error) {
      return <p className="error" >{error.message}</p>;
    }
    return (<React.Fragment>
        <Header handlerCerrarsession={this.handlerCerrarsession}/>
        <div className="container">
          <div className="grid-container">
              {
                this.renderList()
              }
          </div>
        </div>
     </React.Fragment>);
  }
}

export default List;