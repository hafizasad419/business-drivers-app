import React from 'react';
import Marquee from 'react-fast-marquee';

import client1 from "../../../assets/TrustedFamily/client1.webp";
import client2 from "../../../assets/TrustedFamily/client2.webp";
import client3 from "../../../assets/TrustedFamily/client3.webp";
import client4 from "../../../assets/TrustedFamily/client4.webp";
import client5 from "../../../assets/TrustedFamily/client5.webp";
import client6 from "../../../assets/TrustedFamily/client6.webp";

// Array of logos
const logos = [
    client1,
    client2,
    client3,
    client4,
    client5,
    client6
];

function TrustedFamily() {
    return (
        <div className="bg-white py-10 md:my-16">
            <h2 className="text-darkBlue text-3xl md:text-6xl font-bold text-center">
                Our Trusted Family
            </h2>
            <div className="overflow-hidden w-full mt-12">
                <Marquee gradient={false} speed={80}>
                    {logos.map((logo, index) => (
                        <div key={index} className="px-4">
                            <img src={logo} alt="Company Logo" className="h-20 md:h-28 object-contain" />
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    );
}

export default TrustedFamily;
