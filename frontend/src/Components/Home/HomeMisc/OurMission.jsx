import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Import the new images for OurMission
import missionSlide1 from '../../../assets/OurMission/missionSlide1.webp';
import missionSlide2 from '../../../assets/OurMission/missionSlide2.webp';
import missionSlide3 from '../../../assets/OurMission/missionSlide3.webp';

function OurMission() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
    };

    const slides = [
        {
            image: missionSlide1,
            alt: 'Mission Slide 1',
        },
        {
            image: missionSlide2,
            alt: 'Mission Slide 2',
        },
        {
            image: missionSlide3,
            alt: 'Mission Slide 3',
        },
    ];

    return (
        <div className="bg-white py-10 md:my-24">
            <div className="container mx-auto px-4 md:flex md:items-center">
                {/* Text Section */}
                <div className="md:w-1/2 md:order-2 order-1 mb-8 md:mb-0 md:pl-8 md:ml-16">
                    <h2 className="text-darkBlue text-3xl md:text-6xl font-bold text-center md:text-left">
                        Our Mission
                    </h2>
                </div>

                {/* Slider Section */}
                <div className="md:w-1/2 md:order-1 order-2">
                    <Slider {...settings}>
                        {slides.map((slide, index) => (
                            <div key={index} className="w-full">
                                <img
                                    src={slide.image}
                                    alt={slide.alt}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default OurMission;
