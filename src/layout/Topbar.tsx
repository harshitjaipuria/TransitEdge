import React, { useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/slices/reducer";
import { changeLayoutMode } from "@src/slices/layout/thunk";
import { LAYOUT_MODE_TYPES } from "@src/components/constants/layout";
import { Search, Moon, Sun, CalendarRange, PanelRightOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import mainLogo from "@assets/images/main-logo.png";
import logoWhite from "@assets/images/logo-white.png";
import ToolsAppsModal from "@src/components/layout/toolsAppsModal";
import SettingsModal from "@src/components/layout/settingsModal";

interface TopbarProps {
  searchText: string;
  searchMenu: (value: string) => void;
  toggleSidebar: () => void;
}

const Topbar = ({ searchText, searchMenu, toggleSidebar }: TopbarProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { layoutMode, isSettingModalOpen } = useSelector(
    (state: RootState) => state.Layout
  );
  const [open, setOpen] = useState(false);

  const handlChangeLayoutMode = (mode: LAYOUT_MODE_TYPES) => {
    dispatch(changeLayoutMode(mode));
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleCloseThemeModal = () => {
    // Handle theme modal close
  };

  return (
    <>
      <div className="main-topbar">
        <div className="main-topbar-wrapper">
          <div className="flex items-center h-full">
            {/* Logo */}
            <div className="navbar-brand pl-6 p-0">
              <Link href="/" className="logos">
                <Image
                  src={mainLogo}
                  alt="Domiex"
                  className="w-full h-16 dark:hidden group-data-[layout=modern]:hidden"
                  height={64}
                  width={667}
                  style={{ objectFit: "contain" }}
                />
                <Image
                  src={logoWhite}
                  alt="Domiex"
                  className="w-full h-16 hidden dark:inline-block group-data-[layout=modern]:hidden"
                  height={64}
                  width={667}
                  style={{ objectFit: "contain" }}
                />
              </Link>
            </div>

            <button
              onClick={() => toggleSidebar()}
              className="sidebar-toggle group-data-[layout=horizontal]:lg:hidden ml-4"
              title="sidebar-toggle"
            >
              <PanelRightOpen className="size-4" />
            </button>

            <div className="flex items-center gap-2 ml-auto mr-6">
              {/* Light & Dark Modal */}
              <button
                className="topbar-link"
                title="Toggle Layout Mode"
                onClick={() =>
                  handlChangeLayoutMode(
                    layoutMode === LAYOUT_MODE_TYPES.LIGHT
                      ? LAYOUT_MODE_TYPES.DARK
                      : LAYOUT_MODE_TYPES.LIGHT
                  )
                }
              >
                {layoutMode === LAYOUT_MODE_TYPES.LIGHT ||
                layoutMode === LAYOUT_MODE_TYPES.DEFAULT ||
                layoutMode === LAYOUT_MODE_TYPES.BLACK_WHITE ? (
                  <Moon className="size-4" />
                ) : (
                  <Sun className="size-4" />
                )}
              </button>

              {/* Schedule */}
              <button
                type="button"
                title="topbar-link"
                className="items-center justify-center hidden px-2 link link-primary group-data-[nav-type=pattern]:text-white/75 group-data-[nav-type=pattern]:border-primary-400 border border-gray-200 rounded-md md:flex dark:border-dark-800 h-9"
              >
                <CalendarRange className="ltr:md:mr-2 rtl:md:ml-2 size-4" />
                <span className="hidden md:inline-block">Schedule</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToolsAppsModal open={open} handleCloseModal={handleCloseModal} />
      <SettingsModal
        open={isSettingModalOpen}
        handleCloseModal={handleCloseThemeModal}
      />

      <div className="hidden overflow-hidden nav-pattern">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className="w-full h-auto"
          preserveAspectRatio="none"
          viewBox="0 0 1440 560"
        >
          <g mask="url(#SvgjsMask1007)" fill="none">
            <path d="M0 0L1440 0L1440 560L0 560Z" fill="rgba(59,130,246,0.1)" />
          </g>
        </svg>
      </div>
    </>
  );
};

export default Topbar;
