import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import tickImg from '../../assets/icons/tick.png';
import { MyButton } from '../../Components';

function ContactUs() {
    const [state, handleSubmit] = useForm("xzzpgnbo");
    const [submitting, setSubmitting] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        await handleSubmit(event);
        setSubmitting(false);
        setShowPopup(true);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    return (
        <section className="bg-white">
            <div className="py-12 lg:py-20 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-6 text-4xl lg:text-5xl tracking-tight font-extrabold text-center text-darkBlue">
                    Contact <span className='text-orange'>Us</span>
                </h2>
                {showPopup ? (
                    <div className="fixed inset-0 flex justify-center items-center bg-darkBlue bg-opacity-75 z-50">
                        <div className="bg-white p-8 rounded-lg shadow-xl border-orange border-2 max-w-md w-full mx-4">
                            <img src={tickImg} alt="" className="w-20 mx-auto mb-6" />
                            <h2 className="text-2xl text-darkBlue font-bold mb-4 text-center">Thank You!</h2>
                            <p className="text-center text-lightBlue mb-6 font-medium">
                                Your details have been successfully submitted.
                                <span className='text-orange font-semibold'> We'll get back to you soon.</span>
                            </p>
                            <div className="flex justify-center">
                                <MyButton
                                    type="button"
                                    className="py-3 px-8 text-lg text-center text-white bg-orange hover:bg-darkBlue transition-colors duration-300 rounded-md font-semibold"
                                    onClick={handlePopupClose}
                                    children='OK'
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="mb-10 text-center text-lightBlue font-medium text-lg lg:text-xl">
                            Feel free to drop a message.
                        </p>
                        <form onSubmit={handleFormSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block mb-2 font-semibold text-xl text-darkBlue">Your email</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-darkBlue text-lg rounded-md focus:ring-orange focus:border-orange block w-full p-3 transition-colors duration-200"
                                    placeholder="your-email@example.com"
                                    required
                                />
                                <ValidationError
                                    prefix="Email"
                                    field="email"
                                    errors={state.errors}
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block mb-2 font-semibold text-xl text-darkBlue">Your phone number</label>
                                <input
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-darkBlue text-lg rounded-md focus:ring-orange focus:border-orange block w-full p-3 transition-colors duration-200"
                                    placeholder="123-456-7890"
                                    required
                                />
                                <ValidationError
                                    prefix="Phone"
                                    field="phone"
                                    errors={state.errors}
                                />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block mb-2 text-xl font-semibold text-darkBlue">Subject</label>
                                <input
                                    id="subject"
                                    type="text"
                                    name="subject"
                                    className="block p-3 w-full text-lg text-darkBlue bg-gray-50 rounded-md border border-gray-300 shadow-sm focus:ring-orange focus:border-orange transition-colors duration-200"
                                    placeholder="Let us know how we can help you"
                                    required
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="message" className="block mb-2 text-xl font-semibold text-darkBlue">Your Query</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="6"
                                    className="block p-3 w-full text-lg text-darkBlue bg-gray-50 rounded-md shadow-sm border border-gray-300 focus:ring-orange focus:border-orange transition-colors duration-200"
                                    placeholder="Please leave your message here..."
                                ></textarea>
                                <ValidationError
                                    prefix="Message"
                                    field="message"
                                    errors={state.errors}
                                />
                            </div>
                            <div className="flex justify-center md:justify-start">
                                <MyButton
                                    type="submit"
                                    className="py-3 px-8 text-lg text-center text-white bg-orange hover:text-orange transition-colors duration-300 rounded-md font-semibold"
                                    disabled={state.submitting || submitting}
                                    children={submitting ? "Sending..." : "Send message!"}
                                />
                            </div>
                        </form>
                    </>
                )}
            </div>
        </section>
    );
}

export default ContactUs;