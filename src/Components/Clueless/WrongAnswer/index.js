import React from 'react';

class WrongAnswer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            images: ['wrong_ans.jpg', 'wrong_ans1.jpg', 'wrong_ans2.jpg', 'wrong_ans3.jpg',
                    'wrong_ans4.jpeg', 'wrong_ans5.jpg', 'wrong_ans6.jpg', 'wrong_ans7.png',
                    'wrong_ans8.jpg', 'wrong_ans9.jpg', 'wrong_ans10.jpeg'],
            imageIdx: Math.floor(Math.random() * 11)
        }
    }

    render() {
        const { images, imageIdx } = this.state;
        return (
            <div className="container-fluid clueless">
                <div>
                    <div>
                        <img
                            className="img-responsive"
                            id="wrong-img"
                            src={'/images/clueless/' + images[imageIdx]}
                            alt="Loading"
                            height="40px"
                            download="asdf.jpg"
                        />
                    </div>
                </div>
                <div>
                      <a id="back-link-a" href="/clueless">
                        <button id="back-link">Back to Question</button>
                      </a>
                </div>
            </div>
        );
    }
}

export default WrongAnswer;
