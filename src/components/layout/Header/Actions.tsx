import { useEffect, useState } from "react";
import { FiMail, FiMaximize, FiMinimize } from "react-icons/fi";
import { HStack, Icon } from "@chakra-ui/react";
import { Menu, Tooltip } from "@/components/ui";

const Actions = () => {
  const [isFullscreen, setIsFullscreen] = useState(
    !!document.fullscreenElement,
  );

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen((prev) => !prev);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleToggleFullScreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <HStack gap={6} color="primary">
      <Tooltip content={isFullscreen ? "Close Fullscreen" : "Open Fullscreen"}>
        <Icon
          fontSize="md"
          cursor="pointer"
          onClick={handleToggleFullScreen}
          _hover={{ opacity: 0.8 }}
          aria-label={isFullscreen ? "Close fullscreen" : "Open fullscreen"}
        >
          {isFullscreen ? (
            <FiMinimize color="primary" />
          ) : (
            <FiMaximize color="primary" />
          )}
        </Icon>
      </Tooltip>

      <Menu
        trigger={
          <Tooltip content="Notifications">
            <Icon fontSize="md" cursor="pointer" _hover={{ opacity: 0.8 }}>
              <FiMail />
            </Icon>
          </Tooltip>
        }
        title="Notifications"
        items={[]}
        emptyDescription="No notifications"
        counter
      />
    </HStack>
  );
};

export { Actions };
