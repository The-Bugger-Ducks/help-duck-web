import { apiEquipment } from "../../services/Api.service";
import { Equipment } from "../../interfaces/equipment.interface";
import { validateStatus } from "../handlers/HandlerResponseStatusCodeFound";
import { EQUIPMENT_ENDPOINTS } from "../endpoints";
import { useNavigate } from "react-router-dom";

export class EquipmentRequests {
  navigate = useNavigate();

  public async deleteEquipment(id: string) {
    try {
      const response = await apiEquipment.delete(
        `${EQUIPMENT_ENDPOINTS.EQUIPMENT_DELETE}${id}`
      );
      return response;
    } catch (error) {
      console.log(error);
      alert("Não foi possível deletar o equipamento");
    }
  }

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

  public async listEquipmentRequest(sorting?: string) {
    let url = `${EQUIPMENT_ENDPOINTS.EQUIPMENT_LIST}`;

    if (sorting) {
      url = `${EQUIPMENT_ENDPOINTS.EQUIPMENT_LIST}?${sorting}`;
    }

    try {
      const response = await apiEquipment.get(url, {
        validateStatus,
      });
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

  public async searchEquipment(
    equipmentName: string,
    department: string,
    sorting?: string
  ) {
    try {
      let url = `${EQUIPMENT_ENDPOINTS.EQUIPMENT_SEARCH}`;

      if (equipmentName.length != 0 && department.length == 0) {
        url += `?name=${equipmentName}`;
      } else if (equipmentName.length != 0 && department.length != 0) {
        url += `?name=${equipmentName}&department=${department}`;
      } else if (department.length != 0 && equipmentName.length == 0) {
        url += `?department=${department}`;
      }

      if (sorting && equipmentName.length == 0 && department.length == 0) {
        url += `?${sorting}`;
      } else if (sorting) {
        url += `&${sorting}`;
      }

      const { data } = await apiEquipment.get(url, { validateStatus });

      return data;
    } catch (error) {
      alert("Não foi possível realizar filtro, tente novamente!");
    }
  }
}
