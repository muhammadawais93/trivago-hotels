import React, { Component } from 'react';

const TrivagoContext = React.createContext();

class TrivagoProvider extends Component {
    state = {
        Hotels: [],
        SortedHotels: [],
        DistanceToVenu: 0,
        DistanceToVenuMin: 0,
        DistanceToVenuMax: 0,
        Rating: 0,
        Price: 0,
        PriceMin: 0,
        PriceMax: 0,
        PriceCategory: '',
        Amenities: {}
    };

    componentDidMount() {
        this.fetchHotels();
    }

    fetchHotels = async () => {
        try {
            await fetch(`http://localhost:3012/hotels`)
                .then(response => response.json())
                .then(hotels => {

                    //get distance min-max
                    let DistanceMin = Math.min(...hotels.map(hotel => hotel.distance_to_venue));
                    let DistanceMax = Math.max(...hotels.map(hotel => hotel.distance_to_venue));

                    //get price min-max
                    let PriceMin = Math.min(...hotels.map(hotel => Math.min(...hotel.rooms.map(room => room.price_in_usd))));
                    let PriceMax = Math.max(...hotels.map(hotel => Math.max(...hotel.rooms.map(room => room.price_in_usd))));

                    //get all indiviual amenities
                    let Amenities = [...new Set([].concat(...hotels.map(hotel => hotel.amenities)))];
                    Amenities = Amenities.reduce((obj, item) => {
                        obj[item] = 0;
                        return obj
                    }, {});

                    this.setState({
                        Hotels: hotels,
                        SortedHotels: hotels,
                        DistanceToVenuMin: DistanceMin,
                        DistanceToVenuMax: DistanceMax,
                        PriceMin: PriceMin,
                        PriceMax: PriceMax,
                        Amenities: Amenities
                    });
                }
                )
        }
        catch (error) {
            console.log(error);
        }
    }

    handleChange = event => {
        const target = event.target;
        const value = target.value === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value }, this.filterData);
    }

    filterData = () => {
        const {
            Hotels,
            DistanceToVenu,
            Rating,
            Price,
            PriceCategory,
            Amenities
        } = this.state;
        let filterHotel = [...Hotels];
        if (DistanceToVenu !== 0) {
            filterHotel = filterHotel.filter(hotel => hotel.distance_to_venue < DistanceToVenu);
        }

        if (Rating !== 0) {
            filterHotel = filterHotel.filter(hotel => hotel.rating < Rating);
        }

        if (PriceCategory !== 0) {

            filterHotel = filterHotel.filter(hotel => hotel.price_category === PriceCategory);
        }

        if (Price !== 0) {
            filterHotel = filterHotel.map(hotel => hotel.rooms.filter(price => Price < price));
        }

        this.setState({ SortedHotels: filterHotel });
    }

    render() {
        return (
            <TrivagoContext.Provider value={{ ...this.state, handleChange: this.handleChange }}>
                {this.props.children}
            </TrivagoContext.Provider>
        );
    }
}

export { TrivagoProvider, TrivagoContext };