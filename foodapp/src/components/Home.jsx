
import React from 'react'
import Testimonials from './Testimonials'
import Featuress from './Featuress'
import BookTable from './BookTable'
import Carouselss from './Carouselss'
import About from './About'

function Home() {
  return (
    <div>
        <>
            <Carouselss></Carouselss>
            <div><br /></div>
            {/* <About></About> */}
            <About></About>

            <Featuress></Featuress>
            <br />
            <BookTable></BookTable>
            <br />
            <br />
            <br />
            <Testimonials></Testimonials>
        </>
    </div>
  )
}

export default Home