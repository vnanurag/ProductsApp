import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { actionCreators, ProductsStore } from '../store/ProductsStore';
import { IProductsStore } from '../store/ProductsStore';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import AddProduct from './AddProduct';
import '../components/Products.css';

class Products extends Component {
    constructor(props) {
        super(props)
            this.state = {
                showAdd: false
        };
    }

    componentWillMount() {
        this.props.getAllProducts();
    }

    render() {
        return (
            <div>
                <div><h3>Products</h3></div>
                <div>
                    <button id='add' onClick={this.add.bind(this)}>+ Add Product</button>
                    {this.state.showAdd ?
                        <div>
                            <AddProduct
                                name={this.props.product.name}
                                price={this.props.product.price}
                                serialNumber={this.props.product.serialNumber}
                                handleNameChange={(e) => this.props.handleInputChange(e)}
                                handlePriceChange={(e) => this.props.handleInputChange(e)}
                                handleSerialNumberChange={(e) => this.props.handleInputChange(e)}
                                add={this.addProduct.bind(this)} />
                        </div>
                        : null}
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th onClick={e => sortColumn(e, this.props)}>Price</th>
                            <th>Serial Number</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.products.map(product =>
                            <tr key={product.productId}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.serialNumber}</td>
                                <td><button id='edit' onClick={editProduct}>Edit</button></td>
                                <td><button id='delete' onClick={deleteProduct}>Delete</button></td>
                            </tr>
                            )}
                    </tbody>
                </table>
            </div>
            );
    }

    add() {
        this.setState({
            showAdd: true
        });
    }

    addProduct() {
        this.setState({
            showAdd: false
        });

        this.props.addProduct();
    }
}

const sortColumn = (e, props) => {
    //console.log(props.products);
    //if (props.products) {
    //    console.log(props.products.sort((a, b) => a.price - b.price));
    //    return props.products.sort((a, b) => a.price - b.price);
    //}
    console.log("Sort");
}



const editProduct = () => {
    console.log("Edit");
}

const deleteProduct = () => {
    console.log("Delete");
}

export default connect(
    state => state.products,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Products);