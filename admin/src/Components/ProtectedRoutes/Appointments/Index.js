import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import {
  IconButton,
  InputAdornment,
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
  Skeleton,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './changethepassword.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('api/gettheadmins');
        setAdmins(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch admins.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRegister = async () => {
    const { email, password, confirmPassword } = formData;

    // Clear previous error messages
    setError('');

    if (!email || !password || !confirmPassword) {
      toast.error('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    // Updated Password validation regex
    const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
    if (!passwordValidation.test(password)) {
      toast.error(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
      );
      return;
    }

    try {
      await axiosInstance.post('api/registerforadmin', {
        email,
        password,
        confirmPassword,
      });
      toast.success('Admin added successfully!');
      setFormData({ email: '', password: '', confirmPassword: '' });
      navigate('/addadmin');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error('Email is already taken.');
      } else {
        toast.error('Failed to register. Please try again.');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      try {
        await axiosInstance.delete(`/api/deleteadmin/${id}`);
        toast.success('Admin deleted successfully!');
        const response = await axiosInstance.get('/api/gettheadmins');
        setAdmins(response.data);
      } catch (error) {
        console.error('Error deleting data:', error);
        toast.error('Failed to delete admin.');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="register-container">
      <ToastContainer />
      <Card className="register-box">
        <CardContent>
          <Typography variant="h4" className="register-heading">
            Register
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            className="input-field"
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            className="input-field"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            className="input-field"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleRegister}
            className="register-btn"
            fullWidth
          >
            Register
          </Button>
        </CardContent>
      </Card>

      <Grid container spacing={2} className="fetched-data-container">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="admin-card">
                <CardContent>
                  <Skeleton animation="wave" height={30} style={{ marginBottom: 6 }} />
                  <Skeleton animation="wave" height={30} width="80%" />
                </CardContent>
                <CardActions>
                  <Skeleton animation="wave" variant="rectangular" height={40} width="100%" />
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          admins.map((admin) => (
            <Grid item xs={12} sm={6} md={4} key={admin._id}>
              <Card className="admin-card">
                <CardContent>
                  <Typography>Email: {admin.email}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(admin._id)}
                    fullWidth
                    className="delete-btn"
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default Register;
