import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
    return twMerge(clsx(inputs));
}
const Button = React.forwardRef(({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const variants = {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700",
        secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
        ghost: "hover:bg-slate-100 text-slate-600",
        link: "text-blue-600 underline-offset-4 hover:underline",
        white: "bg-white text-slate-900 shadow-sm hover:bg-slate-50"
    };
    const sizes = {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
    };
    return (_jsx(Comp, { className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50", variants[variant], sizes[size], className), ref: ref, ...props }));
});
Button.displayName = "Button";
export { Button };
//# sourceMappingURL=button.js.map