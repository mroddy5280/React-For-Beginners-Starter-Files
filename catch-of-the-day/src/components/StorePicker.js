import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  static propTypes = {
    history: PropTypes.object,
  };
  /*
    Binding in ES6 with constructor component. This becomes a bummer if you need
    to bind multiple things
  */
  // constructor() {
  //   /*
  //     Cannot run anything in a constructor before you call super. Super will
  //     create the component we are extending first.
  //   */
  //   super();
  //   // If it is not bound this will be undefined in goToStore
  //   this.goToStore = this.goToStore.bind(this);
  // }
  /*
    Creating the Ref here brings the text input to the surface of the component
  */
  myInput = React.createRef();
  //Below was used to illustrate how events are handled in React
  /*
  handelClick() {
    alert('hey');
  }
  */

  /*
    Instead of using the constructor we can change this method. Instead of
    declaring a method on the component we declare a property that is set to an
    arrow function. The property is bound to the instance rather than nothing.
    goToStore is a property on the component just like myInput and we set it to
    the arrow function which will allow us to bind this to the component. If you
    need to access this inside of a method you need to do below syntax or above
    constructor.
  */
  goToStore = event => {
    // 1. Stop the form from submitting
    event.preventDefault();
    // 2. get the text from the input
    /*
    Sorta golden rule of React is to not touch the DOM. AKA Don't manually select
    the elements. Two ways to get data from an input Refs and State. Generally
    want to use state if your going to be syncing you data.
    */
    /* BINDING IN REACT
    If we tried to go into the render method and clg this we would get the store
    picker component. However, when trying to clg this in the goToStore we get
    this as undefined. All of the methods that come with React all the built in
    methods are in the momma component which is React.Component. If we make our
    own component that extends to React.Component and any methods we add on top
    of StorePicker in this case are not bound by default. SOLUTION bind our own
    methods!
   */
    const storeName = this.myInput.current.value;
    // 3. Change the page to /store/whatever-they-entered
    /*
      We will use react router here to change the page without refreshing using
      push state. Because React Router is the parent we have access to the props
      it from the parent. In this case props.history.push
    */
    this.props.history.push(`/store/${storeName}`);
  };
  /* Every class in React must have one method in it and that is Render */
  render() {
    /*
    We don't ever touch the DOM in react outside of when we mount the
    entire application
    */
    return (
      /* In order to get things to align correctly we will return () so that the
      form element returns on a new line */
      // <p>Fish</p>
      /*
      Can not return p tag above because it is a sibling element. In JSX you
      could put them all inside a tag but can only return one element
      */
      /*
      This can be a problem when using CSS grid or Flexbox and you need to return
      multiple children elements with no wrapper. The solution is React.Fragment
      tag. You can also now use an empty tag to wrap the elements.
     */
      <form className="store-selector" onSubmit={this.goToStore}>
        {/* This is a comment in JSX where it uses the bracket */}
        <h2>Please Enter A Store</h2>
        {/*
        Events are handled inline in react like the example below. The
        onClick event then calls the handelClick function scoped to this class.
        You don't want to add () after the function because that will call it on
        page load.
         */}
        {/* <button onClick={this.handelClick}>Click me</button> */}
        <input
          type="text"
          ref={this.myInput}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store -></button>
      </form>
    );
  }
}
// Exported the StorePicker so we can use it in the index.js file
export default StorePicker;
