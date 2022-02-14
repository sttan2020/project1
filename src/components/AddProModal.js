import React, { Component } from 'react';
import { Button, Header, Modal, Form } from 'semantic-ui-react';


export class AddProModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            open: false
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = (e) => {
        var name = this.state.name;
        var price = parseFloat(this.state.price);
        const product = { name, price }

        fetch('api/Products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        }).then(this.setState({ open: false, name:'', price:'' })
        ).catch(error => {
            console.log(error.message);
        })
        window.location.reload();
    }


    render() {

        return (

            <Modal
                open={this.state.open}
                trigger={<Button color='blue'>New Product</Button>}
                onClose={() => this.setState({ open: false })}
                onOpen={() => this.setState({ open: true })}
            >
                <Header content='Create Product' />
                <Modal.Content>
                    <Form >
                        <Form.Field>
                            <label>Name</label>
                            <input
                                type='text'
                                value={this.state.name}
                                placeholder='Name'
                                required
                                onChange={(e) => this.setState({ name: e.target.value })}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Price</label>
                            <input
                                type='text'
                                value={this.state.price}
                                placeholder='Price'
                                required
                                onChange={(e) => this.setState({ price: e.target.value })}
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                        <Modal.Actions>
                    <Button color='black' onClick={() => this.setState({ open: false })} content= 'Cancel' />
                                
                    <Button color='green' onClick={this.handleSubmit} disabled={(this.state.name && this.state.price) ? false : true} icon='checkmark' labelPosition='right' content= 'Create'/>
                        
                        </Modal.Actions>
                  
            </Modal >
        )

    }
}


