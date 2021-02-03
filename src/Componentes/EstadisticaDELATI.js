import React, { useState, useEffect} from 'react';
import CONFIG from '../Configuracion/Config';
import { browserHistory } from 'react-router-3';
import {Bar, Pie} from 'react-chartjs-2';

class EstadisticaDELATI extends React.Component {

    

    constructor(props) {
        super(props);

        this.state = {
            index_low: 1,
            index_high: 100,
            charData: {},
            data: []
        }
        this.accionboton = this.accionboton.bind(this);
        
    }

    componentWillMount () {

        fetch(CONFIG + 'oferta/listar')
          .then((response) => {
            return response.json();
          })
          .then((datos) => {
    
            this.setState({
                data: datos,
                charData: {
                    labels: [datos[1].empresa, datos[2].empresa, datos[3].empresa, datos[4].empresa, datos[5].empresa],
                    datasets: [
                        {
                            label: 'anuncios',
                            data: [
                                datos[1].anuncios,
                                datos[2].anuncios,
                                datos[3].anuncios,
                                datos[4].anuncios,
                                datos[5].anuncios
                            ],
                            backgroundColor:[
                                'rgba(255,99,132,0.6)',
                                'rgba(54,162,235,0.6)',
                                'rgba(255,206,86,0.6)',
                                'rgba(75,192,192,0.6)',
                                'rgba(153,102,255,0.6)',

                            ]
                        }
                    ]
                }
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
                    
                    
                    <div class="d-flex w-100 my-5 justify-content-center">
                        <div class="w-75">
                            <table className="table1">
                                <thead>
                                    <tr>      
                                        <th className="th1">Empresa</th>
                                        <th className="th1">Titulo</th>
                                        <th className="th1">Lugar</th>
                                        <th className="th1">Portal Job</th>
                                        <th className="th1">Año</th>
                                        <th className="th1">Anuncios</th>
                                    </tr>
                                </thead>
                                    <tbody>
                                        {Object.keys(this.state.data).slice(this.state.index_low,this.state.index_high).map((key) => (
                                            <tr> 
                                                <td className="td2 cuadro-borde margenes-padding col-xs-1  ">{this.state.data[key].empresa}</td>
                                                <td className="td2 cuadro-borde margenes-padding col-xs-1  ">{this.state.data[key].titulo}</td>
                                                <td className="td2 cuadro-borde margenes-padding col-xs-1  ">{this.state.data[key].lugar}</td>
                                                <td className="td2 cuadro-borde margenes-padding col-xs-1  ">{this.state.data[key].url_pagina}</td>
                                                <td className="td2 cuadro-borde margenes-padding col-xs-1  ">{this.state.data[key].anio_publicacion}</td>
                                                <td className="td2 cuadro-borde margenes-padding col-xs-1  ">{this.state.data[key].anuncios}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    
                            </table>
                        </div>
                    </div>

                    <div class="d-flex justify-content-center my-5">
                        <div class="w-50">
                            <Bar
                                data={this.state.charData}
                                width={5}
                                height={3}
                                options={{
                                    legend: {
                                        display: false
                                    },
                                    title:{
                                        display: true,
                                        text: 'Empresas con la mayor cantidad de anuncios publicados',
                                        fontSize: 20
                                    },
                                    scales: {
                                        yAxes: [
                                            {
                                                ticks: {
                                                    beginAtZero: true,
                                                    steps: 10,
                                                    stepValue: 6,
                                                    max: 16
                                                }
                                            }
                                        ]
                                    }
                                }}
                            />
                        </div>
                    </div>
                    
                    <div class="my-3">
                        {this.botones()}
                    </div>
                </div>
                
                
                : (
                    <div >
                        Cargando Datos...
                    </div>
                    
                )
        )
      }

    botones () {

        const arreglo = [];

        for (let index = 0; index < 100; index++) {
            arreglo.push(<button onClick={() => this.accionboton(index)}>{index+1}</button>)
            
        }
        return (
            <div>
                {arreglo}
            </div>
        );
    }

    accionboton(i) {
        var low = 0;
        var high = 0;

        low = i*100+1;
        high = low + 269;


        this.setState({
            index_low: low,
            index_high: high
        })
    }


    render () {

        return (
            <div>
                <h3> Estadisticas DELATI
                <ul id="nav-mobile" className=" row right  hide-on-med-and-down">
                    <li ><a className="seleccionar col" onClick={this.Regresar} >Regresar<i className="material-icons right">reply</i></a></li>
                </ul>
                </h3>
                <div class="text-center my-3">
                    <h1>Registro de Anuncios de Empleo por Grupo de Interes</h1>
                </div>
                {this.recorrerData()}
                
            </div>
        )
        
    }

}

export default EstadisticaDELATI;