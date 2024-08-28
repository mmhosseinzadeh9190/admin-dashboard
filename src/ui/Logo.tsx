function Logo() {
  const src = "/public/logo.svg";

  return (
    <div className="flex justify-center">
      <img src={src} alt="Logo of Hollow dashboard" className="w-32" />
    </div>
  );
}

export default Logo;
