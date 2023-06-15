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
import * as React from "react";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import {
  createUsedBikeApi,
  getBrandsPowerApi,
  updateUsedBikeApi,
} from "../../../common/api";
import { createObject } from "./Script";

const theme = createTheme();

const BookingForm = () => {
  const navigate = useNavigate();
  const User = useSelector((state) => state.user.user);
  const myBikes = useSelector((state) => state.user.myCreatedBikes);
  const { brands } = useSelector((state) => state.products);
  const [loading, setLoading] = useState(false);
  const [Edit] = useState(window?.location?.search?.split("=")[1] || null);
  const [editBikeDetail, setEditBikeDetail] = useState(null);
  const [powers, setPowers] = useState([]);

  useEffect(() => {
    const find = myBikes?.find((item) => item._id === Edit);
    setEditBikeDetail(find);
  }, []);

  const schema = Yup.object().shape({
    Model: Yup.string().required(),
    Brand: Yup.string().required(),
    "Registration Year": Yup.number().required(),
    "Bike Number": Yup.string().required(),
    Category: Yup.string().required(),
    Price: Yup.number().required(),
    "Total Used": Yup.number().required(),
    City: Yup.string().required(),
    "Bike Picture": Yup.string().required(),
    "Bike Detail": Yup.string().required(),
  });

  const createBike = async (values, resetForm) => {
    setLoading(true);
    const obj = createObject(User, Edit, values);
    try {
      const { data } = await axios.post(
        Edit ? updateUsedBikeApi : createUsedBikeApi,
        obj
      );
      if (!data.error) {
        setLoading(false);
        if (data) {
          toast.success(
            !editBikeDetail
              ? "Submit data successfully"
              : "Update data successfully",
            {
              style: {
                background: "#333",
                color: "#fff",
              },
              duration: 1000,
            }
          );
          if (!editBikeDetail) {
            resetForm();
          }
          setTimeout(() => {
            navigate("/mylist");
          }, 1000);
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
            validationSchema={!Edit ? schema : null}
            initialValues={{
              Model: "",
              Brand: "",
              "Registration Year": "",
              "Bike Number": "",
              Category: "",
              Price: "",
              "Total Used": "",
              City: "",
              "Bike Picture": "",
              "Bike Detail": "",
            }}
            onSubmit={(values, { resetForm }) => createBike(values, resetForm)}
          >
            {({
              handleChange,
              handleSubmit,
              errors,
              touched,
              values,
              setFieldValue,
            }) => (
              <Box
                sx={{
                  marginTop: 3,
                  marginBottom: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box component="form" noValidate>
                  <Typography sx={{ mb: 3 }} component="h1" variant="h4">
                    {Edit ? "Edit" : "Enter"} Your Bike Details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="Model"
                        required
                        fullWidth
                        id="model"
                        label="Model"
                        value={values.Model || editBikeDetail?.modelName}
                        autoFocus
                        onChange={handleChange}
                        sx={{ borderStyle: "none" }}
                        error={errors.Model && touched.Model ? true : false}
                      />
                      {errors.Model && touched.Model && (
                        <Typography color={"error.main"}>
                          {errors.Model}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Brand *
                        </InputLabel>
                        <Select
                          required
                          fullWidth
                          id="brand"
                          label="Brand"
                          name="Brand"
                          autoComplete="brand"
                          value={values.Brand || editBikeDetail?.brand}
                          onChange={handleChange}
                          error={errors.Brand && touched.Brand ? true : false}
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
                      {errors.Brand && touched.Brand && (
                        <Typography color={"error.main"}>
                          {errors.Brand}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        fullWidth
                        id="regYear"
                        label="Registration Year"
                        name="Registration Year"
                        autoComplete="regYear"
                        value={
                          values["Registration Year"] || editBikeDetail?.regYear
                        }
                        onChange={handleChange}
                        error={
                          errors["Registration Year"] &&
                          touched["Registration Year"]
                            ? true
                            : false
                        }
                      />
                      {errors["Registration Year"] &&
                        touched["Registration Year"] && (
                          <Typography color={"error.main"}>
                            {errors["Registration Year"]}
                          </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        fullWidth
                        id="bikeNumber"
                        label="Bike Number"
                        name="Bike Number"
                        autoComplete="bikeNumber"
                        value={
                          values["Bike Number"] || editBikeDetail?.bikeNumber
                        }
                        onChange={handleChange}
                        error={
                          errors["Bike Number"] && touched["Bike Number"]
                            ? true
                            : false
                        }
                      />
                      {errors["Bike Number"] && touched["Bike Number"] && (
                        <Typography color={"error.main"}>
                          {errors["Bike Number"]}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Category *
                        </InputLabel>
                        <Select
                          required
                          fullWidth
                          id="category"
                          label="Category"
                          name="Category"
                          autoComplete="category"
                          value={values.Category || editBikeDetail?.category}
                          onChange={handleChange}
                          error={
                            errors.Category && touched.Category ? true : false
                          }
                        >
                          <MenuItem disabled value={10}>
                            Choose Category
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
                      {errors.Category && touched.Category && (
                        <Typography color={"error.main"}>
                          {errors.Category}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="price"
                        label="Price"
                        name="Price"
                        autoComplete="price"
                        value={values.Price || editBikeDetail?.finalPrice}
                        onChange={handleChange}
                        error={errors.Price && touched.Price ? true : false}
                      />
                      {errors.Price && touched.Price && (
                        <Typography color={"error.main"}>
                          {errors.Price}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="totalUsed"
                        label="Total Used (km)"
                        name="Total Used"
                        autoComplete="totalUsed"
                        value={
                          values["Total Used"] || editBikeDetail?.totalUsed
                        }
                        onChange={handleChange}
                        error={
                          errors["Total Used"] && touched["Total Used"]
                            ? true
                            : false
                        }
                      />
                      {errors["Total Used"] && touched["Total Used"] && (
                        <Typography color={"error.main"}>
                          {errors["Total Used"]}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={Edit ? 12 : 6}>
                      <TextField
                        required
                        fullWidth
                        name="City"
                        label="City"
                        id="city"
                        value={values.City || editBikeDetail?.city}
                        onChange={handleChange}
                        error={errors.City && touched.City ? true : false}
                      />
                      {errors.City && touched.City && (
                        <Typography color={"error.main"}>
                          {errors.City}
                        </Typography>
                      )}
                    </Grid>
                    {!Edit && (
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="Bike Picture"
                          name="Bike Picture"
                          autoComplete="Bike Picture"
                          inputProps={{
                            multiple: true,
                          }}
                          onChange={(e) => {
                            if (e.target.files.length !== 4) {
                              toast.error("Please Select 4 Images");
                            } else {
                              setFieldValue("Bike Picture", e.target.files);
                            }
                          }}
                          type={"file"}
                          error={
                            errors["Bike Picture"] && touched["Bike Picture"]
                              ? true
                              : false
                          }
                        />
                        {errors["Bike Picture"] && touched["Bike Picture"] && (
                          <Typography color={"error.main"}>
                            {errors["Bike Picture"]}
                          </Typography>
                        )}
                      </Grid>
                    )}
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        fullWidth
                        name="Bike Detail"
                        label="Bike Detail"
                        id="detail"
                        value={values["Bike Detail"] || editBikeDetail?.detail}
                        multiline
                        rows={3}
                        onChange={handleChange}
                        error={
                          errors["Bike Detail"] && touched["Bike Detail"]
                            ? true
                            : false
                        }
                      />
                      {errors["Bike Detail"] && touched["Bike Detail"] && (
                        <Typography color={"error.main"}>
                          {errors["Bike Detail"]}
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
                    ) : Edit ? (
                      "Update"
                    ) : (
                      "Create"
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
