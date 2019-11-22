import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/ProductsStore';
import AddProduct from './AddProduct';
import '../components/Products.css';
import EditProduct from './EditProduct';

class Products extends Component {
    constructor(props) {
        super(props)
            this.state = {
                showAdd: false,
                showEdit: false,
                data: [],
                sort_order: 'asc'
        };
        
    }

    componentWillMount() {
        this.props.getAllProducts();        
    }

    render() {
        const products = this.props ? this.props.products : this.state.data;
        
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
                                handleInputChange={(e) => this.props.handleInputChange(e)}
                                add={this.addProduct.bind(this)}
                                close={this.closeAdd.bind(this)} />
                        </div>
                        : null}
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th onClick={this.sortColumn.bind(this)}>Price</th>
                            <th>Serial Number</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product =>
                            <tr key={product.productId}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.serialNumber}</td>                                
                                <td><button id='delete' onClick={() => this.deleteProduct(product.productId)}>Delete</button></td>
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

    sortColumn() {
        switch (this.state.sort_order) {
            case 'asc': {
                this.setState({
                    sort_order: 'desc'
                });
                break;
            }
            default: {
                this.setState({
                    sort_order: 'asc'
                });
                break;
            }
        }

        this.setState({
            data: this.state.sort_order === 'asc'
                ? this.props.products.sort((a, b) => a.price - b.price)
                : this.props.products.sort((a, b) => b.price - a.price)
        })
    }

    edit() {
        this.setState({
            showEdit: true
        });
    }

    closeEdit() {
        this.setState({
            showEdit: false
        });
    }

    editProduct() {

    }

    deleteProduct(id) {
        this.props.deleteProduct(id);
    }
}

export default connect(
    state => state.products,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Products);