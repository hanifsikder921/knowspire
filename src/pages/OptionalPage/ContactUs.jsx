import React from 'react';
import { Helmet } from 'react-helmet-async';

const ContactUs = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <Helmet title='Contact Us- Knowspire'></Helmet>
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold">Get in Touch</h2>
                <p className="mt-2 text-lg">
                    Have a question or want to work with us? Fill out the form below.
                </p>
            </div>

            <form className="space-y-6 shadow-lg rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="John"
                            className="mt-1 block w-full border focus:ring-1 rounded-lg px-4 py-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Doe"
                            className="mt-1 block w-full border focus:ring-1 rounded-lg px-4 py-2"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="you@example.com"
                        className="mt-1 block w-full border focus:ring-1 rounded-lg px-4 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="company" className="block text-sm font-medium">Company (optional)</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        placeholder="Company Name"
                        className="mt-1 block w-full border focus:ring-1 rounded-lg px-4 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="4"
                        placeholder="Tell us what you're looking for..."
                        className="mt-1 block w-full border focus:ring-1 rounded-lg px-4 py-2"
                    ></textarea>
                </div>

                <div className="flex items-center">
                    <input type="checkbox" id="terms" className="mr-2" />
                    <label htmlFor="terms" className="text-sm">
                        I agree to the <a href="/condition" className="underline">Terms & Conditions</a>
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full btn btn-primary"
                >
                    Send Message
                </button>

                <p className="text-center text-sm mt-3">
                    We usually respond within 24–48 hours.
                </p>
            </form>
        </div>
    );
};

export default ContactUs;
