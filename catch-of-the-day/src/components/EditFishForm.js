import React from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends React.Component {
  static propTypes = {
    deleteFish: PropTypes.func,
    updateFish: PropTypes.func,
    index: PropTypes.string,
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number,
    }),
  };

  handelChange = event => {
    // Update that fish
    // 1. Update the fish
    const updatedFish = {
      /*
        Take a copy of the current fish and over write the one thing that
        changed. We then use computed property names to update the value of
        the current target. This is why we added the name attribute to all
        of the inputs. Now event.currentTarget.name returns the and we can
        update using value. This is much better than creating a new method for
        each field because you won't have to go update a bunch of fields
      */
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value,
    };
    this.props.updateFish(this.props.index, updatedFish);
  };
  render() {
    const { desc, image, name, price, status } = this.props.fish;
    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          onChange={this.handelChange}
          value={name}
        />
        <input
          type="text"
          name="price"
          onChange={this.handelChange}
          value={price}
        />
        <select
          type="text"
          name="status"
          onChange={this.handelChange}
          value={status}
        >
          <option value="available">Fresh</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          type="text"
          name="image"
          onChange={this.handelChange}
          value={image}
        />
        <input
          type="text"
          name="desc"
          onChange={this.handelChange}
          value={desc}
        />
        <button onClick={() => this.props.deleteFish(this.props.index)}>
          Remove Fish
        </button>
      </div>
    );
  }
}

export default EditFishForm;
