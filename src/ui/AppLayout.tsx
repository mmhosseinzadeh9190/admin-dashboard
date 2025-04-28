import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";
import { useUsers } from "../features/dashboard/useUsers";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { User } from "../services/apiUsers";
import { insertUser } from "../services/apiAuth";

function AppLayout() {
  const {
    users,
    isLoading: usersIsLoading,
    error: usersError,
    refetch: usersRefetch,
  } = useUsers();

  const { user: supabaseUser, isLoading: userIsLoading } = useUser();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isInsertingUser, setIsInsertingUser] = useState(false);

  useEffect(() => {
    const handleUserSync = async () => {
      if (!supabaseUser || usersIsLoading || userIsLoading) return;

      const foundUser = users?.data?.find(
        (user) => String(user.id) === supabaseUser.id,
      );

      if (foundUser) {
        setCurrentUser(foundUser);
        return;
      }

      if (!isInsertingUser) {
        const providers = ["facebook", "twitter", "github"];
        const condition = providers.includes(
          supabaseUser.app_metadata.provider!,
        );

        if (condition) {
          try {
            setIsInsertingUser(true);
            const insertedUser = await insertUser(supabaseUser);
            if (insertedUser && insertedUser[0]) {
              setCurrentUser(insertedUser[0]);
              usersRefetch();
            }
          } catch (error) {
            console.error(error);
            return;
          } finally {
            setIsInsertingUser(false);
          }
        }
      }
    };

    handleUserSync();
  }, [
    supabaseUser,
    users?.data,
    usersIsLoading,
    userIsLoading,
    isInsertingUser,
    usersRefetch,
  ]);

  if (usersIsLoading || userIsLoading || isInsertingUser) {
    return (
      <div className="h-dvh w-dvw">
        <Spinner />
      </div>
    );
  }

  return (
    currentUser && (
      <div className="grid h-dvh grid-cols-[max-content_1fr] grid-rows-[auto_1fr]">
        <Header user={currentUser} />
        <Sidebar />
        <Main />
      </div>
    )
  );
}

export default AppLayout;
