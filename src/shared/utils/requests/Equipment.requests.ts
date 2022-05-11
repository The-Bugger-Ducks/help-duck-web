import { apiEquipment } from "../../services/Api.service";
import { Equipment } from "../../interfaces/equipment.interface";
import { validateStatus } from "../handlers/HandlerResponseStatusCodeFound";
import { EQUIPMENT_ENDPOINTS } from "../endpoints";

export class EquipmentRequests {
  public async createEquipment(equipment: Equipment) {
    try {
      const response = await apiEquipment.post(
        EQUIPMENT_ENDPOINTS.EQUIPMENT_REGISTER,
        equipment
      );
      return response;
    } catch (error) {
      console.log(error);
      alert("Não foi possível cadastrar o equipamento");
    }
  }

  public async listEquipmentRequest() {
    try {
      const response = await apiEquipment.get(
        EQUIPMENT_ENDPOINTS.EQUIPMENT_LIST,
        {
          validateStatus,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      alert("Não foi possivel carregar a lista de equipamentos.");
    }
  }
}
