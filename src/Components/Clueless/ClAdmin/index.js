import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import CreateQuestion from './CreateQuestion';
import QuestionGallery from './QuestionGallery';
import ImageGallery from './ImageGallery';
import UpdateQuestion from './UpdateQuestion';
import { getAdminRedirectLink } from '../../../utils/authRedirect';

import { CL_ADMIN, EV_ADMIN, SYS_GOD, WS_ADMIN, PRH_ADMIN, OA_ADMIN } from '../../constants/adminTags';

import '../../bootstrap/css/bootstrap.min.css';

class ClAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            allowedRoles: [CL_ADMIN, SYS_GOD],
            admin: this.props.admin,
            authStatus: this.props.authStatus
        };
    }

    componentDidMount() {
        const s = this.state;

        if(s.admin && s.allowedRoles.indexOf(s.admin.role) === -1) {
            this.props.history.push(getAdminRedirectLink(s.admin.role));
        }
    }

    getPage = (admin) => ([
        <QuestionGallery admin={admin} />,
        <CreateQuestion admin={admin}/>,
        <ImageGallery admin={admin} />,
        <UpdateQuestion admin={admin} />
    ]);

    setCurrentPage = (page) => {
        this.setState(Object.assign({}, this.state, {currentPage: page}));
    }

    handleLogout = async () => {
        const res = await (axios.get('/api/admin/logout'));
        this.props.history.push('/admin/login');
    }

    render() {
        const { authStatus, admin } = this.state;
        if(admin && authStatus === 'A') {
            return (
                <div className="container-fluid">
                    <nav className="navbar navbar-inverse">
                        <div className="container-fluid">
                            <div class="navbar-header">
                                <a class="navbar-brand" href="#">Clueless Admin</a>
                            </div>
                            <ul className="nav navbar-nav">
                                <li
                                    className={this.state.currentPage === 0 ? "active" : ""}
                                    onClick={() => {this.setCurrentPage(0)}}
                                >
                                    <a>Questions</a>
                                </li>
                                <li
                                    className={this.state.currentPage === 1 ? "active" : ""}
                                    onClick={() => {this.setCurrentPage(1)}}
                                >
                                    <a>Create</a>
                                </li>
                                <li
                                    className={this.state.currentPage === 2 ? "active" : ""}
                                    onClick={() => {this.setCurrentPage(2)}}
                                >
                                    <a>Images</a>
                                </li>
                                <li
                                    className={this.state.currentPage === 3 ? "active" : ""}
                                    onClick={() => {this.setCurrentPage(3)}}
                                >
                                    <a>Update</a>
                                </li>
                            </ul>
                            <ul class="nav navbar-nav navbar-right">
                                <li>
                                    <a>
                                        <span class="glyphicon glyphicon-user"></span>
                                        {' '}{this.state.admin
                                            ? this.state.admin.username
                                            : ''
                                        }{' '}
                                    </a>
                                </li>
                                <li onClick={this.handleLogout}>
                                    <a>
                                        <span class="glyphicon glyphicon-log-out"></span>
                                        {' '}Logout{' '}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div>
                        {this.getPage(this.state.admin)[this.state.currentPage]}
                    </div>
                </div>
            );
        }
        else if(authStatus === 'LOADING') {
            return (
                <div>
                    Loading...
                </div>
            );
        }
        else {
            return (<Redirect to='/admin/login' />);
        }
    }

}

export default ClAdmin;
