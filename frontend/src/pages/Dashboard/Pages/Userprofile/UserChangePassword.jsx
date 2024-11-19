import React, { useState } from 'react';
import Sidebar from '../../Pages/Sidebar';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './UserChange.css'; // Import custom CSS
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons for visibility toggle

const PasswordUpdateSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Old Password is required'),
  newPassword: Yup.string()
    .min(8, 'New Password must be at least 8 characters')
    .required('New Password is required'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm New Password is required'),
});

function PasswordUpdateForm() {
  const navigate = useNavigate();
  
  // Password visibility state
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmitPassword = (values, { setSubmitting }) => {
    console.log(values);
    setTimeout(() => {
      setSubmitting(false);
      // Handle success/failure here
    }, 1000);
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container my-4">
        <div className="herbal-card">
          <div className="">
            <h2>UPDATE NEW PASSWORD</h2>
            <br/>
          </div>
          <div className="card-body">
       <Formik
  initialValues={{
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  }}
  validationSchema={PasswordUpdateSchema}
  onSubmit={handleSubmitPassword}
>
  {({ isSubmitting }) => (
    <Form>
      <div className="mb-4">
        <label htmlFor="oldPassword" className="form-label" style={{ fontSize: '25px' }}>
          Old Password
        </label>
        <div className="input-group">
          <Field
            name="oldPassword"
            type={showOldPassword ? 'text' : 'password'}
            className="herbal-input"
          />
          <span
            className="eye-icon"
            onClick={() => setShowOldPassword(!showOldPassword)}
          >
            {showOldPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <ErrorMessage
          name="oldPassword"
          component="div"
          className="error-message"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="newPassword" className="form-label" style={{ fontSize: '25px' }}>
          New Password
        </label>
        <div className="input-group">
          <Field
            name="newPassword"
            type={showNewPassword ? 'text' : 'password'}
            className="herbal-input"
          />
          <span
            className="eye-icon"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <ErrorMessage
          name="newPassword"
          component="div"
          className="error-message"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="confirmNewPassword" className="form-label" style={{ fontSize: '25px' }}>
          Confirm New Password
        </label>
        <div className="input-group">
          <Field
            name="confirmNewPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            className="herbal-input"
          />
          <span
            className="eye-icon"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <ErrorMessage
          name="confirmNewPassword"
          component="div"
          className="error-message"
        />
      </div>

      <div className="d-flex justify-content-center">
        <button
          type="submit"
          className="herbal-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Updating...
            </>
          ) : (
            'Update Password'
          )}
        </button>
      </div>
    </Form>
  )}
</Formik>

          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordUpdateForm;
