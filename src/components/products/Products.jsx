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
        console.debug("Products component did mount/props", this.props)
    }


    getProductsTableContent = (page, size) => {
        this.props.getProducts(page, size);
    }

    render() {
        return (
            <div>
                <h1>Products</h1>
                <ProductsTable {...this.props} getProducts={this.getProductsTableContent} />
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

    categories: state.categories.state,
})

export default connect(mapStateToProps, { getProducts, deleteProduct, createProduct })(Products);