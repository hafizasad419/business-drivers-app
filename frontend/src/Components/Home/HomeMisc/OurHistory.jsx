import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import slide1 from '../../../assets/OurHistory/slide1.webp';
import slide2 from '../../../assets/OurHistory/slide2.webp';
import slide3 from '../../../assets/OurHistory/slide3.webp';

function OurHistory() {
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
            image: slide1,
            alt: 'Slide 1',
        },
        {
            image: slide2,
            alt: 'Slide 2',
        },
        {
            image: slide3,
            alt: 'Slide 3',
        },
    ];

    return (
        <div className="bg-white py-10">
            <div className="container mx-auto px-4 md:flex md:items-center">
                {/* Text Section */}
                <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
                    <h2 className="text-darkBlue text-3xl md:text-6xl font-bold text-center md:text-left">
                        Our History
                    </h2>
                </div>

                {/* Slider Section */}
                <div className="md:w-1/2">
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

export default OurHistory;
