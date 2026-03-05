import { ReactNode, forwardRef } from "react";
import { Tooltip as ChakraTooltip, Portal } from "@chakra-ui/react";

export interface TooltipProps extends ChakraTooltip.RootProps {
  content: ReactNode;
  contentProps?: ChakraTooltip.ContentProps;
  disabled?: boolean;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(props, ref) {
    const { children, disabled, content, contentProps, ...rest } = props;

    if (disabled) return children;

    return (
      <ChakraTooltip.Root {...rest}>
        <ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>
        <Portal disabled={false}>
          <ChakraTooltip.Positioner>
            <ChakraTooltip.Content ref={ref} bg="primary" {...contentProps}>
              {content}
            </ChakraTooltip.Content>
          </ChakraTooltip.Positioner>
        </Portal>
      </ChakraTooltip.Root>
    );
  },
);
