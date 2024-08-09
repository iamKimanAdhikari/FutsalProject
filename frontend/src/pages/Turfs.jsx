import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../turf.css"

function Turfs() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/turfs/', {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.status === 200) {
                    const turfsArray = Object.values(response.data.data);
                    setData(turfsArray);
                }
            } catch (error) {
                console.log("Could not fetch turf data");
            }
        };

        fetchData();
    }, []);

    function EachTurf({ turf }) {
        const { id, name, location, price, images_urls, isavailable } = turf;
        return (
            <div className='turf-card'>
                <div className='turf-image-container'>
                    <img
                        src={images_urls[0]}
                        alt="turf_image"
                        className="turf-image"
                    />
                </div>
                <div className='turf-details'>
                    <Link to={`/booking/${id}`} className='turf-name'>
                        <h1>{name}</h1>
                    </Link>
                    <div className='turf-info'>
                        <div className='turf-info-label'>Location</div>
                        <div className='turf-info-value'>: {location}</div>
                    </div>
                    <div className='turf-info'>
                        <div className='turf-info-label'>Status</div>
                        <div className='turf-info-value'>: {isavailable ? "Opened" : "Closed"}</div>
                    </div>
                    <div className='turf-price'>
                        <h1>Rs. {price}</h1>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='turfs-container'>
            <div className='turfs-header'>
                <h1>Turfs</h1>
            </div>
            <div className='turfs-list'>
                {data.map((turf) => (
                    <EachTurf key={turf.id} turf={turf} />
                ))}
            </div>
        </div>
    );
}

export default Turfs;
