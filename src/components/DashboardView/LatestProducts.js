import {
  Box,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProductsList } from '../../actions/products';


const useStyles = makeStyles(({
  root: {
    // height: '100%'
  },
  image: {
    height: 48,
    width: 48
  }
}));

const LatestProducts = ({ className, ...rest }) => {
  const classes = useStyles();
  const products = rest.productsList;

  useEffect(() => {
    rest.getProductsList();
  }, []);

  return (
    <Card
      className={clsx(classes.root, className)}
      // {...rest}
    >
      <CardHeader
        subtitle={`${products.length} in total`}
        title="Latest Products"
      />
      <Divider />
      <List>
        {products.slice(0,Math.min(products.length, 6)).map((product, i) => (
          <ListItem
            divider={i < products.length - 1}
            key={product.id}
          >
            {/* <ListItemAvatar>
              <img
                alt=""
                className={classes.image}
                src={product.imageUrl}
              />
            </ListItemAvatar> */}
            <ListItemText
              primary={product.name}
              secondary={"Price: "+product.price}
            />
            <IconButton
              edge="end"
              size="small"
            >
              <MoreVertIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Typography><Link to="/products" >View All</Link></Typography>
      </Box>
    </Card>
  );
};

LatestProducts.propTypes = {
  className: PropTypes.string,
  productsList: PropTypes.array,
  getProductsList: PropTypes.func
};

const mapStateToProps = state => ({
  productsList : state.products.productsList,
});

export default connect(mapStateToProps, {getProductsList})(LatestProducts);
