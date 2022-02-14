import React, { Component } from 'react';
import {Menu, Segment} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import './Custom.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

  }

  render () {
    return (
        <header>
            <Segment>
           
                <Menu fixed='top' inverted>
                   
                    <Menu.Item as={Link} to="/" header>
                            React
                        </Menu.Item>
                    <Menu.Item as={Link} to="/Customers">Customers</Menu.Item>
                    <Menu.Item as={Link} to="/Products">Products</Menu.Item>
                    <Menu.Item as={Link} to="/Stores">Stores</Menu.Item>
                    <Menu.Item as={Link} to="/Sales">Sales</Menu.Item>
                       
                </Menu>
            </Segment>
       
      </header>
    );
  }
}
