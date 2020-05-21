import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'


import {
  Container,
  Segment,
  Input,
  Button,
  Message
} from 'semantic-ui-react';

function App() {

  let newQuestion = () => {
    let levels=[10,100];
    let level = levels[Math.floor(Math.random()*levels.length)];

    let question = Math.floor(Math.random()*(level*10));
    let answer = Math.round(question/level)*level;
    return {
      level: level,
      question: question,
      answer: answer
    }
  }

  let [question,setQuestion] = useState(newQuestion())
  let [answer,setAnswer] = useState('');
  let [answered,setAnswered] = useState(false);
  let [result,setResult] = useState(false);
  let [stats,setStats] = useState({questions:0,correct:0,wrong:0})

  let checkQuestion = () => {
    setAnswered(true);
    if(parseInt(answer)===question.answer) {
      setStats({...stats,correct:stats.correct+1,questions:stats.questions+1});
      setResult(true)
      setTimeout(() => {
        setAnswered(false);
        setAnswer('');
        setQuestion(newQuestion());
      },1000)
    } else {
      setStats({...stats,wrong:stats.wrong+1});
      setResult(false);
      setTimeout(() => {
        setAnswer('');
        setAnswered(false);
      },1000)
    }
    // setQuestion(newQuestion());
  }

  let levelType = (level) => {
    if(level===100) return 'hundreds';
    else if(level===10) return 'tens';
  }
  return (
    <div className="App" style={{paddingTop:'1em'}}>
      <Container>
        <Segment>
          <h3>round to the nearest<br />{levelType(question.level)}</h3>
        </Segment>
        <Segment>
          <h1>{question.question} </h1>
        </Segment>
        <Input value={answer} onChange={(e,data) => {
            setAnswer(data.value,);
            // if(parseInt(data.value)===question.answer) {
            //   console.log(data.value,question.answer);
            //   checkQuestion(data.value);
            // }
          }}
          placeholder='answer' fluid size="massive" focus={true} className="number-input"/>
        {answered ? (result ? <Message
          positive
          header='Nice work!'
        /> : <Message
          negative
          header='Try again' />) :
        <Button className='mt-1em mb-1em' fluid color="green" onClick={checkQuestion} size="huge">check</Button>}
        <Button.Group fluid className='mt-1em' >
          <Button primary>{stats.questions}</Button>
          <Button positive>{stats.correct}</Button>
          <Button negative>{stats.wrong}</Button>
        </Button.Group>
      </Container>
    </div>
  );
}

export default App;
