import "./App.scss";
import Modal from "./components/modal";
import Card from "./components/card";
import useFetch from "./hooks/useFetch";
import { useCallback, useContext, useState } from "react";
import { ModalContext, TModalContext } from "./providers/modal-provider";
import { ACTIONS } from "./providers/modal-provider/actions";
import Pagination from "./components/pagination";

export type TPhotosResponse = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export type TDataResp = TPhotosResponse[];

function App() {
  const dataFetcher = useCallback(async function fetchData<
    TDataResp
  >(): Promise<TDataResp> {
    const resp = await fetch("http://jsonplaceholder.typicode.com/photos");
    const data = await resp.json();
    return data;
  },
  []);

  const { data, isLoading } = useFetch<TDataResp>({ fetcher: dataFetcher });

  // async function fetchData<TDataResp>(): Promise<TDataResp> {
  //   const resp = await fetch("http://jsonplaceholder.typicode.com/photos");
  //   const data = await resp.json();
  //   return data;
  // }

  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

  async function deleteItem<TDataResp>(): Promise<TDataResp> {
    const resp = await fetch(
      `http://jsonplaceholder.typicode.com/photos/${
        deleteItemId ? deleteItemId : ""
      }`,
      {
        method: "DELETE",
      }
    );
    const data = await resp.json();
    return data;
  }

  const { state, dispatch } = useContext<TModalContext>(ModalContext);

  const closeModal = () => {
    state && dispatch({ type: ACTIONS.TOGLE_MODAL, payload: null });
    console.log(state);
  };

  const onItemDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const target = event.target as HTMLButtonElement;
    const parentId = target.parentElement && target.parentElement.id;
    setDeleteItemId(parentId);
  };

  return (
    <div className="App">
      <Modal
        renderModal={(state) =>
          state && (
            <div className="modal-wrapper">
              <h1>{state.title}</h1>
              <img src={state.url} alt={state.title} />
              <button onClick={closeModal}>Close Modal</button>
            </div>
          )
        }
      />
      <h2>hello, im tech task</h2>
      {isLoading && <h1> FETCHING DATA </h1>}
      {data &&
        data.map((dataItem) => (
          <Card
            key={dataItem.id}
            albumId={dataItem.albumId}
            id={dataItem.id}
            thumbnailUrl={dataItem.thumbnailUrl}
            title={dataItem.title}
            url={dataItem.url}
          >
            <button onClick={onItemDelete}>Delete Item</button>
          </Card>
        ))}
      <Pagination />
    </div>
  );
}

export default App;
