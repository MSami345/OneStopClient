import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  MenuItem,
  Container,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";
import "../Styles/Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const [validData, setValidData] = useState({
    isValidEmail: true,
    isValidPassword: true,
    isValidPhone: true,
  });

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  const phonePattern = /^\d{11}$/;

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!image) {
      return toast.error("Please upload an image");
    }

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
      // toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleImageUpload();

    if (
      !email ||
      !firstName ||
      !lastName ||
      !password ||
      !phoneNumber ||
      !address ||
      !gender ||
      !imageUrl ||
      !age
    ) {
      return toast.error("Fill in all the fields");
    }
    if (Object.values(validData).some((value) => value === false)) {
      toast.error("Please fill in fields correctly");
      return;
    }

    try {
      await axios.post(process.env.REACT_APP_API_URL+"/api/auth/register", {
        firstName,
        lastName,
        email,
        password,
        address,
        phoneNumber,
        gender,
        age,
        profileImage: imageUrl,
      });
      toast.success("User registered successfully!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setAddress("");
      setPhoneNumber("");
      setGender("male");
      setImage(null);
      setImageUrl("");
      setAge("");
    } catch (error) {
      console.log(error.response.data.msg);
      toast.error("Failed to register\n" + error.response.data.msg);
    }
  };

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
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        style={{ margin: "10px 0px" }}
        className="register-container"
      >
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setValidData({
                    ...validData,
                    isValidEmail: emailPattern.test(e.target.value),
                  });
                }}
                error={!validData.isValidEmail}
                helperText={!validData.isValidEmail && "Enter a valid email"}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setValidData({
                    ...validData,
                    isValidPassword: passwordPattern.test(e.target.value),
                  });
                }}
                error={!validData.isValidPassword}
                helperText={
                  !validData.isValidPassword &&
                  "Password should be at least 8 characters long with at least one uppercase letter and special character"
                }
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Age"
                name="Age"
                value={age}
                type="number"
                onChange={(e) => setAge(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  setValidData({
                    ...validData,
                    isValidPhone: phonePattern.test(e.target.value),
                  });
                }}
                error={!validData.isValidPhone}
                helperText={
                  !validData.isValidPhone &&
                  "Phone number should be 11 digits long"
                }
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Profile Image"
                name="image"
                type="file"
                onChange={handleImageChange}
                required
                fullWidth
              />
            </Grid>
          </Grid>

          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginTop: "16px",
            }}
          >
            <button className="btn" type="submit">
              Register
            </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "16px",
            }}
          >
            <Typography variant="body2">
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "blue" }}
              >
                Sign In
              </Link>
            </Typography>
          </div>
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

export default Register;
