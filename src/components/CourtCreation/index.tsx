import FormItem from "containers/PageAddListing1/FormItem";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import Input from "shared/Input/Input";
import Upload from "images/Upload";
import Button from "shared/Button/Button";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import axios from "axios";
import { toast } from "react-toastify";

function CourtCreation() {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Court Name is required"),
    allowed_players: Yup.number().required("Allow Players is required"),
    hero_image: Yup.string().required("Hero Image is Required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      allowed_players: "",
      hero_image: "",
    },
    validationSchema: validationSchema,
    onSubmit: (e) => submitForm(e),
  });
  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Invalid result type"));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64Image = await readFileAsBase64(file);
      formik.setFieldValue("hero_image", base64Image);
    }
  };

  const submitForm = (e: {
    name: string;
    allowed_players: string;
    hero_image: string;
  }) => {
    axios
      .post(`${process.env.REACT_APP_API_DOMAIN}/api/court/add`, e)
      .then(() => {
        toast.success("Added Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        formik.resetForm();
      })
      .catch(() =>
        toast.error("Something went wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        })
      );
  };

  return (
    <div className="max-w-5xl my-5 mx-auto">
      <h2 className="text-2xl font-semibold">Court Creation</h2>
      <div className="w-20 border-b border-neutral-200 my-5 dark:border-neutral-700"></div>
      <FormItem
        label="Court Name"
        desc="Venue: Professional hospitality businesses that usually have a unique style or theme defining their brand and decor"
      >
        <Input {...formik.getFieldProps("name")} placeholder="Court name" />
        {formik.touched.name && formik.errors.name && (
          <div className="text-red-900 text-[14containerpx]">
            {formik.errors.name}
          </div>
        )}
      </FormItem>
      <FormItem
        className="mt-5"
        label="Players Count"
        desc="Venue: Professional hospitality businesses that usually have a unique style or theme defining their brand and decor"
      >
        <Input
          {...formik.getFieldProps("allowed_players")}
          placeholder="Players Count"
          type="number"
        />
        {formik.touched.allowed_players && formik.errors.allowed_players && (
          <div className="text-red-900 text-[14px]">
            {formik.errors.allowed_players}
          </div>
        )}
      </FormItem>
      <div className="mt-5">
        <span className="text-lg font-semibold">Cover image</span>
        <div className="mt-5 ">
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Upload />
              <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                <label
                  htmlFor="heroImageupload"
                  className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="heroImageupload"
                    name="heroImageupload"
                    type="file"
                    className="sr-only"
                    accept="image/jpeg, image/png, image/gif, image/bmp, image/webp"
                    onChange={handleImageChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>
        {formik.touched.hero_image && formik.errors.hero_image && (
          <div className="text-red-900 text-[14px]">
            {formik.errors.hero_image}
          </div>
        )}

        {formik.values.hero_image && (
          <div className="mt-5">
            <span className="text-sm font-semibold">Preview</span>

            <img
              src={formik.values.hero_image}
              className="w-full"
              alt="Preview"
            />
          </div>
        )}
      </div>
      <div className="flex gap-5 w-full justify-end mt-5">
        <ButtonSecondary onClick={() => formik.resetForm()}>
          Cancel
        </ButtonSecondary>

        <ButtonPrimary onClick={formik.submitForm}>Save</ButtonPrimary>
      </div>
    </div>
  );
}

export default CourtCreation;
