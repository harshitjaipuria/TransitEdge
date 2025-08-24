"use client";
import React, { useCallback, useEffect, useState } from "react";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/slices/reducer";
import { changeSidebarSize } from "@src/slices/thunk";
import Topbar from "./Topbar";
import dynamic from "next/dynamic";
import { menu } from "@src/data/Sidebar/menu";
import { MegaMenu, SubMenu, MainMenu } from "@src/dtos";
import { LAYOUT_TYPES, SIDEBAR_SIZE } from "@src/components/constants/layout";
import { changeHTMLAttribute, setNewThemeData } from "@src/slices/layout/utils";
import Head from "next/head";
import { changeSettingModalOpen } from "@src/slices/layout/reducer";

const SidebarComponent = dynamic(() => import("./Sidebar"), {
  ssr: false, // Disable SSR for this component
});

export default function Layout({
  breadcrumbTitle,
  children,
}: {
  breadcrumbTitle?: string;
  children: React.ReactNode;
}) {
  const title = breadcrumbTitle
    ? ` ${breadcrumbTitle} | Domiex - Next TS Admin & Dashboard Template `
    : "Domiex - Next TS Admin & Dashboard Template";

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const {
    layoutMode,
    layoutType,
    layoutWidth,
    layoutSidebar,
    layoutDarkModeClass,
    layoutSidebarColor,
    layoutDataColor,
    layoutDirection,
  } = useSelector((state: RootState) => state.Layout);
  const dispatch = useDispatch<AppDispatch>();
  const [searchSidebar, setSearchSidebar] = useState<MegaMenu[]>(menu);
  const [searchValue, setSearchValue] = useState<string>("");
  const handleThemeSidebarSize = useCallback(() => {
    if (layoutType !== "horizontal") {
      // Toggle between BIG and SMALL sidebar
      const newSize =
        layoutSidebar === SIDEBAR_SIZE.DEFAULT
          ? SIDEBAR_SIZE.SMALL
          : SIDEBAR_SIZE.DEFAULT;
      setNewThemeData("dx-sidebar-size", newSize);
      changeHTMLAttribute("data-sidebar", newSize);
      dispatch(changeSidebarSize(newSize));
    } else {
      // If layout is horizontal, always use default size
      setNewThemeData("dx-sidebar-size", SIDEBAR_SIZE.DEFAULT);
      changeHTMLAttribute("data-sidebar", SIDEBAR_SIZE.DEFAULT);
      dispatch(changeSidebarSize(SIDEBAR_SIZE.DEFAULT));
    }
  }, [layoutType, layoutSidebar, dispatch]);

  const toggleSidebar = () => {
    if (window.innerWidth < 1000) {
      // Toggle sidebar open/close for small screens
      setIsSidebarOpen((prev) => !prev);
      setNewThemeData("dx-sidebar-size", SIDEBAR_SIZE.DEFAULT);
      changeHTMLAttribute("data-sidebar", SIDEBAR_SIZE.DEFAULT);
      dispatch(changeSidebarSize(SIDEBAR_SIZE.DEFAULT));
    } else {
      // On larger screens, toggle between big and small sidebar
      handleThemeSidebarSize();
    }
  };
  useEffect(() => {
    const handleResize = () => {
      // Update the sidebar state based on the window width
      setIsSidebarOpen(window.innerWidth >= 1024);
      if (
        layoutType === LAYOUT_TYPES.SEMIBOX ||
        layoutType === LAYOUT_TYPES.MODERN
      ) {
        if (window.innerWidth > 1000) {
          // Set the layout to the layoutType if screen size is greater than 1000px
          document.documentElement.setAttribute("data-layout", layoutType);
        } else {
          // Set to 'default' if screen size is 1000px or less
          document.documentElement.setAttribute("data-layout", "default");
        }
      } else {
        // For other layouts, just set to layoutType, no need to check screen size
        document.documentElement.setAttribute("data-layout", layoutType);
      }
    };
    // Initial layout check on component mount
    handleResize();
    // Listen for window resize events
    window.addEventListener("resize", handleResize);
    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [layoutType]); // Only rerun the effect when layoutType changes

  // handle search menu
  const handleSearchClient = (value: string) => {
    setSearchValue(value);

    if (value.trim() !== "") {
      const filteredMenu: MegaMenu[] = menu.filter((megaItem: MegaMenu) => {
        // Filter the first level: MegaMenu
        const isMegaMenuMatch =
          megaItem.title.toLowerCase().includes(value.toLowerCase()) ||
          megaItem.lang.toLowerCase().includes(value.toLowerCase());

        // Filter the second level: MainMenu (children of MegaMenu)
        const filteredMainMenu = megaItem.children?.filter(
          (mainItem: MainMenu) => {
            const isMainMenuMatch =
              mainItem.title.toLowerCase().includes(value.toLowerCase()) ||
              mainItem.lang.toLowerCase().includes(value.toLowerCase());

            // Filter the third level: SubMenu (children of MainMenu)
            const filteredSubMenu = mainItem.children?.filter(
              (subItem: SubMenu) => {
                return (
                  subItem.title.toLowerCase().includes(value.toLowerCase()) ||
                  subItem.lang.toLowerCase().includes(value.toLowerCase())
                );
              }
            );

            // If SubMenu matches or MainMenu matches, return the filtered item
            return (
              isMainMenuMatch || (filteredSubMenu && filteredSubMenu.length > 0)
            );
          }
        );

        // Return MegaMenu item if it matches or has any matching MainMenu children
        return (
          isMegaMenuMatch || (filteredMainMenu && filteredMainMenu.length > 0)
        );
      });

      setSearchSidebar(filteredMenu);
    } else {
      setSearchSidebar(menu);
    }
  };

  useEffect(() => {
    document.documentElement.classList.add("scroll-smooth", "group");
    document.documentElement.setAttribute("data-mode", layoutMode);
    document.documentElement.setAttribute("data-colors", layoutDataColor);
    document.documentElement.setAttribute("lang", "en");
    document.documentElement.setAttribute("data-layout", layoutType);
    document.documentElement.setAttribute("data-content-width", layoutWidth);
    document.documentElement.setAttribute("data-sidebar", layoutSidebar);
    document.documentElement.setAttribute(
      "data-sidebar-colors",
      layoutSidebarColor
    );
    document.documentElement.setAttribute("data-nav-type", layoutDarkModeClass);
    document.documentElement.setAttribute("dir", layoutDirection);
  }, []);
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (typeof window !== "undefined") {
      // Check if page was refreshed by checking sessionStorage
      const isPageRefreshed = sessionStorage.getItem("isRefreshed");
      if (!isPageRefreshed) {
        sessionStorage.setItem("isRefreshed", "true");
      } else {
        if (window.innerWidth >= 768) {
          timer = setTimeout(() => {
            dispatch(changeSettingModalOpen(true));
            console.log("Modal triggered on page refresh");
          }, 500); // Delay to show modal after a short timeout
        }
      }
    }
    // Cleanup the timeout if the component is unmounted or the effect is cleaned up
    return () => {
      clearTimeout(timer);
      sessionStorage.removeItem("isRefreshed");
    };
  }, [dispatch]);

  return (
    <React.Fragment>
      {/* Main topbar */}
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Domiex is a Next TS Admin & Dashboard Template that supports 21 frameworks including HTML, React JS, React TS, Angular 18, Laravel 11, ASP.Net Core 8, MVC 5, Blazor, Node JS, Django, Flask, PHP, CakePHP, Symfony, CodeIgniter, Ajax & Yii and more. Perfect for developers and businesses."
        />

        <meta name="author" content="SRBThemes" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="" />
        <meta
          property="og:title"
          content="Domiex - Next TS Admin & Dashboard Template"
        />
        <meta
          property="og:description"
          content="Versatile and responsive admin templates supporting 21 frameworks. Includes features like charts, RTL, LTR, dark light modes, and more."
        />
        <meta property="twitter:url" content="" />
        <meta
          property="twitter:title"
          content="Domiex - Next TS Admin & Dashboard Template"
        />
        <meta
          property="twitter:description"
          content="Explore Domiex, an Next TS admin & dashboard template offering support for 21 frameworks. Perfect for building professional, scalable web apps."
        />
        <meta
          name="keywords"
          content="admin dashboard template, admin template, TailwindCSS dashboard, react next admin, Next TS admin, Next TypeScript Admin, 21 frameworks support, responsive dashboard, web application template, dark mode, RTL support, Vue, MVC, Blazor, PHP, Node.js, Django, Flask, Next JS Admin"
        />
      </Head>

      <Topbar
        searchMenu={(value: string) => handleSearchClient(value)}
        searchText={searchValue}
        toggleSidebar={toggleSidebar}
      />

      {/* sidebar */}
      <SidebarComponent
        searchSidebar={searchSidebar}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="relative min-h-screen group-data-[layout=boxed]:bg-white group-data-[layout=boxed]:rounded-md">
        <div className="page-wrapper pt-[calc(theme('spacing.topbar')_*_1.2)]">
          {children}
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
}
