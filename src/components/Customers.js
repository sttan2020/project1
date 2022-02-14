import React, { Component} from 'react';
import { Table, Pagination, Dropdown, Segment } from 'semantic-ui-react';
import './Custom.css';
import { AddCusModal } from './AddCusModal';
import { EditCusModal } from './EditCusModal';
import { DeleteCusModal } from './DeleteCusModal';



export class Customers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerList: [],
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

    //componentDidUpdate() {
    //    this.loadData();

    //}

    async loadData() {
        this.setState({ loading: true });
        const response = await fetch('api/Customers');
        const data = await response.json();
        this.setState({ customerList: data });
        this.setState({ loading: false });
    }

    sorting = (col) => {
        if (this.state.listAscend) {

            this.state.customerList.sort(function (a, b) {

                var x = a[col].toLowerCase();

                var y = b[col].toLowerCase();

                return x.localeCompare(y)
            });

            this.setState({ listAscend: false });

            this.setState({ direction: 'ascending' });

        } else {

            this.state.customerList.reverse(function (a, b) {

                var x = a[col].toLowerCase();

                var y = a[col].toLowerCase();

                return x.localeCompare(y)
            });

            this.setState({ listAscend: true });

            this.setState({ direction: 'descending' });
        }
    }


    render() {

        const customerList = this.state.customerList;


        const rowsPerPage = this.state.rowsPerPage;
        const currentPage = this.state.currentPage;


        const indexofLastItem = currentPage * rowsPerPage;
        const indexofFirstItem = indexofLastItem - rowsPerPage;

        const theList = customerList.slice(indexofFirstItem, indexofLastItem);
        const totalPages = Math.ceil(customerList.length / rowsPerPage);


        const Options = [
            { key: '5', value: '5', text: '5' },
            { key: '10', value: '10', text: '10' },
            { key: '20', value: '20', text: '20' },

        ]

        //const emptyRows = currentPage > 0 ? Math.max(0, (1 + currentPage) * rowsPerPage - customerList.length) : 0;

        let tableData = null;

        if (customerList !== "") {
            tableData = theList.map(customer =>
                <Table.Row key={customer.id}>
                    <Table.Cell className="three wide">{customer.name}</Table.Cell>
                    <Table.Cell className="three wide">{customer.address}</Table.Cell>
                    <Table.Cell className="three wide">
                        <EditCusModal theCustomer={customer} />
                    </Table.Cell>
                    <Table.Cell className="three wide">
                        <DeleteCusModal theCustomer={customer} />
                    </Table.Cell>
                </Table.Row>
            )
        }

        if (this.stateloading) {
            return (
                <h2> Loading...</h2>)
        } else {

            return (

                <React.Fragment>

                    <Segment >
                    <AddCusModal />

                        <Table sortable fixed>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell 
                                    sorted={this.state.direction}
                                    onClick={() => this.sorting('name')}>Name
                                </Table.HeaderCell>
                                <Table.HeaderCell 
                                    sorted={this.state.direction}
                                    onClick={() => this.sorting('address')}>Address
                                </Table.HeaderCell>
                                <Table.HeaderCell  >Actions</Table.HeaderCell>
                                <Table.HeaderCell >Actions</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {tableData}

                            {/*{emptyRows > 0 && (*/}
                            {/*    <Table.Row style={{ height: 53 * emptyRows }}>*/}
                            {/*        <Table.Cell colSpan={6} />*/}
                            {/*    </Table.Row>*/}
                            {/*)}*/}

                        </Table.Body>

                    </Table>

                    <Dropdown compact text={(this.state.rowsPerPage).toString()} selection options={Options} onChange={(e, { value }) => this.setState({ rowsPerPage: parseInt(value) })} />


                    <Pagination className="page"
                        activePage={currentPage}
                        totalPages={totalPages}
                        firstItem={null}
                        lastItem={null}
                        ellipsisItem={'undefined'}
                        onPageChange={(e, { activePage }) => this.setState({ currentPage: activePage })}
                    />
                        </Segment >


                </React.Fragment>

            )
        }
    }
}
