import React, { useEffect, useState } from "react";
import VenueCreationForm from "./VenueCreationForm";
import CourtCreationForm from "./CourtCreationForm";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
export interface FormValues {
  name: string;
  website: string;
  is_featured: boolean;
  enabled: boolean;
  address: {
    street_name: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    geo_location: {
      lat: string;
      long: string;
    };
  };
  social_media: {
    facebook: string;
    instagram: string;
    whatsapp: string;
    twitter: string;
  };
  hero_image: string;
  description: string;
  extra_images: string[];
  amenities: string[];
  available_days: string[];
}

function CreationForm() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [count, setCount] = useState(1);

  useEffect(() => {
    queryParams.get("id") &&
      axios
        .get(
          `${process.env.REACT_APP_API_DOMAIN}/api/venue/${queryParams.get(
            "id"
          )}`
        )
        .then((res) => setData(res.data))
        .catch(() => toast.error("Something went wrong"));
  }, [queryParams.get("id")]);

  const [data, setData] = useState<any>({
    name: "",
    website: "",
    address: {
      street_name: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      geo_location: {
        lat: "",
        long: "",
      },
    },
    social_media: {
      facebook: "",
      instagram: "",
      whatsapp: "",
      twitter: "",
    },
    hero_image: "",
    description: " ",
    extra_images: [],
    amenities: [],
    available_days: [],
    enabled: false,
    is_featured: false,
    courts: [
      {
        court_id: "",
        number_of_courts: "",
        description: "",
        policy: "",
        hero_image: "",
        gallery_image: [],
        opening_hours: {
          monday: [
            {
              from: "",
              to: "",
            },
          ],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: [],
        },
        price: {
          monday: [
            {
              time_from: "",
              time_to: "",
              amount: "",
            },
          ],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: [],
        },
        enabled: true,
      },
    ],
  });

  const navigate = useNavigate();
  const submitForm = (data: any) => {
    axios
      .post(`${process.env.REACT_APP_API_DOMAIN}/api/venue/add`, data)
      .then((response) => {
        toast.success("Added Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/admin/console");
      })
      .catch((err) => {
        toast.error("Something went wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const editForm = (data: any) => {
    axios
      .post(
        `${process.env.REACT_APP_API_DOMAIN}/api/venue/${queryParams.get(
          "id"
        )}`,
        data
      )
      .then((res) => {
        toast.success("Edited Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/admin/console");
      })
      .catch(() => toast.error("Something went wrong"));
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    address: Yup.object().shape({
      street_name: Yup.string().required("Street Name is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      country: Yup.string().required("Country is required"),
      pincode: Yup.string().required("Pincode is required"),
      geo_location: Yup.object().shape({
        lat: Yup.string().required("Latitude is required"),
        long: Yup.string().required("Longitude is required"),
      }),
    }),
    hero_image: Yup.string().required("Hero Image is required"),
    description: Yup.string().required("Description is required").trim(),
    extra_images: Yup.array()
      .of(Yup.string())
      .min(1, "Atleast One Image is required"),
    amenities: Yup.array()
      .of(Yup.string())

      .min(1, "Select atleast one amenities"),
    available_days: Yup.array()
      .of(Yup.string())
      .min(1, "Select atleast one available Days"),
  });

  const formik = useFormik<FormValues>({
    initialValues: data,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setData((prev: any) => ({ ...prev, ...values }));
      setCount(2);
    },
  });

  const [courts, setCourts] = React.useState<any>(data.courts);

  return (
    <div>
      {count === 1 ? (
        <VenueCreationForm formik={formik} />
      ) : (
        <CourtCreationForm
          courts={courts}
          setCourts={setCourts}
          onBack={() => setCount(1)}
          onSubmit={(e: any) => {
            queryParams.get("id")
              ? editForm({ ...data, courts })
              : submitForm({ ...data, courts: e });
            setData((prev: any) => ({ ...prev, courts: e }));
          }}
        />
      )}
    </div>
  );
}

export default CreationForm;
