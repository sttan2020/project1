import React, { Component} from 'react';
import { Table, Pagination, Dropdown, Segment } from 'semantic-ui-react';
import './Custom.css';
import { AddStoreModal } from './AddStoreModal';
import { EditStoreModal } from './EditStoreModal';
import { DeleteStoreModal } from './DeleteStoreModal';

export class Stores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storeList: [],
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
        const response = await fetch('api/Stores');
        const data = await response.json();
        this.setState({ storeList: data });
        this.setState({ loading: false });   
    }

    sorting = (col) => {
        if (this.state.listAscend) {

            this.state.storeList.sort(function (a, b) {

                var x = a[col].toLowerCase();

                var y = b[col].toLowerCase();

                return x.localeCompare(y)
            });

            this.setState({ listAscend: false });

            this.setState({ direction: 'ascending' });

        } else {

            this.state.storeList.reverse(function (a, b) {

                var x = a[col].toLowerCase();

                var y = a[col].toLowerCase();

                return x.localeCompare(y)
            });

            this.setState({ listAscend: true });

            this.setState({ direction: 'descending' });
        }
    }

    render() {

        const storeList = this.state.storeList;
        const rowsPerPage = this.state.rowsPerPage;
        const currentPage = this.state.currentPage;

        const indexofLastItem = currentPage * rowsPerPage;
        const indexofFirstItem = indexofLastItem - rowsPerPage;

        const theList = storeList.slice(indexofFirstItem, indexofLastItem);
        const totalPages = Math.ceil(storeList.length / rowsPerPage);


        const Options = [
            { key: '5', value: '5', text: '5' },
            { key: '10', value: '10', text: '10' },
            { key: '20', value: '20', text: '20' },

        ]
     
        let tableData = null;

        if (storeList !== "") {
            tableData = theList.map(store =>
                    <Table.Row key={store.id}>
                        <Table.Cell >{store.name}</Table.Cell>
                        <Table.Cell >{store.address}</Table.Cell>
                    <Table.Cell >
                            <EditStoreModal theStore={store} />
                    </Table.Cell>
                    <Table.Cell >
                            <DeleteStoreModal theStoreId={store.id} />
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
                <AddStoreModal/>
                <Table sortable fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell  sorted={this.state.direction}
                                onClick={() => this.sorting('name')}>Name</Table.HeaderCell>
                            <Table.HeaderCell sorted={this.state.direction}
                                onClick={() => this.sorting('address')} >Address</Table.HeaderCell>
                            <Table.HeaderCell  >Actions</Table.HeaderCell>
                            <Table.HeaderCell >Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {tableData}

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

