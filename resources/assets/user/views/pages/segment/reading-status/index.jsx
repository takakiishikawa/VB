import React, {Component} from 'react';


class ReadingStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        const {readingStatus} = this.props;
        console.log(readingStatus, 'readingStatus');
        
        return (
            <div>
                <h1>Reading Status</h1>
                {readingStatus.map((item, index) => {
                    return (
                        <div key={index}>
                            <div>{item.title}</div>
                            <div>{item.article_theme}</div>
                            <div>{item.read_status}</div>
                        </div>
                    )
                })}
            </div>
        )
    }
}


export default ReadingStatus;