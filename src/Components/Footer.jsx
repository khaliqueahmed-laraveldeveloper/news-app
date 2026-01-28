import React, { Component } from 'react'

export default function Footer() {
    return (
        <footer className="bg-light text-dark pt-4 pb-2 mt-5 border-top">
            <div className="container">
                <div className="row">
                    {/* Brand Section */}
                    <div className="col-md-4">
                        <h5 className="fw-bold text-primary">NewsAPP</h5>
                        <p className="small text-muted">
                            Your daily source for the latest headlines in Pakistan and around the globe. Stay informed, stay ahead.
                        </p>
                    </div>

                    {/* Quick Categories Section */}
                    <div className="col-md-4">
                        <h6 className="text-uppercase fw-bold mb-3">Categories</h6>
                        <div className="row">
                            <div className="col-6">
                                <ul className="list-unstyled small">
                                    <li><a href="#" className="text-decoration-none text-dark">Business</a></li>
                                    <li><a href="#" className="text-decoration-none text-dark">Health</a></li>
                                    <li><a href="#" className="text-decoration-none text-dark">Science</a></li>
                                </ul>
                            </div>
                            <div className="col-6">
                                <ul className="list-unstyled small">
                                    <li><a href="#" className="text-decoration-none text-dark">Sports</a></li>
                                    <li><a href="#" className="text-decoration-none text-dark">Technology</a></li>
                                    <li><a href="#" className="text-decoration-none text-dark">Entertainment</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Contact/ISO Section */}
                    <div className="col-md-4 text-md-end">
                        <h6 className="text-uppercase fw-bold mb-3">Region</h6>
                        <p className="small mb-1">Standard: <strong>ISO 3166-US</strong></p>
                        <p className="small text-muted">Country: US</p>
                    </div>
                </div>

                <hr />

                <div className="row">
                    <div className="col-md-12 text-center">
                        <p className="small mb-0 text-muted">
                            &copy; {new Date().getFullYear()} NewsAPP. Developed By Khalique Ahmed Mughal.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
