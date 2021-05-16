import React from 'react';
import ReactDOM from 'react-dom';
import './posts.css';

function Post(props) {
    return (
        <div className="card">
            <img className="photo" src="https://i.imgur.com/dVXUsOg.jpg" />
            <div className="text">
                <div className="top">
                    <h3>{props.address}</h3>
                    <button className="fav">★</button>
                </div>
                <ul>
                    <li>2 people</li>
                    <li>1 bedroom, 1 bathroom</li>
                    <li>kitchen, laundry, onsite parking</li>
                    <li>less than 1 mi from campus</li>
                </ul>
                <div className="bottom">
                    <p>$1250 / month</p>
                    <button>Details</button>
                    {/* <div className="date">
                        <p>Posted May 15</p>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

class Posts extends React.Component {
    renderPost(i) {
        return (
            <Post address={i} />
        )
    }

    render() {
        return (
            <div>
                <div className="container">
                    {this.renderPost("10996 Roebling")}
                    {this.renderPost(1)}
                    {this.renderPost(2)}
                    {this.renderPost(3)}
                    {this.renderPost(4)}
                    {this.renderPost(5)}
                    {this.renderPost(6)}
                    {this.renderPost(7)}
                    {this.renderPost(8)}
                    {this.renderPost(9)}
                    {this.renderPost(10)}
                    {this.renderPost(11)}
                    {this.renderPost(12)}
                    {this.renderPost(13)}
                    {this.renderPost(14)}
                    {this.renderPost(15)}
                </div>
            </div>
        );
    }
}

export default Posts;