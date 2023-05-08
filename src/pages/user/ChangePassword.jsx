import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CustomInputForWorkRef from "../../components/CustomInputForwrokRef";
import * as Yup from "yup";

const validateForm = Yup.object({
  confirm_password: Yup.string().required(),
  password: Yup.string().required(),
  new_password: Yup.string().required(),
});
export default function ChangePassword() {
  const { control, handleSubmit, setError } = useForm({
    defaultValues: {
      password: "",
      confirm_password: "",
      new_password: "",
    },
    resolver: yupResolver(validateForm),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);
    } catch (error) {}
  });

  return (
    <div className="tw-rounded-sm tw-bg-white tw-px-2 tw-pb-10 tw-shadow md:tw-px-7 md:tw-pb-20">
      <div className="tw-border-b tw-border-b-gray-200 tw-py-6">
        <h1 className="tw-text-lg tw-font-medium tw-capitalize tw-text-gray-900">
          Đổi mật khẩu
        </h1>
        <div className="tw-mt-1 tw-text-sm tw-text-gray-700">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </div>
      </div>
      <form className="tw-mt-8 tw-mr-auto tw-max-w-2xl" onSubmit={onSubmit}>
        <div className="tw-mt-6 tw-flex-grow md:tw-mt-0 md:tw-pr-12">
          <div className="tw-mt-2 tw-flex tw-flex-col tw-flex-wrap sm:tw-flex-row">
            <div className="tw-truncate tw-pt-3 tw-capitalize sm:tw-w-[20%] sm:tw-text-right">
              Mật khẩu cũ
            </div>
            <div className="sm:tw-w-[80%] sm:tw-pl-5">
              <CustomInputForWorkRef
                onChange={(e) => e.target.value}
                control={control}
                name="password"
                type="password"
                placeholder="Mật khẩu cũ"
              />
            </div>
          </div>
          <div className="tw-mt-2 tw-flex tw-flex-col tw-flex-wrap sm:tw-flex-row">
            <div className="tw-truncate tw-pt-3 tw-capitalize sm:tw-w-[20%] sm:tw-text-right">
              Mật khẩu mới
            </div>
            <div className="sm:tw-w-[80%] sm:tw-pl-5">
              <CustomInputForWorkRef
                onChange={(e) => e.target.value}
                control={control}
                name="new_password"
                type="password"
                placeholder="Mật khẩu mới"
              />
            </div>
          </div>
          <div className="tw-mt-2 tw-flex tw-flex-col tw-flex-wrap sm:tw-flex-row">
            <div className="tw-truncate tw-pt-3 tw-capitalize sm:tw-w-[20%] sm:tw-text-right">
              Nhập lại mật khẩu
            </div>
            <div className="sm:tw-w-[80%] sm:tw-pl-5">
              <CustomInputForWorkRef
                onChange={(e) => e.target.value}
                control={control}
                name="confirm_password"
                type="password"
                placeholder="Nhập lại mật khẩu"
              />
            </div>
          </div>
          <div className="tw-mt-2 tw-flex tw-flex-col tw-flex-wrap sm:tw-flex-row">
            <div className="tw-truncate tw-pt-3 tw-capitalize sm:tw-w-[20%] sm:tw-text-right" />
            <div className="sm:tw-w-[80%] sm:tw-pl-5">
              <button className="button" type="submit">
                Lưu
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
