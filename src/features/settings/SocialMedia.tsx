function SocialMedia() {
  const socialMediaList = [
    {
      name: "github",
      image: "/src/assets/github.svg",
      link: "https://github.com/mmhosseinzadeh9190",
      className:
        "border-[#1B1F24]/15 bg-[#1B1F24]/10 text-[#1B1F24] hover:bg-[#1B1F24]/15",
    },
    {
      name: "linkedin",
      image: "/src/assets/linkedin.svg",
      link: "https://www.linkedin.com/in/mohammadmahdi-hossinzadeh",
      className:
        "border-[#0A66C2]/15 bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/15",
    },
    {
      name: "telegram",
      image: "/src/assets/telegram.svg",
      link: "https://t.me/mmhosseinzadeh9190",
      className:
        "border-[#229ED9]/15 bg-[#229ED9]/10 text-[#229ED9] hover:bg-[#229ED9]/15",
    },
    {
      name: "instagram",
      image: "/src/assets/instagram.svg",
      link: "https://www.instagram.com/hossein_h.z.9190",
      className:
        "border-[#EA335C]/15 bg-[#EA335C]/10 text-[#EA335C] hover:bg-[#EA335C]/15",
    },
    {
      name: "x",
      image: "/src/assets/x.svg",
      link: "https://x.com/HOSSEIN_HZ9190",
      className:
        "border-[#000000]/15 bg-[#000000]/10 text-[#000000] hover:bg-[#000000]/15",
    },
    {
      name: "facebook",
      image: "/src/assets/facebook.svg",
      link: "https://www.facebook.com/hosseinzadeh9190",
      className:
        "border-[#0866FF]/15 bg-[#0866FF]/10 text-[#0866FF] hover:bg-[#0866FF]/15",
    },
    {
      name: "gmail",
      image: "/src/assets/gmail.svg",
      link: "mailto:mohammadmahdihosseinzadeh68@gmail.com",
      className:
        "border-[#EA4335]/15 bg-[#EA4335]/10 text-[#EA4335] hover:bg-[#EA4335]/15",
    },
  ];

  return (
    <div className="flex w-full flex-col gap-4 rounded-3xl border border-gray-200 bg-gray-100">
      <div className="flex items-center justify-between px-5 pt-4">
        <h2 className="font-semibold capitalize tracking-0.1 text-primary-800">
          Hollow Social Media
        </h2>
      </div>

      <div className="px-1.5 pb-1.5">
        <div className="flex gap-3 rounded-3xl bg-white p-4">
          {socialMediaList.map((socialMedia) => (
            <a
              key={socialMedia.name}
              target="_blank"
              href={socialMedia.link}
              className={`${socialMedia.className} flex cursor-pointer items-center justify-center gap-2 rounded-lg border px-3.5 py-2.5 focus:outline-none`}
            >
              <img src={socialMedia.image} alt="" className="h-5" />
              <span className="text-sm font-medium capitalize tracking-0.1">
                {socialMedia.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SocialMedia;
