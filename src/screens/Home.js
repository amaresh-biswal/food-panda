import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();

    setFoodCat(response[1]);
    setFoodItem(response[0]);
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <div>
      <Navbar />
      <div>
            <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}} >
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner" id='carousel'>
                    <div className="carousel-caption" style={{zIndex: "10"}}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                            {/* <button className="btn btn-outline-success text-white bg-primary" type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/900x700/?icecream" className="d-block w-100" style={{filter:"brightness(50%)"}} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100" style={{filter:"brightness(50%)"}} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{filter:"brightness(50%)"}} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
      <div className='conatiner m-2'>
        {
          foodCat !== []
            ? foodCat.map((data) => {
              return (
                <div className='row mb-3' >
                  <div key={data._id} className="fs-3 m-3" >
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem !== []
                    ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                      .map(filterItems => {
                        return (
                          <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 mb-2' >
                            <Card foodName={filterItems.name} options={filterItems.options[0]} imgSrc={filterItems.img} />
                          </div>
                        )
                      })
                    : <div>No such data found</div>}
                </div>
              )
            })
            : <div>"""""""""</div>
        }
      </div>
      <Footer />
    </div>
  )
}
