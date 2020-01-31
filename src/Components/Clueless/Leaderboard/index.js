import React from 'react';
import axios from 'axios';

import '../../bootstrap/css/bootstrap.min.css';

class Leaderboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clplayers: null,
            totalRows: null,
            limit: 25,
            pageNo: parseInt(this.props.match.params.pageNo)
        };
    }

    componentDidMount() {
        this.getClplayers();
    }

    getClplayers = async () => {
        const { limit, pageNo } = this.state;
        const offset = (pageNo - 1) * limit;
        const res = await (axios.get('/api/clplayer/getInOrder/' + limit + '/' + offset));

        this.setState(Object.assign({}, this.state, {
            clplayers: res.data.clplayers,
            totalRows: parseInt(res.data.totalRows)
        }));
    }

    render() {
        const s = this.state;
        const clps = s.clplayers;
        const tps = s.totalRows ? (Math.floor(s.totalRows / s.limit) + 1) : null;//totalpages
        
        const numArray = tps ? new Array(tps).fill(0) : null;
        const startingRank = (s.pageNo - 1) * s.limit + 1;

        return (
            <div className="container-fluid clueless">
                <p id="clueless-heading">Leaderboard</p>
                <table className="table table-bordered leaderboard-table">
                    <thead>
                        <tr>
                            <td> Rank </td>
                            <td> User </td>
                            <td> Level </td>
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
                <ul class="pagination clueless-page">
                    {tps ? numArray.map((val, idx) => (
                        <li className={ (idx+1) === this.state.pageNo ? "active" : ""}>
                            <a href={"/clueless/leaderboard/" + (idx+1)}> {idx+1} </a>
                        </li>
                    ))
                    : ''
                    }
                </ul>
            </div>
        )
    }
}

export default Leaderboard;
