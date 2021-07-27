import React, {useState, useEffect} from 'react'; 
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


const ListingDetail = (props) => {
    // console.log('is authenticated',props.isAuthenticated);
    if(!props.isAuthenticated){
       props.history.push('/login');
    }
    const[listing , setListing] = useState({});
    const[realtor, setRealtor]= useState({});
    const[price, setPrice] = useState(0);
   
    // format price nicely with commas
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    // 1. fetch listing data
    useEffect(() =>{
        const slug = props.match.params.id;
        const config ={
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}` 
            }
        };
        axios.get(`http://127.0.0.1:8000/api/listings/${slug}` , config)
        .then(res =>{
            setListing(res.data);
            setPrice(numberWithCommas(res.data.price));
            
        })
        .catch(err =>{
            // skip error 
        })
        
    }, [props.match.params.id]);

    useEffect(() => {
        const id = listing.realtor;

        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };

        if (id) {
            axios.get(`http://127.0.0.1:8000/api/realtors/${id}`, config)
            .then(res => {
                setRealtor(res.data);
            })
            .catch(err => {

            });
        }
    }, [listing.realtor]);

   

    // display listing photos as an array of rows 
    // each row contains three images 
    const displayInteriorImages= ()=>{
        let result = []
        let photos = listing.listing_photos ? listing.listing_photos  :[];
        for(let i=0 ; i < photos.length ; i+=3 ){
            result.push(
                <div key={i} className="row">
                    <div className="col-1-of-3">
                        {
                            photos[i]? 
                            (
                            <div className='listingdetail__display'>
                                <img className='listingdetail__display__image' src={photos[i]} alt='' />
                            </div>
                            ) : null
                        }

                    </div>
                    <div className="col-1-of-3">
                        {
                            photos[i+1]? 
                            (
                            <div className='listingdetail__display'>
                                <img className='listingdetail__display__image' src={photos[i+1]} alt='' />
                            </div>
                            ) : null
                        }

                    </div>
                    <div className="col-1-of-3">
                        {
                            photos[i+2]? 
                            (
                            <div className='listingdetail__display'>
                                <img className='listingdetail__display__image' src={photos[i+2]} alt='' />
                            </div>
                            ) : null
                        }

                    </div>

                </div>
            )
        }
        return result;
    }
    return ( 
        <div className="listingdetail">
            <Helmet>
                <title>Realest Estate - Listing | {`${listing.title}`}</title>
                <meta
                    name='description'
                    content='Listing detail'
                />
            </Helmet>
            <div className='listingdetail__header'>
                <h1 className='listingdetail__title'>{listing.title}</h1>
                <p className='listingdetail__location'>{listing.city}, {listing.state}, {listing.zipcode}</p>
            </div>
             <div className='row'>
                <div className='listingdetail__breadcrumb'>
                    <Link className='listingdetail__breadcrumb__link' to='/'>Home</Link> / {listing.title}
                </div>
            </div>

             <div className='row'>
                <div className='col-3-of-4'>
                    <div className='listingdetail__display'>
                        <img className='listingdetail__display__image' src={listing.photo_main} alt='' />
                    </div>
                </div>
                <div className='col-1-of-4'>
                    <div className='listingdetail__display'>
                        <img className='listingdetail__display__image' src={realtor.photo} alt='' />
                    </div>
                    <h3 className='listingdetail__realtor'>{realtor.name}</h3>
                    <p className='listingdetail__contact'>{realtor.phone}</p>
                    <p className='listingdetail__contact'>{realtor.email}</p>
                    <p className='listingdetail__about'>{realtor.description}</p>
                </div>
            </div>

            <div className='row'>
                <div className='col-1-of-2'>
                    <ul className='listingdetail__list'>
                        <li className='listingdetail__list__item'>Home Type: {listing.home_type}</li>
                        <li className='listingdetail__list__item'>Price: ${price}</li>
                        <li className='listingdetail__list__item'>Bedrooms: {listing.bedrooms}</li>
                        <li className='listingdetail__list__item'>Bathrooms: {listing.bathrooms}</li>
                        <li className='listingdetail__list__item'>Square Feet: {listing.sqft}</li>
                    </ul>
                </div>
                <div className='col-1-of-2'>
                    <ul className='listingdetail__list'>
                        <li className='listingdetail__list__item'>Sale Type: {listing.sale_type}</li>
                        <li className='listingdetail__list__item'>Address: {listing.address}</li>
                        <li className='listingdetail__list__item'>City: {listing.city}</li>
                        <li className='listingdetail__list__item'>State: {listing.state}</li>
                        <li className='listingdetail__list__item'>Zipcode: {listing.zipcode}</li>
                    </ul>
                </div>
            </div>

            <div className='row'>
                <p className='listingdetail__description'>{listing.description}</p>
            </div>
           
           
            {displayInteriorImages()}



        </div>
     );
}

const mapStateToProps =(state) =>{
    return {
    isAuthenticated:state.auth.isAuthenticated,
}
}
 
export default connect(mapStateToProps)(ListingDetail);