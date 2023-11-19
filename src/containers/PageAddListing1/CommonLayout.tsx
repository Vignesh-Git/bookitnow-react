import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import React from "react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";

export interface CommonLayoutProps {
  index: string;
  backBtnOnClick?: () => void;
  NextBtnOnClick?: () => void;
  backtHref?: string;
  nextHref?: string;
  nextBtnText?: string;
  children: React.ReactNode;
}

const CommonLayout: FC<CommonLayoutProps> = ({
  index = "01",
  children,
  backBtnOnClick,
  nextBtnText,
  NextBtnOnClick,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-24 pt-14 sm:py-24 lg:pb-32`}
      data-nc-id="PageAddListing1"
    >
      <div className="space-y-11">
        <div className="flex items-center gap-3">
          <ChevronLeftIcon
            className="w-8 h-8 cursor-pointer"
            onClick={() => navigate(-1)}
          />

          <div>
            <span className="text-4xl font-semibold">{index}</span>{" "}
            <span className="text-lg text-neutral-500 dark:text-neutral-400">
              / 2
            </span>
          </div>
        </div>
        {/* --------------------- */}
        <div className="listingSection__wrap ">{children}</div>

        {/* --------------------- */}
        {
          <div className="flex justify-end space-x-5">
            {backBtnOnClick && (
              <ButtonSecondary onClick={backBtnOnClick}>
                Go back
              </ButtonSecondary>
            )}
            <ButtonPrimary onClick={NextBtnOnClick}>
              {nextBtnText || "Continue"}
            </ButtonPrimary>
          </div>
        }
      </div>
    </div>
  );
};

export default CommonLayout;
