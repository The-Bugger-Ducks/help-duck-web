import { FormEvent, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { UserRequests } from "../../shared/utils/requests/User.requests";
import { FiArrowLeft } from "react-icons/fi";
import { departmentListVariable } from "../../shared/constants/departmentList";
import Button from "../../shared/components/Button";
import ButtonDelete from "../../shared/components/ButtonDelete";
import Footer from "../../shared/components/Footer";
import Header from "../../shared/components/Header";
import TextField from "../../shared/components/TextField";
import SelectInput from "../../shared/components/ChoiceField";
import LoadingContainer from "../../shared/components/Loading/LoadingContainer";

import { User } from "../../shared/interfaces/user.interface";

import SessionController from "../../shared/utils/handlers/SessionController";

import "../../shared/styles/pages/user/UserUpdate.css";
import ChoiceField from "../../shared/components/ChoiceField";

type Role = {
  value: string;
  label: string;
  selected: boolean;
};

export default function UserUpdate() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [role, setRole] = useState<"admin" | "support" | "client">();
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [department, setDepartment] = useState("");
  const [emailPlaceholder, setEmailPlaceholder] = useState("");
  const [namePlaceholder, setNamePlaceholder] = useState("");
  const [userID, setUserID] = useState("");
  const [lastnamePlaceholder, setLastNamePlaceholder] = useState("");
  const [, setRolePlaceholder] = useState<"admin" | "support" | "client">(
    "client"
  );
  const [userProfiles, setUserProfiles] = useState<Role[]>([
    { value: "client", label: "Cliente", selected: false },
    { value: "support", label: "Suporte", selected: false },
    { value: "admin", label: "Administrador", selected: false },
  ]);

  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();
  const token = SessionController.getToken();
  const { id } = useParams();
  const user = SessionController.getUserInfo();

  const userRequest = new UserRequests();

  function handleDepartmentValue(departmentValue: string) {
    if (departmentValue == "marketingAndSales") {
      setDepartment("Marketing e vendas");
    } else if (departmentValue == "financial") {
      setDepartment("Financeiro");
    } else if (departmentValue == "operations") {
      setDepartment("Operações");
    } else if (departmentValue == "rh") {
      setDepartment("RH");
    } else if (departmentValue == "eps") {
      setDepartment("EPS");
    } else if (departmentValue == "ti") {
      setDepartment("TI");
    } else if (departmentValue == "epdi") {
      setDepartment("EPDI");
    } else if (departmentValue == "others") {
      setDepartment("Outros");
    }
  }

  function handleDepartmentLabel(departmentLabel: string) {
    if (departmentLabel == "Marketing e vendas") {
      setSelectedDepartment("marketingAndSales");
    } else if (departmentLabel == "Financeiro") {
      setSelectedDepartment("financial");
    } else if (departmentLabel == "Operações") {
      setSelectedDepartment("operations");
    } else if (departmentLabel == "RH") {
      setSelectedDepartment("rh");
    } else if (departmentLabel == "EPS") {
      setSelectedDepartment("eps");
    } else if (departmentLabel == "TI") {
      setSelectedDepartment("ti");
    } else if (departmentLabel == "EPDI") {
      setSelectedDepartment("epdi");
    } else if (departmentLabel == "Outros") {
      setSelectedDepartment("others");
    }
  }

  const getUser = async () => {
    setLoading(true);

    const response: User = await userRequest.showRequest(id ?? "");

    setEmailPlaceholder(response.email);
    setEmail(response.email);
    setNamePlaceholder(response.firstName);
    setName(response.firstName);
    setLastNamePlaceholder(response.lastName);
    setLastname(response.lastName);
    setRolePlaceholder(response.role);
    setRole(response.role);
    setUserID(response.id);
    setUserProfiles([
      {
        value: "client",
        label: "Cliente",
        selected: response.role === "client",
      },
      {
        value: "support",
        label: "Suporte",
        selected: response.role === "support",
      },
      {
        value: "admin",
        label: "Administrador",
        selected: response.role === "admin",
      },
    ]);
    setDepartment(response.department);
    handleDepartmentLabel(response.department);
    setLoading(false);
  };

  useEffect(() => {
    const subscribe = getUser();

    return () => {
      subscribe.finally();
    };
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    if (user?.role !== "admin" && user?.id !== id) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (user?.id === id) {
      setIsAdmin(true);
      setIsUser(false);
    } else {
      setIsAdmin(false);
      setIsUser(true);
    }
  }, []);

  function handleConfirmPassword() {
    if (!isUser) {
      console.log("auuu");
    }
  }

  function TitlePage() {
    if (user?.id === id) {
      return "Edição de perfil";
    }
    return "Detalhes do usuário";
  }

  function DeleteButton() {
    return (
      <>
        {user?.id !== id && user?.role === "admin" ? (
          <ButtonDelete
            type="button"
            width="15rem"
            onClick={() => submitUserDelete(id)}
          >
            Excluir usuário
          </ButtonDelete>
        ) : null}
      </>
    );
  }

  async function updateUser(payload: User) {
    const response = await userRequest.updateRequest(payload);
    setLoading(false);

    if (response?.status === 200) {
      alert("Usuário atualizado com sucesso!");
      if (user?.id === id) {
        //@ts-expect-error
        delete payload.password;
        SessionController.setUserInfo(payload);
      }
      navigate("/homepage");
    }
  }

  async function submitUserUpdate(event: FormEvent) {
    event.preventDefault();
    if (user?.id === id) {
      if (password === "" || name === "" || lastname === "") {
        return alert("Preencha todos os campos habilitados");
      }
    } else {
      if (email === "") {
        return alert("Preencha o email");
      }
    }
    if (!id) {
      return;
    }

    const payload = {
      id: id,
      email: email,
      firstName: name,
      lastName: lastname,
      role: role!,
      department: department,
    };

    let oldPassword = null;
    let passwordUpdatePayload = {};

    if (user?.id !== id) {
      updateUser(payload);
    } else {
      oldPassword = window.prompt(
        "Insira sua senha atual para realizar as altereções:"
      );

      if (oldPassword === null) {
        setLoading(false);
      } else {
        passwordUpdatePayload = {
          userId: id,
          newPassword: password,
          oldPassword: oldPassword,
        };
        const responseUpdatePassword = await userRequest.updatePassword(
          passwordUpdatePayload
        );

        if (responseUpdatePassword?.status == 200) {
          updateUser(payload);
        } else {
          setLoading(false);
          navigate("/homepage");
        }
      }
    }
  }

  async function submitUserDelete(id: string | undefined) {
    if (!id) {
      return;
    }

    setLoading(true);
    const response = await userRequest.deleteRequest(id);

    setLoading(false);

    if (response?.status === 200) {
      alert("Usuário excluido com sucesso!");
      navigate("/homepage");
    }
  }

  return (
    <div id="user-update">
      <LoadingContainer loading={loading} />
      <div className="user-update-container">
        <Header hiddenDropdown={true} />
        <div className="user-update-content">
          <section className="user-update-title">
            <h1>
              <div>
                <FiArrowLeft
                  className="Icon"
                  color="var(--color-gray-dark)"
                  onClick={() => {
                    navigate("/homepage");
                  }}
                />
              </div>
              {TitlePage()}
            </h1>
          </section>
          <form className="user-update-form" onSubmit={submitUserUpdate}>
            <section className="form-sections">
              <section className="user-update-data">
                <div>
                  <label htmlFor="name">Nome</label>
                  <TextField
                    type="text"
                    placeholder={namePlaceholder}
                    defaultValue={namePlaceholder}
                    onChange={(event) => setName(event.target.value)}
                    name="name"
                    disabled={isUser}
                  />
                </div>
                <div>
                  <label htmlFor="lastname">Sobrenome</label>
                  <TextField
                    type="text"
                    placeholder={lastnamePlaceholder}
                    defaultValue={lastnamePlaceholder}
                    onChange={(event) => setLastname(event.target.value)}
                    name="lastname"
                    disabled={isUser}
                  />
                </div>
              </section>

              <section className="user-update-data">
                <div>
                  <label htmlFor="email">E-mail</label>
                  <TextField
                    placeholder={emailPlaceholder}
                    defaultValue={emailPlaceholder}
                    onChange={(event) => setEmail(event.target.value)}
                    name="email"
                    disabled={isAdmin}
                  />
                </div>

                <div>
                  <label htmlFor="role">Cargo</label>
                  <SelectInput
                    onChange={(event) => setRole(event.target.value)}
                    name="role"
                    items={userProfiles}
                    disabled={isAdmin}
                  />
                </div>
              </section>

              <section className="user-update-data">
                <div>
                  <label htmlFor="password">Senha</label>
                  <TextField
                    placeholder="Senha"
                    onChange={(event) => setPassword(event.target.value)}
                    name="password"
                    type="password"
                    disabled={isUser}
                  />
                </div>
                <div>
                  <label htmlFor="department">Departamento</label>
                  <ChoiceField
                    name="department"
                    items={departmentListVariable(selectedDepartment)}
                    onChange={(event) =>
                      handleDepartmentValue(event.target.value)
                    }
                    disabled={isAdmin && user?.id === userID}
                  />
                </div>
              </section>
            </section>

            <section className="user-update-submit">
              <DeleteButton />

              <Button
                width="15rem"
                type="submit"
                color="var(--color-white-light)"
              >
                Confirmar alteração
              </Button>
            </section>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}
