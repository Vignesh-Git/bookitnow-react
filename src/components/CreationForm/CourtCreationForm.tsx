import { MinusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import TimeInput, { optionsList } from "components/HeroSearchForm/TimeInput";
import CommonLayout from "containers/PageAddListing1/CommonLayout";
import FormItem from "containers/PageAddListing1/FormItem";
import Upload from "images/Upload";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Checkbox from "shared/Checkbox/Checkbox";
import Input from "shared/Input/Input";
import NcDropDown from "shared/NcDropDown/NcDropDown";
import Select from "shared/Select/Select";
import Textarea from "shared/Textarea/Textarea";
import * as yup from "yup";

function CourtForm({
  courtData,
  onDelete,
  courtNo,
  showError,
  totalCount,
  onChange,
  addCustomPrice,
  onCustomPriceChange,
  onCustomPriceDelete,
}: {
  courtData: any;
  onDelete: () => void;
  courtNo: number;
  showError: boolean;
  totalCount: number;
  onChange: any;
  addCustomPrice: () => void;
  onCustomPriceChange: any;
  onCustomPriceDelete: any;
}) {
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64Image = await readFileAsBase64(file);
      onChange(base64Image, "hero_image");
    }
  };
  const week = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
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
      onChange(base64Images, "gallery_image");
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
    <div className="flex flex-col gap-5 mt-5">
      <div className="flex justify-between items-center">
        <h5 className="text-[25px] font-medium">Court {courtNo}</h5>
        {totalCount > 1 && (
          <div
            className="cursor-pointer text-[14px] text-[red] font-semibold"
            onClick={() => onDelete()}
          >
            Delete
          </div>
        )}
      </div>
      <div className="w-20 border-b border-neutral-200 dark:border-neutral-700"></div>
      <FormItem label="Court Name">
        <Input
          placeholder="court_name"
          id="court_name"
          onChange={(e) => onChange(e.target.value, "court_name")}
          value={courtData.court_name}
        />
        <p className="text-sm text-[red]">
          {!courtData.court_name && showError ? "Court Name is Required" : null}
        </p>
      </FormItem>

      <FormItem label="Number of Courts">
        <Input
          placeholder="Eg., 1"
          type="number"
          id="number_of_courts"
          name="number_of_courts"
          onChange={(e) => onChange(e.target.value, "number_of_courts")}
          value={courtData.number_of_courts}
        />
        <p className="text-sm text-[red]">
          {!courtData.number_of_courts && showError
            ? "Number of Court is Required"
            : null}
        </p>
      </FormItem>

      <FormItem label="Description">
        <Textarea
          placeholder="..."
          id="desc"
          name="desc"
          onChange={(e) => onChange(e.target.value, "desc")}
          value={courtData.desc}
        />
        <p className="text-sm text-[red]">
          {!courtData.desc && showError ? "Description is Required" : null}
        </p>
      </FormItem>

      <FormItem label="Policy">
        <Textarea
          placeholder="..."
          id="policy"
          name="policy"
          onChange={(e) => onChange(e.target.value, "policy")}
          value={courtData.policy}
        />
        <p className="text-sm text-[red]">
          {!courtData.policy && showError ? "Policy is Required" : null}
        </p>
      </FormItem>
      <FormItem label="Default Pricing">
        <Input
          placeholder="Eg., $1"
          type="number"
          id="default_price"
          name="default_price"
          onChange={(e) => onChange(e.target.value, "default_price")}
          value={courtData.default_price}
        />
      </FormItem>

      <FormItem label="Custom Pricing">
        {courtData.custom_price.map((price: any, idx: number) => (
          <div className="flex items-center  gap-4 mt-5">
            <div className="w-full text-sm items-stretch flex rounded-sm border border-neutral-200 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 ">
              <Select
                value={price.day}
                className="border-none w-[30%] rounded-none"
                onChange={(e) => {
                  onCustomPriceChange(e.target.value, "day", idx);
                }}
              >
                {week.map((wk) => (
                  <option label={wk}>{wk}</option>
                ))}
              </Select>
              <div className="w-[1px] bg-neutral-200 dark:bg-neutral-700"></div>

              <Select
                value={price.slot}
                className="border-none w-[30%] rounded-none"
                onChange={(e) => {
                  onCustomPriceChange(e.target.value, "slot", idx);
                }}
              >
                {optionsList.map((opt) => (
                  <option label={opt}>{opt}</option>
                ))}
              </Select>

              <div className="w-[1px] bg-neutral-200 dark:bg-neutral-700"></div>
              <Input
                onChange={(e) => {
                  onCustomPriceChange(e.target.value, "price", idx);
                }}
                value={price.price}
                className="w-[40%] rounded-none border-none"
                placeholder="Price"
              />
            </div>
            <PlusCircleIcon
              className="w-7 h-7 inline"
              onClick={addCustomPrice}
            />
            <MinusCircleIcon
              className="w-7 h-7 inline"
              onClick={() => onCustomPriceDelete(idx)}
            />
          </div>
        ))}
      </FormItem>

      <div className="flex flex-col gap-5 mt-5">
        <div className="space-y-8">
          <div>
            <span className="text-lg font-semibold">Cover image</span>
            <div className="mt-5 ">
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload />
                  <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                    <label
                      htmlFor={`file-upload${courtNo}`}
                      className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id={`file-upload${courtNo}`}
                        name={`file-upload${courtNo}`}
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
              {courtData.hero_image && (
                <div className="mt-3">
                  <div className="text-md font-semibold">Preview</div>
                  <img src={courtData.hero_image} className="w-full" />
                </div>
              )}
              <p className="text-sm text-[red]">
                {!courtData.hero_image && showError
                  ? "Hero Image is Required"
                  : null}
              </p>
            </div>
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
                          htmlFor={`gallery-upload${courtNo}`}
                          className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id={`gallery-upload${courtNo}`}
                            name={`gallery-upload${courtNo}`}
                            type="file"
                            className="sr-only"
                            onChange={handleMultipleImageChange}
                            multiple
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
              {courtData.gallery_image.length > 0 && (
                <div className="mt-3">
                  <div className="text-md font-semibold">Preview</div>
                  <div className="flex gap-10">
                    {courtData.gallery_image.map((d: any) => (
                      <div className="relative">
                        <img src={d} className="w-[200px]" alt="Preview" />
                        <XMarkIcon
                          className="absolute top-0 right-0 w-[20px]"
                          onClick={() => {
                            onChange(
                              courtData.gallery_image.filter(
                                (a: any) => a !== d
                              ),
                              "gallery_image"
                            );
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <p className="text-sm text-[red]">
                {!(courtData.gallery_image.length > 0 && showError)
                  ? null
                  : "Atleast one image is Required"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CourtCreationForm({ onSubmit }: { onSubmit: any }) {
  const navigate = useNavigate();
  const [courts, setCourts] = React.useState<any>([
    // Initial court data
    {
      court_name: "",
      number_of_courts: "",
      desc: "",
      policy: "",
      hero_image: "",
      gallery_image: [],
      default_price: "",
      custom_price: [
        { day: "", slot: "", price: "" },
        { day: "", slot: "", price: "" },
      ],
    },
  ]);

  const handleAddCourt = () => {
    setCourts([
      ...courts,
      {
        court_name: "",
        number_of_courts: "",
        desc: "",
        policy: "",
        hero_image: "",
        gallery_image: [],
        default_price: "",
        custom_price: [{ day: "", slot: "", price: "" }],
      },
    ]);
  };

  const handleDeleteCourt = (index: number) => {
    const updatedCourts = [...courts];
    updatedCourts.splice(index, 1);
    setCourts(updatedCourts);
  };

  const [showError, setShowError] = useState(false);

  return (
    <CommonLayout
      index="02"
      backBtnOnClick={() => navigate("/create/venue")}
      nextBtnText="Submit"
      NextBtnOnClick={() => {
        setShowError(true);
        console.log(courts);
        onSubmit(courts);
      }}
    >
      <span
        onClick={handleAddCourt}
        className="text-right font-medium text-[16px] cursor-pointer text-primary-700 hover:text-primary-6000"
      >
        + Add Court
      </span>
      {courts.map((court: any, index: any) => (
        <div key={index}>
          <CourtForm
            courtData={court}
            onDelete={() => handleDeleteCourt(index)}
            courtNo={index + 1}
            totalCount={courts.length}
            onChange={(value: any, name: any) => {
              courts[index][name] = value;
              setCourts([...courts]);
            }}
            addCustomPrice={() => {
              court.custom_price.push({ day: "", slot: "", price: "" });
              setCourts([...courts]);
            }}
            showError={showError}
            onCustomPriceChange={(value: string, name: string, idx: number) => {
              courts[index].custom_price[idx][name] = value;
              setCourts([...courts]);
            }}
            onCustomPriceDelete={(idx: number) => {
              courts[index].custom_price.splice(idx, 1);
              setCourts([...courts]);
            }}
          />
        </div>
      ))}
    </CommonLayout>
  );
}

export default CourtCreationForm;
