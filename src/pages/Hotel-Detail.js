import React from 'react';
import { useContext } from 'react';
import { TrivagoContext } from '../ContextAPI';
import { FaStar } from 'react-icons/fa';
import '../Styles/HotelDetail.scss';

const HotelDetail = (props) => {
    const HotelContext = useContext(TrivagoContext);
    const { getHotel } = HotelContext;
    const SingleHotel = getHotel(props.match.params.id); console.log(SingleHotel);
    return (
        <>
            {SingleHotel &&
                <section className="container">
                    <div className="hotel-detail">
                        <div className="display-imgs">
                            {SingleHotel.images.map(image => (
                                <img src={image} alt="hotel" />
                            ))}
                        </div>
                        <div class="single-hotel-info">
                            <article class="desc">
                                <h3>{SingleHotel.name}</h3>
                                <p>{SingleHotel.description}</p>
                            </article>
                            <article class="info">
                                <h3>Info</h3>
                                {SingleHotel.price_category === 'low' &&
                                    <div className="stars">
                                        <FaStar /><FaStar /><FaStar />
                                        <span>Hotel</span>
                                    </div>
                                }
                                {SingleHotel.price_category === 'medium' &&
                                    <div className="stars">
                                        <FaStar /><FaStar /><FaStar /><FaStar />
                                        <span>Hotel</span>
                                    </div>
                                }
                                {SingleHotel.price_category === 'high' &&
                                    <div className="stars">
                                        <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                        <span>Hotel</span>
                                    </div>
                                }
                                <p>Distance from Venue : {SingleHotel.distance_to_venue}</p>
                                <p>Rating : {SingleHotel.rating}</p>
                                <div className="amenities">
                                    {SingleHotel.amenities.map((amenity, index) => <span className="landing--amenity" key={index}>{amenity}</span>)}
                                </div>
                            </article>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default HotelDetail;
