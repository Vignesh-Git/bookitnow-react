import React, { FC, Fragment, useState } from "react";
import * as Yup from "yup";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import ButtonSecondary from "../../shared/Button/ButtonSecondary";
import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import FormItem from "containers/PageAddListing1/FormItem";
import Input from "shared/Input/Input";
import Upload from "images/Upload";
import axios from "axios";
import { toast } from "react-toastify";
import { XMarkIcon } from "@heroicons/react/24/outline";
import CustomLoader from "components/CustomLoader";

export interface StayCardProps {
  className?: string;
  data?: {
    hero_image: string;
    name: string;
    allowed_players: number;
    _id: string;
  };
  size?: "default" | "small";
  callBack?: any;
}

const CourtCard: FC<StayCardProps> = ({
  size = "default",
  className = "",
  data,
  callBack,
}) => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        <img src={data?.hero_image} className="w-full h-[200px]" />
      </div>
    );
  };
  const [loader, setLoader] = useState(false);
  const renderContent = () => {
    return (
      <div className={"p-3 space-y-2"}>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h2
              className={` font-medium capitalize ${
                size === "default" ? "text-lg" : "text-base"
              }`}
            >
              <span className="line-clamp-1">{data?.name}</span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
            <span className="">{data?.allowed_players} Players</span>
          </div>
        </div>
        <div className="w-100 border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
          <ButtonSecondary onClick={() => data?._id && DeleteCourt(data?._id)}>
            Delete
          </ButtonSecondary>
          <ButtonPrimary onClick={() => setShowModal(true)}>Edit</ButtonPrimary>
        </div>
      </div>
    );
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Court Name is required"),
    allowed_players: Yup.number().required("Allow Players is required"),
    hero_image: Yup.string().required("Hero Image is Required"),
  });
  const formik = useFormik({
    initialValues: {
      name: data?.name,
      allowed_players: data?.allowed_players,
      hero_image: data?.hero_image,
    },
    validationSchema: validationSchema,
    onSubmit: (e) => editCourtDetails(e, data?._id),
  });
  const editCourtDetails = (
    data: {
      name: string | undefined;
      allowed_players: number | undefined;
      hero_image: string | undefined;
    },
    id?: string
  ) => {
    setLoader(true);
    axios
      .put(`${process.env.REACT_APP_API_DOMAIN}/api/sport/${id}`, data)
      .then(() => {
        setShowModal(false);
        callBack();
        setLoader(false);
      })
      .catch(() => {
        toast.error("Something went wrong!");
        setLoader(false);
      });
  };
  const DeleteCourt = (id: string) => {
    setLoader(true);

    axios
      .delete(`${process.env.REACT_APP_API_DOMAIN}/api/sport/${id}`)
      .then(() => {
        callBack();
        setLoader(false);
      })
      .catch(() => {
        toast.error("Something went wrong!");
        setLoader(false);
      });
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
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64Image = await readFileAsBase64(file);
      formik.setFieldValue("hero_image", base64Image);
    }
  };
  return (
    <div
      className={`nc-StayCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden will-change-transform hover:shadow-xl transition-shadow ${className}`}
      data-nc-id="StayCard"
    >
      {renderSliderGallery()}
      {renderContent()}

      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="HeroSearchFormMobile__Dialog relative z-50"
          onClose={closeModal}
        >
          <div className="fixed inset-0 bg-neutral-100 dark:bg-neutral-900">
            <div className="flex h-full">
              <Transition.Child
                as={Fragment}
                enter="ease-out transition-transform"
                enterFrom="opacity-0 translate-y-52"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in transition-transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-52"
              >
                <Dialog.Panel className="relative h-[100vh] flex-1 flex flex-col m-auto items-center ">
                  <>
                    <div className="absolute left-4 top-4">
                      <button
                        className="focus:outline-none focus:ring-0"
                        onClick={closeModal}
                      >
                        <XMarkIcon className="w-5 h-5 text-black dark:text-white" />
                      </button>
                    </div>

                    <div className="bg-[white] m-auto dark:bg-[#2e2e2e] p-7 max-w-[960px] overflow-auto relative rounded-lg">
                      <h1 className=" text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl ">
                        Edit
                      </h1>
                      <FormItem
                        label="Court Name"
                        desc="Venue: Professional hospitality businesses that usually have a unique style or theme defining their brand and decor"
                      >
                        <Input
                          {...formik.getFieldProps("name")}
                          placeholder="Court name"
                        />
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
                        {formik.touched.allowed_players &&
                          formik.errors.allowed_players && (
                            <div className="text-red-900 text-[14px]">
                              {formik.errors.allowed_players}
                            </div>
                          )}
                      </FormItem>
                      <div className="mt-5">
                        <span className="text-lg font-semibold">
                          Cover image
                        </span>
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
                        {formik.touched.hero_image &&
                          formik.errors.hero_image && (
                            <div className="text-red-900 text-[14px]">
                              {formik.errors.hero_image}
                            </div>
                          )}

                        {formik.values.hero_image && (
                          <div className="mt-5">
                            <span className="text-sm font-semibold">
                              Preview
                            </span>

                            <img
                              src={formik.values.hero_image}
                              className="w-[210px]"
                              alt="Preview"
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex gap-5 w-full justify-end mt-5">
                        <ButtonSecondary
                          onClick={() => {
                            formik.resetForm();
                            setShowModal(false);
                          }}
                        >
                          Cancel
                        </ButtonSecondary>

                        <ButtonPrimary onClick={formik.submitForm}>
                          Save
                        </ButtonPrimary>
                      </div>
                    </div>
                    {loader && <CustomLoader />}
                  </>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {loader && <CustomLoader />}
    </div>
  );
};

export default CourtCard;
