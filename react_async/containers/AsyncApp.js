import React, { PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit} from '../actions';
import Picker from '../components/Picker';
import Posts from '../components/Posts';

class AsyncApp extends Component {
constructor(props) {
  super(props);
  this.handleChange = this.handleChange.bind(this);
  this.handleRefreshClick = this.handleRefreshClick.bind(this);
}

  componentDidMount() {
    const { dispatch, selectSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectSubreddit()));
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
      const { dispatch, selectedSubreddit }  = nextProps;
      dispatch(fetchPostsIfNeeded(selecteSubreddit()));
    }
  };

  handleChange(nextSubreddit) {
    this.props.dispatch(selectedSubreddit(nextSubreddit));
  };

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectSubreddit } = this.props;
    dispatch(invalidateSubreddit(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  };

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;
    return (
      <div>
        <Picker value = {selectedSubreddit}
                onChange = {this.handleChange}
                options = {['react.js', 'frontend']} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at { new Date(lastUpdated).toLocaleTimeString()}.
            {' '}
          </span>
        }
        </p>
        {isFetching && posts.length === 0 &&
         <h2>Loading... </h2>
        }
        {!isFetching && posts.length === 0 &&
         <h2> Empty. </h2>
        }
        { posts.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1}}>
            <Posts posts={posts} />
          </div>
        }
      </div>
    );
  }
}

AsyncApp.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

let mapStateToProps = (state) => {
  const { selectedSubreddit, postsBySubreddit } = state;
  const {
    isFetching,
    lastUpdated,
    items:posts
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  };

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  };
}

AsyncApp = connect(mapStateToProps)(AsyncApp);

export default AsyncApp;
