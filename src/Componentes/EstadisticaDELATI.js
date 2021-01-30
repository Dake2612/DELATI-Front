import * as React from 'react';
import CONFIG from '../Configuracion/Config';
import { browserHistory } from 'react-router-3';

class EstadisticaDELATI extends React.Component {

    

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    componentWillMount () {

        fetch(CONFIG + 'oferta/listar')
          .then((response) => {
            return response.json();
          })
          .then((datos) => {
    
            this.setState({
              data: datos
            })
          })
    
          console.log("ra1");
      }

      Regresar = (e) => {
        browserHistory.push('/vista/loginFormAdmi');
        e.preventDefault();
      }


      recorrerData(){

        
        return (
            (this.state.data.length > 0) ? 
                
                <div>
                    <div className="alcentro" >
                        <table>
                            <thead>
                                <tr>      
                                    <th className="th1">Empresa</th>
                                    <th className="th1">Titulo</th>
                                    <th className="th1">Lugar</th>
                                    <th className="th1">URL_pagina</th>
                                    <th className="th1">Anio Publicacion</th>
                                    <th className="th1">Anuncios</th>
                                </tr>
                            </thead>

                                {Object.keys(this.state.data).map((key) => (
                                    <tbody> 
                                        <td className="cuadro-borde col-xs-1  ">{this.state.data[key].empresa}</td>
                                        <td className="cuadro-borde col-xs-1  ">{this.state.data[key].titulo}</td>
                                        <td className="cuadro-borde col-xs-1  ">{this.state.data[key].lugar}</td>
                                        <td className="cuadro-borde col-xs-1  ">{this.state.data[key].url_pagina}</td>
                                        <td className="cuadro-borde col-xs-1  ">{this.state.data[key].anio_publicacion}</td>
                                        <td className="cuadro-borde col-xs-1  ">{this.state.data[key].anuncios}</td>
                                    </tbody>
                                    
                        
                                ))}
                        </table>
                    </div>
                </div>
                
                : (
                    <div >
                        Cargando Datos...
                    </div>
                    
                )
        )
      }


    render () {

        return (
            <div>
                <h3> Estadisticas DELATI
                <ul id="nav-mobile" className=" row right  hide-on-med-and-down">
                    <li ><a className="seleccionar col" onClick={this.Regresar} >Regresar<i className="material-icons right">reply</i></a></li>
                </ul>
                </h3>

                {this.recorrerData()}
                
            </div>
        )
        
    }

}

export default EstadisticaDELATI;