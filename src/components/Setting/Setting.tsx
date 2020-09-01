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
  const { emitter, data, unlocker, acceptError, error } = useSocket<{
    board: any;
    message: string;
  }>('apply-setting');

  const board = useTypedSelector((state) => state.board);
  const allShipsSettled = useTypedSelector((state) =>
    state.ships.reduce((prev, cur) => {
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
      unlocker();
    }
  }, [allShipsSettled, board, emitter, unlocker]);

  const resetSetting = useCallback(() => {
    dispatch(resetBoard());
  }, [dispatch]);

  const randomizeSetting = useCallback(() => {
    dispatch(randomizeBoard());
  }, [dispatch]);

  useEffect(() => {
    if (data.board && data.message) {
      console.log(data.message);
      dispatch(setGameBoard(data.board));
    }
  }, [dispatch, data]);

  //**************************************************
  //**************************************************
  //**************************************************
  const [ready, setReady] = useState<boolean>(false);
  useEffect(() => {
    dispatch(randomizeBoard());
    setReady(true);
  }, [dispatch]);
  useEffect(() => {
    if (ready) {
      emitter(board);
    }
  }, [ready, board, emitter]);
  //**************************************************
  //**************************************************
  //**************************************************

  return (
    <>
      {error && <Modal onClick={acceptError}>{error}</Modal>}
      <Card center className={styles.Setting}>
        <div className={styles.Setting__Container}>
          <Harbor />
          <Board />
        </div>
        <div className={styles.Setting__Controls}>
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