import React, { Fragment, useEffect, useMemo, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import CustomInputForWorkRef from "../../components/CustomInputForwrokRef";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import {
  useGetProdfileQuery,
  useUpdateProfileMutation,
} from "../../features/user/userSlice";

function Info() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Fragment>
      <div className="tw-mt-6 tw-flex tw-flex-col tw-flex-wrap sm:tw-flex-row">
        <div className="tw-truncate tw-pt-3 tw-capitalize sm:tw-w-[20%] sm:tw-text-right">
          Tên
        </div>
        <div className="sm:tw-w-[80%] sm:tw-pl-5">
          <CustomInputForWorkRef
            register={register}
            name="name"
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
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <CustomInputForWorkRef
                placeholder="Số điện thoại"
                errorMessage={errors.phone?.message}
                {...field}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
    </Fragment>
  );
}
export default function MyProfile() {
  const [file, setFile] = useState();

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : "";
  }, [file]);

  const { data: profileData } = useGetProdfileQuery();
  const profile = profileData?.data.data;
  const updateProfileMutation = useUpdateProfileMutation();
  const uploadAvatarMutaion = useMutation(userApi.uploadAvatar);
  const methods = useForm({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      avatar: "",
      date_of_birth: new Date(1990, 0, 1),
    },
    resolver: yupResolver(profileSchema),
  });
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    setError,
  } = methods;

  const avatar = watch("avatar");

  useEffect(() => {
    if (profile) {
      setValue("name", profile.name);
      setValue("phone", profile.phone);
      setValue("address", profile.address);
      setValue("avatar", profile.avatar);
      setValue(
        "date_of_birth",
        profile.date_of_birth
          ? new Date(profile.date_of_birth)
          : new Date(1990, 0, 1)
      );
    }
  }, [profile, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar;
      if (file) {
        const form = new FormData();
        form.append("image", file);
        const uploadRes = await uploadAvatarMutaion.mutateAsync(form);
        avatarName = uploadRes.data.data;
        setValue("avatar", avatarName);
      }

      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName,
      });
      setProfile(res.data.data);
      setProfileToLS(res.data.data);

      toast.success(res.data.message);
    } catch (error) {}
  });

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
        <FormProvider {...methods}>
          <form
            className="tw-mt-8 tw-flex tw-flex-col-reverse md:tw-flex-row md:tw-items-start"
            onSubmit={onSubmit}
          >
            <div className="tw-mt-6 tw-flex-grow md:tw-mt-0 md:tw-pr-12">
              <div className="tw-flex tw-flex-col tw-flex-wrap sm:tw-flex-row">
                <div className="tw-truncate tw-pt-3 tw-capitalize sm:tw-w-[20%] sm:tw-text-right">
                  Email
                </div>
                <div className="sm:tw-w-[80%] sm:pl-5">
                  <div className="tw-pt-3 tw-text-gray-700">
                    {profile?.email}
                  </div>
                </div>
              </div>
              <Info />
              <div className="tw-mt-2 tw-flex tw-flex-col tw-flex-wrap sm:tw-flex-row">
                <div className="tw-truncate tw-pt-3 tw-capitalize sm:tw-w-[20%] sm:tw-text-right">
                  Địa chỉ
                </div>
                <div className="sm:tw-w-[80%] sm:pl-5">
                  <CustomInputForWorkRef
                    onChange={(e) => e.target.value}
                    control={control}
                    name="address"
                    placeholder="Địa chỉ"
                  />
                </div>
              </div>
              <Controller
                control={control}
                name="date_of_birth"
                render={({ field }) => (
                  <DateSelect
                    errorMessage={errors.date_of_birth?.message}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <div className="tw-mt-2 tw-flex tw-flex-col tw-flex-wrap sm:tw-flex-row">
                <div className="tw-truncate tw-pt-3 tw-capitalize sm:tw-w-[20%] sm:tw-text-right" />
                <div className="sm:tw-w-[80%] sm:tw-pl-5">
                  <button className="btn" type="submit">
                    Lưu
                  </button>
                </div>
              </div>
            </div>
            <div className="tw-flex tw-justify-center md:tw-w-72 md:tw-border-l md:tw-border-l-gray-200">
              <div className="tw-flex tw-flex-col tw-items-center">
                <div className="tw-my-5 tw-h-24 tw-w-24">
                  <img
                    src={previewImage || getAvatarUrl(avatar)}
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
        </FormProvider>
      </div>
    </div>
  );
}
