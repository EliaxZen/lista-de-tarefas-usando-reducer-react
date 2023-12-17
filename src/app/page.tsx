"use client"

import { listReducer } from "@/reducers/listReducer";
import { Item } from "@/types/Item";
import { useReducer, useState } from "react";

const Page = () => {


  const [list, dispatch] = useReducer(listReducer, []);
  const [addField, setAddField] = useState('');

  const handleAddButton = () => {
    if (addField.trim() === '') return false;

    dispatch({
      type: 'add',
      payload: { text: addField.trim() }
    });

    setAddField('');
  }

  const handleDoneCheckbox = (id: number) => {
    dispatch({
      type: 'toggleDone',
      payload: { id }
    });
    alert('este botão possui alguns erros, pode ser que não funcione corretamente :(')
  }

  const handleEdit = (id: number) => {
    const item = list.find(it => it.id === id);
    if (!item) return false;

    const newText = window.prompt('Editar Tarefa', item.text);
    if (!newText || newText.trim() === '') return false;

    dispatch({
      type: 'editText',
      payload: { id, newText }
    });
  }

  const handleRemove = (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir?')) return false;

    dispatch({
      type: 'remove',
      payload: { id }
    });
  }

  return (
    <div className="container mx-auto box-border p-3 scroll-smooth">
      <h1 className="text-center text-4xl my-4 max-[600px]:text-2xl">Lista de Tarefas</h1>
      <div className="mx-auto flex rounded-md bg-gradient-to-r to-slate-900 from-slate-700 p-4 my-4 max-[600px]:flex-col">
        <input
          type="text"
          className="flex-1 rounded-md border border-white p-3 
          bg-transparent text-white outline-none mr-3 max-[600px]:mb-3 max-[600px]:mr-0"
          placeholder="Digite um item"
          value={addField}
          onChange={e => setAddField(e.target.value)}
        />
        <button
          className="p-4 bg-green-500/50 hover:bg-green-500 hover:text-black font-black rounded"
          onClick={handleAddButton}
        >ADICIONAR</button>
      </div>
      <ul className="mx-auto w-full">
        {list.map(item => (
          <li
            key={item.id}
            className="bg-gradient-to-r from-slate-900 to-slate-700 flex rounded items-center justify-between p-3 my-3  max-[600px]:flex-col max-[600px]:items-start "
          >
            <div className="flex items-center max-[600px]:mb-5">
              <input
                type="checkbox"
                className="w-6 h-6 mr-4"
                checked={item.done}
                onClick={() => handleDoneCheckbox(item.id)}
              />
              <p className="flex-1 text-center text-md break-all">{item.text}</p>
            </div>

            <div className="flex items-center justify-center max-[600px]:w-full">
              <button onClick={() => handleEdit(item.id)} className="mx-4 text-white rounded px-3 py-2 bg-blue-600">Editar</button>
              <button onClick={() => handleRemove(item.id)} className="mx-4 text-white rounded px-3 py-2 bg-red-600">Excluir</button>
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default Page;