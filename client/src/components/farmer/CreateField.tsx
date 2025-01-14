import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Modal from "../sharedComp/Modal";
import Input from "../sharedComp/Input";
import validateNewField from "../../validations/validateNewField";
import { createField, getField, updateField } from "../../api/field";
import { toast } from "react-toastify";
import Loader from "../Loaders/Loader";

export interface FieldType {
  fieldName: string;
  location: string;
  latitude: string;
  longitude: string;
  cropType: string;
  fieldArea: string;
  plantingDate: string;
  harvestingDate: string;
  soilType: string;
  inputCost: string;
  revenue: string;
  cropHealth: string;
}

interface CreateFieldProps {
  showModal: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  id?: string;
  reset?: () => void | undefined;
}

const CreateField = ({ showModal, open, id, reset }: CreateFieldProps) => {
  const initialData: FieldType = {
    fieldName: "",
    location: "",
    latitude: "",
    longitude: "",
    cropType: "",
    fieldArea: "",
    plantingDate: "",
    harvestingDate: "",
    soilType: "",
    inputCost: "",
    revenue: "",
    cropHealth: "",
  };

  const [fieldData, setFieldData] = useState<FieldType>(initialData);
  const [formErrors, setFormErrors] = useState<Partial<FieldType>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id) getSingleField();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFieldData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateNewField(fieldData);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        if (id) {
          await changeFieldData();
        } else {
          await newField();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please ensure valid info is given");
    }
  };

  const getSingleField = async () => {
    try {
      setIsLoading(true);
      const items = await getField(id!);
      const { fields } = items.data;
      setFieldData(fields);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const newField = async () => {
    try {
      const response = await createField(
        fieldData.fieldName,
        fieldData.location,
        fieldData.latitude,
        fieldData.longitude,
        fieldData.cropType,
        fieldData.fieldArea,
        fieldData.plantingDate,
        fieldData.harvestingDate,
        fieldData.soilType,
        fieldData.inputCost,
        fieldData.revenue,
        fieldData.cropHealth
      );

      if (response.success || response.status === 201) {
        toast.success(response?.data?.message);
        setFieldData(initialData);
        showModal(false);
      } else {
        toast.error(
          response?.data?.message ||
            "Couldn't create field. Please try again later"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "An error occurred during creating field. Please try again later."
      );
    }
  };

  const changeFieldData = async () => {
    try {
      const response = await updateField(
        id!,
        fieldData.fieldName,
        fieldData.location,
        fieldData.latitude,
        fieldData.longitude,
        fieldData.cropType,
        fieldData.fieldArea,
        fieldData.plantingDate,
        fieldData.harvestingDate,
        fieldData.soilType,
        fieldData.inputCost,
        fieldData.revenue,
        fieldData.cropHealth
      );

      if (response.success || response.status === 201) {
        toast.success(response?.data?.message);
        setFieldData(initialData);
        showModal(false);
        if (reset) reset();
      } else {
        toast.error(
          response?.data?.message ||
            "Couldn't create field. Please try again later"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "An error occurred during creating field. Please try again later."
      );
    }
  };

  return (
    <Modal setModal={showModal} showModal={open}>
      <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
        {/* Field Name and location */}
        <div className="flex gap-4">
          <div className="flex flex-col w-full">
            <Input
              name="fieldName"
              label="Field Name"
              type="text"
              value={fieldData.fieldName}
              placeholder="Enter field name"
              onChange={handleChange}
            />
            {formErrors.fieldName && (
              <p className="xs-error">{formErrors.fieldName}</p>
            )}
          </div>
          <div className="flex flex-col w-full">
            <Input
              name="location"
              label="Location"
              type="text"
              value={fieldData.location}
              placeholder="Enter location"
              onChange={handleChange}
            />
            {formErrors.location && (
              <p className="xs-error">{formErrors.location}</p>
            )}
          </div>
        </div>
        {/* Latitude and Longitude */}
        <div className="flex gap-4">
          <div className="flex flex-col w-full">
            <Input
              name="latitude"
              label="Latitude"
              type="text"
              value={fieldData.latitude}
              placeholder="Enter the latitude (e.g., 34.0522)"
              onChange={handleChange}
            />
            {formErrors.latitude && (
              <p className="xs-error">{formErrors.latitude}</p>
            )}
          </div>

          <div className="flex flex-col w-full">
            <Input
              name="longitude"
              label="Longitude"
              type="text"
              value={fieldData.longitude}
              placeholder="Enter the longitude (e.g., -118.2437)"
              onChange={handleChange}
            />
            {formErrors.longitude && (
              <p className="xs-error">{formErrors.longitude}</p>
            )}
          </div>
        </div>
        {/* Planting Date and Harvesting Date */}
        <div className="flex gap-4">
          <div className="flex flex-col w-full">
            <Input
              name="plantingDate"
              label="Planting Date"
              type="date"
              value={fieldData.plantingDate}
              onChange={handleChange}
              placeholder="Choose planting date"
            />
            {formErrors.plantingDate && (
              <p className="xs-error">{formErrors.plantingDate}</p>
            )}
          </div>
          <div className="flex flex-col w-full">
            <Input
              name="harvestingDate"
              label="Harvesting Date"
              type="date"
              value={fieldData.harvestingDate}
              onChange={handleChange}
              placeholder="Choose harvesting date"
            />
            {formErrors.harvestingDate && (
              <p className="xs-error">{formErrors.harvestingDate}</p>
            )}
          </div>
        </div>
        {/* cropType and field area */}
        <div className="flex gap-4">
          <div className="flex flex-col w-full">
            <Input
              name="cropType"
              label="Crop Type"
              type="text"
              value={fieldData.cropType}
              placeholder="Enter the type of crop (e.g., Wheat)"
              onChange={handleChange}
            />
            {formErrors.cropType && (
              <p className="xs-error">{formErrors.cropType}</p>
            )}
          </div>
          <div className="flex flex-col w-full">
            <Input
              name="fieldArea"
              label="Field Area"
              type="text"
              value={fieldData.fieldArea}
              placeholder="Enter the field area (e.g., 1.5 acres)"
              onChange={handleChange}
            />
            {formErrors.fieldArea && (
              <p className="xs-error">{formErrors.fieldArea}</p>
            )}
          </div>
        </div>
        {/* input cost and revenue */}
        <div className="flex gap-4">
          <div className="flex flex-col w-full">
            <Input
              name="inputCost"
              label="Input Cost (₹)"
              type="text"
              value={fieldData.inputCost}
              placeholder="Enter input cost (e.g., 50000)"
              onChange={handleChange}
            />
            {formErrors.inputCost && (
              <p className="xs-error">{formErrors.inputCost}</p>
            )}
          </div>
          <div className="flex flex-col w-full">
            <Input
              name="revenue"
              label="Revenue (₹)"
              type="text"
              value={fieldData.revenue}
              placeholder="Enter revenue (e.g., 100000)"
              onChange={handleChange}
            />
            {formErrors.revenue && (
              <p className="xs-error">{formErrors.revenue}</p>
            )}
          </div>
        </div>
        {/* soil type and crop health */}
        <div className="flex gap-4">
          <div className="flex flex-col w-full">
            <Input
              name="soilType"
              label="Soil Type"
              type="text"
              value={fieldData.soilType}
              placeholder="Enter the soil type (e.g., Loamy,clay,black)"
              onChange={handleChange}
            />
            {formErrors.soilType && (
              <p className="xs-error">{formErrors.soilType}</p>
            )}
          </div>
          <div className="flex flex-col w-full">
            <Input
              name="cropHealth"
              label="Crop Health"
              type="text"
              value={fieldData.cropHealth}
              placeholder="Enter crop health (e.g., Healthy, Infected, Pest Infection )"
              onChange={handleChange}
            />
            {formErrors.cropHealth && (
              <p className="xs-error">{formErrors.cropHealth}</p>
            )}
          </div>
        </div>
        {/* Submit Button */}
        <button
          disabled={isLoading}
          type="submit"
          className="text-lg text-white btn btn-primary"
        >
          {isLoading ? (
            <Loader width="24px" height="24px" />
          ) : id ? (
            "Update Field"
          ) : (
            "Create Field"
          )}
        </button>
      </form>
    </Modal>
  );
};

export default CreateField;
