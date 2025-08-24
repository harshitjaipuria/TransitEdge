import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import mainLogo from "@assets/images/main-logo.png";
import logoWhite from "@assets/images/logo-white.png";
import logoSmDark from "@assets/images/logo-sm-dark.png";
import user17 from "@assets/images/avatar/user-17.png";
import {
  BellDot,
  ChevronDown,
  Gem,
  Headset,
  Presentation,
  Settings,
  Gauge,
  Box,
  MessagesSquare,
  Calendar,
  Mail,
  ShoppingBag,
  Folders,
  Monitor,
  Shapes,
  Trophy,
  Hospital,
  School,
  FileText,
  UsersRound,
  AlignStartVertical,
  KeyRound,
  PencilRuler,
  BookOpen,
  RemoveFormatting,
  Clipboard,
  TextQuote,
  Table2,
  ChartBarBig,
  TrendingDown,
  Dna,
  ChartScatter,
  Map,
  LifeBuoy,
  Feather,
  LogOut,
} from "lucide-react";
import SimpleBar from "simplebar-react";

import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownPosition,
} from "@src/components/custom/dropdown/dropdown";
import { RootState } from "@src/slices/reducer";
import { LAYOUT_TYPES, SIDEBAR_SIZE } from "@src/components/constants/layout";

interface SidebarProps {
  searchSidebar: any;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({
  searchSidebar,
  isSidebarOpen,
  toggleSidebar,
}: SidebarProps) => {
  const { t } = useTranslation();
  const [sidebarDropdownPosition, setSidebarDropdownPosition] =
    useState<DropdownPosition>("top-right");
  const router = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { layoutType, layoutSidebar } = useSelector(
    (state: RootState) => state.Layout
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (layoutType === "horizontal") {
      setSidebarDropdownPosition("");
    } else {
      setSidebarDropdownPosition("top-right");
    }
  }, [layoutType]);

  const getLucideIcon = (icon: string, className: string) => {
    const icons: { [key: string]: React.ReactElement } = {
      gauge: <Gauge className={className} />,
      box: <Box className={className} />,
      "messages-square": <MessagesSquare className={className} />,
      calendar: <Calendar className={className} />,
      mail: <Mail className={className} />,
      "shopping-bag": <ShoppingBag className={className} />,
      folders: <Folders className={className} />,
      monitor: <Monitor className={className} />,
      shapes: <Shapes className={className} />,
      trophy: <Trophy className={className} />,
      hospital: <Hospital className={className} />,
      school: <School className={className} />,
      "file-text": <FileText className={className} />,
      "users-round": <UsersRound className={className} />,
      "align-start-vertical": <AlignStartVertical className={className} />,
      "key-round": <KeyRound className={className} />,
      gem: <Gem className={className} />,
      "pencil-ruler": <PencilRuler className={className} />,
      "book-open": <BookOpen className={className} />,
      "remove-formatting": <RemoveFormatting className={className} />,
      clipboard: <Clipboard className={className} />,
      "text-quote": <TextQuote className={className} />,
      "table-2": <Table2 className={className} />,
      "bar-chart-3": <ChartBarBig className={className} />,
      "trending-up-down": <TrendingDown className={className} />,
      dna: <Dna className={className} />,
      "scatter-chart": <ChartScatter className={className} />,
      map: <Map className={className} />,
      "life-buoy": <LifeBuoy className={className} />,
      "file-textt": <FileText className={className} />,
      feather: <Feather className={className} />,
    };
    return icons[icon];
  };

