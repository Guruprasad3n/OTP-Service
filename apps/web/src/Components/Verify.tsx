"use client";

import {
  Center,
  Heading,
  useToast,
  Button,
  FormControl,
  Flex,
  Stack,
  useColorModeValue,
  HStack,
  PinInput,
  PinInputField,
  Text,
  Container,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
type VerifyProps = {};
const Verify: React.FC<VerifyProps> = () => {
  const [isOtp, setIsOtp] = useState<number>(0); // Assuming the initial value should be 0 as a number
  const toast = useToast();

  const mobileNumber = Cookies.get("mobileNumber");
  const handleVerify = async () => {
    try {
      const storedMobileNumber = localStorage.getItem("mobileNumber");
      console.log("Mobile Number:", storedMobileNumber);
      console.log("Entered OTP:", isOtp);

      const response = await axios.post<{ success: boolean }>(
        "http://localhost:3000/api/otp/verify",
        {
          identifier: mobileNumber,
          userEnteredOTP: isOtp,
        }
      );

      console.log("Verification Response:", response.data);

      if (response.data.success) {
        toast({
          title: "Verification Success",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // Redirect to the next page or perform any other actions after successful verification
      } else {
        toast({
          title: "Verification Failed",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Verification Failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error verifying OTP:", error);
    }
  };

  const handleResend = async () => {
    try {
      const storedMobileNumber = Cookies.get("mobileNumber");
      console.log(storedMobileNumber);
      await axios.post("http://localhost:3000/api/otp/generate", {
        identifier: `${mobileNumber}`,
      });
      toast({
        title: "OTP Resent",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Resend Failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error resending OTP:", error);
    }
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"#242424"}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"sm"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={10}
      >
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Verify your Mobile
          </Heading>
        </Center>
        <Center
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          We have sent code to your Mobile
        </Center>
        <Center
          fontSize={{ base: "sm", sm: "md" }}
          fontWeight="bold"
          color={useColorModeValue("gray.800", "gray.400")}
        >
          {localStorage.getItem("mobileNumber")}
        </Center>
        <FormControl>
          <Center>
            <HStack>
              <PinInput
                placeholder=""
                value={isOtp.toString()}
                onChange={(value) => setIsOtp(Number(value))}
              >
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          </Center>
        </FormControl>
        <Container display={"flex"} justifyContent={"end"}>
          <Text
            paddingX={2}
            onClick={handleResend}
            fontWeight={"600"}
            _hover={{
              cursor: "pointer",
              color: "blue.400",
            }}
          >
            Resend OTP
          </Text>
        </Container>
        <Stack spacing={6}>
          <Button
            onClick={handleVerify}
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            Verify
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Verify;
