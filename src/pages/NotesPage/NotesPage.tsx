import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import Button from "components/Button";
import { Separator, DropDown, DropDownRow, Input } from "components";
import { MainView } from "views/layout/MainView";
import { NotesTable } from "./components/notesTable";
import { AddNotesModal } from "./components/addNotesModal";
import { UpdateNotesModal } from "./components/updateNotesModal";
import { DeleteNotesModal } from "./components/deleteNotesModal";

import useRouter from "hooks/useRouter";
import { capitalizeFirstLetter } from "utils/functions";

type Todo = {
  id: number;
  title: string;
  description: string;
  status: boolean;
};
type NewTodo = Omit<Todo, "id" | "status">;
const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Headline = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #ffffff;
`;

const HeaderButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const FiltersContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const LabelControl = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const Label = styled.div``;

const statusOptions: DropDownRow.IDataItem[] = [
  { label: "Done", value: "Done" },
  { label: "Undone", value: "Undone" },
];

export const NotesPage = () => {
  const { pathname } = useRouter();

  const [addNotesModal, setAddNotesModal] = useState<boolean>(false);
  const toggleUpdateNotesModal = () => setUpdateNotesModal((prev) => !prev);
  const [updateNotesModal, setUpdateNotesModal] = useState<boolean>(false);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false);

  const [currentSelectedTodoId, setCurrentSelectedTodoId] = useState<number>(0);
  const [currentSelectedTodo, setCurrentSelectedTodo] = useState<Todo>();

  // const toggleDeleteNotesModal = () => setDeleteNotesModal((prev) => !prev);
  const [loading, setLoading] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const [searchText, setSearchText] = useState("");

  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo>({} as Todo);

  const toggleAddNotesModal = () => {
    setAddNotesModal((prev) => !prev);
  };

  const handleSearchInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e.target.value;
    // const filtered = todos.filter((item) => {
    //   if (!inputValue) return true;
    //   return item.title.toLowerCase().includes(inputValue.toLowerCase());
    // });
    // setFilteredTodos(filtered);
    // setTodos(filtered);

    setSearchText(inputValue);

    const accessToken = localStorage.getItem("Token");
    try {
      const response = await axios.post(
        "/todo/search",
        { title: inputValue },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getTodos = () => {
    const accessToken = localStorage.getItem("Token");
    try {
      setLoading(true);
      axios
        .get("/todo", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setTodos(res.data);
        });

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const openDeleteDialog = (id: number) => {
    setCurrentSelectedTodoId(id);
    setIsOpenDeleteDialog(true);
  };

  const handleDeleteDialog = async () => {
    const accessToken = localStorage.getItem("Token");
    try {
      await axios.delete(`/todo/${currentSelectedTodoId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const remainingTodo = todos.filter(
        (item: Todo) => item.id !== currentSelectedTodoId
      );
      setTodos(remainingTodo);
      closeDeleteDialog();
    } catch (error) {
      console.error(error);
    }
  };
  const closeDeleteDialog = () => {
    setIsOpenDeleteDialog(false);
  };

  const openEditDialog = (data: Todo) => {
    setTodo(data);

    setCurrentSelectedTodo(data);
    setUpdateNotesModal(true);
  };
  const closeUpdateDialog = () => {
    setUpdateNotesModal(false);
  };
  const handleUpdateDialog = async (data: NewTodo) => {
    const accessToken = localStorage.getItem("Token");
    try {
      await axios.patch(`/todo/${currentSelectedTodo?.id}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const index = todos.findIndex(
        (todo) => todo.id === currentSelectedTodo?.id
      );
      const updatedTodos = [...todos];
      if (index !== -1) {
        updatedTodos[index] = { ...updatedTodos[index], ...data };
      }
      setTodos(updatedTodos);

      closeUpdateDialog();
    } catch (error) {
      console.error(error);
    }
  };
  const addTodo = async (data: NewTodo) => {
    const accessToken = localStorage.getItem("Token");

    try {
      const response = await axios.post("/todo", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const newTodo = response.data as Todo;
      setTodos((prev) => [...prev, newTodo]);
      toggleAddNotesModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainView>
      <Header>
        <Headline>{capitalizeFirstLetter(pathname.split("/")[1])}</Headline>
        <HeaderButtonsContainer>
          <Button variant="outlined-primary" onClick={toggleAddNotesModal}>
            Add Notes
          </Button>
        </HeaderButtonsContainer>
      </Header>
      <Separator />
      <FiltersContainer>
        <LabelControl>
          <Label>Search</Label>
          <Input
            placeholder="Search..."
            type="text"
            onChange={handleSearchInputChange}
          />
        </LabelControl>
      </FiltersContainer>
      <Separator />
      <NotesTable
        toggleUpdateNotesModal={toggleUpdateNotesModal}
        todos={todos}
        completeTodo={async (id) => {
          const accessToken = localStorage.getItem("Token");

          const updatedTodos: Todo[] = todos.map((item) => {
            if (id === item.id && !item.status) {
              return { ...item, status: !item.status };
            }
            return { ...item };
          });
          setTodos(updatedTodos);
          try {
            const response = await axios.patch(
              `/todo/${id}`,
              { status: true },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
          } catch (error) {}
        }}
        openDeleteDialog={openDeleteDialog}
        handleDeleteDialog={function (): void {
          throw new Error("Function not implemented.");
        }}
        openEditDialog={openEditDialog}
      />
      {addNotesModal && (
        <AddNotesModal onClose={toggleAddNotesModal} onSubmit={addTodo} />
      )}
      {updateNotesModal && (
        <UpdateNotesModal
          onClose={toggleUpdateNotesModal}
          todo={todo}
          onSubmit={handleUpdateDialog}
        />
      )}
      {isOpenDeleteDialog && (
        <DeleteNotesModal
          onClose={closeDeleteDialog}
          onDelete={handleDeleteDialog}
        />
      )}
    </MainView>
  );
};
