import React, {Component} from 'react';
import styled, { keyframes } from "styled-components";

const collapseIn = keyframes`
  from {
    transform: scaleY(0);
  }

  to {
    transform: scaleY(1);
  }
`;

const StyledUL = styled.ul`
  animation: 75ms ${collapseIn} linear;
  transform-origin: top center;
`;

class Categories extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openTab: null
    };
  }

  toggleTab = category =>
    this.setState(prev => ({ openTab: prev.openTab ? null : category }));

    
  render() {
    const { categories, subCategories } = this.props;
    return (
      <React.Fragment>
        {categories.map(category => (
          <h4>{category.name}</h4>
                   
        ))}
        <h4>subCategories</h4>
        <div>
        {subCategories
          .map(subCategory => (
            <li>{subCategory.name}</li>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Categories;