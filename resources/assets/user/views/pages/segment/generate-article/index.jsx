import React, {Component} from 'react';
import Button from '@mui/material/Button';
import './GenerateArticle.scss';

class GenerateArticle extends Component {
    render() {
        return (
            <div className="generate">
                <Button variant="contained" style={{backgroundColor: "#3F51B5"}} className="generate__button">Generate Article</Button>
            </div>
        )
    }
}

export default GenerateArticle;