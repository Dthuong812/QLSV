import React from 'react'
import Banner from '../components/layout/Banner'
import MenuNav from '../components/layout/MenuNav'
import PostNew from '../components/post/PostNew'
import PostData from '../components/post/PostData'
import TopicList from '../components/forum/TopicList'
import FooterComponent from '../components/layout/FooterComponent'
import Header from '../components/layout/Header'

const ForumPageID = () => {
  return (
    <>
     <Header></Header>
      <Banner></Banner>
      <MenuNav></MenuNav>
      <PostNew></PostNew>
      <div className="d-flex">
      <PostData></PostData>
      <TopicList></TopicList>
      </div>
      <FooterComponent></FooterComponent>
    </>
  )
}

export default ForumPageID