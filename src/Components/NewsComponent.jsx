import { Component } from 'react'
import NewsItem from './NewsItem'
export default class NewsComponent extends Component {



    constructor() {
        super();

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
    componentDidMount = async () => {
        this.fetchNews();
    }

    componentDidUpdate = (prevProps) => {
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
                {this.state.loading ? <div className="text-center">Loading...</div> : <div>
                    <div className=' row m-3'>
                        {this.state.articles.map((element) => {
                            return <div className='col-sm-3 ' key={element.url}>
                                <NewsItem title={element.title} description={element.description} urlToImage={element.urlToImage} url={element.url} />
                            </div>;
                        })}
                    </div>
                    <div className='container d-flex justify-content-between'>
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totelResults / 10)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>
                </div>}
            </>
        )
    }
}
