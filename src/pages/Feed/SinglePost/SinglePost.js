import React, { Component } from 'react';

import Image from '../../../components/Image/Image';
import './SinglePost.css';

class SinglePost extends Component {
  state = {
    title: '',
    author: '',
    date: '',
    image: '',
    content: ''
  };

  componentDidMount() {
    const postId = this.props.match.params.postId;
    fetch(`http://localhost:8000/posts/${postId}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch status');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData)
        this.setState({
          title: resData.posts.title,
          author: resData.posts.creator.name,
          date: new Date(resData.posts.createdAt).toLocaleDateString('en-US'),
          content: resData.posts.content,
          image : 'http://localhost:8000/'+resData.posts.imageUrl
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <section className="single-post">
        <h1>{this.state.title}</h1>
        <h2>
          Created by {this.state.author} on {this.state.date}
        </h2>
        <div className="single-post__image">
          {/* <img contain src={this.state.image} alt="x" /> */}
          <Image imageUrl={this.state.image} contain />
        </div>
        <p>{this.state.content}</p>
      </section>
    );
  }
}

export default SinglePost;
