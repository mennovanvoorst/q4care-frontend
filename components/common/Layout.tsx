import React from "react";
import NavBar from "./NavBar";
import Header from "./Header";

interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
  <>
    <div className="bg-slate-800 min-h-screen text-slate-200 font-roboto grid md:grid-cols-layout md:grid-rows-layout md:gap-8 pt-4 px-4">
        <div className="row-span-1 col-span-2"><Header /></div>
        <div className="row-span-1 col-span-1"><NavBar /></div>
        <main className="row-span-1 col-span-1">{children}</main>
    </div>
  </>
);

export default Layout;