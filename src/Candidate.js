import React, { Component } from 'react'
import { Button, FormControl, Row, Container, Col } from 'react-bootstrap';
import axios from 'axios'
import './App.css';
import { Player } from 'video-react';
import Dashboard from './dashboardButton'


export class Candidate extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          comment: ''
        }
    
        this.comment = this.comment.bind(this)
        this.onUpdateSubmit = this.onUpdateSubmit.bind(this)
        this.joinArray = this.joinArray.bind(this)
        this.updateData = this.updateData.bind(this)
    }
    
    // use input value to set state
    comment(e) {this.setState({ comment: e.target.value })}

    // join two arrays into a nested array
    joinArray(a1, a2, a3) {
        var i = 0
        const length = a1.length
        while (i <= length) {
            if (a1[i] !== undefined) {a3.push([a1[i], a2[i]])}
            i++
        }
        return a3
    }

    // send PUT request to update comments in the database
    updateData(data) {
        const URL = 'http://localhost:4000/applications/'
        axios.put(`${URL}${this.props.applicationId}`, data)
        .then((res) => console.log('success', res.data))
        .catch((err) => console.log('ERROR', err));
    }

    // submit comment
    onUpdateSubmit(questionId) {
        const { comment } = this.state
        const { candidateArr, applicationArr, applicationId } = this.props
        let application, src, idArr, jointArr = []
        let candidate = ''

        // an object of application id and videos of the candidate
        application = applicationArr.find(candidate => candidate.id === applicationId)
        // an object of candidate id, name and application of the candidate
        candidate = candidateArr.find(candidate => candidate.applicationId === applicationId)

        if (application) {
            // an array of video url
            src = application.videos.map(item => item.src)
            // an array of question id
            idArr = application.videos.map(item => item.questionId)
        }

        jointArr = this.joinArray(src, idArr, jointArr)

        // data to be updated 
        const videos = jointArr.map(item => {
            const temp = {}
            temp.src= item[0]
            temp.questionId = item[1]
            if (questionId === item[1]) temp.comments = comment
            return temp
        })

        const data = { videos: videos }
        this.updateData(data)
    }

    render() {
        const { currentCandidate, candidateArr, questionArr, applicationArr, applicationId } = this.props
        const latestComment = ''
        let application, candidate, src, jointArr = []
        let commentArr = []
        let questions = []

        if (applicationId) {
            application = applicationArr.find(candidate => candidate.id === applicationId)
            candidate = candidateArr.find(candidate => candidate.applicationId === applicationId)
            if (application) {
                // an array of video url
                src = application.videos.map(item => item.src)
                // an array of questio id
                const idArr = application.videos.map(item => item.questionId)
                // an array of comments for each video
                commentArr = application.videos.map(item => item.comments)
                questionArr.forEach(item => {
                    if (idArr.includes(item.id)) questions.push([item.question, item.id]) 
                })
            }

            // join 3 array into a nested array
            var i = 0
            const length = src.length
            while (i <= length) {
                if (src[i] !== undefined) {jointArr.push([src[i], questions[i], commentArr[i]])}
                i++
            }
        }
        
        return (
            <Container>
                {applicationId
                ?  <Col>
                    <Row className="navbar"> 
                      Hi, I'm {candidate.name}
                    </Row>
                    <Row className="float-right"><Dashboard /></Row>
                    <Row className="medium-padding">  
                        {jointArr.map(item => 
                            <Col className="videoSection">
                                <Row className="video-row">
                                    <h6 className="question">Question: {item[1][0]}</h6>
                                </Row>
                                <Row>
                                    <Player src={item[0]} />
                                </Row>
                                <Row className="input-group" style={{ marginTop: '30px'}}>
                                    <FormControl onChange={this.comment} type="text" />
                                    <Button onClick={() => this.onUpdateSubmit(item[1][1])} 
                                            style={{ backgroundColor: '#33b5e5', color: '#ffffff'}}>
                                        Comment
                                    </Button>
                                </Row>
                                <Row className="input-group" style={{ marginTop: '30px'}}>
                                    Latest comment: 
                                </Row>
                                <Row>
                                    {item[2]}
                                </Row>
                            </Col>
                            )}
                    </Row>
                    </Col>
                : currentCandidate
                ? <h3 className="medium-padding">
                    Sorry this candidate doesn't have an application. 
                    <Dashboard />
                  </h3>
                : <h3 className="medium-padding">
                    Something goes wrong. 
                    <Dashboard />
                 </h3>
                }
            </Container>
           
        )
    }
    
}


export default Candidate