import React, { FC } from "react";
import Heading from "components/Heading/Heading";

export interface Statistic {
  id: string;
  heading: string;
  subHeading: string;
}

export const FOUNDER_DEMO: Statistic[] = [
  {
    id: "1",
    heading: "Proven revitalization expertise",
    subHeading:
      "With a proven track record of transforming neglected properties into moder, functional spaces, we consistently exceed expectations.",
  },
  {
    id: "2",
    heading: "Transparent and timely communication",
    subHeading:
      "We offer clear, frequent updates on progess, budgets, and timelines, fostering trust in our partnerships.",
  },
  {
    id: "3",
    heading: "Cutting-edge innovative design",
    subHeading:
      "Our designs combine aesthetics and functionalitu. setting new standards in property design.",
  },

  {
    id: "4",
    heading: "Eco-conscious sustainablility",
    subHeading:
      "We prioritise eco-friendly technologies and materials, reducing environmental impact and long-term operating costs",
  },
  {
    id: "5",
    heading: "Community-centric collaboration",
    subHeading:
      "We engage local communities to ensure our projects align with neighbourhood character and needs.",
  },
];

export interface SectionStatisticProps {
  className?: string;
}

const SectionStatistic: FC<SectionStatisticProps> = ({ className = "" }) => {
  return (
    <div className={`nc-SectionStatistic relative ${className}`}>
      <Heading>WHY CHOOSE US</Heading>
      <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-8">
        {FOUNDER_DEMO.map((item) => (
          <div
            key={item.id}
            className="p-6 relative bg-neutral-50 dark:bg-neutral-800 rounded-2xl dark:border-neutral-800"
          >
            <h3 className="text-lg uppercase font-semibold leading-none text-neutral-900 md:text-3xl dark:text-neutral-200">
              {item.heading}
            </h3>
            <span className="block text-sm text-neutral-500 mt-3 sm:text-base dark:text-neutral-400">
              {item.subHeading}
            </span>

            <div
              style={{
                width: "90px",
                height: "90px",
                border: "2px solid white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                top: "-40px",
                right: "-30px",
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  background: "white",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    color: "black",
                    fontWeight: "900",
                    fontSize: "26px",
                  }}
                >
                  {item.id}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionStatistic;
