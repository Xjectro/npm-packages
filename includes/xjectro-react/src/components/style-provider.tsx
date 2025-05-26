"use client";

import React from "react";

export function StyleProvider({ children }: React.PropsWithChildren) {
  return <React.Fragment>{children}</React.Fragment>;
}
