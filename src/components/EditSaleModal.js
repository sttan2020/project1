import React, { Component } from 'react';
import { Button, Icon, Modal, Form, Dropdown} from 'semantic-ui-react';


export class EditSaleModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.saleId,
            customerName: this.props.cusName,
            productName: this.props.productName,
            storeName: this.props.storeName,
            dateSold: this.props.dateSold,

            customerId: '',
            productId: '',
            storeId: '',
            open: false
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let id = this.state.id;
        let customerId = parseInt(this.state.customerId);
        let productId = parseInt(this.state.productId);
        let storeId = parseInt(this.state.storeId);
        let dateSold = this.state.dateSold;
        const updatedSale = { id, productId, customerId, storeId, dateSold }
      
        fetch(`api/Sales/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedSale)
        }).then(this.setState({ open: false })
        ).catch(error => {
            console.log(error.message);
        })

        window.location.reload();
    }


    render() {

        const theCustomerList = this.props.theCustomerList;
        const theProductList = this.props.theProductList;
        const theStoreList = this.props.theStoreList;


        let cOptions = theCustomerList.map((c) => ({
            key: c.id,
            text: c.name,
            value: c.id,
        }));

        let pOptions = theProductList.map((c) => ({
            key: c.id,
            text: c.name,
            value: c.id,
        }));

        let sOptions = theStoreList.map((c) => ({
            key: c.id,
            text: c.name,
            value: c.id,
        }));

        return (

            <Modal
                open={this.state.open}
                trigger={<Button color="yellow">  <Icon name='edit' />EDIT </Button>}
                onClose={() => this.setState({ open: false })}
                onOpen={() => this.setState({ open: true })}
            >
                <Modal.Header>Edit Sale</Modal.Header>
                <Modal.Content>
                    <Form >
                        <Form.Field>
                            <label>Date Sold</label>
                            <input
                                type='text'
                                value={this.state.dateSold}
                                placeholder={this.state.dateSold}
                                required
                                onChange={(e) => this.setState({ dateSold: e.target.value })}
                            />
                        </Form.Field>

                        <Form.Field>


                            <label>Customer</label>

                            <Dropdown
                                placeholder={this.state.customerName}
                                selection
                                options={cOptions}
                                onChange={(e, { value }) => this.setState({ customerId: value })}
                            />
                        </Form.Field>

                        <Form.Field>


                            <label>Product</label>

                            <Dropdown
                                placeholder={this.state.productName}
                                selection
                                options={pOptions}
                                onChange={(e, { value }) => this.setState({ productId: value })}

                            />
                        </Form.Field>

                        <Form.Field>


                            <label>Store</label>

                            <Dropdown
                                placeholder={this.state.storeName}
                                selection
                                options={sOptions}
                                onChange={(e, { value }) => this.setState({ storeId: value })}
                            />
                        </Form.Field>

                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => this.setState({ open: false })} content='Cancel' />
                     
                    <Button color='green' onClick={this.handleSubmit} icon='checkmark' labelPosition='right' content='Update'
                    disabled={(this.state.customerId && this.state.productId && this.state.storeId) ? false : true}
                    />
                       
                    </Modal.Actions>
         </Modal >

        ) // for return

    }

}

