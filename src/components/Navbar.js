import React, { Component } from 'react';
import Logo from '../images/logo.png';
import { FaAlignRight, FaUserCircle, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    state = {
        naviToggle: false
    }
    handleNavToggle = () => {
        this.setState({ naviToggle: !this.state.naviToggle });
    }
    render() {
        return (
            <header>
                <nav className="navbar">
                    <div className="nav-center">
                        <div className="nav-header">
                            <Link to="/">
                                <img src={Logo} alt="Trivago" />
                            </Link>
                            <button type="button" className="nav-btn" onClick={this.handleNavToggle}>
                                <FaAlignRight className="nav-icon" />
                            </button>
                        </div>
                        <div className="login-lang">
                            <button id="user" type="button" className="login-btn">
                                <span className="avatar-icon"><FaUserCircle className="nav-icon" /></span>
                                <span className="name-email">Jane Doe</span>
                                <span className="dropdown"><FaChevronDown className="nav-icon" /></span>
                            </button>
                            <button className="lang-flag">EN</button>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Navbar;
