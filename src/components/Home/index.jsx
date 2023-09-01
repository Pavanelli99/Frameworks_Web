/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-useless-constructor */
//import logo from "./logo.svg";
import "./styles.css";
import { loadPosts } from "../../utils/load-posts";
import { PostCard } from "../PostCard";
import { Button } from "../Button";
import { useCallback, useEffect, useState } from "react";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postPerPage] = useState(5);
  const [searchValue, setsearchValue] = useState("");
  //------------------------------------------------------------------------------------------------
  const filteredPosts = !!searchValue
    ? posts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  // componentDidMount() {
  //   this.loadPosts();

  // }
  //------------------------------------------------------------------------------------------------
  const handleLoadPosts = useCallback(async (page, postPerPage) => { 
    // const { page, postPerPage } = this.state;
    const photosAndPosts = await loadPosts();

    setPosts(photosAndPosts.slice(page, postPerPage));
    setAllPosts(photosAndPosts);
  }, []);
  //------------------------------------------------------------------------------------------------
  const loadMorePosts = () => {
    // const {page, postsPerPage, allPosts, post} = this.state;

    const nextPage = page + postPerPage;

    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);

    setPosts([...posts, ...nextPosts]);
    setPage(nextPage);

    // this.setState({posts: [...post, ...nextPosts], page: nextPage}); //... significa destructor
  };
  //-----------------------------------------------------------------------------------------------
  const handleSearch = (e) => {
    // Pesquisar
    const { value } = e.target;
    setsearchValue(value);
    // this.setState({serachvalue: value});
    // console.log(value);
  };
  //------------------------------------------------------------------------------------------------
  useEffect(() => {
    handleLoadPosts(0, postPerPage); // FUNÇÃO
  }, [handleLoadPosts, postPerPage]); // DEPENDENCIA
  //------------------------------------------------------------------------------------------------
  return (
    <section className="container">
      <input
        type="text"
        name="txtSearch"
        id="txtSearch"
        placeholder="Search..."
        onChange={handleSearch}
        value={searchValue}
      />

      <div className="posts">
        {filteredPosts.map((post) => (
          <PostCard Key={post.id} post={post} />
        ))}
      </div>
      <Button text="Load more posts" action={loadMorePosts} />
    </section>
  );

  // render() {
  //   const { posts , serachvalue } = this.state;

  //   const filteredPosts = !!serachvalue //operador de circuito
  //   ? posts.filter((post) => {
  //      return post.title.toLowerCase().includes(post.title.toLowerCase())
  //   })
  //   :posts;

  // }
};

export default Home;
