import { XMarkIcon } from "@heroicons/react/24/solid";
import CommonLayout from "containers/PageAddListing1/CommonLayout";
import FormItem from "containers/PageAddListing1/FormItem";
import { FormikProps } from "formik";
import Upload from "images/Upload";
import React from "react";
import Checkbox from "shared/Checkbox/Checkbox";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import Textarea from "shared/Textarea/Textarea";
import { FormValues } from "./index";
function VenueCreationForm({ formik }: { formik: FormikProps<FormValues> }) {
  const days = [
    {
      id: 0,
      label: "monday",
    },
    {
      id: 1,
      label: "tuesday",
    },
    {
      id: 2,
      label: "wednesday",
    },
    {
      id: 3,
      label: "thursday",
    },
    {
      id: 4,
      label: "friday",
    },
    {
      id: 5,
      label: "saturday",
    },
    {
      id: 6,
      label: "sunday",
    },
  ];
  const amenities = [
    {
      label: "Parking",
      id: "parking",
    },
    {
      label: "Drinking Water",
      id: "drinkingWater",
    },
    {
      label: "Shower",
      id: "shower",
    },
    {
      label: "First Aid",
      id: "firstAid",
    },
    {
      label: "Change Room",
      id: "changeRoom",
    },
  ];

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

  const handleCheckboxChange = (day: string) => {
    // Toggle the selected day in the array
    formik.setValues((prevValues) => ({
      ...prevValues,
      available_days: prevValues.available_days.includes(day)
        ? prevValues.available_days.filter((d) => d !== day)
        : [...prevValues.available_days, day],
    }));
  };
  const handleAmenityCheckboxChange = (amentiy: string) => {
    // Toggle the selected day in the array
    formik.setValues((prevValues) => ({
      ...prevValues,
      amenities: prevValues.amenities.includes(amentiy)
        ? prevValues.amenities.filter((d) => d !== amentiy)
        : [...prevValues.amenities, amentiy],
    }));
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
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-900 text-[14px]">{formik.errors.name}</div>
          )}
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
          {formik.touched.description && formik.errors.description && (
            <div className="text-red-900 text-[14px]">
              {formik.errors.description}
            </div>
          )}
        </FormItem>
      </div>
      <div className="flex flex-col gap-5 mt-5">
        <h2 className="text-2xl font-semibold">Address Info</h2>
        <div className="w-20 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="space-y-8">
          <FormItem label="Country/Region">
            <Input
              {...formik.getFieldProps("address.country")}
              placeholder="Country/Region"
            />

            {formik.touched.address?.country &&
              formik.errors.address?.country && (
                <div className="text-red-900 text-[14px]">
                  {formik.errors.address.country}
                </div>
              )}
          </FormItem>
          <FormItem label="Street">
            <Input
              {...formik.getFieldProps("address.street_name")}
              placeholder="..."
            />
            {formik.touched.address?.street_name &&
              formik.errors.address?.street_name && (
                <div className="text-red-900 text-[14px]">
                  {formik.errors.address.street_name}
                </div>
              )}
          </FormItem>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
            <FormItem label="City">
              <Input {...formik.getFieldProps("address.city")} />
              {formik.touched.address?.city && formik.errors.address?.city && (
                <div className="text-red-900 text-[14px]">
                  {formik.errors.address.city}
                </div>
              )}
            </FormItem>
            <FormItem label="State">
              <Input {...formik.getFieldProps("address.state")} />
              {formik.touched.address?.state &&
                formik.errors.address?.state && (
                  <div className="text-red-900 text-[14px]">
                    {formik.errors.address.state}
                  </div>
                )}
            </FormItem>
            <FormItem label="Postal code">
              <Input {...formik.getFieldProps("address.pincode")} />
              {formik.touched.address?.pincode &&
                formik.errors.address?.pincode && (
                  <div className="text-red-900 text-[14px]">
                    {formik.errors.address.pincode}
                  </div>
                )}
            </FormItem>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
            <FormItem label="Latitude">
              <Input {...formik.getFieldProps("address.geo_location.lat")} />
              {formik.touched.address?.geo_location?.lat &&
                formik.errors.address?.geo_location?.lat && (
                  <div className="text-red-900 text-[14px]">
                    {formik.errors.address.geo_location.lat}
                  </div>
                )}
            </FormItem>
            <FormItem label="Longitude">
              <Input {...formik.getFieldProps("address.geo_location.long")} />
              <p className="text-xs text-[red]">
                {formik.touched.address?.geo_location?.long &&
                  formik.errors.address?.geo_location?.long && (
                    <div className="text-red-900 text-[14px]">
                      {formik.errors.address.geo_location.long}
                    </div>
                  )}
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
            <>
              <Checkbox
                label={d.label}
                checked={formik.values.available_days.includes(d.label)}
                name={d.label}
                onChange={(e: any) => handleCheckboxChange(e.target.value)}
              />
            </>
          ))}
        </div>
        {formik.touched.available_days && formik.errors.available_days && (
          <div className="text-red-900 text-[14px]">
            {formik.errors.available_days}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-5 mt-5">
        <h2 className="text-2xl font-semibold">Amentites Info</h2>
        <div className="w-20 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {amenities.map((amenity) => (
            <Checkbox
              label={amenity.id}
              name={amenity.id}
              checked={formik.values.amenities.includes(amenity.id)}
              onChange={(e: any) => handleAmenityCheckboxChange(e.target.value)}
            />
          ))}
        </div>
        {formik.touched.amenities && formik.errors.amenities && (
          <div className="text-red-900 text-[14px]">
            {formik.errors.amenities}
          </div>
        )}
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
                  className="w-[210px] "
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
            {formik.touched.extra_images && formik.errors.extra_images && (
              <div className="text-red-900 text-[14px]">
                {formik.errors.extra_images}
              </div>
            )}

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
      <div className="flex flex-col gap-5 mt-5">
        <h2 className="text-2xl font-semibold">Social Media Info</h2>
        <div className="w-20 border-b border-neutral-200 dark:border-neutral-700"></div>
        <FormItem label="Facebook">
          <Input
            {...formik.getFieldProps("social_media?.facebook")}
            placeholder="..."
          />
          {formik.touched.social_media?.facebook &&
            formik.errors.social_media?.facebook && (
              <div className="text-red-900 text-[14px]">
                {formik.errors.social_media?.facebook}
              </div>
            )}
        </FormItem>
        <FormItem label="Whatsapp">
          <Input
            {...formik.getFieldProps("social_media?.whatsapp")}
            placeholder="..."
          />
          {formik.touched.social_media?.whatsapp &&
            formik.errors.social_media?.whatsapp && (
              <div className="text-red-900 text-[14px]">
                {formik.errors.social_media?.whatsapp}
              </div>
            )}
        </FormItem>
        <FormItem label="Twitter">
          <Input
            {...formik.getFieldProps("social_media?.twitter")}
            placeholder="..."
          />
          {formik.touched.social_media?.twitter &&
            formik.errors.social_media?.twitter && (
              <div className="text-red-900 text-[14px]">
                {formik.errors.social_media?.twitter}
              </div>
            )}
        </FormItem>
        <FormItem label="Instagram">
          <Input
            {...formik.getFieldProps("social_media?.instagram")}
            placeholder="..."
          />
          {formik.touched.social_media?.instagram &&
            formik.errors.social_media?.instagram && (
              <div className="text-red-900 text-[14px]">
                {formik.errors.social_media?.instagram}
              </div>
            )}
        </FormItem>
        <FormItem label="Website">
          <Input {...formik.getFieldProps("website")} placeholder="..." />
          {formik.touched.website && formik.errors.website && (
            <div className="text-red-900 text-[14px]">
              {formik.errors.website}
            </div>
          )}
        </FormItem>
        <div className="flex gap-3 items-center">
          <input
            type="checkbox"
            name="enabled"
            id="enabled"
            className="focus:ring-action-primary h-6 w-6 text-primary-500 border-primary rounded border-neutral-500 bg-white dark:bg-neutral-700  dark:checked:bg-primary-500 focus:ring-primary-500"
            checked={formik.values.enabled}
            onChange={(e) => formik.setFieldValue("enabled", e.target.checked)}
          />
          <label htmlFor="enabled">Enabled</label>
        </div>
        <div className="flex gap-3 items-center">
          <input
            type="checkbox"
            name="isFeatured"
            id="isFeatured"
            className="focus:ring-action-primary h-6 w-6 text-primary-500 border-primary rounded border-neutral-500 bg-white dark:bg-neutral-700  dark:checked:bg-primary-500 focus:ring-primary-500"
            checked={formik.values.is_featured}
            onChange={(e) =>
              formik.setFieldValue("is_featured", e.target.checked)
            }
          />
          <label htmlFor="isFeatured">Is Featured</label>
        </div>
      </div>
    </CommonLayout>
  );
}

export default VenueCreationForm;
