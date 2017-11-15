import _ from 'lodash';
import React, {Component} from "react";
import ReactDOM from "react-dom";
import SearchBar from './components/search_bar';
import VideoDetail from './components/video_detail';
import VideoList from './components/video_list';
import YTSearch from "youtube-api-search";

const API_KEY = 'AIzaSyBlhdnnN115-zZnfpxp1K0OZiNL7204N00';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedVideo: null,
      videos: []
    };
    this.videoSearch('reactjs');
  }

  videoSearch(term) {
    YTSearch({
        key: API_KEY,
        term
      }, (videos) => {
        this.setState({
          selectedVideo: videos[0],
          videos
          });
    });
  }

  render() {
    const videoSearch = _.debounce((term) => {
 this.videoSearch(term)
}, 600);

    
return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={(selectedVideo) => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    );
  }
}

ReactDOM.render(< App />, document.querySelector(".container"));
