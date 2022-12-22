import React from "react";

interface Props {
    children: React.ReactNode;
}

const FullWidthLayout = ({ children }: Props) => (
  <>
    <div className="bg-slate-800 min-h-screen text-slate-200 font-roboto flex items-center justify-center">
        {children}
    </div>
  </>
);

export default FullWidthLayout;