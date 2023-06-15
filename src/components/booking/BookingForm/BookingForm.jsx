import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { advanceBookingApi, getBrandsPowerApi } from "../../../common/api";

const theme = createTheme();

const BookingForm = () => {
  const [loading, setLoading] = useState(false);
  const { brands } = useSelector((state) => state.products);
  const [powers, setPowers] = useState([]);

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    plan: Yup.string().required(),
    brandName: Yup.string().required(),
    power: Yup.string().required(),
    model: Yup.string().required(),
    phone: Yup.number().required(),
    permanentAddress: Yup.string().required(),
    city: Yup.string().required(),
    province: Yup.string().required(),
    postalcode: Yup.number().required(),
  });

  const saveUser = async (values, resetForm) => {
    setLoading(true);
    try {
      const { data } = await axios.post(advanceBookingApi, values);
      if (data) {
        setLoading(false);
        if (data.message) {
          toast.success("Thanks for your booking", {
            style: {
              background: "#333",
              color: "#fff",
            },
          });
          resetForm();
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error("Server error...!", {
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  const getSelectedBrand = async (_id) => {
    try {
      const { data } = await axios.post(getBrandsPowerApi, { _id });
      if (data) {
        setPowers(data.power);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Toaster position="top-right" reverseOrder={false} />
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Formik
            validationSchema={schema}
            initialValues={{
              name: "",
              email: "",
              plan: "",
              brandName: "",
              power: "",
              model: "",
              phone: "",
              permanentAddress: "",
              city: "",
              province: "",
              postalcode: "",
            }}
            onSubmit={(values, { resetForm }) => saveUser(values, resetForm)}
          >
            {({ handleChange, handleSubmit, errors, touched, values }) => (
              <Box
                sx={{
                  marginTop: 5,
                  marginBottom: 7,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box component="form" noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="name"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        value={values.name}
                        autoFocus
                        onChange={handleChange}
                        sx={{ borderStyle: "none" }}
                        error={errors.name && touched.name ? true : false}
                      />
                      {errors.name && touched.name && (
                        <Typography color={"error.main"}>
                          {errors.name}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={handleChange}
                        error={errors.email && touched.email ? true : false}
                      />
                      {errors.email && touched.email && (
                        <Typography color={"error.main"}>
                          {errors.email}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Plan *
                        </InputLabel>
                        <Select
                          value={values.plan || 10}
                          onChange={handleChange}
                          autoWidth
                          label="Plan*"
                          id="plan"
                          name="plan"
                          error={errors.plan && touched.plan ? true : false}
                        >
                          <MenuItem disabled value={10}>
                            Choose Plan
                          </MenuItem>
                          <MenuItem value={"Down Payment"}>
                            Down Payment
                          </MenuItem>
                        </Select>
                      </FormControl>
                      {errors.plan && touched.plan && (
                        <Typography color={"error.main"}>
                          {errors.plan}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Brand *
                        </InputLabel>
                        <Select
                          value={values.brandName || 10}
                          onChange={handleChange}
                          autoWidth
                          label="Brand*"
                          id="brandName"
                          name="brandName"
                          error={
                            errors.brandName && touched.brandName ? true : false
                          }
                        >
                          <MenuItem disabled value={10}>
                            Choose Brand
                          </MenuItem>
                          {brands?.map((item) => {
                            return (
                              <MenuItem
                                key={item?._id}
                                value={item?.brand}
                                onClick={(e) => getSelectedBrand(item?._id)}
                              >
                                {item?.brand}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                      {errors.brandName && touched.brandName && (
                        <Typography color={"error.main"}>
                          {errors.brandName}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Power *
                        </InputLabel>
                        <Select
                          value={values.power || 10}
                          onChange={handleChange}
                          autoWidth
                          label="Power*"
                          id="power"
                          name="power"
                          error={errors.power && touched.power ? true : false}
                        >
                          <MenuItem disabled value={10}>
                            Choose Power
                          </MenuItem>
                          {powers?.map((item) => {
                            return (
                              <MenuItem key={item?._id} value={item?.power}>
                                {item?.power}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                      {errors.power && touched.power && (
                        <Typography color={"error.main"}>
                          {errors.power}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Model *
                        </InputLabel>
                        <Select
                          value={values.model || 10}
                          onChange={handleChange}
                          autoWidth
                          label="Model*"
                          id="model"
                          name="model"
                          error={errors.model && touched.model ? true : false}
                        >
                          <MenuItem disabled value={10}>
                            Choose Model
                          </MenuItem>
                          <MenuItem value="Upcoming">Upcoming</MenuItem>
                          <MenuItem value="2023">2023</MenuItem>
                          <MenuItem value="Others">Others</MenuItem>
                        </Select>
                      </FormControl>
                      {errors.model && touched.model && (
                        <Typography color={"error.main"}>
                          {errors.model}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        name="phone"
                        label="Phone"
                        id="phone"
                        value={values.phone}
                        onChange={handleChange}
                        error={errors.phone && touched.phone ? true : false}
                      />
                      {errors.phone && touched.phone && (
                        <Typography color={"error.main"}>
                          {errors.phone}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        fullWidth
                        name="permanentAddress"
                        label="Permanent Address"
                        id="permanentAddress"
                        value={values.permanentAddress}
                        onChange={handleChange}
                        error={
                          errors.permanentAddress && touched.permanentAddress
                            ? true
                            : false
                        }
                      />
                      {errors.permanentAddress && touched.permanentAddress && (
                        <Typography color={"error.main"}>
                          {errors.permanentAddress}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        fullWidth
                        name="city"
                        label="City"
                        id="city"
                        value={values.city}
                        onChange={handleChange}
                        error={errors.city && touched.city ? true : false}
                      />
                      {errors.city && touched.city && (
                        <Typography color={"error.main"}>
                          {errors.city}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Province *
                        </InputLabel>
                        <Select
                          value={values.province || 10}
                          onChange={handleChange}
                          autoWidth
                          label="Province*"
                          id="province"
                          name="province"
                          error={
                            errors.province && touched.province ? true : false
                          }
                        >
                          <MenuItem disabled value={10}>
                            Choose Province
                          </MenuItem>
                          <MenuItem value="Punjab">Punjab</MenuItem>
                          <MenuItem value="Sindh">Sindh</MenuItem>
                          <MenuItem value="KPK">KPK</MenuItem>
                          <MenuItem value="Balochistan">Balochistan</MenuItem>
                          <MenuItem value="Azad Jammu Kashmir (AJK)">
                            Azad Jammu Kashmir (AJK)
                          </MenuItem>
                          <MenuItem value="Others">Others</MenuItem>
                        </Select>
                      </FormControl>
                      {errors.province && touched.province && (
                        <Typography color={"error.main"}>
                          {errors.province}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        fullWidth
                        name="postalcode"
                        label="Postal Code"
                        id="postalcode"
                        value={values.postalcode}
                        onChange={handleChange}
                        error={
                          errors.postalcode && touched.postalcode ? true : false
                        }
                      />
                      {errors.postalcode && touched.postalcode && (
                        <Typography color={"error.main"}>
                          {errors.postalcode}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit}
                    disabled={loading ? true : false}
                  >
                    {loading ? (
                      <CircularProgress style={{ color: "#dc3545" }} />
                    ) : (
                      "Confirm Booking"
                    )}
                  </Button>
                </Box>
              </Box>
            )}
          </Formik>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default BookingForm;
