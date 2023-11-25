import Logo from "shared/Logo/Logo";
import SocialsList1 from "shared/SocialsList1/SocialsList1";
import { CustomLink } from "data/types";
import React from "react";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: "Home",
    menus: [
      { href: "#", label: "Bookitnow Platform" },
      { href: "#", label: "Bookitnow for Business" },
    ],
  },
  {
    id: "1",
    title: "About Us",
    menus: [
      { href: "#", label: "About Us" },
      { href: "#", label: "Our Blog" },
      { href: "#", label: "Like Bookitnow? Refer a centre to us!" },
      { href: "#", label: "Careers" },
    ],
  },
  {
    id: "2",
    title: "HELP CENTRE",
    menus: [
      { href: "#", label: "Frequently Asked Questions (FAQs)" },
      { href: "#", label: "Terms of Use" },
      { href: "#", label: "Privacy Policy" },
      { href: "#", label: "Contact Us" },
    ],
  },
  {
    id: "4",
    title: "OUR PARTNER CENTRES",
    menus: [
      { href: "#", label: "Andalas Sports Complex" },
      { href: "#", label: "Dewan Serbaguna Bandar Puchong" },
      { href: "#", label: "Oncidium Hall" },
      { href: "#", label: "and more..." },
    ],
  },
];

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="nc-Footer relative py-12 lg:py-16 border-t border-neutral-200 dark:border-neutral-700">
      <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
        {/* <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col"></div> */}
        <div className="flex flex-col">
          <Logo />
          <div className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white text-sm ">
            With a user-friendly interface, real-time updates, and payment
            options, the platform enhances convenience for individuals and
            groups seeking to secure playing spaces for various sports and
            recreational activities.
          </div>
        </div>
        {widgetMenus.map(renderWidgetMenuItem)}
      </div>
      <div className="container h-[1px] bg-[#374151] my-8"></div>
      <div className="container flex items-center justify-between">
        <div>
          <Logo />
        </div>
        <div>
          <SocialsList1 className="flex items-center space-x-3  " />
        </div>
      </div>
    </div>
  );
};

export default Footer;
