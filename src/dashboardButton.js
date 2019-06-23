import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './App.css';

export class dashboardButton extends Component {
    // button that redirect to dashboard
    render() {
        return (
            <div>
                <Link to="/" className="dashboard">
                    <button className="btn  btn-sm" 
                        style={{ backgroundColor: '#33b5e5', color: '#ffffff'}}>
                        Dashboard
                    </button>
                    </Link>
            </div>
    )
}
}

export default dashboardButton