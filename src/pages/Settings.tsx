import SettingsItems from "../features/settings/SettingsItems";

function Settings() {
  return (
    <div className="flex h-full flex-col gap-8">
      <h1 className="text-2xl font-semibold tracking-0.1 text-gray-900">
        Settings
      </h1>

      <SettingsItems />
    </div>
  );
}

export default Settings;
