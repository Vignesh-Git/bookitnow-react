import { MinusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import CommonLayout from "containers/PageAddListing1/CommonLayout";
import FormItem from "containers/PageAddListing1/FormItem";
import { useFormik } from "formik";
import Upload from "images/Upload";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Checkbox from "shared/Checkbox/Checkbox";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import Textarea from "shared/Textarea/Textarea";
import * as Yup from "yup";
function VenueCreationForm({ onChange }: { onChange: (e: any) => void }) {
  const days = [
    {
      id: 0,
      label: "Mon",
    },
    {
      id: 1,
      label: "Tues",
    },
    {
      id: 2,
      label: "Wed",
    },
    {
      id: 3,
      label: "Thurs",
    },
    {
      id: 4,
      label: "Fri",
    },
    {
      id: 5,
      label: "Sat",
    },
    {
      id: 6,
      label: "Sun",
    },
  ];
  const amenities = [
    "Parking",
    "Drinking Water",
    "Shower",
    "First Aid",
    "Change Room",
  ];
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
  const formik = useFormik({
    initialValues: {
      name: "",
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
      hero_image: "",
      description: " ",
      extra_images: [],
      amenities: [],
      available_days: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onChange(values);
    },
  });

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64Image = await readFileAsBase64(file);
      formik.setFieldValue("hero_image", base64Image);
    }
  };

  const handleMultipleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const base64Images = await Promise.all(
        Array.from(files).map(async (file) => {
          const base64Image = await readFileAsBase64(file);
          return base64Image;
        })
      );

      formik.setFieldValue("extra_images", [
        ...formik.values.extra_images,
        ...base64Images,
      ]);
    }
  };

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

  return (
    <CommonLayout
      index="01"
      NextBtnOnClick={() => {
        formik.submitForm();
      }}
    >
      <h2 className="text-2xl font-semibold">Basic Info</h2>
      <div className="w-20 border-b border-neutral-200 dark:border-neutral-700"></div>

      <div className="flex flex-col gap-5 mt-5">
        <FormItem
          label="Venue Name"
          desc="Venue: Professional hospitality businesses that usually have a unique style or theme defining their brand and decor"
        >
          <Input {...formik.getFieldProps("name")} placeholder="Places name" />
          <p className="text-xs text-[red]">{formik.errors.name}</p>
        </FormItem>
        <FormItem
          label="Your place description for client"
          desc=" Mention the best features of your accommodation, any special amenities
          like fast Wi-Fi or parking, as well as things you like about the
          neighborhood."
        >
          <Textarea
            {...formik.getFieldProps("description")}
            placeholder="..."
            rows={14}
          />
          <p className="text-xs text-[red]">{formik.errors.description}</p>
        </FormItem>
      </div>
      <div className="flex flex-col gap-5 mt-5">
        <h2 className="text-2xl font-semibold">Address Info</h2>
        <div className="w-20 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="space-y-8">
          <FormItem label="Country/Region">
            <Select {...formik.getFieldProps("address.country")}>
              <option value="Viet Nam">Viet Nam</option>
              <option value="Thailand">Thailand</option>
              <option value="France">France</option>
              <option value="Singapore">Singapore</option>
              <option value="Jappan">Jappan</option>
              <option value="Korea">Korea</option>
              <option value="...">...</option>
            </Select>
            <p className="text-xs text-[red]">
              {formik.errors.address?.country}
            </p>
          </FormItem>
          <FormItem label="Street">
            <Input
              {...formik.getFieldProps("address.street_name")}
              placeholder="..."
            />
            <p className="text-xs text-[red]">
              {formik.errors.address?.street_name}
            </p>
          </FormItem>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
            <FormItem label="City">
              <Input {...formik.getFieldProps("address.city")} />
              <p className="text-xs text-[red]">
                {formik.errors.address?.city}
              </p>
            </FormItem>
            <FormItem label="State">
              <Input {...formik.getFieldProps("address.state")} />
              <p className="text-xs text-[red]">
                {formik.errors.address?.state}
              </p>
            </FormItem>
            <FormItem label="Postal code">
              <Input {...formik.getFieldProps("address.pincode")} />
              <p className="text-xs text-[red]">
                {formik.errors.address?.pincode}
              </p>
            </FormItem>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
            <FormItem label="Latitude">
              <Input {...formik.getFieldProps("address.geo_location.lat")} />
              <p className="text-xs text-[red]">
                {formik.errors.address?.geo_location?.lat}
              </p>
            </FormItem>
            <FormItem label="Longitude">
              <Input {...formik.getFieldProps("address.geo_location.long")} />
              <p className="text-xs text-[red]">
                {formik.errors.address?.geo_location?.long}
              </p>
            </FormItem>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 mt-5">
        <h2 className="text-2xl font-semibold">Available Days Info</h2>
        <div className="w-20 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="flex flex-wrap gap-5">
          {days.map((d) => (
            <Checkbox
              label={d.label}
              {...formik.getFieldProps("available_days")}
              className="border-[2px] rounded-sm min-w-[92px] text-center px-4 py-2 font-medium text-[#192335] text-[14px]"
            />
          ))}
        </div>
        <p className="text-xs text-[red]">{formik.errors.available_days}</p>
      </div>
      <div className="flex flex-col gap-5 mt-5">
        <h2 className="text-2xl font-semibold">Amentites Info</h2>
        <div className="w-20 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {amenities.map((amenity) => (
            <Checkbox label={amenity} {...formik.getFieldProps("amenities")} />
          ))}
        </div>
        <p className="text-xs text-[red]">{formik.errors.amenities}</p>
      </div>
      <div className="flex flex-col gap-5 mt-5">
        <div>
          <h2 className="text-2xl font-semibold">Gallery</h2>
        </div>

        <div className="w-20 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="space-y-8">
          <div>
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
            <p className="text-xs text-[red]">{formik.errors.hero_image}</p>

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
          <div>
            <span className="text-lg font-semibold">Pictures of the place</span>
            <div className="mt-5 ">
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                    <div className="space-y-1 text-center">
                      <Upload />
                      <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                        <label
                          htmlFor="galleryImageUpload"
                          className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="galleryImageUpload"
                            name="gallertImageUpload"
                            type="file"
                            className="sr-only"
                            accept="image/jpeg, image/png, image/gif, image/bmp, image/webp"
                            onChange={handleMultipleImageChange}
                            multiple={true}
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
              </div>
            </div>
            <p className="text-xs text-[red]">{formik.errors.extra_images}</p>

            {formik.values.extra_images.length > 0 && (
              <div className="mt-5">
                <span className="text-sm font-semibold">Preview</span>
                <div className="flex gap-2">
                  {formik.values.extra_images.map((d, idx) => (
                    <div className="relative">
                      <img src={d} className="w-[200px]" alt="Preview" />
                      <XMarkIcon
                        className="absolute top-0 right-0 w-[20px]"
                        onClick={() => {
                          formik.setFieldValue(
                            "extra_images",
                            formik.values.extra_images.filter((a) => a !== d)
                          );
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}

export default VenueCreationForm;
