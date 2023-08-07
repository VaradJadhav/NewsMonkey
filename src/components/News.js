import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstChar = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    // console.log('this is a constructor');
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstChar(this.props.category)} - NewsMonkey`;
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  updateNews = async () => {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  };

  handlePrevious = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   page:this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading:false
    // })
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  handleNext = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    //   this.setState({loading:true});
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   this.setState({
    //     page:this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading:false
    //   })
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };
  fetchMoreData = async () => {
    this.props.setProgress(10);
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    this.props.setProgress(30);
    let data = await fetch(url);
    this.props.setProgress(70);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  };
  render() {
    return (
      // <div className="container my-3">
      //   <h2 className="text-center">NewsMonkey - Top {this.props.category} Headlines</h2>
      //   {!this.state.loading && <div className="container d-flex justify-content-between">
      //     <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevious}>&larr; Previous</button>
      //     <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
      //   </div>}
      //   {this.state.loading && <Spinner/>}
      //   <div className="row">
      //     {!this.state.loading && this.state.articles.map((element) => {
      //       return (
      //         <div className="col-md-4" key={element.url}>
      //           <NewsItem
      //             title={element.title ? element.title.slice(0, 65):""}
      //             description={element.description ? element.description.slice(0, 88):""}
      //             imageUrl={!element.urlToImage ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb69KgoXnajsfoW-2eamT_dwNOR77asp99Iw&usqp=CAU":element.urlToImage}
      //             newsUrl={element.url}
      //             author={element.author}
      //             date={element.publishedAt}
      //             source={element.source.name}
      //           />
      //         </div>
      //       );
      //     })}
      //   </div>

      //   {!this.state.loading && <div className="container d-flex justify-content-between">
      //     <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevious}>&larr; Previous</button>
      //     <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
      //   </div>}
      // </div>
      <>
        <h2 className="text-center">
          NewsMonkey - Top {this.props.category} Headlines
        </h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 62) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imageUrl={
                        !element.urlToImage
                          ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb69KgoXnajsfoW-2eamT_dwNOR77asp99Iw&usqp=CAU"
                          : element.urlToImage
                      }
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
