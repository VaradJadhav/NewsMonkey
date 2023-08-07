import React, { Component } from "react";
import { Link } from "react-router-dom";


export class NewsItem extends Component {
  render(){
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="my-3">
        <div className="card">
        <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>
        <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
          <img src={imageUrl} className="card-img-top" style={{height:'215px'}} alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author ? author:'Unknown'} on {new Date(date).toGMTString()}</small></p>
            <Link to={newsUrl} className="btn btn-primary">
              READ MORE
            </Link>
          </div>
        </div>
      </div>
    );
      }
    }

export default NewsItem;

// this.props ki jagah only props in function based components 