﻿import React, { Component } from 'react';
import './Products.css';

export default class AddProduct extends Component {
    render() {
        return (
            <div className='addProduct'>
                <div>
                    <label>Name : </label>
                    <input id='name' type="text" value={this.props.name} onChange={this.props.handleInputChange} />                   
                </div>
                <div>
                    <label>Price : </label>
                    <input id='price' type="text" value={this.props.price} onChange={this.props.handleInputChange} />
                </div>
                <div>
                    <label>Serial Number : </label>
                    <input id='serialNumber' type="text" value={this.props.serialNumber} onChange={this.props.handleInputChange} />
                </div>
                <div>
                    <button onClick={this.props.add}>+ Add</button>
                    <button onClick={this.props.close}>Close</button>
                </div>
            </div>
            );
    }
}