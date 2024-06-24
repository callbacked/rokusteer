import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { fetchChannels, launchChannel } from '../services/rokuService';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ChannelList.css';
import { Apps as AppsIcon, Close as CloseIcon } from '@mui/icons-material';

const ChannelList = ({ rokuIp }) => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    const [channels, setChannels] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const getChannels = async () => {
            const xml = await fetchChannels(rokuIp);
            if (xml) {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xml, 'application/xml');

                if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
                    console.error('Error parsing XML:', xmlDoc.getElementsByTagName('parsererror')[0].textContent);
                    return;
                }

                const appElements = xmlDoc.getElementsByTagName('app');
                const appList = Array.from(appElements).map(app => ({
                    id: app.getAttribute('id'),
                    name: app.textContent.trim()
                }));
                setChannels(appList);
                console.log('Channels fetched successfully:', appList);
            }
        };

        if (rokuIp) {
            getChannels();
        }
    }, [rokuIp]);

    const handleLaunch = async (appID) => {
        if (rokuIp) {
            await launchChannel(rokuIp, appID);
            console.log(`Channel with ID: ${appID} launched successfully`);
        } else {
            console.error('Roku IP address is not set');
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    dots: false // Hide dots in mobile 
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    dots: false // Hide dots in mobile 
                }
            }
        ]
    };

    return (
        <div className={`channel-list-container ${isExpanded ? 'expanded' : ''}`}>
            {!isExpanded ? (
                <button className="expand-button" onClick={() => setIsExpanded(true)}>
                    <AppsIcon style={{ fontSize: 24, color: 'white' }} />
                </button>
            ) : (
                <div className="expanded-view text-white font-bold">
                    <button className="close-button" onClick={() => setIsExpanded(false)}>
                        <CloseIcon style={{ fontSize: 24, color: 'white' }} />
                    </button>
                    <Slider {...settings}>
                        {channels.map(channel => (
                            <div key={channel.id} className="channel-item" onClick={() => handleLaunch(channel.id)} style={{ cursor: 'pointer' }}>
                                <img
                                    src={`${backendURL}/query-icon?rokuIp=${rokuIp}&appId=${channel.id}`}
                                    alt={channel.name}
                                    className="channel-icon ml-2 md:ml-5"
                                />
                                <p className="ml-3 md:ml-1">{channel.name}</p>
                            </div>
                        ))}
                    </Slider>
                </div>
            )}
        </div>
    );
}    

export default ChannelList;
