import React from 'react'
import Banner from '../components/layout/Banner'
import FooterComponent from '../components/layout/FooterComponent'
import Header from '../components/layout/header'
import MenuNav from '../components/layout/MenuNav'
import ForumData from '../components/forum/ForumData'
import PostData from '../components/post/PostData'
import TopicList from '../components/forum/TopicList'
const Homepage = () => {
  return (
    <>
     <Header></Header>
      <Banner></Banner>
      <MenuNav></MenuNav>
      <ForumData></ForumData>
      <div className="d-flex">
      <PostData></PostData>
      <TopicList></TopicList>
      </div>
      <FooterComponent></FooterComponent>
    </>
  )
}

export default Homepage