---
title: "Server side sorting, filtering and pagination with React Table"
date: "2019-07-15"
---

[React-Table](https://github.com/tannerlinsley/react-table) is billed as an excellent tool for building "lightweight, fast and extendable datagrids for React." It makes sorting, filtering and pagination very quick to get working out of the box. However, what if your data set is too cumbersome to handle client-side? React-Table includes props for setting this up, where we will enable callbacks for controlling the table with our server-side data.

    <ReactTable
        //Our component state holds current table data, as well as pagination info
        data={this.state.data}
        page={this.state.page}
        pages={this.state.pages}

        //Some props for styling the table and enabling pagination controls
        className="-highlight"
        columns={this.props.columns}
        minRows={1}
        defaultPageSize={20}
        loading={this.state.loading}
        showPagination={true}
        showPaginationTop={false}
        showPaginationBottom={true}
        pageSizeOptions={[5, 10, 20, 25, 50, 100]}

        //Set the manual prop when enabling server-side data
        manual

        //Keep the component state in sync with the table's controlled props
        onPageChange={pageIndex => {
            this.setState({ page: pageIndex });
        }}
        onPageSizeChange={(pageSize, pageIndex) => {
            this.setState({ page: pageIndex, pageSize: pageSize });
        }}

        //Callback to respond to requests for new data, whether on page load or interactions with the table
        onFetchData={(state, instance) => {
        this.setState({ loading: true });
        fetchRecordData(
            "records",
            this.props.type,
            state.page,
            state.pageSize,
            state.sorted,
            this.props.filter,
            res => {
            this.setState({
                data: res.data,
                page: state.page,
                pages: res.pages,
                loading: false
            });
            }
        );
        }}
    />

React Table will call onFetchData each time componentDidMount is triggered. In our example, we have provided a function which returns another callback where we call setState. How you handle fetching data here is up to you and what your API expects/returns. We are passing values to sort results and/or filter results by, along with the API endpoint we want to hit, and the category being requested.

Note that when a column header is selected to sort the data by, the table's internal state is updated. For all interactions with the table, the new internal values are being accessed for the API request. The internal updates trigger other callbacks where state is kept in sync ["onPageChange", "onPageSizeChange"].