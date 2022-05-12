import { apiEquipment } from "../../services/Api.service";
import { Equipment } from "../../interfaces/equipment.interface";
import { validateStatus } from "../handlers/HandlerResponseStatusCodeFound";
import { EQUIPMENT_ENDPOINTS } from "../endpoints";
import { useNavigate } from "react-router-dom";

export class EquipmentRequests {
  navigate = useNavigate();

  public async updateEquipment(newEquipment: Equipment) {
    try {
      const response = await apiEquipment.put(
        EQUIPMENT_ENDPOINTS.EQUIPMENT_UPDATE,
        newEquipment
      );
      return response.data;
    } catch (error) {
      console.log(error);
      alert("Não foi possível atualizar dados do equipamento");
    }
  }

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

  public async listEquipmentByID(id: string) {
    try {
      const response = await apiEquipment.get(
        `${EQUIPMENT_ENDPOINTS.EQUIPMENT_LIST_BY_ID}${id}`,
        {
          validateStatus,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      alert("Não foi possivel carregar o equipamento.");
      this.navigate("/homepage");
    }
  }
}
