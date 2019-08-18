import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  static propTypes = {
    match: PropTypes.object,
  };

  componentDidMount() {
    const { params } = this.props.match;
    // 1. Reinstate the local storage
    const localStorageRef = localStorage.getItem(params.storeid);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeid}/fishes`, {
      context: this,
      state: 'fishes',
    });
  }

  componentWillUnmount() {
    /*
      Un-mounting is exactly why we stored the database in this.ref
      Now when we leave it is very easy to remove it and clean up any memory
      issues (memory leak) we may have.
    */
    base.removeBinding(this.ref);
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeid,
      JSON.stringify(this.state.order)
    );
  }

  addFish = fish => {
    // 1. Take a copy of the existing state
    // Use an object spread
    const fishes = { ...this.state.fishes };
    // 2. Add the new fish to the fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state
    this.setState({
      // If your property and value are the same this in ES6 you can just pass it once
      // fishes: fishes, turns into the below
      fishes,
    });
  };

  updateFish = (key, updatedFish) => {
    /*
      1. take a copy of the current state We use state be cause we are in the
      state of the current component where this method is called.
    */
    const fishes = { ...this.state.fishes };
    // 2. Update the state
    fishes[key] = updatedFish;
    // 3. Call setState to update the fish
    this.setState({ fishes });
  };

  deleteFish = key => {
    // 1. take a copy of state
    const fishes = { ...this.state.fishes };
    // 2. Delete fish based on key and setting the value to null (firebase)
    fishes[key] = null;
    // 3. Update state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    // 1. Take a copy of state
    const order = { ...this.state.order };
    // 2. Either add to the order or update the number in the order.
    // In the case below key is fish1, fish2 etc.
    order[key] = order[key] + 1 || 1;
    // 3. Call setState to update the state object
    this.setState({ order });
  };

  removeFromOrder = key => {
    // 1. take a copy of state
    const order = { ...this.state.order };
    /*
      2. Remove that item from order, in this case we are not mirroring to
        fire base we can use delete
    */
    delete order[key];
    //  Call setState to update state object
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                /*
                  We need to access to the key you need to pass it a second
                  time as a prop. In our case we used index.
                */
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              >
                {key}
              </Fish>
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        {/*
          You can spread all of the state into the component that you want
          to pass things down to but you could run into some issues.
          1. Someone could add something to state you don't need in your
          component. You should not pass anything down to a component unless
          you explicitly need it.
        */}
        {/* <Order {...this.state} /> */}
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          storeId={this.props.match.params.storeid}
        />
      </div>
    );
  }
}

export default App;
