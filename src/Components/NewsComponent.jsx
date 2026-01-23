import { Component } from 'react'
import NewsItem from './NewsItem'
import InfiniteScroll from 'react-infinite-scroll-component';
export default class NewsComponent extends Component {



    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }
    }
    static defaultProps = {
        pageSize: 10,
        category: 'general'
    }
    static propsTypes = {
        pageSize: Number,
        category: String
    }
    handleNextClick = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totelResults / 10))) { }
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&page=${this.state.page + 1}&apiKey=571bbf1be7e94d238157dfac4a7bfd84&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            page: this.state.page + 1,
            loading: false,
        });
    }
    handlePrevClick = async () => {

        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&page=${this.state.page - 1}&apiKey=571bbf1be7e94d238157dfac4a7bfd84&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1
        });
    }
    handelLoading = async () => {
        console.log("loading");
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&page=${this.state.page + 1}&apiKey=571bbf1be7e94d238157dfac4a7bfd84&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            // 2. CONCATENATE instead of replacing
            articles: this.state.articles.concat(parsedData.articles),
            page: this.state.page + 1,
            totalResults: parsedData.totalResults // Corrected spelling
        });
    }
    componentDidMount = async () => {
        this.fetchNews();
    }

    componentDidUpdate = (prevProps) => {
        document.title = `${this.props.category} - NewsAPP`;
        if (prevProps.category !== this.props.category) {
            this.setState({ page: 1 });
            this.fetchNews();
        }
    }

    fetchNews = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=571bbf1be7e94d238157dfac4a7bfd84&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        try {
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState(
                {
                    articles: parsedData.articles,
                    totelResults: parsedData.totalResults,
                    loading: false, page: 1
                }
            );
        } catch (error) {
            console.error("Error fetching news:", error);
            this.setState({ loading: false });
        }
    }

    render() {
        return (
            <>


                <div>


                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.handelLoading}
                        hasMore={this.state.articles.length !== this.state.totelResults}
                        loader={<h4>Loading...</h4>}
                    >
                        <div className=' row m-3'>

                            {this.state.articles.map((element) => {
                                return <div className='col-sm-3 ' key={element.url}>
                                    <NewsItem title={element.title} description={element.description} urlToImage={element.urlToImage} url={element.url} />
                                </div>;
                            })}
                        </div>

                    </InfiniteScroll>
                    <div className='container d-flex justify-content-between'>
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totelResults / 10)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>

                </div>

            </>
        )
    }
}
