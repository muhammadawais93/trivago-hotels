import React from 'react';
import { useContext } from 'react';
import { TrivagoContext } from '../ContextAPI';
import '../Styles/HotelFilter.scss';

function HotelFilter() {
    const HotelContext = useContext(TrivagoContext);
    const {
        DistanceToVenuMin,
        DistanceToVenuMax,
        PriceMin,
        PriceMax,
        Amenities,
        handleChange
    } = HotelContext;

    return (
        <div className="landing--filter">
            <form className="filter--form">
                {/* price per night */}
                <div className="form-group price-per-night">
                    <label htmlFor="Price">Price / Night</label>
                    <input type="range" id="Price" name="Price" min={PriceMin} max={PriceMax} step="10" onChange={handleChange} />
                </div>

                {/* price_category */}
                <div className="form-group price-category">
                    <label htmlFor="PriceCategory">Hotel Type</label>
                    <select name="PriceCategory" onChange={handleChange}>
                        <option value="">All</option>
                        <option value="low">3-Star</option>
                        <option value="medium">4-Star</option>
                        <option value="high">5-Star</option>
                    </select>
                </div>

                {/* distance_to_venue */}
                <div className="form-group dist-To-Venu">
                    <label htmlFor="DistanceToVenu">Hotel Loaction</label>
                    <input type="range" id="DistanceToVenu" name="DistanceToVenu" min={DistanceToVenuMin} max={DistanceToVenuMax} step="10" onChange={handleChange} />
                    <span>m²</span>
                </div>

                {/* Hotel rating */}
                <div className="form-group rating">
                    <label htmlFor="Rating">Max. Rating</label>
                    <input type="number" id="Rating" name="Rating" min="1" max="5" />
                </div>

                {/* Hotel Amenities */}
                {Object.keys(Amenities).length > 0 &&
                    Object.keys(Amenities).map((amenity, index) => {
                        let fromatString = amenity.replace(/_/g, ' ');
                        fromatString = fromatString.charAt(0).toUpperCase() + fromatString.slice(1);
                        return (
                            <div className="form-group amenities" key={`amenities-${index}`}>
                                <label htmlFor="rating">{fromatString}</label>
                                <input type="checkbox" id={amenity} name={amenity} />
                            </div>
                        )
                    })
                }
            </form>
        </div>
    )
}

export default HotelFilter;
