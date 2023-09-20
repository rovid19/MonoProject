import { vehicleStore } from "../Stores/VehicleStore";

export const pictureUpload = async (e) => {
  const file = e.target.files;
  const formData = new FormData();
  formData.append("photo", file[0]);

  vehicleStore.setVehicleFormData(formData);
};
