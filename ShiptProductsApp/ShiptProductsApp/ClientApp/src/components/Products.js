import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/ProductsStore';

class Products extends Component {
    componentWillMount() {
        this.props.getAllProducts();
    }
    

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ProductId</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>SerialNumber</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.products.map(product =>
                            <tr key={product.productId}>
                                <td>{product.productId}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.serialNumber}</td>
                                <td>Edit</td>
                                <td>Delete</td>
                            </tr>
                            )}
                    </tbody>
                </table>
            </div>
            );
    }
}

export default connect(
    state => state.products,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Products);