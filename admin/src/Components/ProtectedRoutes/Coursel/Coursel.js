import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Paper,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from '../../api/axiosInstance';

// Styled components
const RootContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#f9fbe7', // Light herbal background color
  maxWidth: 600,
  margin: 'auto',
}));

const FieldTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const LargeCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  backgroundColor: '#f0f4c3', // Light green background color
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Optional: Box shadow for depth
}));

const CardMediaContainer = styled(CardMedia)(({ theme }) => ({
  paddingTop: '56.25%', // 16:9 aspect ratio
}));

const CardContentWrapper = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: '#fff', // White background for content
}));

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    offerPercentage: '',
    expireDate: '',
    file: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [page, setPage] = useState(0); // For pagination
  const [formErrors, setFormErrors] = useState({
    title: false,
    offerPercentage: false,
    expireDate: false,
    file: false,
  });

  useEffect(() => {
    fetchOffers();
  }, [page]);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('api/getoffer', {
        params: { page },
        withCredentials: true,
      });
      console.log('Response data:', response.data); // Debugging statement
      setOffers(response.data);
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Prevent white space and limit the title to 60 characters
    if (name === 'title') {
      if (value.trim().length > 60) {
        return; // Ignore input if length exceeds 60 characters
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value.replace(/^\s\s*/, ''), // Remove all whitespaces
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      file: e.target.files[0],
    }));
  };

  const validateForm = () => {
    let valid = true;
    const errors = {
      title: false,
      offerPercentage: false,
      expireDate: false,
      file: false,
    };

    if (!formData.title.trim()) {
      errors.title = true;
      valid = false;
    }

    if (formData.offerPercentage <= 0 || formData.offerPercentage > 100) {
      errors.offerPercentage = true;
      valid = false;
    }

    if (!formData.expireDate) {
      errors.expireDate = true;
      valid = false;
    }

    if (!formData.file) {
      errors.file = true;
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('offerPercentage', formData.offerPercentage);
    data.append('expireDate', formData.expireDate);
    data.append('file', formData.file);

    try {
      if (editMode && currentOffer) {
        await axiosInstance.put(`api/offer/${currentOffer._id}`, data, {
          withCredentials: true,
        });
        setSnackbarMessage('Offer updated successfully');
      } else {
        await axiosInstance.post('api/offer', data, {
          withCredentials: true,
        });
        setSnackbarMessage('Offer added successfully');
      }
      fetchOffers();
      setFormData({
        title: '',
        offerPercentage: '',
        expireDate: '',
        file: null,
      });
      setEditMode(false);
      setCurrentOffer(null);
    } catch (error) {
      console.error('Error adding/updating offer:', error);
    }
  };

  const handleEdit = (offer) => {
    setEditMode(true);
    setCurrentOffer(offer);
    setFormData({
      title: offer.title,
      offerPercentage: offer.offerPercentage,
      expireDate: offer.expireDate,
      file: null,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`api/offer/${id}`, {
        withCredentials: true,
      });
      setSnackbarMessage('Offer deleted successfully');
      fetchOffers();
    } catch (error) {
      console.error('Error deleting offer:', error);
    }
  };

  const handleDialogOpen = (offer) => {
    setCurrentOffer(offer);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentOffer(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarMessage('');
  };

  const handlePageChange = (index) => {
    setPage(index);
  };

  return (
    <RootContainer>
      <Typography variant="h4" gutterBottom align="center">
        Offers Management
      </Typography>

      <FormPaper elevation={3}>
        <Typography variant="h6" gutterBottom>
          {editMode ? 'Edit Offer' : 'Add New Offer'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FieldTextField
                name="title"
                label="Title"
                fullWidth
                value={formData.title}
                onChange={handleInputChange}
                error={formErrors.title}
                helperText={formErrors.title && 'Title is required (max 60 characters)'}
                required
                inputProps={{ maxLength: 60 }} // Limit the input to 60 characters
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FieldTextField
                name="offerPercentage"
                label="Offer Percentage"
                type="number"
                fullWidth
                value={formData.offerPercentage}
                onChange={handleInputChange}
                error={formErrors.offerPercentage}
                helperText={formErrors.offerPercentage && 'Percentage should be between 1 and 100'}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                name="expireDate"
                label="Expire Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.expireDate}
                onChange={handleInputChange}
                error={formErrors.expireDate}
                helperText={formErrors.expireDate && 'Expire date is required'}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FieldTextField
                name="file"
                type="file"
                fullWidth
                onChange={handleFileChange}
                error={formErrors.file}
                helperText={formErrors.file && 'Image file is required'}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <SubmitButton type="submit" variant="contained" color="primary">
                {editMode ? 'Update Offer' : 'Add Offer'}
              </SubmitButton>
            </Grid>
          </Grid>
        </form>
      </FormPaper>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          {offers.map((offer) => (
            <Grid item key={offer._id} xs={12} sm={6} md={4}>
              <LargeCard>
                <CardMediaContainer image={offer.image} title={offer.title} />
                <CardContentWrapper>
                  <Typography variant="h6" gutterBottom>
                    {offer.title}
                  </Typography>
                  <Typography variant="body1">
                    {offer.offerPercentage}% off
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Expires on: {new Date(offer.expireDate).toLocaleDateString()}
                  </Typography>
                </CardContentWrapper>
                <CardActions>
                  <IconButton color="primary" onClick={() => handleEdit(offer)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDialogOpen(offer)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </LargeCard>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this offer?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(currentOffer._id)} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={!!snackbarMessage}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <IconButton size="small" color="inherit" onClick={handleSnackbarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </RootContainer>
  );
};

export default Offers; 
