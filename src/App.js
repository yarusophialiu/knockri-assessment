import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Candidate from './Candidate';
import { Row, Container, Col } from 'react-bootstrap'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      candidateArr: [],
      questionArr: [],
      applicationArr: [],
      currentCandidate: null,
      applicationId: null,
      error: null
    }

    this.fetchCandidates = this.fetchCandidates.bind(this)
    this.fetchQuestions = this.fetchQuestions.bind(this)
    this.fetchApplications = this.fetchApplications.bind(this)
    this.onDismiss = this.onDismiss.bind(this)

  }

  // set candidateArr state
  setCandidates(candidateArr) {
    this.setState({ candidateArr })
  }

  // set questionArr state 
  setQuestions(questionArr) {
    this.setState({ questionArr })
  }

  // set applicationArr state 
  setApplications(applicationArr) {
    this.setState({ applicationArr })
  }

  // get all candidates from db
  fetchCandidates() {
    axios(`http://localhost:4000/candidates`)
      .then(result => this._isMounted && this.setCandidates(result.data))
      .catch(error => this._isMounted && this.setState({ error }))
  }

  // get all questions from db
  fetchQuestions() {
    axios(`http://localhost:4000/questions`)
      .then(result => this._isMounted && this.setQuestions(result.data))
      .catch(error => this._isMounted && this.setState({ error }))
  }

  // get all applications from db
  fetchApplications() {
    axios(`http://localhost:4000/applications`)
      .then(result => this._isMounted && this.setApplications(result.data))
      .catch(error => this._isMounted && this.setState({ error }))
  }

  onDismiss(id, name) {
    this.setState({ applicationId: id, currentCandidate: name})
  }

  componentDidMount() {
    this._isMounted = true
    this.fetchCandidates()
    this.fetchQuestions()
    this.fetchApplications()
  }

  render() {
    const { candidateArr, 
            currentCandidate, 
            questionArr, 
            applicationArr, 
            applicationId
          } = this.state
    const sideNames = ['Dashboard', 'Setting', 'Log Out']
    
    return (
      <Router>
        <Route path='/' exact strict render={
          () => {
            return (
              <Container>
                <Row className="navbar"><Col>Knockri Dashboard</Col></Row>
                <Row>
                  <Col className="side-col" xs lg="2">
                    {sideNames.map(item => <Row className="aside">{item}</Row>)}
                  </Col>
                  <Col md={{ span: 3, offset: 3 }}>
                    {candidateArr.map(item => 
                      <Row className="candidate-tag" > 
                        <Link to='/candidate/' style={{ textDecoration: 'none'}}>
                          <div 
                            key={item.id} 
                            onClick={() => this.onDismiss(item.applicationId, item.name)}
                            style={{textAlign: 'center' }}>
                            {item.name}
                          </div>
                        </Link>
                      </Row> 
                    )}
                  </Col>
                </Row>
              </Container>
            )
          }
        } />

        <Route path='/candidate/' render={
          () => {
            setTimeout(function () {
              }, 300);
            return (
              <div>
                <Candidate 
                  currentCandidate={currentCandidate} 
                  questionArr={questionArr} 
                  applicationArr={applicationArr}
                  candidateArr={candidateArr}
                  applicationId={applicationId}/>
                </div>
            )
          }
        }/>
      </Router>
    );
  }
}

export default App;
