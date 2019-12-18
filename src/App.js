import React, { Component } from "react";
import styled from "styled-components";

import Pagination from "./components/Pagination";


const Wrapper = styled.div`
  position: relative;
  padding: 16px 16px;
  height: 768px;
  width: 1366px;
`

const PostContainer = styled.div`
  position: 'relative';
  float: left;
  width: 100%;
  border: 1px solid;
  padding: 8px;
  margin: 8px;
`

const Post = styled.div`
  div{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  width: 95%;
  float: left;
  margin-bottom: 4px;
`

const StyledButton = styled.button`
background: linear-gradient(#DD4B39, #D14836);
text-shadow: 0 1px 0 #C04131;
border: 1px solid;
outline: none;
padding: 5px 10px;
border-radius: 2px;
border-color: #DD4B39;
float: left;

&:hover {
  background: linear-gradient(#DD4B39, #C53727);
  border-color: #AF301F;
}
&:active {
  background: linear-gradient(#D74736, #AD2719);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.2);
}

`

const Content = styled.div`
  margin-bottom: 40px;
`

const BottomNavigation = styled.div`
  text-align: center;
  margin-top: 40px;
`

const Filter = styled.div`
  width: 100%;
`

const StyledInput = styled.input`
  height: 35px;
  width: 30%;
  margin-bottom: 10px;
  font-size: 20px;
  padding-left: 10px;
`
class App extends React.Component {
  state = {
    posts: [],
    currentPage: 1,
    totalPages: 1
  };

  async componentDidMount() {
    const res = await fetch("http://localhost:8081/recipes");
    const json = await res.json();
    this.setState({
      posts: json.recipes,
      currentPage: json.currentPage,
      totalPages: json.totalPages
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      const res = await fetch(
        `http://localhost:8081/recipes?page=${this.state.currentPage}`
      );
      const json = await res.json();
      this.setState({ posts: json.recipes });
    }
  }

  paginate(number) {
    this.setState({ currentPage: number });
  }

 async filterPost(e) {
    const value = e.target.value
    const res = await fetch(`http://localhost:8081/recipes?search=${value}`);
    const json = await res.json();
    this.setState({
      posts: json.recipes
    });
  }

  async removePost(post) {
    console.log(post)
    if(window.confirm("Are you sure to want to delete this post")) {
      await fetch(`http://localhost:8081/recipes?search=${post.id}`, {
        method: 'DELETE'
      });
    }
  }

  render() {
    const { totalPages, posts } = this.state;
    return (
      <Wrapper>
        <h1>Recipes Overview</h1>
        <Filter>
          <StyledInput placeholder="filter" onChange={(e) => this.filterPost(e)}/>
        </Filter>
        <Content>
          {posts.map((post, i) => (
            <PostContainer>

            <Post key={i}>
              <h3>{post.title}</h3>
              <div>{post.description}</div>
            </Post>
            <StyledButton onClick={this.removePost.bind(this, post)}>Delete</StyledButton>
            </PostContainer>
          ))}

         
        </Content>
        <BottomNavigation>
        <Pagination
              pageNumbers={totalPages}
              paginate={number => this.paginate(number)}
            />
        </BottomNavigation>
        
      </Wrapper>
    );
  }
}

export default App;
