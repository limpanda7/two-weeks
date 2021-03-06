import React, {useState, useEffect} from 'react';
import './Challenge.scss';
import Fail from "./Fail";
import Finish from "./Finish";
import Modal from "react-modal";

const Challenge = () => {

    const [routines, setRoutines] = useState([]);
    const [wordList, setWordList] = useState([]);
    const [day, setDay] = useState(null);
    const [count, setCount] = useState(0);
    const [word, setWord] = useState('');
    const [completed, setCompleted] = useState(false);
    const [failed, setFailed] = useState(false);
    const [finished, setFinished] = useState(false);
    const [completeModal, setCompleteModal] = useState(false);
    const [restartOpen, setRestartOpen] = useState(false);

    useEffect(() => {
        calcDay();
    }, [])

    useEffect(() => {
        setRoutines(JSON.parse(localStorage.getItem('routines')) || []);
        setWordList(JSON.parse(localStorage.getItem('wordList')) || []);
    }, [day])

    useEffect(() => {
        setWord(wordList[day - 1]);

        if (wordList.length === day) {
            setCompleted(true);
        } else if (wordList.length < day - 1) {
            setFailed(true);
        }

        if (wordList.length === 14) {
            setFinished(true);
        }
    }, [wordList])

    useEffect(() => {
        if (wordList.length === 14) {
            setFinished(true);
        }
    }, [completed])

    const calcDay = () => {
        const startDt = localStorage.getItem('startDt');
        const startDtArr = startDt.split('-');

        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();

        const stDate = new Date(startDtArr[0], startDtArr[1], startDtArr[2]);
        const endDate = new Date(year, month, day);

        const btMs = endDate.getTime() - stDate.getTime();
        const btDay = btMs / (1000*60*60*24)

        setDay(btDay + 1);
    }

    const calcCount = (e) => {
        if (e.target.checked) {
            setCount(count + 1);
        } else {
            setCount(count - 1);
        }
    }

    const completeToday = () => {
        if (!word || word === '') {
            alert('????????? ??? ????????? ???????????????.')
            return false;
        }

        wordList.push(word);
        localStorage.setItem('wordList', JSON.stringify(wordList))

        setCompleteModal(true);
        setCompleted(true);
    }

    const restartChallenge = () => {
        localStorage.removeItem('routines');
        localStorage.removeItem('prize');
        localStorage.removeItem('startDt');
        localStorage.removeItem('wordList');
        window.location.reload();
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '300px'
        },
    };

    if (failed) {
        return <Fail/>
    } else if (finished) {
        return <Finish routines={routines} wordList={wordList}/>
    } else {
        return (
            <div className='Challenge'>
                <h1>Day {day}</h1>

                <div className='Routines'>
                {
                    routines.map((routine, index) => {
                        return (
                            <div key={index}>
                                <input type='checkbox' onChange={(e) => calcCount(e)} disabled={completed}/>
                                <span>{routine}</span>
                            </div>
                        )
                    })
                }
                </div>

                <div className='Word'>
                    <p>????????? ?????????</p>
                    <input value={word} onChange={(e) => setWord(e.target.value)} disabled={completed}/>
                </div>
                <button disabled={count !== routines.length || completed} onClick={() => completeToday()}>
                    ?????? ?????? ??????!
                </button>

                <br/>
                <br/>

                <button onClick={() => setRestartOpen(true)}>
                    ?????? ?????????
                </button>

                <Modal
                    isOpen={completeModal}
                    style={customStyles}
                >
                    <p>?????????????????????.</p>
                    <div className='ButtonWrap'>
                        <button onClick={() => setCompleteModal(false)}>??????</button>
                    </div>
                </Modal>

                <Modal
                    isOpen={restartOpen}
                    style={customStyles}
                >
                    <p>?????? ????????? ???????????????????<br/>??????????????? ??????????????? ???????????? ????????????.</p>
                    <div className='ButtonWrap'>
                        <button onClick={() => setRestartOpen(false)}>??????</button>
                        <button onClick={() => restartChallenge()}>??????</button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Challenge;