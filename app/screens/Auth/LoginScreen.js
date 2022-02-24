import {
  VStack,
  FormControl,
  Button,
  Input,
  Heading,
  Flex,
  Text,
  useToast,
  View,
} from "native-base";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { LoginHandler } from "../../store/actions/authAction";
import ColorPalete from "../../utils/ColorPalete";

const formValidations = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().label("Password").min(8),
});

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleSubmit = (values) => {
    setLoading(true);
    dispatch(LoginHandler(values, navigation, toast));
    setLoading(false);
  };
  return (
    <View style={styles.login}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={formValidations}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <VStack mt={20} space={4} style={styles.container} safeArea>
            <Flex mb={30}>
              <Heading
                mb={4}
                size="lg"
                style={{
                  textTransform: "uppercase",
                  color: ColorPalete.secondary,
                }}
              >
                Login To Your Account
              </Heading>
              <Text
                fontSize="sm"
                style={{ textAlign: "center", color: ColorPalete.secondary }}
              >
                Enter your details to login.
              </Text>
            </Flex>
            <FormControl
              isRequired={"email" in errors}
              isInvalid={"email" in errors}
            >
              <FormControl.Label style={styles.label}>
                <Text style={styles.label}> Email Address</Text>
              </FormControl.Label>
              {console.log("errors", errors)}
              <Input
                style={styles.inputtext}
                onBlur={handleBlur("email")}
                placeholder="Johndoe@example.com"
                onChangeText={handleChange("email")}
                value={values.email}
                InputLeftElement={
                  <FontAwesome
                    name="envelope"
                    size={20}
                    color="black"
                    style={{ opacity: 0.3, paddingLeft: 8, paddingRight: 2 }}
                  />
                }
              />
              <FormControl.ErrorMessage>
                {errors.email}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl
              isRequired={"password" in errors}
              isInvalid={"password" in errors}
            >
              <FormControl.Label>
                <Text style={styles.label}>Password</Text>
              </FormControl.Label>
              <Input
                style={styles.inputtext}
                type={show ? "text" : "password"}
                onBlur={handleBlur("password")}
                onChangeText={handleChange("password")}
                value={values.password}
                placeholder="Your Password here"
                InputLeftElement={
                  <FontAwesome
                    name="lock"
                    size={30}
                    color="black"
                    style={{ opacity: 0.3, paddingLeft: 8, paddingRight: 2 }}
                  />
                }
                InputRightElement={
                  <Button
                    variant="ghost"
                    ml={1}
                    roundedLeft={0}
                    roundedRight="md"
                    onPress={handleClick}
                    startIcon={
                      <FontAwesome
                        name={show ? "eye" : "eye-slash"}
                        size={30}
                        color="black"
                        style={{ opacity: 0.3 }}
                      />
                    }
                  ></Button>
                }
              />
              <FormControl.ErrorMessage>
                {errors.password}
              </FormControl.ErrorMessage>
            </FormControl>
            <Button
              mb={10}
              right={-120}
              size="xs"
              variant="link"
              onPress={() => navigation.push("resetForm")}
            >
              <Text bold fontSize="sm" style={styles.label}>
                Forgot Password?
              </Text>
            </Button>
            <Button
              style={{ width: "50%" }}
              startIcon={
                <FontAwesome
                  name="sign-in"
                  size={30}
                  color="black"
                  style={{ opacity: 0.3 }}
                />
              }
              disabled={loading}
              onPress={handleSubmit}
            >
              Log In
            </Button>

            <Button
              mt={10}
              size="sm"
              variant="link"
              onPress={() => navigation.push("register")}
            >
              <Text style={styles.label}>
                Don't have an account?{" "}
                <Text bold style={{ color: ColorPalete.custom }}>
                  Sign Up
                </Text>
              </Text>
            </Button>
          </VStack>
        )}
      </Formik>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",

    margin: 20,
  },
  login: {
    backgroundColor: ColorPalete.primary,
    height: "100%",
  },
  links: {
    color: "blue",
  },
  label: {
    color: ColorPalete.secondary,
  },
  inputtext: {
    color: "white",
  },
});
