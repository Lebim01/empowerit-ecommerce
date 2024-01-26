"use client";
import React, { useContext, useEffect, useState } from "react";
import Btn from "@/Elements/Buttons/Btn";
import ThemeOptionContext from "@/Helper/ThemeOptionsContext";
import Avatar from "@/Components/Common/Avatar";
import Link from "next/link";
import { RiMenuLine } from "react-icons/ri";
import Image from "next/image";

const HeaderLogo = () => {
  const [logo] = useState("/assets/images/logo.png");
  const { mobileSideBar, setMobileSideBar } = useContext(ThemeOptionContext);

  return (
    <>
      <Btn
        className="navbar-toggler d-xl-none d-inline navbar-menu-button me-2"
        type="button"
      >
        <span
          className="navbar-toggler-icon"
          onClick={() => setMobileSideBar(!mobileSideBar)}
        >
          <RiMenuLine />
        </span>
      </Btn>
      <Link href="/" className="web-logo nav-logo">
        <Image src={logo} width={500} height={300} quality={100} />
      </Link>
    </>
  );
};

export default HeaderLogo;
