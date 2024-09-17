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
  console.log(data);

  if (error) throw new Error(error.message);

  return data?.user;
};
