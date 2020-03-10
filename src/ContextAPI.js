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
                        obj[item] = false;
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
        //event.preventDefault();
        const target = event.target;
        const name = target.name;
        if (target.type === 'checkbox') {
            let Amenities = { ...this.state.Amenities }
            Amenities[name] = !this.state.Amenities[name];

            this.setState({ Amenities }, () => this.filterData(name));
        } else {
            this.setState({ [name]: target.value }, () => this.filterData(name));
        }
    }

    filterData = (name) => {
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
            filterHotel = filterHotel.filter(hotel => hotel.distance_to_venue <= DistanceToVenu);
        }

        if (Rating !== 0) {
            filterHotel = filterHotel.filter(hotel => Math.floor(hotel.rating) === Math.floor(Rating));
        }

        if (PriceCategory !== '') {
            filterHotel = filterHotel.filter(hotel => hotel.price_category === PriceCategory);
        }

        if (Price !== 0) {
            filterHotel = filterHotel.filter(hotel => (hotel.rooms.map(Rprice => Rprice.price_in_usd <= Price).includes(true)));
        }

        if (Amenities[name]) {
            filterHotel = filterHotel.filter(hotel => (hotel.amenities.map(amenity => amenity === name)).includes(true));
        }
        for (let key in Amenities) {
            filterHotel.filter(hotel => (hotel.amenities.map(amenity => amenity === key)).includes(true));
        }

        this.setState({ SortedHotels: filterHotel });
    }

    getHotel = id => {
        let tempHotel = [...this.state.Hotels];
        let hotel = tempHotel.find(hotel => hotel.id === id);
        hotel = hotel && { ...hotel, rooms: hotel.rooms.slice(2) };
        return hotel;
    }

    render() {
        return (
            <TrivagoContext.Provider value={{ ...this.state, getHotel: this.getHotel, handleChange: this.handleChange }}>
                {this.props.children}
            </TrivagoContext.Provider>
        );
    }
}

export { TrivagoProvider, TrivagoContext };