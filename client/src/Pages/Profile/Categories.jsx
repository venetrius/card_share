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
          <div onClick={() => this.toggleTab(category.id)}>
            <h4>{category.name}</h4>
            {this.state.openTab === category.id ? (
              <StyledUL>
                {subCategories
                  .filter(subCategory => subCategory.category_id === category.id)
                  .map(subCategory => (
                    <p>{subCategory.name}</p>
                  ))}
              </StyledUL>
            ) : null}
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default Categories;