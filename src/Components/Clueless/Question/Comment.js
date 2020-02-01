import React from 'react';
import ReactDOM from 'react-dom';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        };
    }

    componentDidMount() {
        this.setState({
            text: this.props.text
        });
    }


    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            text: nextProps.text
        });
    }

    render() {
        return <div dangerouslySetInnerHTML={{ __html: `<!-- ${this.state.text} -->` }}/>;
    }
}

export default Comment;