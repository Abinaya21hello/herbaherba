import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createContact } from "../../redux/actions/contactActions";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import "./contact.css";
import axiosInstance from "../../api/axiosInstance";

const Contact = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.contact);
  const [addresses, setAddresses] = useState([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    axiosInstance
      .get("api/gettopnav")
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const topNavData = response.data[0];
          setAddresses(topNavData.addresses || []);
          setEmail(topNavData.email || "");
          setPhone(topNavData.phone || "");
        } else {
          setAddresses([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching addresses:", error);
      });
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(
        /^[a-zA-Z\s]+$/,
        "Name should not contain numbers or special characters"
      )
      .max(15, "Name must be at most 15 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    phone: Yup.string()
      .matches(
        /^[1-9][0-9]{9,14}$/,
        "Phone number must be between 10 and 15 digits and should not start with 0"
      )
      .required("Phone is required"),
    category: Yup.string().required("Category is required"),
    message: Yup.string().required("Message is required"),
    location: Yup.string()
      .matches(
        /^[a-zA-Z\s,-]+$/,
        "Location should not contain special characters or numbers"
      )
      .required("Location is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const trimmedValues = {
      ...values,
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      category: values.category.trim(),
      message: values.message.trim(),
      location: values.location.trim(),
    };

    try {
      await dispatch(createContact(trimmedValues));
      alert("Contact successfully sent");
      resetForm();
    } catch (error) {
      alert("Failed to send contact");
    } finally {
      setSubmitting(false);
    }
  };

  const map =
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3927.8962979536127!2d77.54450397503258!3d10.107573990003425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDA2JzI3LjMiTiA3N8KwMzInNDkuNSJF!5e0!3m2!1sen!2sin!4v1718969311660!5m2!1sen!2sin";

  return (
    <>
      <div className="bg-breadcrumb">
        <div className="container text-center py-5" style={{ maxWidth: 900 }}>
          <h3
            className="text display-3 mb-4 wow fadeInDown"
            style={{ fontWeight: "600", fontSize: "7vw", color: "#000000" }}
            data-wow-delay="0.1s"
          >
            Contact Us
          </h3>
        </div>
      </div>
      <section className="contacts padding">
        <div className="container shadow grid">
          <div className="left">
            <iframe src={map} title="Google Map"></iframe>
          </div>
          <div className="right">
            <h1>Contact us</h1>
            <p>We're open for any suggestion or just to have a chat</p>
<div
  className="items"
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr", // Two equal columns
    gap: "20px", // Space between grid items
    alignItems: "start", // Aligns items to the start of the grid
    width: "100%"
  }}
>
  {addresses.map((address, index) => (
    <div className="box address-box" key={index} style={{ gridColumn: "span 2" }}>
      <h4 style={{ color: "black", marginBottom: "5px", fontSize: "24px" }}>ADDRESS:</h4> {/* Increased font size */}
      <p
        className="hover-text"
        style={{
          color: "black",
          fontSize: "20px", // Increased font size for address text
          lineHeight: "1.5em", 
          margin: "0", 
          whiteSpace: "normal",
          wordWrap: "break-word"
        }}
      >
        {`${address.street}, ${address.city}, ${address.state}, ${address.country} - ${address.pincode}`}
      </p>
    </div>
  ))}

  <div className="box email-box" style={{ gridColumn: "span 1" }}>
    <h4 style={{ color: "black", marginBottom: "5px", fontSize: "24px" }}>EMAIL:</h4> {/* Increased font size */}
    <p className="hover-text" style={{ color: "black", margin: "0", fontSize: "20px" }}>{email}</p> {/* Increased font size */}
  </div>

  <div className="box phone-box" style={{ gridColumn: "span 1" }}>
    <h4 style={{ color: "black", marginBottom: "5px", fontSize: "24px" }}>PHONE:</h4> {/* Increased font size */}
    <p className="hover-text" style={{ color: "black", margin: "0", fontSize: "20px" }}>{phone}</p> {/* Increased font size */}
  </div>
</div>





            <Formik
              initialValues={{
                name: "",
                email: "",
                phone: "",
                category: "",
                message: "",
                location: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
           <Form className="contact-form">
  <Field
    type="text"
    name="name"
    placeholder="Name"
    className="form-input"
  />
  <ErrorMessage
    name="name"
    component="div"
    className="error"
    style={{ fontSize: "16px" }} // Increased font size
  />
  <Field
    type="email"
    name="email"
    placeholder="Email"
    className="form-input"
  />
  <ErrorMessage
    name="email"
    component="div"
    className="error"
    style={{ fontSize: "16px" }} // Increased font size
  />
  <Field
    type="text"
    name="phone"
    placeholder="Phone"
    className="form-input"
  />
  <ErrorMessage
    name="phone"
    component="div"
    className="error"
    style={{ fontSize: "16px" }} // Increased font size
  />
  <Field as="select" name="category" className="form-select">
    <option value="">Select Category</option>
    <option value="General Enquiry">General Enquiry</option>
    <option value="Product">Product</option>
    <option value="Complaint">Complaint</option>
    <option value="Other">Other</option>
  </Field>
  <ErrorMessage
    name="category"
    component="div"
    className="error"
    style={{ fontSize: "16px" }} // Increased font size
  />
  <Field
    as="textarea"
    name="message"
    placeholder="Message"
    className="form-textarea"
  />
  <ErrorMessage
    name="message"
    component="div"
    className="error"
    style={{ fontSize: "16px" }} // Increased font size
  />
  <Field
    type="text"
    name="location"
    placeholder="Location"
    className="form-input"
  />
  <ErrorMessage
    name="location"
    component="div"
    className="error"
    style={{ fontSize: "16px" }} // Increased font size
  />
  <button
    className="primary-btn submit-btn"
    type="submit"
    disabled={isSubmitting || loading}
  >
    SEND MESSAGE
  </button>
  {error && <p className="submit-error">{error}</p>}
</Form>

              )}
            </Formik>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Contact;
