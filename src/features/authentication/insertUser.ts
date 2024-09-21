import supabase from "../../services/supabase";

async function insertUserData(user: any) {
  const avatarPlaceholderUrl =
    "https://grrbotnrdjqbvjpugvan.supabase.co/storage/v1/object/public/avatars/user-placeholder.png";

  if (["facebook", "twitter", "github"].includes(user.app_metadata.provider)) {
    const { error } = await supabase.from("users").insert([
      {
        id: user.id,
        name: user.user_metadata.name || "Unknown",
        email: user.email,
        avatar_url: user.user_metadata.avatar_url || avatarPlaceholderUrl,
        user_roles: user.user_metadata.user_roles || ["user"],
        is_online: user.user_metadata.is_online || false,
        last_login: user.last_sign_in_at,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    ]);

    if (error) throw new Error(error.message);
  }
}

function handleAuthStateChange() {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN" && session) {
      const user = session.user;
      insertUserData(user).catch((error) => {});
    }
  });
}

export default function insertUser() {
  handleAuthStateChange();
}
