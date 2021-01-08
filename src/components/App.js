import React, { useReducer, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Event from './Event';
import reducer from '../reducer';

const App = () => {
  const [state, dispatch] = useReducer(reducer, []);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addEvent = (e) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE_EVENT',
      title,
      body,
    });

    setTitle('');
    setBody('');
  };

  const deleteAllEvents = (e) => {
    e.preventDefault();
    const result = window.confirm(
      '全てのイベントを本当に削除しても良いですか？'
    );

    if (result) dispatch({ type: 'DELETE_ALL_EVENTS' });
  };

  const unCreatable = title === '' || body === '';

  return (
    <div className="container-fluid">
      <h4>イベント作成フォーム</h4>
      <form>
        <div className="form-group">
          <label htmlFor="formEventTitle">タイトル</label>
          <input
            className="form-control"
            id="formEventTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
            maxLength="20"
          />
        </div>

        <div className="form-group">
          <label htmlFor="formEventBody">ボディー</label>
          <textarea
            className="form-control"
            id="formEventBody"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="body"
            maxLength="1000"
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={addEvent}
          disabled={unCreatable}
        >
          イベント作成する
        </button>
        <button
          className="btn btn-danger ml-1"
          onClick={deleteAllEvents}
          disabled={state.length === 0}
        >
          全てのイベントを削除する
        </button>

        <h4 className="mt-5">イベント一覧</h4>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>タイトル</th>
              <th>ボディー</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {state.map((event, index) => (
              <Event key={index} event={event} dispatch={dispatch} />
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default App;