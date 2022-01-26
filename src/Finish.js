import React from 'react';

const Finish = ({routines, wordList}) => {

    const restartChallenge = () => {
        localStorage.removeItem('routines');
        localStorage.removeItem('prize');
        localStorage.removeItem('startDt');
        localStorage.removeItem('wordList');
        window.location.reload();
    }

    return (
        <>
            <h2>2주간의 도전을 성공하셨습니다!</h2>
            <h3>당신은 아래와 같은 습관을 갖게 되었습니다.</h3>
            <ol>
                {
                    routines.map((routine, index) => {
                        return (
                            <li key={index}>
                                {routine}
                            </li>
                        )
                    })
                }
            </ol>

            <h3>당신은 매일 아래와 같은 말들을 남겼습니다.</h3>
            <ol>
                {
                    wordList.map((word, index) => {
                        return (
                            <li key={index}>
                                {word}
                            </li>
                        )
                    })
                }
            </ol>

            <div className='Prize'>
                <h3>당신은 아래의 상품을 받을 자격이 있습니다.</h3>
                <h1>{localStorage.getItem('prize')}</h1>
            </div>

            <p>아래 버튼을 눌러 새로운 습관을 만들어보세요.</p>
            <button onClick={() => restartChallenge()}>첫 화면으로</button>
        </>
    )
}

export default Finish;