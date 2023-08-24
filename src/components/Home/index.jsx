/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-useless-constructor */
//import logo from "./logo.svg";
import "./styles.css";
import { Component } from "react";
import { loadPosts } from "../../utils/load-posts";
import { PostCard } from "../PostCard";

class Home extends Component {

  state = {
    posts: [],
    allPosts: [],
    page: 0 ,
    postPerPage: 4,
  };

  componentDidMount() {
    this.loadPosts();

  }

  loadPosts = async () => {
    const { page, postPerPage } = this.state;
    const photosAndPosts = await loadPosts()

    this.setState({
       posts: photosAndPosts.slice(page, page + postPerPage),
       allPosts: photosAndPosts
      
      });
  };


  loadMorePosts = async () => {
    const {page, postPerPage, allPosts, post} = this.state

    const nextPage = page + postPerPage

    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage)

    this.setState({posts: [...post, ...nextPosts], page: nextPage}); //... significa destructor
     

  };

  render() {
    const { posts } = this.state;

    return (
      <section className="container">
        <div className="posts">
        {posts.map((post) => (
          <PostCard Key = {post.id} post = {post}/>

        ))}
        </div>
        <button text = "Load more posts"  action ={this.loadMorePosts}/>
      </section>
    );
  }
}

export default Home;
