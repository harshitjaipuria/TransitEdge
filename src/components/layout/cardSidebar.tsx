import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Heart,
  Rotate3D,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import img1 from "@assets/images/products/img-04.png";
import img2 from "@assets/images/products/img-03.png";
import img3 from "@assets/images/products/img-09.png";
import Image from "next/image";
import { Drawer } from "../custom/drawer/drawer";
import Link from "next/link";

type CardSidebarProps = {
  open: boolean;
  handleCloseModal: () => void;
};

const CardSidebar: React.FC<CardSidebarProps> = ({
  open,
  handleCloseModal,
}) => {
  const [count1, setCount1] = useState<number>(1);
  const [count2, setCount2] = useState<number>(2);
  const [count3, setCount3] = useState<number>(1);

  return (
    <>
      <Drawer
        isOpen={open}
        onClose={() => handleCloseModal()}
        position="right"
        size="large"
        customContentClass="div"
        content={
          <>
            <div id="basicEnd"  className="drawer show drawer-lg drawer-end">
              <div className="drawer-header">
                <h6>My Cart</h6>
                <button data-drawer-close="basicEnd">
                  <X className="link link-red" onClick={handleCloseModal}></X>
                </button>
              </div>
           
            </div>
          </>
        }
        footer={<></>}
      />
    </>
  );
};

export default CardSidebar;
