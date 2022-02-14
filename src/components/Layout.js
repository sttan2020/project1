import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

    render() {

        const date = new Date();
        const year = date.getFullYear();

    return (
      <div>
        <NavMenu />
        <Container fluid>
          {this.props.children}
        </Container>

       <small> &copy;{year} - Sheng Tao </small>
        </div>
        
    );
  }
}
