import React from 'react';

const Fail = () => {

    const restartChallenge = () => {
        localStorage.removeItem('routines');
        localStorage.removeItem('prize');
        localStorage.removeItem('startDt');
        localStorage.removeItem('wordList');
        window.location.reload();
    }

    return (
        <>
            <p>2주 챌린지를 실패하셨습니다.</p>
            <p>새로운 마음으로 다시 시작해보세요.</p>
            <button onClick={() => restartChallenge()}>첫 화면으로</button>
        </>
    )
}

export default Fail;