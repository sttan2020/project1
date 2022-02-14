import React, { Component } from 'react';
import { Table, Pagination, Dropdown, Segment } from 'semantic-ui-react';
import './Custom.css';
import { AddSaleModal } from './AddSaleModal';
import { EditSaleModal } from './EditSaleModal';
import { DeleteSaleModal } from './DeleteSaleModal';
import dateFormat from 'dateformat';

export class Sales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saleList: [],
            customerList: [],
            storeList: [],
            productList: [],
            currentPage: 1,
            rowsPerPage: 10,
            direction: null,
            listAscend: true,
            loading: false
        };
        this.loadData = this.loadData.bind(this);
        this.sorting = this.sorting.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        this.setState({ loading: true });

        const saleResponse = await fetch('api/Sales');
        const saleData = await saleResponse.json();

        const cusResponse = await fetch('/api/Customers');
        const cusData = await cusResponse.json();

        const proResponse = await fetch('/api/Products');
        const proData = await proResponse.json();

        const storeResponse = await fetch('/api/Stores');
        const storeData = await storeResponse.json();

        this.setState({ saleList: saleData });
        this.setState({ customerList: cusData });
        this.setState({ productList: proData });
        this.setState({ storeList: storeData });

    }

    sorting = (col) => {
        if (this.state.listAscend) {

            this.state.saleList.sort(function (a, b) {

                var x = a[col].toLowerCase();

                var y = b[col].toLowerCase();

                return x.localeCompare(y)
            });

            this.setState({ listAscend: false });

            this.setState({ direction: 'ascending' });

        } else {

            this.state.saleList.reverse(function (a, b) {

                var x = a[col].toLowerCase();

                var y = a[col].toLowerCase();

                return x.localeCompare(y)
            });

            this.setState({ listAscend: true });

            this.setState({ direction: 'descending' });
        }
    }

    render() {


        const saleList = this.state.saleList;
        const customerList = this.state.customerList;
        const productList = this.state.productList;
        const storeList = this.state.storeList;

        const rowsPerPage = this.state.rowsPerPage;
        const currentPage = this.state.currentPage;

        const indexofLastItem = currentPage * rowsPerPage;
        const indexofFirstItem = indexofLastItem - rowsPerPage;

        const theList = saleList.slice(indexofFirstItem, indexofLastItem);
        const totalPages = Math.ceil(saleList.length / rowsPerPage);

        const Options = [
            { key: '5', value: '5', text: '5' },
            { key: '10', value: '10', text: '10' },
            { key: '20', value: '20', text: '20' },

        ]



        let tableData = null;
        if (saleList !== "") {
            tableData = theList.map(sale =>
                <Table.Row key={sale.id}>
                    <Table.Cell >{sale.customerName} </Table.Cell>
                    <Table.Cell >{sale.productName} </Table.Cell>
                    <Table.Cell >{sale.storeName} </Table.Cell>
                    <Table.Cell >{dateFormat(sale.dateSold, "dS mmmm, yyyy")}</Table.Cell>

                    <Table.Cell>
                        <EditSaleModal saleId={sale.id} cusName={sale.customerName} productName={sale.productName} storeName={sale.storeName}
                            dateSold={dateFormat(sale.dateSold, "isoDate")}
                            theCustomerList={customerList} theProductList={productList} theStoreList={storeList} />
                    </Table.Cell>
                    <Table.Cell >
                        <DeleteSaleModal saleId={sale.id} />
                    </Table.Cell>
                </Table.Row>
            )
        }

        if (this.stateloading) {
            return (
                <h2> Loading...</h2>)
        } else {
            return (

                <React.Fragment >

                    <Segment >
                        <AddSaleModal theSaleList={saleList} theCustomerList={customerList} theProductList={productList} theStoreList={storeList} />
                        <Table sortable fixed>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell sorted={this.state.direction}
                                        onClick={() => this.sorting('customerName')}>Customer</Table.HeaderCell>
                                    <Table.HeaderCell sorted={this.state.direction}
                                        onClick={() => this.sorting('productName')}>Product</Table.HeaderCell>
                                    <Table.HeaderCell sorted={this.state.direction}
                                        onClick={() => this.sorting('storeName')}>Store</Table.HeaderCell>
                                    <Table.HeaderCell sorted={this.state.direction}
                                        onClick={() => this.sorting('dateSold')}>Date Sold</Table.HeaderCell>
                                    <Table.HeaderCell >Actions</Table.HeaderCell>
                                    <Table.HeaderCell >Actions</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {tableData}

                            </Table.Body>

                        </Table>

                        <Dropdown compact text={rowsPerPage.toString()} selection options={Options} onChange={(e, { value }) => this.setState({ rowsPerPage: parseInt(value) })} />


                        <Pagination className="page"
                            activePage={currentPage}
                            totalPages={totalPages}
                            firstItem={null}
                            lastItem={null}
                            ellipsisItem={'undefined'}
                            onPageChange={(e, { activePage }) => this.setState({ currentPage: activePage })}
                        />

                    </Segment>
                </React.Fragment>

            )
        }
    }

}