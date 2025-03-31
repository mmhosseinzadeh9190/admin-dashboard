type Props = {};

function ContactUs({}: Props) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-3xl border border-gray-200 bg-gray-100">
      <div className="flex items-center justify-between px-5 pt-4">
        <h2 className="font-semibold capitalize tracking-0.1 text-gray-700">
          Contact Us
        </h2>
      </div>

      <div className="px-1.5 pb-1.5">
        <div className="flex flex-col gap-6 rounded-3xl bg-white p-4"></div>
      </div>
    </div>
  );
}

export default ContactUs;