  const isActive = (menuItem: any) => {
    if (router === menuItem.link) return true; // Check if the current path matches the item's link

    return menuItem.children.some(
      (child: any) =>
        child.link === router || // Check if the current path matches the child's link
        (child.children.length > 0 && isActive(child)) // Recursively check nested children
    );
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      {isSidebarOpen === true && (
        <>
          <div
            id="main-sidebar"
            className={`main-sidebar group-data-[layout=boxed]:top-[calc(theme('spacing.topbar')_+_theme('spacing.sidebar-boxed'))]  lg:block ${
              scrolled ? "group-data-[layout=boxed]:!top-topbar" : "scrolled"
            }`}
          >
            {/* Sidebar content goes here */}
            <div className="sidebar-wrapper">
              <div>
                <div className="navbar-brand">
                  <Link
                    href="#!"
                    className="inline-flex items-center justify-center w-full"
                  >
                    <div className="group-data-[sidebar=small]:hidden">
                      <Image
                        src={mainLogo}
                        aria-label="logo"
                        alt="logo"
                        className="h-6 mx-auto group-data-[sidebar-colors=light]:dark:hidden group-data-[sidebar-colors=dark]:hidden group-data-[sidebar-colors=brand]:hidden group-data-[sidebar-colors=purple]:hidden group-data-[sidebar-colors=sky]:hidden"
                        width={132}
                        height={24}
                      />
                      <Image
                        src={logoWhite}
                        aria-label="logo"
                        alt="logo"
                        className="h-6 mx-auto group-data-[sidebar-colors=light]:hidden group-data-[sidebar-colors=light]:dark:inline-block"
                        width={132}
                        height={24}
                      />
                    </div>
                    <div className="hidden group-data-[sidebar=small]:inline-block">
                      <Image
                        src={logoSmDark}
                        aria-label="logo"
                        alt="logo"
                        className="h-6 mx-auto"
                        width={24}
                        height={24}
                      />
                    </div>
                  </Link>
                </div>


              </div>

              <div className="fixed top-0 bottom-0 left-0 w-20 bg-white bg-light hidden group-data-[layout=doulcolumn]:block"></div>
              <SimpleBar className="navbar-menu" id="navbar-menu-list">
                <ul
                  className="group-data-[layout=horizontal]:md:flex group-data-[layout=horizontal]:*:shrink-0"
                  id="sidebar"
                >
                  {searchSidebar && searchSidebar.length > 0
                    ? searchSidebar.map((item: any, index: number) => (
                        <li
                          key={index}
                          className={item.separator ? "menu-title" : "relative"}
                        >
                          {/* Check for separator */}
                          {!item.children.length && item.separator && (
                            <span className="group-data-[sidebar=small]:hidden">
                              {t(item.lang)}
                            </span>
                          )}

                          {/* If it has children */}
                          {!item.separator && item.children.length > 0 && (
                            <Dropdown
                              position={sidebarDropdownPosition}
                              trigger="click"
                              isActive={
                                layoutSidebar !== SIDEBAR_SIZE.SMALL
                                  ? isActive(item)
                                  : false
                              }
                              toggleSidebar={toggleSidebar}
                              closeOnOutsideClick={
                                layoutType === LAYOUT_TYPES.HORIZONTAL ||
                                layoutSidebar === SIDEBAR_SIZE.SMALL
                              }
                              closeOnOutsideClickSidebar={
                                layoutType !== LAYOUT_TYPES.HORIZONTAL
                              }
                            >
                              <DropdownButton
                                colorClass={`nav-link ${
                                  isActive(item) ? "active" : ""
                                }`}
                                arrow={true}
                              >
                                <span className="w-6 group-data-[sidebar=small]:mx-auto shrink-0">
                                  {item.icon &&
                                    getLucideIcon(
                                      item.icon,
                                      "size-4 group-data-[sidebar=small]:size-5 group-data-[sidebar=medium]:size-5"
                                    )}
                                </span>
                                <span className="group-data-[sidebar=small]:hidden">
                                  {t(item.lang)}
                                </span>
                              </DropdownButton>

                              <DropdownMenu handleMenuClick={handleMenuClick}>
                                <ul className="dropdown-wrapper">
                                  {item.children.map(
                                    (child: any, childIndex: number) => (
                                      <li key={childIndex}>
                                        {/* Check for nested children */}
                                        {child.children.length > 0 ? (
                                          <Dropdown
                                            position="top-right"
                                            trigger="click"
                                            isActive={isActive(child)}
                                            closeOnOutsideClick={
                                              layoutType ===
                                                LAYOUT_TYPES.HORIZONTAL ||
                                              layoutSidebar ===
                                                SIDEBAR_SIZE.SMALL
                                            }
                                            closeOnOutsideClickSidebar={
                                              layoutType !==
                                              LAYOUT_TYPES.HORIZONTAL
                                            }
                                          >
                                            <DropdownButton
                                              colorClass={`nav-link ${
                                                isActive(child) ? "active" : ""
                                              }`}
                                              arrow={true}
                                            >
                                              <span>{t(child.lang)}</span>
                                            </DropdownButton>

                                            <DropdownMenu
                                              handleMenuClick={handleMenuClick}
                                            >
                                              <ul className="dropdown-wrapper">
                                                {child.children.map(
                                                  (
                                                    subChild: any,
                                                    subIndex: number
                                                  ) => (
                                                    <li key={subIndex}>
                                                      <Link
                                                        href={subChild.link}
                                                        className={`${
                                                          router ===
                                                          subChild.link
                                                            ? "active"
                                                            : ""
                                                        }`}
                                                      >
                                                        {t(subChild.lang)}
                                                      </Link>
                                                    </li>
                                                  )
                                                )}
                                              </ul>
                                            </DropdownMenu>
                                          </Dropdown>
                                        ) : (
                                          <Link
                                            href={child.link}
                                            className={` content ${
                                              router === child.link
                                                ? "active"
                                                : ""
                                            }`}
                                          >
                                            {t(child.lang)}
                                          </Link>
                                        )}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </DropdownMenu>
                            </Dropdown>
                          )}

                          {/* Simple link without children */}
                          {!item.separator &&
                            !item.children.length &&
                            item.link && (
                              <Link
                                href={item.link}
                                className={`nav-link flex items-center gap-2 ${
                                  router === item.link ? "active" : ""
                                }`}
                              >
                                <span>
                                  {item.icon &&
                                    getLucideIcon(
                                      item.icon,
                                      "size-4 group-data-[sidebar=small]:size-5 group-data-[sidebar=medium]:size-5"
                                    )}
                                </span>
                                <span className="group-data-[sidebar=small]:hidden">
                                  {t(item.lang)}
                                </span>
                              </Link>
                            )}
                        </li>
                      ))
                    : ""}
                </ul>
              </SimpleBar>
            </div>
          </div>
          <div
            id="backdrop"
            className="backdrop-overlay z-[1004] lg:hidden print:hidden"
            onClick={toggleSidebar}
          ></div>
        </>
      )}
    </>
  );
};

export default Sidebar;
