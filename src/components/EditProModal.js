import React, { Component } from 'react';
import { Button, Icon, Modal, Form} from 'semantic-ui-react';


export class EditProModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.theProduct.id,
            name: this.props.theProduct.name,
            price: this.props.theProduct.price,
            open: false
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let id = this.state.id;
        let name = this.state.name;
        let price = parseFloat(this.state.price);
        const updatedProduct = { id, name, price }
    
        fetch(`api/Products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProduct)
        }).then(this.setState({ open: false })
        ).catch(error => {
            console.log(error.message);
        })
        window.location.reload();
    }


    render() {

        return (

            <Modal
                open={this.state.open}
                trigger={<Button color="yellow">  <Icon name='edit' />EDIT </Button>}
                onClose={() => this.setState({ open: false })}
                onOpen={() => this.setState({ open: true })}
            >
                <Modal.Header>Edit Product</Modal.Header>
                <Modal.Content>
                    <Form  >
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
                    <Button color='black' onClick={() => this.setState({ open: false })} content='Cancel' />
                     
                    <Button color='green' disabled={(this.state.name && this.state.price) ? false : true} onClick={this.handleSubmit} icon='checkmark' labelPosition='right' content='Update'/>
                       
                    </Modal.Actions>
         </Modal >

        ) // for return

    }

}

