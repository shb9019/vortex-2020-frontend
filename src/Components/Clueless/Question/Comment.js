import React from 'react';
import ReactDOM from 'react-dom';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        };
    }

    setComment = (text) => {

    };

    componentDidMount() {
        this.setState({
            text: this.props.text
        });
        let el = ReactDOM.findDOMNode(this);
        ReactDOM.unmountComponentAtNode(el);
        el.outerHTML = this.props.text;
    }


    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            text: nextProps.text
        });
        let el = ReactDOM.findDOMNode(this);
        ReactDOM.unmountComponentAtNode(el);
        el.outerHTML = nextProps.text;
    }

    render() {
        return <div/>;
    }
}

export default Comment;