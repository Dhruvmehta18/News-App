import React, { Component } from "react";
import {Search,Loader,CustomButton,Pagination} from "../index";
import "./App.css";
import axios from "axios";
const largeColumn = {
  width: "40%"
};

const midColumn = {
  width: "30%"
};

const smallColumn = {
  width: "10%"
};
const autoColumn = {
  width: "auto"
};
const DEFAULT_QUERY = "";

const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const BASE_URL = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}`;
const PARAM_PAGE = "page=";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: "",
      results: null,
      searchTerm: DEFAULT_QUERY,
      isChanging: false,
      error: null,
      response: null,
      nbHits: 0,
      pageNo: 0,
      nbPages: 0,
    };
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onKeyEnter = this.onKeyEnter.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.OnPaginationItemClickListener = this.OnPaginationItemClickListener.bind(this);
  }
  onDismiss = id => {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];
    const isNotId = item => {
      return item.objectID !== id;
    };
    const oldHits = hits;
    const updatedHits = oldHits.filter(isNotId);
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  };

  needsToSearchTopStories = searchTerm => {
    return !this.state.results[searchTerm];
  };

  onSearchSubmit = event => {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm, isChanging: true });
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
    this.setState({ isChanging: false });
  };

  onKeyEnter = event => {
    event.keyCode === 13 && this.onSearchSubmit(event);
  };

  onSearchChange = event => {
    event.preventDefault();
    this.setState({ searchTerm: event.target.value });
  };

  async getData(searchTerm, page) {
    const res = await axios.get(
      `${BASE_URL}${searchTerm}&${PARAM_PAGE}${page}`,
      {
        cancelToken: source.token
      }
    )
    return await res;
  }

  fetchSearchTopStories = (searchTerm, page = 0) => {
    const { results } = this.state;
    const oldPage = (results && results[searchTerm] && results[searchTerm][page]) ? true : false;
    !oldPage && this.getData(searchTerm, page).then(result => {
      const response = result.status;
      this.setState({ nbPages: result.data.nbPages, response: response, nbHits: result.data.nbHits });
      this.setSearchTopStories(result.data, response);
    })
      .catch(error => {
        this.setState({ error: error });
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          // handle error
        }
      });
    oldPage &&
      this.setState({ isChanging: false });
  }

  setSearchTopStories = (result, response) => {
    if (response === 200) {
      const { hits, page } = result;
      const { searchKey, results } = this.state;
      const oldPage = (results && results[searchKey] && results[searchKey][page]) ? true : false;
      const oldPages = results && results[searchKey] ? results[searchKey] : [];
      const updatedHits = !oldPage && [...hits];
      console.log("results");
      console.log(results);
      !oldPage && this.setState({
        results: {
          ...results,
          [searchKey]: { ...oldPages, [page]: { hits: updatedHits } }
        }
      });
      this.setState({ isChanging: false });
    }
  };

  OnPaginationItemClickListener = (key) => {
    const { searchKey } = this.state;
    this.setState({ pageNo: key, isChanging: true });
    this.fetchSearchTopStories(searchKey, key);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm, isChanging: true });
    this.fetchSearchTopStories(searchTerm);
  }
  componentWillUnmount() {
    source.cancel('Operation canceled by the user.');
  }
  render() {
    const {
      error,
    } = this.state;
    if (error) {
      return <p>{error.message}</p>;
    }

    const {
      searchTerm,
      results,
      searchKey,
      nbHits,
      nbPages,
      pageNo,
      isChanging,
    } = this.state;
    const dataExist = results && results[searchKey] && results[searchKey][pageNo];
    // console.log("dataExist");
    // console.log(dataExist);
    const list = (dataExist && dataExist.hits) || [];

    return (
      <div className="page">
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
          onKeyDown={this.onKeyEnter}
        >
          Search news, Articles, comments, blogs, posts and much more
        </Search>
        {dataExist ? (
          nbHits ? (
            <div className="interactions">
              {isChanging && <Loader />}
              <Table list={list} onDismiss={this.onDismiss} />
              <Pagination pageNo={pageNo} nbPages={nbPages} OnPaginationItemClickListener={this.OnPaginationItemClickListener} />
              <CustomButton
                onClick={() => this.fetchSearchTopStories(searchKey, pageNo + 1)}
              >
                Next
              </CustomButton>
            </div>
          ) : (
              <p>No data</p>
            )
        ) : (
            <Loader />
          )}
      </div>
    );
  }
}

const Table = ({ list, onDismiss }) => {
  return (
    <div className="table">
      {list.map(item => {
        return (
          <div key={item.objectID} className="table-row">
            <span style={largeColumn}>
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={midColumn}>{item.author}</span>
            <span style={smallColumn}>{item.num_comments}</span>
            <span style={smallColumn}>{item.points}</span>
            <span style={autoColumn}>

              <CustomButton onClick={() => onDismiss(item.objectID)}>
                Dismiss
              </CustomButton>
            </span>
          </div>
        );
      })}
    </div>
  );
};



if (module.hot) {
  module.hot.accept();
}
export default App;

export {
  Table
};
