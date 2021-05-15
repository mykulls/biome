import React from 'react'
import './Card.css'

function Card({title, imageUrl, price, body1, body2, body3, body4}) {
    return (
        <div className='card-container'>
            <div className="image-container"> 
                <img src={imageUrl} resizeMode='contain' alt=''/>
            </div>
                
            <div className="card-content">
                <div className="card-title">
                    <h3>{title} </h3>
                    <p className="price"> {price} </p>
                </div>

                <div className="card-body">
                    <ul> 
                        <li> {body1} </li>
                        <li> {body2} </li>
                        <li> {body3} </li>
                        <li> {body4} </li>
                    </ul>
                </div>
            </div>

            <div className="btn">
                <button> 
                    <a>
                        View more
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Card
