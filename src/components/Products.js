import React, { Component} from 'react';
import { Table, Pagination, Dropdown, Segment } from 'semantic-ui-react';
import './Custom.css';
import { AddProModal } from './AddProModal';
import { EditProModal } from './EditProModal';
import { DeleteProModal } from './DeleteProModal';


export class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        const response = await fetch('/api/Products');
        const data = await response.json();
        this.setState({ productList: data });
        this.setState({ loading: false });
    }

    sorting = (col) => {
        if (this.state.listAscend) {

            this.state.productList.sort(function (a, b) {

                var x = a[col].toString().toLowerCase();

                var y = b[col].toString().toLowerCase();

                return x.localeCompare(y)
            });

            this.setState({ listAscend: false });

            this.setState({ direction: 'ascending' });

        } else {

            this.state.productList.reverse(function (a, b) {

                var x = a[col].toString().toLowerCase();

                var y = a[col].toString().toLowerCase();

                return x.localeCompare(y)
            });

            this.setState({ listAscend: true });

            this.setState({ direction: 'descending' });
        }
    }

    render() {

        const productList = this.state.productList;

        const rowsPerPage = this.state.rowsPerPage;
        const currentPage = this.state.currentPage;

        const indexofLastItem = currentPage * rowsPerPage;
        const indexofFirstItem = indexofLastItem - rowsPerPage;

        const theList = productList.slice(indexofFirstItem, indexofLastItem);
        const totalPages = Math.ceil(productList.length / rowsPerPage);


        const Options = [
            { key: '5', value: '5', text: '5' },
            { key: '10', value: '10', text: '10' },
            { key: '20', value: '20', text: '20' },

        ]
        
     
        let tableData = null;
        if (productList !== "") {
            tableData = theList.map(product =>
                   <Table.Row key={product.id}>
                        <Table.Cell >{product.name}</Table.Cell>
                        <Table.Cell >{product.price}</Table.Cell>
                    <Table.Cell >
                            <EditProModal theProduct={product} />
                    </Table.Cell>
                    <Table.Cell >
                            <DeleteProModal theProduct={product} />
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
                <AddProModal/>
                <Table sortable fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell sorted={this.state.direction}
                                onClick={() => this.sorting('name')}>Name</Table.HeaderCell>
                            <Table.HeaderCell  sorted={this.state.direction}
                                onClick={() => this.sorting('price')}>Price</Table.HeaderCell>
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
