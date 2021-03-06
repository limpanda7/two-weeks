import React, {useState, useCallback} from 'react';
import Modal from 'react-modal';
import Challenge from "./Challenge";
import './App.scss';
import TitleImg from './images/two-weeks.jpg';

const App = () => {

    const [newRoutine, setNewRoutine] = useState('');
    const [routines, setRoutines] = useState([]);
    const [prize, setPrize] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const addRoutine = (e) => {
        e.preventDefault();

        if (newRoutine === '') {
            alert('한 글자 이상 입력해주세요.')
            return false;
        }

        setRoutines([...routines, newRoutine]);
        setNewRoutine('');
    }

    const removeRoutine = (index) => {
        const tempArr = routines;
        tempArr.splice(index, 1);
        setRoutines(tempArr);
        forceUpdate();
    }

    const startChallenge = () => {
        if (routines.length === 0) {
            alert('루틴을 한 개 이상 입력 해 주세요.')
            return false;
        }

        if (prize === '') {
            alert('상품을 입력 해 주세요.')
            return false;
        }

        setModalOpen(true);
    }

    const saveChallenge = () => {
        localStorage.setItem('routines', JSON.stringify(routines));
        localStorage.setItem('prize', prize);

        const today = new Date();
        const year = today.getFullYear();
        const month = ('0' + (today.getMonth() + 1)).slice(-2);
        const day = ('0' + today.getDate()).slice(-2);
        const dateString = year + '-' + month  + '-' + day;

        localStorage.setItem('startDt', dateString);
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

    if (localStorage.getItem('routines')) {
        return (
            <div className="App">
                <Challenge/>
            </div>
        )
    }

    return (
        <div className="App">
            <img src={TitleImg} className='TitleImg'/>
            <h3>2주동안 도전할 루틴을<br/>아래에 적어주세요.</h3>
            <form onSubmit={(e) => addRoutine(e)}>
                <input value={newRoutine} onChange={(e) => setNewRoutine(e.target.value)}/>
                <button type='submit'>추가</button>
            </form>

            <ol>
                {
                    routines.map((routine, index) => {
                        return (
                            <li key={index}>
                                <div className='ListItem'>
                                    <span>{routine}</span>
                                    <span onClick={() => removeRoutine(index)}>❌</span>
                                </div>
                            </li>
                        )
                    })
                }
            </ol>

            <div className='Prize'>
                <h3>도전 성공 시 받을 상품을<br/>아래에 적어주세요.</h3>
                <input value={prize} onChange={(e) => setPrize(e.target.value)}/>
            </div>

            <button onClick={() => startChallenge()}>챌린지 시작하기</button>

            <br/>
            <br/>
            <br/>

            <p className='Note'>작성한 정보는 어떠한 서버로도 전송되지 않으며,<br/>오직 사용자의 브라우저에만 저장됩니다.</p>

            <Modal
                isOpen={modalOpen}
                style={customStyles}
            >
                <p>한 번 결정하면 2주간 바꾸지 못 합니다.<br/>이대로 시작할까요?</p>
                <div className='ButtonWrap'>
                    <button onClick={() => setModalOpen(false)}>취소</button>
                    <button onClick={() => saveChallenge()}>확인</button>
                </div>
            </Modal>
       </div>
    );
}

export default App;
