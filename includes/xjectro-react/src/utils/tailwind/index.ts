import * as Responsive from "./responsive";
import * as Layout from "./layout";
import * as Typography from "./typography";
import * as Spacing from "./spacing";

export const { getResponsiveClasses, safelistClasses } = Responsive;
export const {
  getColumnsClasses,
  getDisplayClasses,
  getFlexClasses,
  getHeightClasses,
  getWidthClasses,
} = Layout;
export const {
  getTextSizeClasses,
  getFontWeightClasses,
  getLineHeightClasses,
} = Typography;
export const { getMarginClasses, getPaddingClasses } = Spacing;
