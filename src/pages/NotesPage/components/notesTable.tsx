import React from "react";
import styles from "./notesTable.module.scss";
import { CheckBox } from "components";
import { AiTwotoneEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
type Todo = {
  id: number;
  title: string;
  description: string;
  status: boolean;
};

interface IProps {
  toggleUpdateNotesModal?: () => void;
  toggleDeleteNotesModal?: () => void;
  completeTodo: (id: number) => void;
  openDeleteDialog: (id: number) => void;
  handleDeleteDialog: () => void;
  openEditDialog: (item: Todo) => void;
  todos: Todo[];
}

export const NotesTable = ({
  toggleUpdateNotesModal,
  toggleDeleteNotesModal,
  completeTodo,
  openDeleteDialog,
  openEditDialog,
  todos,
}: IProps) => {
  return (
    <table className={styles.teamTable}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos?.map((data: Todo, index: number) => {
          // Render the filteredTodos instead of todos
          return (
            <tr key={index}>
              <td>{data.title}</td>
              <td>{data.description}</td>
              <td>
                <CheckBox
                  onClick={(e) => completeTodo(data.id)}
                  checked={data.status}
                  disabled={data.status}
                />
              </td>
              <td>
                <div
                  style={{ display: "flex", gap: "20px", cursor: "pointer" }}
                >
                  <div>
                    <AiTwotoneEdit onClick={() => openEditDialog(data)} />
                  </div>
                  <div>
                    <MdDelete onClick={() => openDeleteDialog(data.id)} />
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
