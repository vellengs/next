import * as React from 'react';
import withStyles from 'material-ui/styles/withStyles';
import ReactPaginate from 'react-paginate';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import ClearIcon from 'material-ui-icons/Clear';
import ModeEdit from 'material-ui-icons/ModeEdit';
import Search from 'material-ui-icons/Search';
import Add from 'material-ui-icons/Add';
import Cached from 'material-ui-icons/Cached';
import Snackbar from 'material-ui/Snackbar';
import Input from 'material-ui/Input';
import Table, { TableBody, TableCell, TableHead, TableRow, } from 'material-ui/Table';
import Dialog, { DialogActions, DialogContent, DialogTitle, } from 'material-ui/Dialog';
const styles = {
    evenRow: {
        'background': '#f7f7f7',
    },
    menuBtn: {
        'width': '32px',
        'height': '32px',
        'border-radius': '50%',
        'background-color': '#3f51b5',
        'color': '#fff',
        'margin-left': '10px',
    },
    btnEdit: {
        'width': '32px',
        'height': '32px',
        'border-radius': '50%',
        'background-color': '#3f51b5',
        'color': '#fff',
        'margin-left': '10px',
        'box-shadow': '0px 2px 4px 0 rgba(0, 0, 0, 0.3)',
    },
    btnDelete: {
        'width': '32px',
        'height': '32px',
        'border-radius': '50%',
        'background-color': '#fff',
        'color': '#808080',
        'margin-left': '10px',
        'box-shadow': '0px 2px 4px 0 rgba(0, 0, 0, 0.3)',
    },
    root: {
        'padding': '40px 30px',
    },
    table: {
        'border-top': '1px solid rgba(235, 235, 235, 1)',
        'border-collapse': 'inherit',
    },
    tableCell: {
        'text-align': 'left',
        'padding': '0',
    },
};
class Page extends React.Component {
    constructor(props, state) {
        super(props, state);
        this.handleChangeAll = (name) => (event) => {
            const rowPage = this.state.rowsPerPage;
            const currentPage = this.state.currentPage + 1;
            if (event.target.checked) {
                for (let i = 0; i < this.state.list.length; i += 1) {
                    if (i < currentPage * rowPage && i >= (currentPage - 1) * rowPage) {
                        this.state.list[i].check = true;
                    }
                }
            }
            else {
                for (let i = 0; i < this.state.list.length; i += 1) {
                    if (i < currentPage * rowPage && i >= (currentPage - 1) * rowPage) {
                        this.state.list[i].check = false;
                    }
                }
            }
            this.setState({
                [name]: event.target.checked,
            });
        };
        this.handleChange = (pro) => (event) => {
            const rowPage = this.state.rowsPerPage;
            const currentPage = this.state.currentPage + 1;
            this.setState({
                checkedAll: true
            });
            pro.check = event.target.checked;
            for (let i = 0; i < this.state.list.length; i += 1) {
                if (i < currentPage * rowPage && i >= (currentPage - 1) * rowPage) {
                    if (this.state.list[i].check === false) {
                        this.setState({
                            checkedAll: false
                        });
                    }
                }
            }
            this.setState({
                [pro]: event.target.checked,
            });
        };
        this.handleClickRemove = (pro) => {
            this.setState({
                modalName: pro.name,
                modalId: pro.id,
                open: true,
                modalType: 0,
            });
        };
        this.handleBatchRemove = () => {
            const rowPage = this.state.rowsPerPage;
            const currentPage = this.state.currentPage + 1;
            const arr = new Array();
            for (let i = 0; i < this.state.list.length; i += 1) {
                if (i < currentPage * rowPage && i >= (currentPage - 1) * rowPage) {
                    if (this.state.list[i].check) {
                        arr.push(this.state.list[i].check);
                        this.setState({
                            open: true,
                            modalType: 1,
                            modalNum: arr.length,
                        });
                    }
                    else {
                        this.setState({
                            openMessageTip: true,
                            message: '请选择要删除的页面',
                        });
                    }
                }
            }
        };
        this.handleClose = () => {
            this.setState({ open: false });
        };
        this.handleSubmit = () => {
            this.setState({ open: false });
        };
        this.handleCloseTip = () => {
            this.setState({ openMessageTip: false });
        };
        this.handleOpenSearch = () => {
            this.setState({ openSearch: true });
        };
        this.handleCloseSearch = () => {
            if (this.state.searchValue.length < 1) {
                this.setState({ openSearch: false });
            }
        };
        this.handleChangeSearch = (name) => (event) => {
            this.setState({
                searchValue: event.target.value,
            });
        };
        this.handleSearch = () => {
            window.console.log(this.state.searchValue);
        };
        this.handlePageClick = (data) => {
            const rowPage = this.state.rowsPerPage;
            const currentPage = this.state.currentPage + 1;
            for (let i = 0; i < this.state.list.length; i += 1) {
                if (i < currentPage * rowPage && i >= (currentPage - 1) * rowPage) {
                    if (this.state.list[i].check === true) {
                        this.state.list[i].check = false;
                    }
                }
            }
            this.setState({
                currentPage: data.selected,
                checkedAll: false,
            });
        };
        this.state = {
            checkedAll: false,
            rowsPerPage: 2,
            currentPage: 0,
            open: false,
            modalId: '',
            modalName: '',
            modalType: 0,
            modalNum: 0,
            openMessageTip: false,
            openSearch: false,
            searchValue: '',
            message: '',
            list: [
                {
                    id: 1,
                    check: false,
                    name: '标题名称测试标题名称测试标题名称测试标题名称测试',
                    author: '新闻资讯1',
                },
                {
                    id: 2,
                    check: false,
                    name: '标题名称测试标题名称测试标题名称测试标题名称测试',
                    author: '新闻资讯2',
                },
                {
                    id: 3,
                    check: false,
                    name: '标题名称测试标题名称测试标题名称测试标题名称测试',
                    author: '新闻资讯3',
                },
                {
                    id: 4,
                    check: false,
                    name: '标题名称测试标题名称测试标题名称测试标题名称测试',
                    author: '新闻资讯4',
                },
                {
                    id: 5,
                    check: false,
                    name: '标题名称测试标题名称测试标题名称测试标题名称测试',
                    author: '新闻资讯5',
                },
            ],
        };
    }
    render() {
        const { currentPage, rowsPerPage, list, modalType, openMessageTip, message } = this.state;
        return (React.createElement("div", { className: "cms" },
            React.createElement("div", { className: "top-action-module clearfix" },
                React.createElement("div", { className: "left-title pull-left" },
                    React.createElement("p", { className: "crumbs" }, "CMS / \u9875\u9762\u7BA1\u7406"),
                    React.createElement("h4", { className: "title" }, "\u5168\u90E8\u9875\u9762")),
                React.createElement("div", { className: "btn-group pull-right" },
                    this.state.openSearch ?
                        React.createElement("div", { className: "input-search-module" },
                            React.createElement(Input, { placeholder: "\u8BF7\u8F93\u5165\u8981\u641C\u7D22\u7684\u5185\u5BB9", className: "input-search", value: this.state.searchValue, onChange: this.handleChangeSearch('searchValue'), onKeyUp: this.handleSearch, onBlur: this.handleCloseSearch }),
                            React.createElement(IconButton, { onClick: this.handleSearch },
                                React.createElement(Search, null))) :
                        React.createElement(IconButton, { className: this.props.classes.menuBtn, onClick: this.handleOpenSearch, title: "\u641C\u7D22" },
                            React.createElement(Search, null)),
                    React.createElement(IconButton, { className: this.props.classes.menuBtn, onClick: this.handleBatchRemove, title: "\u5220\u9664" },
                        React.createElement(DeleteIcon, null)),
                    React.createElement(Link, { to: '/cms/page/edit/' + 'add' },
                        React.createElement(IconButton, { className: this.props.classes.menuBtn, title: "\u65B0\u589E" },
                            React.createElement(Add, null))),
                    React.createElement(IconButton, { className: this.props.classes.menuBtn, title: "\u5237\u65B0" },
                        React.createElement(Cached, null)))),
            React.createElement(Paper, { className: "root-paper" },
                React.createElement("div", { className: "table-hidden" },
                    React.createElement(Table, { className: this.props.classes.table },
                        React.createElement(TableHead, { className: "table-head" },
                            React.createElement(TableRow, null,
                                React.createElement(TableCell, { className: "table-cell-status" },
                                    React.createElement(Checkbox, { checked: this.state.checkedAll, onChange: this.handleChangeAll('checkedAll'), value: "checkedAll" })),
                                React.createElement(TableCell, { className: this.props.classes.tableCell, numeric: true }, "\u9875\u9762\u540D\u79F0"),
                                React.createElement(TableCell, { className: this.props.classes.tableCell, numeric: true }, "\u4F5C\u8005"),
                                React.createElement(TableCell, { numeric: true }))),
                        React.createElement(TableBody, { className: "table-body" }, list.slice(currentPage * rowsPerPage, rowsPerPage * currentPage + rowsPerPage)
                            .map((n, index) => {
                            return (React.createElement(TableRow, { hover: true, className: index % 2 === 0 ? this.props.classes.evenRow : '', key: n.id },
                                React.createElement(TableCell, { padding: "checkbox", className: "table-cell-status" },
                                    React.createElement(Checkbox, { checked: n.check, onChange: this.handleChange(n), value: "n.check" })),
                                React.createElement(TableCell, { className: this.props.classes.tableCell, numeric: true }, n.name),
                                React.createElement(TableCell, { className: this.props.classes.tableCell, numeric: true }, n.author),
                                React.createElement(TableCell, { className: "table-action-btn", numeric: true },
                                    React.createElement(Link, { to: '/cms/page/edit/' + n.id },
                                        React.createElement(IconButton, { className: this.props.classes.btnEdit, title: "\u7F16\u8F91" },
                                            React.createElement(ModeEdit, null))),
                                    React.createElement(IconButton, { className: this.props.classes.btnDelete, onClick: () => this.handleClickRemove(n), title: "\u5220\u9664" },
                                        React.createElement(DeleteIcon, null)))));
                        })))),
                React.createElement(Snackbar, { className: "message-snack-bar", anchorOrigin: { vertical: 'top', horizontal: 'right' }, open: openMessageTip, onClose: this.handleCloseTip, SnackbarContentProps: {
                        'aria-describedby': 'message-id',
                    }, message: React.createElement("span", { id: "message-id" }, message) }),
                React.createElement("div", { className: "table-pagination" },
                    React.createElement(ReactPaginate, { previousLabel: '<', nextLabel: '>', breakLabel: React.createElement("a", { href: "javascript:;" }, "..."), breakClassName: 'break-me', pageCount: list.length / rowsPerPage, marginPagesDisplayed: 2, pageRangeDisplayed: 2, onPageChange: this.handlePageClick, containerClassName: 'pagination', activeClassName: 'active' }))),
            React.createElement(Dialog, { open: this.state.open, "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description", className: "dialog-content-action" },
                React.createElement(DialogTitle, { id: "alert-dialog-title", className: "dialog-title" },
                    React.createElement(IconButton, { onClick: this.handleClose },
                        React.createElement(ClearIcon, null))),
                React.createElement(DialogContent, { className: "dialog-content" }, modalType === 0 ? React.createElement("h4", null,
                    "\u786E\u5B9A\u8981\u5220\u9664\u9875\u9762\u540D\u79F0\"",
                    this.state.modalName,
                    "\"\u5417?") :
                    React.createElement("h4", null,
                        "\u786E\u5B9A\u8981\u5220\u9664\u8FD9\"",
                        this.state.modalNum,
                        "\"\u4E2A\u9875\u9762\u5417?")),
                React.createElement(DialogActions, { className: "dialog-actions" },
                    React.createElement(Button, { onClick: this.handleClose }, "\u53D6\u6D88"),
                    React.createElement(Button, { onClick: this.handleSubmit, autoFocus: true }, "\u786E\u8BA4\u63D0\u4EA4")))));
    }
}
export default withStyles(styles)(Page);
