import { MinusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import TimeInput, { optionsList } from "components/HeroSearchForm/TimeInput";
import CommonLayout from "containers/PageAddListing1/CommonLayout";
import FormItem from "containers/PageAddListing1/FormItem";
import Upload from "images/Upload";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
  onPriceChange,
  onTimeChange,
  addOpeningHours,
  deleteOpeningHours,
  addPrice,
  deletePrice,
}: {
  courtData: any;
  onDelete: () => void;
  courtNo: number;
  showError: boolean;
  totalCount: number;
  onChange: any;
  onPriceChange: any;
  onTimeChange: any;
  addOpeningHours: any;
  deleteOpeningHours: any;
  addPrice: any;
  deletePrice: any;
}) {
  const [option, setOption] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN}/api/court/get_all`)
      .then((res) => setOption(res.data))
      .catch(() => toast.error("Something went wrong!"));
  }, []);
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64Image = await readFileAsBase64(file);
      onChange(base64Image, "hero_image");
    }
  };

  const handleMultipleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files?.length > 0) {
      const base64Images = await Promise.all(
        Array.from(files).map(async (file) => {
          const base64Image = await readFileAsBase64(file);
          return base64Image;
        })
      );
      onChange(base64Images, "extra_images");
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
        <Select
          placeholder="court_name"
          id="court_name"
          onChange={(e) => {
            onChange(e.target.value, "court_id");
          }}
          value={courtData.court_name}
        >
          <option value="">Please select any</option>

          {option.map((opt: any) => (
            <option value={opt._id}>{opt.name}</option>
          ))}
        </Select>
        <p className="text-sm text-[red]">
          {!courtData.court_id && showError ? "Court Name is Required" : null}
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
          onChange={(e) => onChange(e.target.value, "description")}
          value={courtData.description}
        />
        <p className="text-sm text-[red]">
          {!courtData.description && showError
            ? "Description is Required"
            : null}
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

      <FormItem label="Opening Hours">
        {Object.entries(courtData.opening_hours)?.map((d: any, idx) => {
          return (
            <>
              {d[0] !== "_id" && (
                <div className="my-3">
                  <p className="mb-3 flex justify-between text-sm">
                    <div>{d[0]}</div>
                    <div
                      className="text-[blue]"
                      onClick={() => addOpeningHours(d[0])}
                    >
                      + Add
                    </div>
                  </p>
                  {d[1].map((data: any, index: number) => (
                    <div className="flex gap-3 mt-2 items-center">
                      <Input
                        value={`${String(
                          new Date(data.from).getHours()
                        ).padStart(2, "0")}:${String(
                          new Date(data.from).getMinutes()
                        ).padStart(2, "0")}`}
                        type="time"
                        placeholder="From Time"
                        onChange={(e) => {
                          onTimeChange(e.target.value, d[0], "from", index);
                        }}
                      />
                      <Input
                        type="time"
                        placeholder="To Time"
                        value={`${String(new Date(data.to).getHours()).padStart(
                          2,
                          "0"
                        )}:${String(new Date(data.to).getMinutes()).padStart(
                          2,
                          "0"
                        )}`}
                        onChange={(e) =>
                          onTimeChange(e.target.value, d[0], "to", index)
                        }
                      />
                      <div
                        className="text-sm text-[red]"
                        onClick={() => deleteOpeningHours(index, d[0])}
                      >
                        Delete
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          );
        })}
      </FormItem>
      <FormItem label="Custom Pricing">
        {Object.entries(courtData.price).map((d: any, idx) => {
          console.log(d[1]);
          return (
            <>
              {d[0] !== "_id" && (
                <div className="my-3">
                  <p className="mb-3 flex justify-between text-sm">
                    <div>{d[0]}</div>
                    <div className="text-[blue]" onClick={() => addPrice(d[0])}>
                      + Add
                    </div>
                  </p>
                  {d[1].length > 0 &&
                    d[1].map((data: any, index: number) => (
                      <div className="flex items-center gap-3 mt-3 ">
                        <Input
                          value={`${String(
                            new Date(data.time_from).getHours()
                          ).padStart(2, "0")}:${String(
                            new Date(data.time_from).getMinutes()
                          ).padStart(2, "0")}`}
                          type="time"
                          placeholder="From Time"
                          onChange={(e) =>
                            onPriceChange(
                              e.target.value,
                              d[0],
                              "time_from",
                              index
                            )
                          }
                        />
                        <Input
                          type="time"
                          placeholder="To Time"
                          value={`${String(
                            new Date(data.time_to).getHours()
                          ).padStart(2, "0")}:${String(
                            new Date(data.time_to).getMinutes()
                          ).padStart(2, "0")}`}
                          onChange={(e) =>
                            onPriceChange(
                              e.target.value,
                              d[0],
                              "time_to",
                              index
                            )
                          }
                        />
                        <Input
                          type="number"
                          placeholder="Price"
                          value={data.amount}
                          onChange={(e) =>
                            onPriceChange(e.target.value, d[0], "amount", index)
                          }
                        />
                        <p
                          className="text-sm text-[red]"
                          onClick={() => deletePrice(index, d[0])}
                        >
                          Delete
                        </p>
                      </div>
                    ))}
                </div>
              )}
            </>
          );
        })}
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
              {courtData.extra_images?.length > 0 && (
                <div className="mt-3">
                  <div className="text-md font-semibold">Preview</div>
                  <div className="flex gap-10">
                    {courtData.extra_images.map((d: any) => (
                      <div className="relative">
                        <img src={d} className="w-[200px]" alt="Preview" />
                        <XMarkIcon
                          className="absolute top-0 right-0 w-[20px]"
                          onClick={() => {
                            onChange(
                              courtData.extra_images.filter(
                                (a: any) => a !== d
                              ),
                              "extra_images"
                            );
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <p className="text-sm text-[red]">
                {!(courtData.extra_images?.length > 0 && showError)
                  ? null
                  : "Atleast one image is Required"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <FormItem>
        <input
          name="enable"
          id="enable"
          checked={courtData.enabled}
          type="checkbox"
          onChange={(e) => onChange(e.target.checked, "enabled")}
        />
        <label htmlFor="enable" className="ml-4">
          Enable
        </label>
      </FormItem>
    </div>
  );
}

function CourtCreationForm({
  courts,
  setCourts,
  onSubmit,
  onBack,
}: {
  onSubmit: any;
  onBack: any;
  courts: any;
  setCourts: any;
}) {
  const handleAddCourt = () => {
    setCourts([
      ...courts,
      {
        court_id: "",
        number_of_courts: "",
        description: "",
        policy: "",
        hero_image: "",
        extra_images: [],
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
      backBtnOnClick={onBack}
      nextBtnText="Submit"
      NextBtnOnClick={() => {
        setShowError(true);
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
            totalCount={courts?.length}
            onChange={(value: any, name: any) => {
              courts[index][name] = value;
              setCourts([...courts]);
            }}
            showError={showError}
            onPriceChange={(
              value: string,
              idx: string,
              name: string,
              number: number
            ) =>
              setCourts((prev: any) => {
                if (value.includes(":")) {
                  const currentDate = new Date();

                  const [hours, minutes] = value.split(":");

                  currentDate.setHours(Number(hours), Number(minutes));
                  prev[index].price[idx][number][name] = currentDate;
                  return [...prev];
                } else {
                  prev[index].price[idx][number][name] = value;
                  return [...prev];
                }
              })
            }
            onTimeChange={(
              value: string,
              idx: string,
              name: string,
              number: number
            ) =>
              setCourts((prev: any) => {
                const currentDate = new Date();

                const [hours, minutes] = value.split(":");

                currentDate.setHours(Number(hours), Number(minutes));
                prev[index].opening_hours[idx][number][name] = currentDate;
                return [...prev];
              })
            }
            addOpeningHours={(e: any) =>
              setCourts((prev: any) => {
                prev[index].opening_hours[e].push({
                  from: "",
                  to: "",
                });
                return [...prev];
              })
            }
            deleteOpeningHours={(idx: number, name: string) => {
              setCourts((prev: any) => {
                prev[index].opening_hours[name].splice(idx, 1);
                return [...prev];
              });
            }}
            addPrice={(e: any) => {
              setCourts((prev: any) => {
                prev[index].price[e].push({
                  time_from: "",
                  time_to: "",
                  amount: "",
                });
                return [...prev];
              });
            }}
            deletePrice={(idx: number, name: string) => {
              setCourts((prev: any) => {
                prev[index].price[name].splice(idx, 1);
                return [...prev];
              });
            }}
          />
        </div>
      ))}
    </CommonLayout>
  );
}

export default CourtCreationForm;
