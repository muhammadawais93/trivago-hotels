import React from 'react';
import { useContext } from 'react';
import { TrivagoContext } from '../ContextAPI';
import { FaStar } from 'react-icons/fa';
import '../Styles/HotelDetail.scss';

const HotelDetail = (props) => {
    const HotelContext = useContext(TrivagoContext);
    const { getHotel, MoreRooms, handlerClick } = HotelContext;
    const SingleHotel = getHotel(props.match.params.id);
    return (
        <>
            {SingleHotel &&
                <section className="container">
                    <div className="hotel-detail">
                        <div className="display-imgs">
                            {SingleHotel.images.map((image, index) => (
                                <img src={image} alt="hotel" key={index} />
                            ))}
                        </div>
                        <div className="single-hotel-info">
                            <article className="desc">
                                <h3>{SingleHotel.name}</h3>
                                <p>{SingleHotel.description}</p>
                            </article>
                            <article className="info">
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
                    <div className="rooms-wrap">
                        <h2>Available Rooms</h2>
                        <div className="room-list">
                            {SingleHotel.rooms.map(room => (
                                <div id={room.id} className="room" key={room.id}>
                                    <h3>{room.name}</h3>
                                    <p>{room.description}</p>
                                    <div className="occupancy">Capacity: <span>{room.max_occupancy} Persons</span></div>
                                    <div className="occupancy">Price: <span>{room.price_in_usd}$</span></div>
                                </div>
                            ))}
                            {MoreRooms && SingleHotel.moreRoom.map(room => (
                                <div id={room.id} className="room" key={room.id}>
                                    <h3>{room.name}</h3>
                                    <p>{room.description}</p>
                                    <div className="occupancy">Capacity: <span>{room.max_occupancy} Persons</span></div>
                                    <div className="occupancy">Price: <span>{room.price_in_usd}$</span></div>
                                </div>
                            ))}
                        </div>
                        {(SingleHotel.moreRoom.length > 0) && (MoreRooms ?
                            <button onClick={handlerClick}>Less Rooms</button> :
                            <button onClick={handlerClick}>More Rooms</button>
                        )}
                    </div>
                </section>
            }
        </>
    )
}

export default HotelDetail;
