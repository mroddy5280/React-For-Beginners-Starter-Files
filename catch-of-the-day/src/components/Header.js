import React from 'react';
import PropTypes from 'prop-types';
/* If your component only has a render method and prop types then it can be
converted to a stateless functional component. If it is just something that gets
passed in data via props and returns some JSX then you may want to use a Stateless
Functional Component. It will save some lines of code and improve performance.
*/

// function Header(props) {
/* Can change above to be an arrow function. We could then add onto this and
make it an implicit return by removing the curly bracket and the return */
const Header = props => {
  // const Header = {tagline} => { using this syntax you can destructor you props
  return (
    <header className="top">
      <h1>
        Catch
        <span className="ofThe">
          <span className="of">of</span>
          <span className="the">the</span>
        </span>
        Day
      </h1>
      <h3 className="tagline">
        <span>{props.tagline}</span>
      </h3>
    </header>
  );
};

Header.propTypes = {
  tagline: PropTypes.string.isRequired,
};

/*
class Header extends React.Component {
  render() {
    return (
      <header className="top">
        <h1>
          Catch
          <span className="ofThe">
            <span className="of">of</span>
            <span className="the">the</span>
          </span>
          Day
        </h1>
        <h3 className="tagline">
          <span>{this.props.tagline}</span>
        </h3>
      </header>
    );
  }
}
 */
export default Header;
