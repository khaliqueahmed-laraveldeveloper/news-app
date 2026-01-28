import { use, useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import InfiniteScroll from 'react-infinite-scroll-component';
// import progress from '../Components/LoadingBar';
import LoadingBar from 'react-top-loading-bar'
export default function NewsComponent(props) {

    // useState hooks use for set intial state and update state;
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [progress, setProgress] = useState(0);
    const [totelResults, setTotelResults] = useState(0);



    const handleNextClick = async (props) => {
        if (!(page + 1 > Math.ceil(totelResults / 10))) { }
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&page=${page + 1}&apiKey=571bbf1be7e94d238157dfac4a7bfd84&pageSize=${props.pageSize}`;
        // this.setState({ loading: true });
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        setPage(page + 1);
        setLoading(false);
    }
    //fetch news for the first time only when component did mount
    useEffect(() => {
        document.title = `${props.category} - NewsAPP`;
        fetchNews();
    }, []);
    const handlePrevClick = async () => {

        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&page=${page - 1}&apiKey=571bbf1be7e94d238157dfac4a7bfd84&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        setPage(page - 1);
    }
    setProgress = (progress) => {
        setProgress(progress);
    }
    const handelLoading = async () => {
        setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&page=${page + 1}&apiKey=571bbf1be7e94d238157dfac4a7bfd84&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        setPage(page + 1);
        setLoading(false);
        setTotelResults(parsedData.totalResults);
        setProgress(100);
    }


    // componentDidUpdate = (prevProps) => {
    //     document.title = `${props.category} - NewsAPP`;
    //     if (prevProps.category !== props.category) {
    //         this.setState({ page: 1 });
    //         etchNews();
    //     }
    // }

    const
        fetchNews = async () => {
            let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=571bbf1be7e94d238157dfac4a7bfd84&pageSize=${props.pageSize}`;
            setLoading(true);
            try {
                let data = await fetch(url);
                let parsedData = await data.json();
                setArticles(parsedData.articles);
                setTotelResults(parsedData.totalResults);
                setLoading(false);
                setPage(1);

            } catch (error) {
                setLoading(false);
            }
        }


    return (
        <>
            <LoadingBar
                color='#f11946' // Red color like YouTube
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />


            <div>


                <InfiniteScroll
                    dataLength={articles.length}
                    next={handelLoading}
                    hasMore={articles.length !== totelResults}
                    loader={<h4>Loading...</h4>}
                >
                    <div className=' row m-3'>

                        {articles.map((element) => {
                            return <div className='col-sm-3 ' key={element.url}>
                                <NewsItem title={element.title} description={element.description} urlToImage={element.urlToImage} url={element.url} />
                            </div>;
                        })}
                    </div>

                </InfiniteScroll>
                <div className='container d-flex justify-content-between'>
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
                    <button disabled={page + 1 > Math.ceil(totelResults / 10)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
                </div>

            </div>

        </>
    )
}
NewsComponent.defaultProps = {
    pageSize: 10,
    category: 'general'
}
NewsComponent.propTypes = {
    pageSize: Number,
    category: String
}

