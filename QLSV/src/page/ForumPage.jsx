import React from 'react'
import Header from '../components/layout/Header'
import Banner from '../components/layout/Banner'
import MenuNav from '../components/layout/MenuNav'
import FooterComponent from '../components/layout/FooterComponent'
import NewForum from '../components/forum/NewForum'
import ForumData from '../components/forum/ForumData'
import PostData from '../components/post/PostData'
import StudentData from '../components/student/StudentData'

const ForumPage = () => {
  return (
    <>
     <Header></Header>
      <Banner></Banner>
      <MenuNav></MenuNav>
      <NewForum></NewForum>
      <ForumData></ForumData>
      <div className="d-flex ms-4">
      <div className="w-75">
      <PostData ></PostData>
      </div>
      <StudentData></StudentData>
      </div>
      <FooterComponent></FooterComponent>
    </>
  )
}

export default ForumPage