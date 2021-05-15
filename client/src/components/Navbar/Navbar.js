import React, { Component } from 'react'; 
import './Navbar.css'
import { Button } from "../Button"

const MenuItems = [
    {
        title: 'Home', 
        url: '#', 
        cName: 'nav-links'
    }, 
    {
        title: 'Contact Us', 
        url: '#', 
        cName: 'nav-links'
    }
]

class Navbar extends React.Component {
    state = { clicked: false}

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked})
    }
    render() {
        return(
            <nav className="NavbarItems">
                <h1 className="navbar-logo">35L Project </h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i>

                    </i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return(
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        ) 
                    })}
                </ul>
                <Button> <div className="NewPost"> New post </div> </Button>
            </nav>
        )
    }
}

export default Navbar