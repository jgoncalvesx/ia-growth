"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils";
const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("relative overflow-hidden", className), ...props, children: _jsx("div", { className: "h-full w-full overflow-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent", children: children }) })));
ScrollArea.displayName = "ScrollArea";
export { ScrollArea };
//# sourceMappingURL=scroll-area.js.map