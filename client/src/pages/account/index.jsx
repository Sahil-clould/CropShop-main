import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";  // Importing framer-motion for animations
import InputTag from "../../components/input/InputTag";
import SubmitButton from "../../components/button/SubmitButton";
import FormSwitch from "../../components/account/FormSwitch";
import SideImage from "../../components/account/SideImage";
import FormHeading from "../../components/account/FormHeading";
import useEmailAuth from "../../hooks/auth/useEmailAuth";

function LoginAndSignup() {
  const { type } = useParams();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const { isLoading, handleSignup, handleLogin } = useEmailAuth();

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    brandName: "",
    email: "",
    password: "",
  });

  const handleAuth = async () => {
    if (isSignInForm) {
      handleLogin(type, formData);
    } else {
      handleSignup(type, formData);
    }
  };

  useEffect(() => {
    if (isSignInForm) {
      setFormData((prevData) => ({
        ...prevData,
        email: "jaloh53056@jahsec.com",
        password: "12345678",
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, email: "", password: "" }));
    }
  }, [isSignInForm]);

  return (
    <section className="flex flex-col-reverse md:flex-row md:h-screen">
      <SideImage type={type} /> {/* This keeps the image with animation */}
      <div className="flex flex-col w-full lg:w-1/2 items-center justify-center px-6 py-8 lg:py-0">
        <div className="lg:p-6 space-y-4 md:space-y-6 sm:p-8 w-full">
          <FormHeading type={type} isSignInForm={isSignInForm} />

          {/* Wrapping form with motion.div for animation */}
          <motion.form
            className="space-y-4 md:space-y-6 w-full lg:w-3/5 mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              handleAuth();
            }}
            initial={{ opacity: 0, y: 20 }} // Initial state: hidden and slightly shifted down
            animate={{ opacity: 1, y: 0 }} // Animated state: fully visible and in place
            exit={{ opacity: 0, y: 20 }} // Exit animation: fades out and shifts down
            transition={{ duration: 0.6 }} // Transition time for both entering and exiting
          >
            {/* Sign Up form */}
            {!isSignInForm && (
              <>
                <InputTag
                  label={"Name"}
                  placeholder={"John"}
                  type={"text"}
                  outlineColor={type === "seller" ? "outline-green-700" : "outline-blue-600"}
                  value={formData.name}
                  setFormData={setFormData}
                  toUpdate={"name"}
                />
                <InputTag
                  label={"Contact No."}
                  placeholder={"9876543210"}
                  type={"text"}
                  outlineColor={type === "seller" ? "outline-green-700" : "outline-blue-600"}
                  value={formData.contact}
                  setFormData={setFormData}
                  toUpdate={"contact"}
                />
                {type === "seller" && (
                  <InputTag
                    label={"Brand Name"}
                    placeholder={"JohnVeggies"}
                    type={"text"}
                    outlineColor={type === "seller" ? "outline-green-700" : "outline-blue-600"}
                    value={formData.brandName}
                    setFormData={setFormData}
                    toUpdate={"brandName"}
                  />
                )}
              </>
            )}

            {/* Sign In form */}
            <InputTag
              label={"Email"}
              placeholder={"john@doe.com"}
              type={"email"}
              outlineColor={type === "seller" ? "outline-green-700" : "outline-blue-600"}
              value={formData.email}
              setFormData={setFormData}
              toUpdate={"email"}
            />
            <InputTag
              label={"Password"}
              placeholder={"••••••••"}
              type={"password"}
              outlineColor={type === "seller" ? "outline-green-700" : "outline-blue-600"}
              value={formData.password}
              setFormData={setFormData}
              toUpdate={"password"}
            />

            <SubmitButton
              text={isSignInForm ? "Sign In" : "Create account"}
              bgColor={type === "seller" ? "bg-green-700" : "bg-blue-600"}
              hoverBgColor={type === "seller" ? "bg-green-600" : "bg-blue-700"}
              isLoading={isLoading}
            />
            <FormSwitch
              type={type}
              isSignInForm={isSignInForm}
              setIsSignInForm={setIsSignInForm}
            />

          </motion.form>
        </div>
      </div>
    </section>
  );
}

export default LoginAndSignup;
