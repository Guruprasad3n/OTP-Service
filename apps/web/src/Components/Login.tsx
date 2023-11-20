"use client";

import React, { useState } from "react";
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [isMobile, setIsMobile] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(`http://localhost:3000/api/otp/generate`, {
        identifier: isMobile,
      });
      console.log(res.data);

      const abc = Cookies.set("mobileNumber", isMobile);
      localStorage.setItem("mobileNumber", isMobile);
      console.log(abc);

      toast({
        title: "OTP Sending Please Wait",
        description: `We are sending an OTP to ${isMobile}.`,
        status: "warning",
        duration: 1000,
        isClosable: true,
      });

      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "OTP Sent",
          description: `We've Sent and OTP to ${isMobile}.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/verify");
      }, 3000);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Enter Correct Mobile Number",
        description: "error",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"#242424"}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Login
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          You&apos;ll get an OTP to your Mobile Number
        </Text>
        <FormControl id="mobile">
          <Input
            onChange={(e) => setIsMobile(e.target.value)}
            placeholder="Your Mobile Number"
            _placeholder={{ color: "gray.500" }}
            type="string"
            value={isMobile}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            onClick={handleSubmit}
            rounded={"8"}
            bg={"rgb(52, 112, 228)"}
            color={"white"}
            outline={"0"}
            _hover={{
              bg: "blue.500",
            }}
          >
            {isLoading ? <Spinner /> : "Login"}
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Login;