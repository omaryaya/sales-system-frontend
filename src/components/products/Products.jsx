import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProducts, deleteProduct, createProduct } from '../../actions/products';
import ProductsTable from './ProductsTable';

class Products extends Component {

    static propTypes = {

        content: PropTypes.array.isRequired,
        last: PropTypes.bool,
        page: PropTypes.number.isRequired,
        size: PropTypes.number,
        totalElements: PropTypes.number.isRequired,
        totalPages: PropTypes.number.isRequired,

        categories: PropTypes.array,
    }

    componentDidMount() {
        this.props.getProducts();
    }

    render() {
        return (
            <div>
                <h1>Products</h1>
                <ProductsTable {...this.props} getProducts={this.props.getProducts} />
            </div>
        );
    }
}

const mapStateToProps = state => ({

    content: state.products.content,
    last: state.products.last,
    page: state.products.page,
    size: state.products.size,
    totalElements: state.products.totalElements,
    totalPages: state.products.totalPages,
})

export default connect(mapStateToProps, { getProducts, deleteProduct, createProduct })(Products);