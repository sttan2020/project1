import React, { Component } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';


export class DeleteCusModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.theCustomer.id,
            open: false
        };
        this.handleDelete = this.handleDelete.bind(this);
    }


    handleDelete = (e) => {
        e.preventDefault();
        let id = this.state.id;
        fetch(`api/Customers/${id}`, {
            method: 'DELETE',
        }).then(
            this.setState({ open: false })
        ).then(
            window.location.reload()
        )
    }


    render() {

        return (

            <Modal
                open={this.state.open}
                trigger={<Button color="red">  <Icon name='trash' />DELETE</Button>}
                onClose={() => this.setState({ open: false })}
                onOpen={() => this.setState({ open: true })}
            >
                <Header content='Delete Customer' />
                <Modal.Content>
                    <strong> Are You Sure? </strong>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => this.setState({ open: false })} content='Cancel' />
                      
                    <Button color='red' onClick={this.handleDelete} icon='cancel' labelPosition='right' content='Delete'/>
                 
                </Modal.Actions>

            </Modal >
        )

    }
}
