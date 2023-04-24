import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import Container from "../components/Container";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useRegisterUserMutation } from "../features/user/userSlice";
import CustomInputForWorkRef from "../components/CustomInputForwrokRef";
import { useCreateContactEnquiryMutation } from "../features/contact/contactSlice";

const validateForm = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  mobile: Yup.number().nullable().required(),
  comment: Yup.string().nullable().required(),
});
const Contact = () => {
  const [createContactEnquiryMutationFn, createContactEnquiryMutationRs] =
    useCreateContactEnquiryMutation();
  const { isError, isSuccess, isLoading } = createContactEnquiryMutationRs;
  // console.log(createContactEnquiryMutationRs);
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    control,
  } = useForm({
    defaultValues: {
      email: "",
      comment: "",
      mobile: "",
      name: "",
    },
    resolver: yupResolver(validateForm),
  });

  const proccessSubmitForm = async (data) => {
    try {
      console.log(data);
      await createContactEnquiryMutationFn(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isError === false && isSuccess) {
      toast.success("Contact Form submit successfully");
      reset();
    }
    if (createContactEnquiryMutationRs?.error) {
      toast.error(createContactEnquiryMutationRs.error.data.message);
    }
  }, [createContactEnquiryMutationRs.error, isError, isSuccess, reset]);
  return (
    <>
      <Meta title={"Contact Us"} />
      <BreadCrumb title="Contact Us" />
      <Container class1="contact-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d476861.53863139584!2d105.32232627263943!3d20.97335680339659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135008e13800a29%3A0x2987e416210b90d!2zSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1682353978703!5m2!1svi!2s"
              width="100%"
              height={450}
              className="border-0 w-100"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6986.771103663534!2d76.99275607711007!3d28.886888929272477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390da5e51463d4c9%3A0xe5a485e2ac7c3d4a!2sMandaura%2C%20Haryana%20131103!5e0!3m2!1sen!2sin!4v1669909087902!5m2!1sen!2sin"
              width="600"
              height="450"
              className="border-0 w-100"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe> */}
          </div>
          <div className="col-12 mt-5">
            <div className="contact-inner-wrapper d-flex justify-content-between ">
              <div>
                <h3 className="contact-title mb-4">Contact</h3>

                <form
                  onSubmit={handleSubmit(proccessSubmitForm)}
                  className="d-flex flex-column gap-15"
                >
                  <CustomInputForWorkRef
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={(e) => e.target.value}
                    control={control}
                  />
                  <CustomInputForWorkRef
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={(e) => e.target.value}
                    control={control}
                  />
                  <CustomInputForWorkRef
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number"
                    onChange={(e) => e.target.value}
                    control={control}
                  />

                  <div>
                    <textarea
                      {...register("comment")}
                      className="w-100 form-control"
                      cols="30"
                      rows="4"
                      placeholder="Comments"
                    ></textarea>
                    <div className="error">{errors?.comment?.message}</div>
                  </div>
                  <div>
                    <button className="button border-0">Submit</button>
                  </div>
                </form>
              </div>
              <div>
                <h3 className="contact-title mb-4">Get in touch with us</h3>
                <div>
                  <ul className="ps-0">
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <AiOutlineHome className="fs-5" />
                      <address className="mb-0">
                        Hno:277 , Near village chopal , Mandaura, Sonipat,
                        Haryana
                      </address>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <BiPhoneCall className="fs-5" />
                      <a href="tel:+91 8264954234">+91 8264954234</a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <AiOutlineMail className="fs-5" />
                      <a href="mailto:navdeepdahiya753@gmail.com">
                        navdeepdahiya753@gmail.com
                      </a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <BiInfoCircle className="fs-5" />
                      <p className="mb-0">Monday – Friday 10 AM – 8 PM</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Contact;
