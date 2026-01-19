import React, { Component } from 'react'

export default class NewsItem extends Component {


    render() {
        const { title, description, urlToImage, url } = this.props;
        return (
            <div>
                <div className="card my-3">
                    <div className="card-body">
                        <img className='img-fluid text-center' src={urlToImage} alt="" />
                        <h5 className="card-title">{title ? title.slice(0, 25) : "No Title"}...</h5>
                        <p className="card-text">{description ? description.slice(0, 35) : "No description available"}...</p>

                        <a href={url} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
