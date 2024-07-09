import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  MenuItem,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../Components/Loader";
import "../Styles/profile.css";
import logout from "../Hooks/logout";

const Profile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const Data = localStorage.getItem("token");
  const userId = Data && JSON.parse(Data).id;

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + `/api/v1/profile/${userId}`,
        { withCredentials: true }
      );
      setUser(data);
      setImageUrl(data.profileImage);
      setLoading(false);
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
      }, 1500);

      if (error.response.status === 401) {
        setTimeout(() => {
          toast.error("Unable to update Login again");
        }, 800);

        setTimeout(() => {
          logout();
        }, 1500);
      } else {
        toast.error(error);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageUrl(URL.createObjectURL(file));
    setIsDirty(true);
  };

  const handleImageUpload = async () => {
    if (!image) return imageUrl; // Return the existing image URL if no new image is uploaded

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "myCloudStorage");
    formData.append("cloud_name", "dcogwd6ql");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dcogwd6ql/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const cloudData = await res.json();
      setImageUrl(cloudData.secure_url);
      return cloudData.secure_url;
    } catch (error) {
      toast.error("Failed to upload image");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setIsDirty(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileImageUrl = await handleImageUpload();

    try {
      await axios.put(
        process.env.REACT_APP_API_URL+`/api/v1/profile/${userId}`,
        {
          ...user,
          profileImage: profileImageUrl,
        },
        { withCredentials: true }
      );
      toast.success("Profile updated successfully!");
      setIsDirty(false);
      fetchUserData();
    } catch (error) {
      setLoading(false);
      if (error.response.status === 401) {
        setTimeout(() => {
          toast.error("Unable to update Login again");
        }, 800);

        setTimeout(() => {
          console.log("first");
          logout();
        }, 1500);
      } else {
        toast.error(error);
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} className="profile-container">
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} className="profile-image-container">
              <div className="image">
                <img
                  src={
                    imageUrl ||
                    "https://publicdomainvectors.org/download.php?file=Male-Avatar.svg"
                  }
                  alt="Profile"
                  className="profile-image"
                />
                <Button
                  variant="contained"
                  component="label"
                  className="upload-button"
                >
                  Upload
                  <input type="file" hidden onChange={handleImageChange} />
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={user.firstName || ""}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={user.lastName || ""}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={user.email || ""}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Gender"
                name="gender"
                value={user.gender || ""}
                onChange={handleChange}
                select
                required
                fullWidth
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                value={user.address || ""}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Age"
                name="age"
                type="number"
                value={user.age || ""}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={user.phoneNumber || ""}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            {isDirty && (
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Save
                </Button>
              </Grid>
            )}
          </Grid>
        </form>
        <ToastContainer
          autoClose={2000}
          style={{ fontSize: "0.8rem" }}
          position="top-right"
        />
      </Paper>
    </Container>
  );
};

export default Profile;
