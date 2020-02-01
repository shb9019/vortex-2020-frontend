import React from 'react';
import {SERVER_BASE_URL} from "../../../config/config";
import Navbar from "../../Navbar";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Leaderboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clplayers: null,
            totalRows: null,
            limit: 25,
            pageNo: parseInt(this.props.pageNo)
        };
    }

    componentDidMount() {
        this.getClplayers();
    }

    getClplayers = async () => {
        try {
            const {limit, pageNo} = this.state;
            const offset = (pageNo - 1) * limit;
            const res = await fetch(SERVER_BASE_URL + '/api/clplayer/getInOrder/' + limit + '/' + offset, {
                method: "GET",
                credentials: "include"
            });

            const data = await res.json();

            this.setState(Object.assign({}, this.state, {
                clplayers: data.clplayers,
                totalRows: parseInt(data.totalRows)
            }));
        } catch (err) {
            console.log(err);
        }
    };

    render() {
        const s = this.state;
        const clps = s.clplayers;
        const tps = s.totalRows ? (Math.ceil(s.totalRows / s.limit)) : null;//totalpages

        const numArray = tps ? new Array(tps).fill(0) : null;
        const startingRank = (s.pageNo - 1) * s.limit + 1;

        let active = s.pageNo;
        let items = [];
        for (let number = 1; number <= tps; number++) {
            console.log('/clueless/leaderboard/' + number);
            items.push(
                <Pagination.Item key={number} active={number === active} href={'/clueless/leaderboard/' + number}>
                    {number}
                </Pagination.Item>
            );
        }

        return (
            <div className="container-fluid clueless leaderboard">
                <Navbar clueless={true}/>
                <div style={{marginTop: 80}}>
                    <p id="clueless-heading">Leaderboard</p>
                    <table className="table table-bordered leaderboard-table">
                        <thead>
                        <tr>
                            <td> Rank</td>
                            <td> User</td>
                            <td> Level</td>
                        </tr>
                        </thead>
                        <tbody>
                        {clps ? clps.map((clp, idx) => (
                                <tr key={clp.id}>
                                    <td> {startingRank + idx} </td>
                                    <td> {clp.username} </td>
                                    <td> {clp.level} </td>
                                </tr>))
                            : ''
                        }
                        </tbody>
                    </table>
                    <Row style={{ width: '100%', margin: 0 }}>
                        <Col sm={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Pagination>{items}</Pagination>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Leaderboard;
