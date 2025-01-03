import {
  Box,
  Card,
  Center,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";

const SelfProfile = ({ profileData }: { profileData: any }) => {
  return (
    <Card.Root margin="1rem">
      <Center>
        <Box py="5rem" w="full">
          <VStack w="full">
            <Text className="font-bold text-3xl">
              {profileData.data.name ?? "No Name"}
            </Text>
            <Text className="font-light text-base">
              {profileData.data.email ?? "No Email"}
            </Text>
            <HStack w="full" mt="1rem">
              {/* Phone */}
              <Box
                background=""
                width="full"
                padding="4"
                color="white"
                className="text-center"
              >
                <VStack width="full">
                  <Text className="font-light text-base">Phone</Text>
                  <Text className="font-semibold text-base">
                    {profileData.data.phone ?? "-"}
                  </Text>
                </VStack>
              </Box>

              {/* Date of Birth */}
              <Box
                background=""
                width="full"
                padding="4"
                color="white"
                className="text-center"
              >
                <VStack width="full">
                  <Text className="font-light text-base">Date of Birth</Text>
                  <Text className="font-semibold text-base">
                    {profileData.data.dob ?? "-"}
                  </Text>
                </VStack>
              </Box>

              {/* Hobby */}
              <Box
                background=""
                width="full"
                padding="4"
                color="white"
                className="text-center"
              >
                <VStack width="full">
                  <Text className="font-light text-base">Hobby</Text>
                  <Text className="font-semibold text-base">
                    {profileData.data.hobby ?? "-"}
                  </Text>
                </VStack>
              </Box>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </Card.Root>
  );
};

export default SelfProfile;
