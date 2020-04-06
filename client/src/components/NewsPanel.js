import React, {Component} from 'react';
import axios from 'axios';

class NewsPanel extends Component{

    constructor(props) {
        super(props);

        this.state = {
            news: []
        }
    }

    componentDidMount() {
        const res = axios.get('/app/getNews');
        console.log(res.data);
    }

    render(){
        return(
            <div>News Panel</div>
        );
    }

};

export default NewsPanel;