import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  Button,
  Col,
  Modal,
  Row,
} from 'react-materialize';
import NewRestaurantForm from './NewRestaurantForm';
import RestaurantList from './RestaurantList';
import {
  loadRestaurants,
  addRestaurant,
} from 'src/store/restaurants/actions';

class RestaurantListPage extends Component {
  componentDidMount() {
    this.props.loadRestaurants();
  }

  handleAddRestaurant = (newRestaurantName) => {
    this.props.addRestaurant(newRestaurantName);
    // see https://react-materialize.github.io/#/modals "No Trigger"
    // see https://materializecss.com/modals.html "Methods"
    $('#addRestaurantModal').modal('close');
  }

  handleCancelAddRestaurant = () => {
    $('#addRestaurantModal').modal('close');
  }

  render() {
    const { restaurants } = this.props;
    return (
      <div>
        <Modal
          id="addRestaurantModal"
          header="New Restaurant"
          actions={[]}
          trigger={
            <Button
              data-testid="addRestaurantButton"
            >
              Add Restaurant
            </Button>
          }
        >
          <NewRestaurantForm
            onSave={this.handleAddRestaurant}
            onCancel={this.handleCancelAddRestaurant}
          />
        </Modal>
        <Row>
          <RestaurantList restaurants={restaurants} />
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    restaurants: state.restaurants,
  };
}

const mapDispatchToProps = {
  loadRestaurants,
  addRestaurant,
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantListPage);
