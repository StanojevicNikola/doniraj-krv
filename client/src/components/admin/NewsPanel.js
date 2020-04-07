import React, {Component} from 'react';
import {Accordion, Card, Button, Nav, Tab, Row, Form } from "react-bootstrap";
import axios from 'axios';

const fakeNews = [
    {
        title: 'News Title #1',
        description: 'SVI CE IZGINEMO',
        date: '24.5.2012'
    },
    {
        title: 'News Title #2',
        description: 'SVI CE IZGINEMO',
        date: '26.07.1984'}
];

class NewsPanel extends Component{

    constructor(props) {
        super(props);
        this.state = {
            news: [],
            status: 'Create new',
            send: 'Submit',
            key: 'first',
            errors: {},
            cards: []
        }

        this.myRef = React.createRef();

        this.renderNews = this.renderNews.bind(this);
        this.createNews = this.createNews.bind(this);
        this.updateNews = this.updateNews.bind(this);
        this.sendNews = this.sendNews.bind(this);
        this.setFirst = this.setFirst.bind(this);
        this.setSecond = this.setSecond.bind(this);
        // this.setCards = this.setCards.bind(this);
    }

    componentDidMount() {
        // const res = axios.get('/app/getNews');
        this.setState({news: fakeNews});
    }

    renderNews(){

        const cards = this.state.news.map( (article, index)=> {
            return (
                <Card key={index}>
                    <Accordion.Toggle as={Card.Header} eventKey={index}>
                        {article.title}
                        <span className="right">
                            <Nav.Link onClick={this.updateNews}>Edit</Nav.Link>
                        </span>
                        <div style={{fontStyle: 'italic', fontSize: '12px'}}>{article.date}</div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={index}>
                        <Card.Body>{article.description}</Card.Body>
                    </Accordion.Collapse>
                </Card>
            )
        });

        return (
            <Accordion defaultActiveKey="0">
                {cards}
            </Accordion>
        );
    }

    validate(title, description){

        let errors = {};
        let clear = {};

        if(title == undefined || title === '')
            errors["title"] = 'Required field!';
        else{
            errors["title"] = '';
            clear["title"] = true;
        }

        if(description == undefined || description === '')
            errors["description"] = 'Required field!';
        else{
            errors["description"] = '';
            clear["description"] = true;
        }
        
        this.setState({
            errors: errors
        });

        return clear["title"] && clear["description"];
    }

    clearFealds(event){

        event.target.form.exampleFormControlInput1.value = '';
        event.target.form.exampleFormControlTextarea1.value = '';
    }

    sendNews(e) {

        e.preventDefault();
        const title = e.target.form.exampleFormControlInput1.value;
        const description = e.target.form.exampleFormControlTextarea1.value;

        if(this.state.send == "Submit") {

            if(this.validate(title, description)){
            
                const res = axios.post('/admin/createNews', {
                    title,
                    description,
                    date: new Date()
                });

                this.setFirst();
                this.clearFealds(e);
            }
        }
        if(this.state.send == "Save"){

            if(this.validate(title, description)){
            
                const res = axios.post('/admin/updateNews', {
                    title,
                    description,
                    date: new Date()
                });

                this.setFirst();
                this.clearFealds(e);
            }
        }
    }

    createNews(){
        return(
            <Form>
                <Form.Group controlId="exampleFormControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" />
                    <span style={{color: "red"}}>{this.state.errors.title}</span>
                </Form.Group>
                <Form.Group controlId="exampleFormControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                    <span style={{color: "red"}}>{this.state.errors.description}</span>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={this.sendNews}>
                    {this.state.send}
                </Button>
            </Form>
        );
    }

    updateNews(e){

        // e.target.form.exampleFormControlInput1.value = "title";
        // e.target.form.exampleFormControlTextarea1.value = "decsription";

        this.setState({
            status: 'Update',
            send: 'Save',
            key: 'second'
        });
    }

    setFirst(){
        this.setState({
            status: 'Create new',
            send: 'Submit',
            key: 'first'
        })
    }

    setSecond(){
        this.setState({
            key: 'second'
        });
    }

    render(){
        return(
            <div id='forUpdate'>
                <Tab.Container id="leftTabsExample" activeKey={this.state.key}>
                    <Nav variant="pills" className="">
                        <Nav.Item onClick={this.setFirst}>
                            <Nav.Link eventKey="first">View old</Nav.Link>
                        </Nav.Item>
                        <Nav.Item onClick={this.setSecond}>
                            <Nav.Link eventKey="second">{this.state.status}</Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <Row sm={1}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                {this.renderNews()}
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                {this.createNews()}
                            </Tab.Pane>
                        </Tab.Content>
                    </Row>
                </Tab.Container>
            </div>
        );
    }

};

export default NewsPanel;