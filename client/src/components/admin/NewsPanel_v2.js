import React, {Component} from 'react';
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
import {connect} from "react-redux";

import {setBlood, setEvents, setNews, setPlaces, setHospitals} from "../../actions";



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
            try {
                const res = await axios.post('/admin/createNews', {
                    "title": title,
                    "description": description,
                    "date": Date().toString()
                });
                alert("Uspesno dodato!");
                console.log(res.data);
                this.clearFealds();
                this.props.functionReload();
            } catch(err) {
                console.log(err.response)
                alert(err.response.data.message)
            };
        }

    }


    render(){
        return(
            <Form className="text-left">
                <Form.Group controlId="exampleFormControlInput1">
                    <Form.Label>Naslov</Form.Label>
                    <Form.Control ref={this.newsTitle} type="text" />
                    <span style={{color: "red"}}>{this.state.errors.title}</span>
                </Form.Group>
                <Form.Group controlId="exampleFormControlTextarea1">
                    <Form.Label>Opis</Form.Label>
                    <Form.Control ref={this.newsDescription} as="textarea" rows="3" />
                    <span style={{color: "red"}}>{this.state.errors.description}</span>
                </Form.Group>
                <Button variant="outline-secondary" type="submit" onClick={this.sendNews}>
                    Napravi
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
        try {
            const res = await axios.post('/admin/updateNews', {
                id: this.state.id,
                query: {
                    title: newTitle,
                    description: newDescription,
                    date: Date().toString()
                }
            });
            console.log(res)
            this.props.functionReload();
            this.setState({ show: false });
        } catch(err) {
            console.log(err.response)
            alert(err.response.data.message)
        };
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }



    render() {

        return (
            <div>
                <Button variant="outline-secondary" onClick={this.handleShow} className="justify-content-end">
                    Izmeni
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
                                    <FormLabel>Promeni naslov</FormLabel>
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
                                <FormLabel>Promeni opis</FormLabel>
                                <FormControl
                                    id="edit_description"
                                    as="textarea"
                                    componentclass="textarea"
                                    defaultValue={this.state.description}
                                />
                            </FormGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="outline-secondary" onClick={this.handleClose}>Odbaci</Button>
                            <Button variant="outline-secondary" onClick={this.handleSave}>Sačuvaj</Button>
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
        };
        this.renderNews = this.renderNews.bind(this);


        this.loadNews = this.loadNews.bind(this)
    }

    async componentDidMount() {
        try {
            const resNews = await axios.get('/app/getNews');
            console.log(resNews.data)
            this.setState({
                news: resNews.data.data
            });
        } catch(err) {
            console.log(err.response)
            alert(err.response.data.message)
        };
    }

    renderNews(){

        const cards = this.props.news.map( (article, index)=> {
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


    async loadNews() {
        try {
            const resNews = await axios.get('/app/getNews');
            console.log(resNews.data)
            this.props.setNews({news: resNews.data.data});
        } catch(err) {
            console.log(err.response)
            alert(err.response.data.message)
        };
    }

    render(){
        return(
            <div>
                <Tab.Container id="leftTabsExample">
                    <Nav variant="pills" className="justify-content-around" defaultActiveKey="second">
                        <Nav.Item style={{"marignRight": "10px"}}>
                            <Nav.Link className="btn btn-outline-danger" eventKey="first" >Izlistaj novosti</Nav.Link>
                        </Nav.Item>
                        <Nav.Item >
                            <Nav.Link className="btn btn-outline-danger" eventKey="second">Dodaj novu novost</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <br/>
                    <Row sm={1}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                {this.renderNews()}
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <CreateNewForm functionReload={this.loadNews} />
                            </Tab.Pane>
                        </Tab.Content>
                    </Row>
                </Tab.Container>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        places: state.places,
        events: state.events,
        news: state.news
    }
};

function mapDispatchToProps(dispatch){
    return {
        setEvents: data => dispatch(setEvents(data)),
        setPlaces: data => dispatch(setPlaces(data)),
        setBlood: data => dispatch(setBlood(data)),
        setNews: data => dispatch(setNews(data)),
        setHospitals: data => dispatch(setHospitals(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsPanel_v2);
