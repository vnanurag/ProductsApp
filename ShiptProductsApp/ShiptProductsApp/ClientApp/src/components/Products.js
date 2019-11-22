import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { actionCreators, ProductsStore } from '../store/ProductsStore';
import { IProductsStore } from '../store/ProductsStore';
import ReactDataGrid from 'react-data-grid';
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

    //columns = [
    //    {
    //        key: "name",
    //        name: "Name"
    //    },
    //    {
    //        key: "price",
    //        name: "Price",
    //        sortDescendingFirst: true
    //    },
    //    {
    //        key: "serialNumber",
    //        name: "Serial Number"
    //    }
    //].map(col => ({ ...col, ...defaultColumnProperties }));

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
                                add={this.addProduct.bind(this)}
                                close={this.closeAdd.bind(this)} />
                        </div>
                        : null}
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th onClick={(e) => this.sortColumn(e)}>Price</th>
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

    closeAdd() {
        this.setState({
            showAdd: false
        });
    }

    addProduct() {
        this.setState({
            showAdd: false
        });

        this.props.addProduct();
    }

    sortColumn(e) {
        this.props.products.sort((a, b) => a.price - b.price);
        this.props.sortColumn();

    }

    //const sortRows = (initialRows, sortColumn, sortDirection) => rows => {
    //    const comparer = (a, b) => {
    //        if (sortDirection === "ASC") {
    //            return a[sortColumn] > b[sortColumn] ? 1 : -1;
    //        } else if (sortDirection === "DESC") {
    //            return a[sortColumn] < b[sortColumn] ? 1 : -1;
    //        }
    //    };
    //    return sortDirection === "NONE" ? initialRows : [...rows].sort(comparer);
    //};
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