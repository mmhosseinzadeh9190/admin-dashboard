import { Toaster } from "react-hot-toast";

function CustomizedToaster() {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{ margin: "8px" }}
      toastOptions={{
        success: {
          duration: 3000,
          iconTheme: {
            primary: "#22c55e",
            secondary: "#f0fdf5",
          },
        },
        error: {
          duration: 5000,
          iconTheme: {
            primary: "#ff3333",
            secondary: "#fff1f1",
          },
        },
        style: {
          maxWidth: "30rem",
          padding: "0.75rem 1rem",
          backgroundColor: "#FAFAFB",
          color: "#44444F",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        },
        className: "font-roboto text-base tracking-0.1",
      }}
    />
  );
}

export default CustomizedToaster;