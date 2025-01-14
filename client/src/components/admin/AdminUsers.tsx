import { useCallback, useEffect, useState } from "react";
import { getUsers } from "../../api/auth";
import Delete from "../../assets/delete.png";
import DeleteUser from "./DeleteUser";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    if (!showDeleteModal) getAllUsers();
  }, [showDeleteModal]);

  const getAllUsers = async () => {
    try {
      const items = await getUsers();
      const { users } = items.data;
      setUsers(users);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id: string) => {
    setId(id);
    setShowDeleteModal(true);
  };

  const reset = useCallback(() => setId(""), []);

  return (
    <>
      {showDeleteModal && (
        <DeleteUser
          open={showDeleteModal}
          showModal={setShowDeleteModal}
          reset={reset}
          id={id}
        />
      )}
      <div className="flex flex-col flex-1 gap-4 px-6 py-4 overflow-y-auto md:py-7 md:pb-4 md:gap-6">
        <div>
          <h1 className="text-xl font-semibold underline md:text-3xl md:font-bold md:block">
            Users in Farmlytics
          </h1>
        </div>
        <div className="flex-1 px-8 py-8 overflow-auto rounded-md shadow-card">
          <table className="w-full table-auto">
            <thead className="text-xl">
              <tr>
                <th className="px-4 text-left">S.No</th>
                <th className="px-4 text-left">User Name</th>
                <th className="px-4 text-left">Email</th>
                <th className="px-4 text-left">Role</th>
                <th className="px-4 text-left center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-base">
              {users?.map(({ userName, email, role, _id }, index) => (
                <tr
                  key={_id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "" : "",
                  }}
                >
                  <td className="px-4 py-2">{index + 1} .</td>
                  <td className="px-4 py-2">{userName}</td>
                  <td className="px-4 py-2">{email}</td>
                  <td className="px-4 py-2">{role}</td>
                  <td className="px-4 py-2 center">
                    <img
                      src={Delete}
                      alt="delete user"
                      className="cursor-pointer size-5"
                      onClick={() => handleDelete(_id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
