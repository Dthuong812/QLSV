import React from 'react'
import Banner from '../components/layout/Banner'
import MenuNav from '../components/layout/MenuNav'

import FooterComponent from '../components/layout/FooterComponent'
import StudentAccount from '../components/student/StudentAccount'
import PostData from '../components/post/PostData'
import TotalPostCard from '../components/post/TotalPostCard'
import Header from '../components/layout/Header'

const StudentPage = () => (
  <>
    <Header></Header>
    <Banner></Banner>
    <MenuNav></MenuNav>
    <div className="d-flex m-4">
      <div className="w-75">
       <div className="d-flex gap-4 ms-4 ">
       <TotalPostCard />
       <TotalPostCard />
       </div>
        <PostData></PostData>
      </div>
      <StudentAccount></StudentAccount>
    </div>
    <FooterComponent></FooterComponent>
  </>
)

export default StudentPage