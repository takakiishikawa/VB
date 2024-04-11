import React, {Component} from 'react';
import Button from '@mui/material/Button';
import {fetchGenerateArticle} from '../../../../state/modules/segment';
import {connect} from 'react-redux';
import './GenerateArticle.scss';

class GenerateArticle extends Component {

    generate = () => {
        console.log(0);
        fetchGenerateArticle(this.props.segmentId);
    }

    render() {
        return (
            <div className="generate">
                <Button
                    variant="contained"
                    style={{backgroundColor: "#3F51B5"}}
                    className="generate__button"
                    onClick={this.generate}
                >
                    Generate Article
                </Button>
            </div>
        )
    }
}

const mapDispatchToProps = {
    fetchGenerateArticle,
}

export default connect(null, mapDispatchToProps)(GenerateArticle);