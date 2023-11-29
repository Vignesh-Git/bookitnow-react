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
    if (queryParams.get("id")) {
      axios
        .get(
          `${process.env.REACT_APP_API_DOMAIN}/api/venue/${queryParams.get(
            "id"
          )}`
        )
        .then((res) => {
          setData(res.data);
          formik.setFieldValue("name", res.data.name);
          formik.setFieldValue("website", res.data.website);
          formik.setFieldValue(
            "address.street_name",
            res.data.address.street_name
          );
          formik.setFieldValue("address.city", res.data.address.city);
          formik.setFieldValue("address.state", res.data.address.state);
          formik.setFieldValue("address.country", res.data.address.country);
          formik.setFieldValue("address.pincode", res.data.address.pincode);
          formik.setFieldValue(
            "address.geo_location.lat",
            res.data.address.geo_location.lat
          );
          formik.setFieldValue(
            "address.geo_location.long",
            res.data.address.geo_location.long
          );
          formik.setFieldValue(
            "social_media.facebook",
            res.data.social_media.facebook
          );
          formik.setFieldValue(
            "social_media.instagram",
            res.data.social_media.instagram
          );
          formik.setFieldValue(
            "social_media.twitter",
            res.data.social_media.twitter
          );
          formik.setFieldValue(
            "social_media.whatsapp",
            res.data.social_media.whatsapp
          );
          formik.setFieldValue("hero_image", res.data.hero_image);
          formik.setFieldValue("extra_images", res.data.extra_images);
          formik.setFieldValue("description", res.data.description);
          formik.setFieldValue("amenities", res.data.amenities);
          formik.setFieldValue("available_days", res.data.available_days);
          formik.setFieldValue("enabled", res.data.enabled);
          formik.setFieldValue("is_featured", res.data.is_featured);
          setCourts(
            res.data.courts.map((d: any) => ({
              ...d,
              sport_id: d.sport_id._id,
            }))
          );
        })
        .catch(() => toast.error("Something went wrong"));
    }
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
        court_name: "",
        court_code: "",
        sport_id: "",
        number_of_courts: "",
        description: "",
        policy: "",
        hero_image: "",
        extra_images: [],
        opening_hours: {},
        price: {},
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
      .put(
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
      pincode: Yup.string()
        .required("Pincode is required")
        .matches(/^\d{6}$/, "Invalid pin code. It must be a 6-digit number."),

      geo_location: Yup.object().shape({
        lat: Yup.number().required("Latitude is required"),
        long: Yup.number().required("Longitude is required"),
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
      if (!queryParams.get("id")) {
        let availableDays: any = {};
        let pricing: any = {};
        values.available_days.map((d) => {
          availableDays[d] = [
            {
              from: "",
              to: "",
            },
          ];
          pricing[d] = [
            {
              time_from: "",
              time_to: "",
              amount: "",
            },
          ];
        });
        console.log(availableDays, pricing);
        setCourts([
          {
            court_name: "",
            court_code: "",
            sport_id: "",
            number_of_courts: "",
            description: "",
            policy: "",
            hero_image: "",
            extra_images: [],
            opening_hours: availableDays,
            price: pricing,
            enabled: true,
          },
        ]);
      }
      setCount(2);
    },
  });

  const [courts, setCourts] = React.useState<any>([]);

  return (
    <div>
      {count === 1 ? (
        <VenueCreationForm formik={formik} />
      ) : (
        <CourtCreationForm
          courts={courts}
          setCourts={setCourts}
          onBack={() => {
            setCount(1);
          }}
          availableDays={formik.values.available_days}
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
