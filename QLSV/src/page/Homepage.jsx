import React from 'react'
import Banner from '../components/layout/Banner'
import FooterComponent from '../components/layout/FooterComponent'
import MenuNav from '../components/layout/MenuNav'
import PostData from '../components/post/PostData'
import TopicList from '../components/forum/TopicList'
import PostNew from '../components/post/PostNew'
import Header from '../components/layout/Header'
const Homepage = () => {
  return (
    <>
     <Header></Header>
      <Banner></Banner>
      <MenuNav></MenuNav>
      <PostNew></PostNew>
      <div className="d-flex">
      <div className="w-75">
      <PostData ></PostData>
      </div>
      <TopicList></TopicList>
      </div>
      <FooterComponent></FooterComponent>
    </>
  )
}

export default Homepage