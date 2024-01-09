import UsersList from "../components/UsersList";

const Users = () => {
  const UserList = [
    {
      id: "u2",
      name: "Dev",
      image:
        "https://www.archiefoundationhome.org.uk/wp-content/uploads/2020/05/profile-photo-social-media.jpg",
      places: 3,
    },
  ];
  return (
    <div>
      <UsersList items={UserList} />
    </div>
  );
};
export default Users;
