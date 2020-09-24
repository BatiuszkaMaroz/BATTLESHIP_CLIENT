import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Modal from '../../shared/components/Modal/Modal';
import Button from '../../shared/components/Button/Button';
import Card from '../../shared/components/Card/Card';
import Board from './Board/Board';
import Harbor from './Harbor/Harbor';

import useSocket from '../../shared/hooks/useSocket';
import useTypedSelector from '../../shared/hooks/useTypedSelector';
import styles from './Setting.module.scss';
import { resetBoard, randomizeBoard } from '../../store/actions/setting';
import { setGameBoard } from '../../store/actions/game';

const Setting: React.FC = () => {
  const dispatch = useDispatch();
  const { emitter, data, acceptError, error } = useSocket<{
    board: any;
    message: string;
  }>('apply-setting');

  const board = useTypedSelector((state) => state.settings.board);
  const allShipsSettled = useTypedSelector((state) =>
    state.settings.ships.reduce((prev, cur) => {
      if (prev) {
        if (cur && cur.settled) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }, true),
  );

  const applySetting = useCallback(() => {
    if (allShipsSettled) {
      emitter(board);
    }
  }, [allShipsSettled, board, emitter]);

  const resetSetting = useCallback(() => {
    dispatch(resetBoard());
  }, [dispatch]);

  const randomizeSetting = useCallback(() => {
    dispatch(randomizeBoard());
  }, [dispatch]);

  useEffect(() => {
    if (data.message) {
      console.log(data.message);
    }

    if (data.board) {
      dispatch(setGameBoard(data.board, true));
    }
  }, [dispatch, data]);

  // ! FIXME TO REMOVE
  // **************************************************
  // const [ready, setReady] = useState<boolean>(false);
  // useEffect(() => {
  //   dispatch(randomizeBoard());
  //   setReady(true);
  // }, [dispatch]);
  // useEffect(() => {
  //   if (ready) {
  //     emitter(board);
  //   }
  // }, [ready, board, emitter]);
  // **************************************************

  return (
    <>
      {error && <Modal onClose={acceptError}>{error}</Modal>}
      <Card center className={styles.setting}>
        <div className={styles.setting__container}>
          <Harbor />
          <Board />
        </div>
        <div className={styles.setting__controls}>
          <Button disabled={!allShipsSettled} onClick={applySetting}>
            Play
          </Button>
          <Button onClick={resetSetting}>Reset</Button>
          <Button onClick={randomizeSetting}>Randomize</Button>
        </div>
      </Card>
    </>
  );
};

export default Setting;
