import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
  static propTypes = {
    addToOrder: PropTypes.func,
    details: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number,
    }),
  };
  // handleClick = () => {
  //   this.props.addToOrder(this.props.index);
  // };
  render() {
    /*
      Can use destructing to break down the props into variables. Now we don't
      need to write out this.props.details.name etc for each variable
    */
    const { image, name, price, desc, status } = this.props.details;
    const isAvailable = status === 'available';
    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          {/* Used a helper class here to format the price back to USD */}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        {/* Below a ternary operator to show different text based on the boolean */}
        {/* <button disabled={!isAvailable} onClick={this.handleClick}> */}
        {/*
          Above can be done inline as shown below. Rule of thumb is that if
          you only need to do it once then it is ok to do it inline and not create
          the handleClick method
        */}
        <button
          disabled={!isAvailable}
          onClick={() => this.props.addToOrder(this.props.index)}
        >
          {isAvailable ? ' Add to Order' : 'Sold Out!'}
        </button>
      </li>
    );
  }
}

export default Fish;
