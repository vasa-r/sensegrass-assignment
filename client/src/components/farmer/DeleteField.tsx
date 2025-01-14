import { Dispatch, SetStateAction, useState } from "react";
import CustomModal from "../sharedComp/CustomModal";
import { toast } from "react-toastify";
import { deleteField } from "../../api/field";
import Loader from "../Loaders/Loader";

interface DeleteFieldProp {
  showModal: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  id?: string;
  reset: () => void | undefined;
}

const DeleteField = ({ showModal, open, id, reset }: DeleteFieldProp) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteFieldData();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      reset();
      showModal(false);
    }
  };
  const deleteFieldData = async () => {
    try {
      const response = await deleteField(id!);

      if (response.success || response.status === 200) {
        toast.success(response?.data?.message);
      } else {
        toast.error(
          response?.data?.message ||
            "Couldn't delete Field data. Please try again later"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "An error occurred during deleting field. Please try again later."
      );
    }
  };
  return (
    <CustomModal setModal={showModal} showModal={open}>
      <div className="flex flex-col items-center gap-6 mt-3">
        <h1 className="text-2xl font-medium">Are you sure want to delete?</h1>
        {isLoading && <Loader width="24px" height="24px" />}
        <div className="flex items-center w-full gap-4">
          <button
            className="flex-1 px-4 py-3 border rounded-md"
            onClick={() => showModal(false)}
          >
            Cancel
          </button>
          <button
            className="flex-1 px-4 py-3 bg-red-500 border rounded-md"
            onClick={() => handleDelete()}
          >
            Delete
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default DeleteField;
