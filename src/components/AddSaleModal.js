import React, { Component } from 'react';
import { Button, Header, Modal, Form, Dropdown } from 'semantic-ui-react';
import dateFormat from 'dateformat';

export class AddSaleModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId: '',
            productId: '',
            storeId : '',
            dateSold: dateFormat(new Date(), "isoDate"),
            open: false
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let customerId = parseInt(this.state.customerId);
        let productId = parseInt(this.state.productId);
        let storeId = parseInt(this.state.storeId);
        let dateSold = this.state.dateSold;
        const newSale = { productId, customerId, storeId, dateSold }

        fetch('api/Sales', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newSale)
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
                large
                open={this.state.open}
                trigger={<Button color='blue'>New Sale</Button>}
                onClose={() => this.setState({ open: false })}
                onOpen={() => this.setState({ open: true })}
            >
                <Header content='Create Sale' />
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
                                placeholder='Select Customer'
                                selection
                                options={cOptions}
                                onChange={(e, { value }) => this.setState({ customerId: value })}
                            />
                        </Form.Field>

                        <Form.Field>


                            <label>Product</label>

                            <Dropdown
                                placeholder='Select Product'
                                selection
                                options={pOptions}
                                onChange={(e, { value }) => this.setState({ productId: value })}

                            />
                        </Form.Field>

                        <Form.Field>


                            <label>Store</label>

                            <Dropdown
                                placeholder='Select Store'
                                selection
                                options={sOptions}
                                onChange={(e, { value }) => this.setState({ storeId: value })}
                            />
                        </Form.Field>

                    </Form>
                </Modal.Content>
                        <Modal.Actions>
                    <Button color='black' onClick={() => this.setState({ open: false })} content= 'Cancel' />
                                
                    <Button color='green' onClick={this.handleSubmit} icon='checkmark' labelPosition='right' content='Create'
                        disabled={(this.state.customerId && this.state.productId && this.state.storeId) ? false : true}
                    />
                        
                        </Modal.Actions>
                  
            </Modal >
        )

    }
}


