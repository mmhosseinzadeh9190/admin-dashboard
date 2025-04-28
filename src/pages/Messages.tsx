import PageNotFound from "./PageNotFound";

function Messages() {
  return (
    <div className="flex h-full flex-col gap-8">
      <h1 className="text-2xl font-semibold tracking-0.1 text-gray-900">
        Messages
      </h1>

      <PageNotFound message="The Messages page is under development. Thank you for your patience!" />
    </div>
  );
}

export default Messages;
