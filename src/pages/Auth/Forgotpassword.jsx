import React, { useEffect } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useForgotPasswordMutation } from "../../features/user/userSlice";
import CustomInputForWorkRef from "../../components/CustomInputForwrokRef";

const validateForm = Yup.object({
  email: Yup.string().email().required(),
});
const Forgotpassword = () => {
  
  const [forgetpasswordFN, forgetpasswordRes] = useForgotPasswordMutation();
  
  const { isError, data: token, isSuccess } = forgetpasswordRes;

  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(validateForm),
  });
  const proccessSubmitForm = async (data) => {
    try {
      await forgetpasswordFN(data);
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    if (forgetpasswordRes && isSuccess) {
      toast.success(forgetpasswordRes?.data?.message);
      setTimeout(() => {
        alert("Mã token gửi về email Bạn. Chỉ có hiệu lực trong 10 phút");
      }, 100);
    }
    if (forgetpasswordRes && isError) {
      if (forgetpasswordRes.error?.status === 500) {
        toast.error(forgetpasswordRes.error.data.message);
      }
    }
  }, [forgetpasswordRes, isSuccess, isError]);
  return (
    <>
      <Meta title={"Forgot Password"} />
      <BreadCrumb title="Forgot Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Your Password</h3>
              <p className="text-center mt-2 mb-3">
                We will send you an email to reset your password
              </p>
              <form
                onSubmit={handleSubmit(proccessSubmitForm)}
                className="d-flex flex-column gap-15"
              >
                <CustomInputForWorkRef
                  type="email"
                  onChange={(e) => e.target.value}
                  control={control}
                  name="email"
                  placeholder="Email"
                />

                <div>
                  <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Submit
                    </button>
                    <Link to="/login">Cancel</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Forgotpassword;
