import React, { useEffect, useState } from 'react';
import '../Styles/Contact.css'; // Import your CSS file for Contact component styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Loader from '../Components/Loader';

function Contact() {

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="contact-container">
      <div className="contact-content">
        <h2>Contact Us</h2>
        <p>Have questions? We're here to help!</p>
        <div className="contact-details">
          <div className="detail-item">
            <FontAwesomeIcon icon={faEnvelope} className="detail-icon" />
            <p>Email: contact@example.com</p>
          </div>
          <div className="detail-item">
            <FontAwesomeIcon icon={faPhone} className="detail-icon" />
            <p>Phone: +1 123 456 7890</p>
          </div>
          <div className="detail-item">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="detail-icon" />
            <p>Address: 123 Shopping St, City, Country</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
