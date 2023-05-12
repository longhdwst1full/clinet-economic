import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "../../components/Container";
import CustomInput from "../../components/CustomInput";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useForgotPasswordMutation,
  useForgotPasswordResetMutation,
} from "../../features/user/userSlice";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CustomInputForWorkRef from "../../components/CustomInputForwrokRef";

const validateForm = Yup.object({
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password")]),
});
const Resetpassword = () => {
  const { token } = useParams();

  const navigate = useNavigate();
  const [forgetpasswordResetFN, forgetpasswordResetRes] =
    useForgotPasswordResetMutation();
  
  const { isError, data, isSuccess } = forgetpasswordResetRes;

  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(validateForm),
  });
  const proccessSubmitForm = async (data) => {
    try {
      const result = await forgetpasswordResetFN(data, token);

      if (result.error?.status === 500) {
        toast.error(result.error.data.message);
      }

      if (result && isSuccess) {
        navigate(`/login`);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <Meta title={"Reset Password"} />
      <BreadCrumb title="Reset Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Password</h3>
              <form
                onSubmit={handleSubmit(proccessSubmitForm)}
                className="d-flex flex-column gap-15"
              >
                <CustomInputForWorkRef
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => e.target.value}
                  control={control}
                />
                <CustomInputForWorkRef
                  type="password"
                  name="confpassword"
                  placeholder="Confirm Password"
                  onChange={(e) => e.target.value}
                  control={control}
                />
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button type="submit" className="button border-0">
                      Ok
                    </button>
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

export default Resetpassword;
