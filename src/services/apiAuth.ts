import supabase from "./supabase";

interface signInWithPasswordProps {
  email: string;
  password: string;
}

export const signInWithPassword = async ({
  email,
  password,
}: signInWithPasswordProps) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
};

interface signUpWithPasswordProps {
  email: string;
  password: string;
  name: string;
}

export const signUpWithPassword = async ({
  email,
  password,
  name,
}: signUpWithPasswordProps) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name,
        avatar_url:
          "https://grrbotnrdjqbvjpugvan.supabase.co/storage/v1/object/public/avatars/user-placeholder.png",
        is_online: false,
        user_roles: ["user"],
      },
    },
  });

  if (error) throw new Error(error.message);

  const { error: insertUserError } = await supabase.from("users").insert([
    {
      id: data.user?.id,
      name: data.user?.user_metadata.name,
      email: data.user?.email,
      avatar_url: data.user?.user_metadata.avatar_url,
      user_roles: data.user?.user_metadata.user_roles,
      is_online: data.user?.user_metadata.is_online,
      last_login: data.user?.last_sign_in_at,
      created_at: data.user?.created_at,
      updated_at: data.user?.updated_at,
    },
  ]);

  if (insertUserError) throw new Error(insertUserError.message);

  return data;
};

export const signInWithFacebook = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo: "https://grrbotnrdjqbvjpugvan.supabase.co/auth/v1/callback",
    },
  });

  if (error) throw new Error(error.message);

  return data;
};

export const signInWithTwitter = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "twitter",
    options: {
      redirectTo: "https://grrbotnrdjqbvjpugvan.supabase.co/auth/v1/callback",
    },
  });

  if (error) throw new Error(error.message);

  return data;
};

export const signInWithGitHub = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "https://grrbotnrdjqbvjpugvan.supabase.co/auth/v1/callback",
    },
  });

  if (error) throw new Error(error.message);

  return data;
};

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
};
