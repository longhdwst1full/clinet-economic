import React, { useCallback, useEffect, useMemo, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { useForm } from "react-hook-form";
import CustomInputForWorkRef from "../../components/CustomInputForwrokRef";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import {
  getUserFromLS,
  useGetProdfileQuery,
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
} from "../../features/user/userSlice";
import * as Yup from "yup";
import InputFile from "../../components/InputFile";
import { useMatch } from "react-router-dom";

const profileSchema = Yup.object({
  name: Yup.string().required("Bạn không được để trống"),

  mobile: Yup.string().required("Bạn không được để trống"),
  address: Yup.string().required("Bạn không được để trống"),
});

export default function MyProfile() {
  const [file, setFile] = useState();
  // const pageProfile = useMatch("user/my-profile");
  // const isPageEditUser = Boolean(pageProfile);
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : "";
  }, [file]);

  const { data: profile } = useGetProdfileQuery();
  const userLS = getUserFromLS();
  useMemo(() => {
    localStorage.setItem(
      "customer",
      JSON.stringify({
        ...userLS,
        mobile: profile?.mobile,
        name: profile?.name,
        avatar: profile?.avatar,
      })
    );
  }, [userLS, profile]);

  const [updateProfileMutationFN, updateUserRes] = useUpdateProfileMutation();

  const [uploadAvatarMutaionFn, uploadAvatarRes] = useUpdateAvatarMutation();

  const { handleSubmit, control, reset, setValue, watch } = useForm({
    defaultValues: {
      name: "",
      mobile: "",
      address: "",
    },
    resolver: yupResolver(profileSchema),
  });

  const avatar = watch("avatar");

  useEffect(() => {
    reset();
    if (profile) {
      setValue("name", profile.name);
      setValue("mobile", profile.mobile);
      setValue("address", profile.address);
      setValue("avatar", profile?.avatar ? profile.avatar[0].url : "");
    }
  }, [profile, reset, setValue]);

  const processOnSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar;
      if (file) {
        const form = new FormData();
        form.append("images", file);
        await uploadAvatarMutaionFn(form);
      }
      if (uploadAvatarRes?.data) {
        avatarName = uploadAvatarRes?.data[0].url;
      }
      console.log("form data", data);
      await updateProfileMutationFN({
        ...data,
        avatar: avatarName,
      });
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  });

  useEffect(() => {
    if (updateUserRes.isSuccess) {
      toast.success("Cập nhập tài khoản thành công");
    }
    if (!updateUserRes.isError) {
      toast.error("SĐT Đã chùng với ai đó ");
    }
  }, [updateUserRes.isError, updateUserRes.isSuccess]);
  useEffect(() => {
    if (uploadAvatarRes.data) {
      setValue("avatar", uploadAvatarRes.data[0].url);
    }
  }, [setValue, uploadAvatarRes.data]);

  const handleChangeFile = (file) => {
    setFile(file);
  };

  return (
    <div>
      <BreadCrumb title="My Profile" />
      <div className="tw-rounded-sm tw-bg-white tw-px-2 tw-pb-10 tw-shadow md:tw-px-7 md:tw-pb-20">
        <div className="tw-border-b tw-border-b-gray-200 tw-py-6">
          <h1 className="tw-text-lg tw-font-medium tw-capitalize tw-text-gray-900">
            Hồ Sơ Của Tôi
          </h1>
          <div className="tw-mt-1 tw-text-sm tw-text-gray-700">
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </div>
        </div>

        <form
          className="tw-mt-8 tw-flex tw-flex-col-reverse md:tw-flex-row md:tw-items-start"
          onSubmit={processOnSubmit}
        >
          <div className="tw-mt-6 tw-flex-grow md:tw-mt-0 md:tw-pr-12">
            <div className="tw-flex tw-flex-col tw-flex-wrap tw-items-center sm:tw-flex-row">
              <div className="tw-truncate tw-pt-3 tw-capitalize sm:tw-w-[20%] sm:tw-text-right">
                Email
              </div>
              <div className="sm:tw-w-[80%] sm:tw-pl-5">
                <div className="tw-pt-3 tw-text-gray-700 tw-text-base">
                  {profile?.email}
                </div>
              </div>
            </div>

            <div className="tw-mt-6 tw-flex tw-flex-col tw-flex-wrap sm:tw-flex-row">
              <div className="tw-truncate tw-pt-3 tw-capitalize sm:tw-w-[20%] sm:tw-text-right">
                Tên
              </div>
              <div className="sm:tw-w-[80%] sm:tw-pl-5">
                <CustomInputForWorkRef
                  name="name"
                  type="text"
                  onChange={(e) => e.target.value}
                  control={control}
                  placeholder="Tên"
                />
              </div>
            </div>
            <div className="tw-mt-2 tw-flex tw-flex-col tw-flex-wrap sm:tw-flex-row">
              <div className="tw-truncate tw-pt-3 tw-capitalize sm:tw-w-[20%] sm:tw-text-right">
                Số điện thoại
              </div>
              <div className="sm:tw-w-[80%] sm:tw-pl-5">
                <CustomInputForWorkRef
                  placeholder="Số điện thoại"
                  name="mobile"
                  type="text"
                  onChange={(e) => e.target.value}
                  control={control}
                />
              </div>
            </div>

            <div className="tw-mt-6 tw-flex tw-flex-col tw-flex-wrap sm:tw-flex-row">
              <div className="tw-truncate tw-pt-3 tw-capitalize sm:tw-w-[20%] sm:tw-text-right">
                Địa chỉ
              </div>
              <div className="sm:tw-w-[80%] sm:tw-pl-5">
                <CustomInputForWorkRef
                  placeholder="Địa chỉ"
                  name="address"
                  type="text"
                  onChange={(e) => e.target.value}
                  control={control}
                />
              </div>
            </div>

            <div className="tw-mt-2 tw-flex tw-flex-col tw-flex-wrap sm:tw-flex-row">
              <div className="tw-truncate tw-pt-3 tw-capitalize sm:tw-w-[20%] sm:tw-text-right" />
              <div className="sm:tw-w-[80%] sm:tw-pl-5">
                <button
                  className={`button tw-mt-2 ${
                    updateUserRes.isLoading ? " tw-cursor-not-allowed" : " "
                  }`}
                  type="submit"
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
          <div className="tw-flex tw-justify-center md:tw-w-72 md:tw-border-l md:tw-border-l-gray-200">
            <div className="tw-flex tw-flex-col tw-items-center">
              <div className="tw-my-5 tw-h-24 tw-w-24">
                <img
                  src={previewImage}
                  alt=""
                  className="tw-h-full tw-w-full tw-rounded-full tw-object-cover"
                />
              </div>
              <InputFile onChange={handleChangeFile} />

              <div className="tw-mt-3 tw-text-gray-400">
                <div>Dụng lượng file tối đa 1 MB</div>
                <div>Định dạng:.JPEG, .PNG</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
