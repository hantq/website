import React from 'react';
import Layout from '../components/Layout';

class NotFoundPage extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <h1>没找到</h1>
        <p>我还没写这篇文章呢，你愿意帮我写吗？</p>
      </Layout>
    );
  }
}

export default NotFoundPage;
