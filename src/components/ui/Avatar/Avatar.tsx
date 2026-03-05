import { AvatarRootProps, Avatar as ChakraAvatar } from "@chakra-ui/react";

interface AvatarProps extends Omit<AvatarRootProps, "background" | "size"> {
  gender: "male" | "female";
  size?: "sm" | "lg";
  background?: boolean;
}

const AVATAR_SIZES = {
  sm: {
    root: 10,
    padding: 5,
  },
  lg: {
    root: 40,
    padding: "15px",
  },
};

export const Avatar = (props: AvatarProps) => {
  const { gender, size = "sm", background, ...rest } = props;

  const genderIcon = gender === "male" ? "/icon/male.png" : "/icon/female.png";
  const dimensions = AVATAR_SIZES[size];

  return (
    <ChakraAvatar.Root
      width={dimensions.root}
      height={dimensions.root}
      bg={background ? "background" : "transparent"}
      pt={background ? dimensions.padding : 0}
      px={background ? dimensions.padding : 0}
      alignItems="flex-end"
      justifyContent="center"
      overflow="hidden"
      borderRadius="full"
      {...rest}
    >
      <ChakraAvatar.Fallback name={gender} />
      <ChakraAvatar.Image
        src={genderIcon}
        width="100%"
        height="auto"
        objectFit="contain"
        borderRadius="none"
      />
    </ChakraAvatar.Root>
  );
};
