import React, { Component } from 'react';
import { Button, Icon, Modal, Form} from 'semantic-ui-react';


export class EditStoreModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.theStore.id,
            name: this.props.theStore.name,
            address: this.props.theStore.address,
            open: false
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let id = this.state.id;
        let name = this.state.name;
        let address = this.state.address;
        const updatedStore = { id, name, address }
    
        fetch(`api/Stores/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedStore)
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
                <Modal.Header>Edit Store</Modal.Header>
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
                    <Button color='black' onClick={() => this.setState({ open: false })} content='Cancel' />
                     
                    <Button color='green' disabled={(this.state.name && this.state.address) ? false : true} onClick={this.handleSubmit} icon='checkmark' labelPosition='right' content='Update'/>
                       
                    </Modal.Actions>
         </Modal >

        ) // for return

    }

}

