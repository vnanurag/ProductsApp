import React, { Component } from 'react';
import './Products.css';

export default class EditProduct extends Component {
    render() {
        return (
            <div className='addProduct'>
                <div>
                    <label>Name : </label>
                    <input id='editName' type="text" value={this.props.name} onChange={this.props.handleInputChange} />
                </div>
                <div>
                    <label>Price : </label>
                    <input id='editPrice' type="text" value={this.props.price} onChange={this.props.handleInputChange} />
                </div>
                <div>
                    <label>Serial Number : </label>
                    <input id='editSerialNumber' type="text" value={this.props.serialNumber} onChange={this.props.handleInputChange} />
                </div>
                <div>
                    <button onClick={this.props.update}>+ Update</button>
                    <button onClick={this.props.close}>Close</button>
                </div>
            </div>
        );
    }
}