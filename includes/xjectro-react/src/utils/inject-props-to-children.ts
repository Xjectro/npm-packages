import React from "react";

type InjectPropsToChildrenOptions = {
  components: React.ElementType[];
  props: Record<string, unknown>;
};

export function injectPropsToChildren(
  children: React.ReactNode,
  options: InjectPropsToChildrenOptions,
): React.ReactNode {
  const { components, props } = options;

  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    const isTarget = components.includes(child.type as React.ElementType);

    if (isTarget) {
      return React.cloneElement(child, {
        ...props,
      });
    }

    const el = child as React.ReactElement<any>;

    if (el.props?.children) {
      return React.cloneElement(el, {
        children: injectPropsToChildren(el.props.children, options),
      });
    }

    return child;
  });
}
