import React, { Component } from 'react';
import { Button, Header, Modal, Form } from 'semantic-ui-react';


export class AddStoreModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            open: false
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let name = this.state.name;
        let address = this.state.address;
        const store = { name, address }

        fetch('api/Stores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(store)
        }).then(this.setState({ open: false, name:'', address:'' })
        ).catch(error => {
            console.log(error.message);
        })
        window.location.reload();
    }


    render() {

        return (

            <Modal
                open={this.state.open}
                trigger={<Button color='blue'>New Store</Button>}
                onClose={() => this.setState({ open: false })}
                onOpen={() => this.setState({ open: true })}
            >
                <Header content='Create Store' />
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
                            <label>Address</label>
                            <input
                                type='text'
                                value={this.state.address}
                                placeholder='Address'
                                required
                                onChange={(e) => this.setState({ address: e.target.value })}
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                        <Modal.Actions>
                    <Button color='black' onClick={() => this.setState({ open: false })} content= 'Cancel' />
                                
                    <Button color='green' onClick={this.handleSubmit} disabled={(this.state.name && this.state.address) ? false : true} icon='checkmark' labelPosition='right' content= 'Create'/>
                        
                        </Modal.Actions>
                  
            </Modal >
        )

    }
}


