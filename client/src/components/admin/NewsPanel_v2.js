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



class CreateNewForm extends Component{
    constructor(props) {
        super(props);

        this.state = {
            errors: {}
        };

        this.sendNews = this.sendNews.bind(this);
        this.validate = this.validate.bind(this);

        this.newsTitle = React.createRef();
        this.newsDescription = React.createRef();
    }

    validate(title, description){

        let errors = {};
        let clear = {};

        if(title === undefined || title === '')
            errors["title"] = 'Required field!';
        else{
            errors["title"] = '';
            clear["title"] = true;
        }

        if(description === undefined || description === '')
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

    clearFealds(){
        this.newsTitle.current.value = "";
        this.newsDescription.current.value = "";
    }

    async sendNews(e) {

        e.preventDefault();
        const title = e.target.form.exampleFormControlInput1.value;
        const description = e.target.form.exampleFormControlTextarea1.value;

        console.log(`Created News with: ${title}, ${description}`);

        if(this.validate(title, description)){
            const res = await axios.post('/admin/createNews', {
                "title": title,
                "description": description,
                "date": Date().toString()
            });
            console.log(res.data)
            this.clearFealds();
            this.props.functionReload();
        }

    }


    render(){
        return(
            <Form className="text-left">
                <Form.Group controlId="exampleFormControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control ref={this.newsTitle} type="text" />
                    <span style={{color: "red"}}>{this.state.errors.title}</span>
                </Form.Group>
                <Form.Group controlId="exampleFormControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control ref={this.newsDescription} as="textarea" rows="3" />
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
            formIsValid: 'error',
            id: props.id
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    async handleSave(e){
        const newTitle = e.target.form.edit_title.value;
        const newDescription = e.target.form.edit_description.value;

        console.log(`Updated News with: ${newTitle}, ${newDescription}`);

        const res = await axios.post('/admin/updateNews', {
            id: this.state.id,
            query: {
                title: newTitle,
                description: newDescription,
                date: Date().toString()
            }
        });
        this.props.functionReload();
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
                                        componentclass="input"
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
                                    componentclass="textarea"
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
            news: [],
            first: false,
            second: false
        };
        this.renderNews = this.renderNews.bind(this);

        this.selectedFirst = this.selectedFirst.bind(this);
        this.selectedSecond = this.selectedSecond.bind(this);

        this.loadNews = this.loadNews.bind(this)
    }

    async componentDidMount() {
        const resNews = await axios.get('/app/getNews');
        console.log(resNews.data)
        this.setState({
            news: resNews.data.data
        });
    }

    renderNews(){

        const cards = this.state.news.map( (article, index)=> {
            return (
                <Container key={article['_id']} className="text-left">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey={index}>
                            {article.title}
                            <span className="text-right">
                                <Example
                                    title={article.title}
                                    description={article.description}
                                    className="text-left"
                                    id = {article['_id']}
                                    functionReload = {this.loadNews}
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

    selectedFirst() {
        this.setState({
            first: true,
            second: false
        })
    }

    selectedSecond() {
        this.setState({
            first: false,
            second: true
        })
    }

    async loadNews() {
        const resNews = await axios.get('/app/getNews');
        console.log(resNews.data)
        this.setState({
            news: resNews.data.data
        });
    }

    render(){
        return(
            <div>
                <Tab.Container id="leftTabsExample">
                    <Nav variant="pills" className="" defaultActiveKey="second">
                        <Nav.Item style={{"marignRight": "10px"}}>
                            <button className="btn btn-danger" onClick={this.selectedFirst} >View old</button>
                        </Nav.Item>
                        <Nav.Item >
                            <button className="btn btn-danger" onClick={this.selectedSecond}>Create new</button>
                        </Nav.Item>
                    </Nav>

                    <Row sm={1}>
                        <Tab.Content>

                                {this.state.first ? this.renderNews() : ""}


                                {this.state.second ? <CreateNewForm functionReload={this.loadNews} /> : ""}

                        </Tab.Content>
                    </Row>
                </Tab.Container>
            </div>
        )
    }
}

export default NewsPanel_v2;
