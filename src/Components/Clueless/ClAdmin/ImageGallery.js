import React from 'react';
import axios from 'axios';

import '../../bootstrap/css/bootstrap.min.css';

class ImageGallery extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            images: null,
            admin: this.props.admin
        };
    }

    componentDidMount() {
        this.getImages();
    }

    getImages = async () => {
        let res = await(axios.get('/api/question/getAllImages'));
        this.setState(Object.assign({}, this.state, {images: res.data.images}));
    }

    render() {
        const imgs = this.state.images;
        return (
            <div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <td> S.No. </td>
                            <td> Name </td>
                            <td> Image </td>
                        </tr>
                    </thead>
                    <tbody>
                        {imgs ? imgs.map((img, i) => (
                                <tr key={i}>
                                    <td> {i + 1} </td>
                                    <td> {img} </td>
                                    <td>
                                        <img
                                            className="img-responsive"
                                            src={'/images/clueless/' + img}
                                            alt="Loading"
                                            download="asdf.jpg"
                                        />
                                    </td>
                                </tr>))
                            : ''
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ImageGallery;
