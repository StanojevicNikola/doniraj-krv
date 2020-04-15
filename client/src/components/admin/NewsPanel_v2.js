import React, {Component, useState} from 'react';
import {
    Button,
    Modal,
    FormControl,
    FormLabel,
    FormGroup,
    Tab,
    Nav,
    Row,
    Form,
    Card,
    Accordion,
    Container
} from "react-bootstrap";
import axios from 'axios';

const fakeNews = [
    {
        title: 'News Title #1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        date: '24.5.2012'
    },
    {
        title: 'News Title #2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        date: '26.07.1984'}
];

class CreateNewForm extends Component{
    constructor(props) {
        super(props);

        this.state = {
            errors: {}
        };

        this.sendNews = this.sendNews.bind(this);
        this.validate = this.validate.bind(this);
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

        console.log(`Created News with: ${title}, ${description}`);

        if(this.validate(title, description)){

            const res = axios.post('/admin/createNews', {
                title,
                description,
                date: new Date()
            });

            this.clearFealds(e);
        }

    }


    render(){
        return(
            <Form className="text-left">
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
                    Create
                </Button>
            </Form>
        );
    }

}

class Example extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);

        this.state = {
            title: props.title,
            description: props.description,
            show: false,
            formIsValid: 'error'
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleSave(e){
        const newTitle = e.target.form.edit_title.value;
        const newDescription = e.target.form.edit_description.value;

        console.log(`Updated News with: ${newTitle}, ${newDescription}`);

        const res = axios.post('/admin/updateNews', {
            title: newTitle,
            description: newDescription,
            date: new Date()
        });

        this.setState({ show: false });
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }



    render() {

        return (
            <div>
                <Button bsStyle="primary" bsSize="large" onClick={this.handleShow} className="justify-content-end">
                    Edit
                </Button>

                <Modal
                    {...this.props}
                    bsSize="large"
                    aria-labelledby="contained-modal-title-lg"
                    show={this.state.show}
                    onHide={this.handleClose}
                >
                    <form>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-lg">
                                <FormGroup controlId="edit_title" validationState={this.state.formIsValid}>
                                    <FormLabel>Change title</FormLabel>
                                    <FormControl
                                        type="text"
                                        componentClass="input"
                                        defaultValue={this.state.title}
                                    />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormGroup>
                                <FormLabel>Change description</FormLabel>
                                <FormControl
                                    id="edit_description"
                                    as="textarea"
                                    componentClass="textarea"
                                    defaultValue={this.state.description}
                                />
                            </FormGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleClose}>Discard</Button>
                            <Button onClick={this.handleSave}>Save</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        );
    }
}


class NewsPanel_v2 extends Component{

    constructor(props) {
        super(props);
        this.state = {
            news: []
        };
        this.renderNews = this.renderNews.bind(this);
    }

    componentDidMount() {
        this.setState({
            news: fakeNews
        });
    }

    renderNews(){

        const cards = this.state.news.map( (article, index)=> {
            return (
                <Container className="text-left">
                    <Card key={index} >
                        <Accordion.Toggle as={Card.Header} eventKey={index}>
                            {article.title}
                            <span className="text-right">
                                <Example
                                    title={article.title}
                                    description={article.description}
                                    className="text-left"
                                />
                            </span>
                            <div style={{fontStyle: 'italic', fontSize: '12px'}}>{article.date}</div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={index}>
                            <Card.Body>{article.description}</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Container>
            )
        });
        return (
            <Accordion defaultActiveKey="0">
                {cards}
            </Accordion>
        );
    }


    render(){
        return(
            <div>
                <Tab.Container id="leftTabsExample">
                    <Nav variant="pills" className="" defaultActiveKey="second">
                        <Nav.Item >
                            <Nav.Link eventKey="first">View old</Nav.Link>
                        </Nav.Item>
                        <Nav.Item >
                            <Nav.Link eventKey="second">Create new</Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <Row sm={1}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                {this.renderNews()}
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <CreateNewForm />
                            </Tab.Pane>
                        </Tab.Content>
                    </Row>
                </Tab.Container>
            </div>
        )
    }
}

export default NewsPanel_v2;
