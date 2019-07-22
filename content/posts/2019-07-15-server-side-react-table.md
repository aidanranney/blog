---
title: "Server side sorting, filtering and pagination with React Table"
date: "2019-07-15"
---

[React-Table](https://github.com/tannerlinsley/react-table) is billed as an excellent tool for building "lightweight, fast and extendable datagrids for React." It makes sorting, filtering and pagination very quick to get working out of the box. However, what if your data set is too cumbersome to handle client-side? React-Table includes props for setting this up, where we will enable callbacks for controlling the table with our server-side data.

    <ReactTable
        className="-highlight"
        data={this.state.data}
        page={this.state.page}
        pages={this.state.pages}
        columns={this.props.columns}
        minRows={1}
        defaultPageSize={20}
        loading={this.state.loading}
        showPagination={true}
        showPaginationTop={false}
        showPaginationBottom={true}
        pageSizeOptions={[5, 10, 20, 25, 50, 100]}
        manual
        onPageChange={pageIndex => {
            this.setState({ page: pageIndex });
        }}
        onPageSizeChange={(pageSize, pageIndex) => {
            this.setState({ page: pageIndex, pageSize: pageSize });
        }}
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