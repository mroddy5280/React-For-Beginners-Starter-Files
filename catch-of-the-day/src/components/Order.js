import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { formatPrice } from '../helpers';

class Order extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func,
  };

  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === 'available';
    const transitionOptions = {
      classNames: 'order',
      key,
      timeout: { enter: 5000, exit: 5000 },
    };
    /*
      Adding the fish && (above) to make sure there is a fish before checking if it is
      available and checking if there is no fish and returning null (below) ensures
      that there is a fish before trying to set the order state from local storage.
    */
    if (!fish) return null;
    if (!isAvailable) {
      /*
        Hick-up here by not returning the JSX. Caused it to fail with error
        "Expected an assignment or function call and instead saw an expression
        no-unused-expressions"
      */
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry {fish ? fish.name : 'fish'} is no longer available
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 5000, exit: 5000 }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            {formatPrice(count * fish.price)}
            <button onClick={() => this.props.removeFromOrder(key)}>
              &times;
            </button>
          </span>
        </li>
      </CSSTransition>
    );
  };
  render() {
    const orderIds = Object.keys(this.props.order);
    /*
      Reduce is sorta like a for loop or a map but instead of returning a
      new item like from a map or instead of looping and updating an external
      variable like a for loop. Reduce will take in some data and return sorta
      like a tally. It can do a lot more than just return a tally. When using
      reduce you do need to pass in a starting value at the end of the function
    */
    // prevTotal is like a tally and the key is fish1, fish2, etc
    const total = orderIds.reduce((prevTotal, key) => {
      // grabbing the actual fish we are looping over
      const fish = this.props.fishes[key];
      // How many of the fish they are buying
      const count = this.props.order[key];

      const isAvailable = fish && fish.status === 'available';
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Orders</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
