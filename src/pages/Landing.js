import React, { Component } from 'react';
import { FaStar } from 'react-icons/fa';
import { TrivagoContext } from '../ContextAPI';
import HotelFilter from '../components/HotelFilter';
import '../Styles/LandingPage.scss';

class LandingPage extends Component {
    render() {
        return (
            <section className="langing container">
                <HotelFilter />
                <TrivagoContext.Consumer>
                    {context => {
                        let hotels = context.SortedHotels;
                        return (
                            <div className="landing--grids">
                                {hotels.map((hotel, index) =>
                                    <div id={`hotel-${index}`} className="landing--grid" key={`hotel-${index}`}>
                                        <span><img src={hotel.images[0]} alt="hotels" /></span>

                                        {hotel.price_category === 'low' &&
                                            <div className="stars">
                                                <FaStar /><FaStar /><FaStar />
                                                <span>Hotel</span>
                                            </div>
                                        }
                                        {hotel.price_category === 'medium' &&
                                            <div className="stars">
                                                <FaStar /><FaStar /><FaStar /><FaStar />
                                                <span>Hotel</span>
                                            </div>
                                        }
                                        {hotel.price_category === 'high' &&
                                            <div className="stars">
                                                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                                <span>Hotel</span>
                                            </div>
                                        }

                                        <h3 className="title">{hotel.name}</h3>
                                        <div className="other-info">
                                            <label>
                                                <span>Distance from Venue</span>
                                                <p>{hotel.distance_to_venue}</p>
                                            </label>
                                            <label>
                                                <span>Rating</span>
                                                <p>{hotel.rating}</p>
                                            </label>
                                            <label>
                                                {hotel.amenities.map((amenity, index) => <span className="landing--amenity" key={index}>{amenity}</span>)}
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    }}
                </TrivagoContext.Consumer>
            </section>
        );
    }
}

export default LandingPage;