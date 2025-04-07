import * as React from "react";

export default function NavLink({ children, isActive }) {
  return (
    <div className={`self-stretch my-auto ${isActive ? 'text-xl font-semibold' : ''}`}>
      {children}
    </div>
  );
}