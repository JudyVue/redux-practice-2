import React from 'react';
import { connect } from 'react-redux';

//Connect: our provider has a store, and now we need to connect what happens when we get our reducer to our store and our store to our provider, connect allows us to map state to props so we can bind props to state

import { 
  categoryCreate,
  categoryDelete,
  categoryUpdate,
} from './../../action/category-actions';

import CategoryForm from './../category-form/index';

class DashboardContainer extends React.Component {
  componentDidMount() {
    //these are not possible unless we bind some sort of action to our props, which is solved by mapDispatchToProps
    //these are dispatched immediately within our app
    this.props.categoryCreate({ title: '1 category'});
    this.props.categoryCreate({ title: '2 category'});
    this.props.categoryCreate({ title: '3 category'})
  }


  render() {
    return (
      <main className='dashboard-container'>
        <h2>Dashboard</h2>
        {/* <h4>TEST PROP: {this.props.testProp}</h4> */}
        <CategoryForm 
          buttonText='create category'
          onComplete={this.props.categoryCreate} //this property is different from how we've usually passed in props to a component, it is a prop that lives on the state of the app
        />
        {
          this.props.categories.map(item => 
          <div key={item.id}>
            <h3
              onClick={() => {
                this.props.renderTestProp(item);
              }}
            >
            {item.title}
            {item.testProp && ` ${item.testProp}`}
            </h3>
          </div>)
        }
      </main>
    )
  }
}

//anytime I say this.props.categories, give me my whole state of the app
const mapStateToProps = (state) => {
  console.log(state)
  return {
    categories: state.categories,
  };
}

const mapDispatchToProps = (dispatch, getState) => {
  console.log(getState, 'getState arg in mapDispatchToProps')
  return {
    //categoryCreate = type, category=payload
    categoryCreate: (category) => dispatch(categoryCreate(category)),
    categoryUpdate: (category) => dispatch(categoryUpdate(category)),
    categoryDelete: (category) => dispatch(categoryDelete(category)),
    renderTestProp: (item) => {
      dispatch({ 
        type: 'TESTPROP_RENDER', 
        payload: `: ${item.title} added as testProp`,
        id: item.id,
      })
    },
  }
}

//the above methods dispatch an item and a payload, and that hits our reducer, which hits our store, which hits our provider, and hands it to our app

//now we need to tell React and Redux to talk to each other
//we need to bind a function to this dispatch which calls whatever that action is with that specific payload

//when we export this module, we call mapStateToProps and mapDispatchToProps, which attaches categoryCreate/Update/Delete as props that can now be used within our components that are now within our dashboard container
export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);

//because this is on parent component, all child components can access those props

//if we want to call categoryCreate/Update/Delete in any component, we just pass it down into those components by saying "categoryCrate={something}", etc.