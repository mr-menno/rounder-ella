import React, { useState } from 'react';

import {
  Container,
  Segment,
  Input,
  Button,
  Message,
  Icon,
} from 'semantic-ui-react';



function Rounding() {

  let newQuestion = () => {
    let levels=[10]; //,100];
    let level = levels[Math.floor(Math.random()*levels.length)];

    let question = Math.floor(Math.random()*(level*10));
    let answer = Math.round(question/level)*level;
    return {
      level: level,
      question: question,
      answer: answer,
      outcome: -1
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
      if(question.outcome===-1) {
        setQuestion({...question,outcome:0})
        setStats({...stats,correct:stats.correct+1,questions:stats.questions+1});
      }
      setResult(true)
      setTimeout(() => {
        setAnswered(false);
        setAnswer('');
        setQuestion(newQuestion());
      },1000)
    } else {
      if(question.outcome===-1) {
        setQuestion({...question,outcome:0})
        setStats({...stats,wrong:stats.wrong+1,questions:stats.questions+1});
      }
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

    <Container>
        <Segment>
          <h3>round to the nearest<br />{levelType(question.level)}</h3>
        </Segment>
        <Segment>
          <h1>{question.question} </h1>
        </Segment>
        <Input type="number" pattern="\d*" value={answer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} onChange={(e,data) => {
            setAnswer(data.value.replace(/,/g,''));
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
          <Button primary icon labelPosition='left'>{stats.questions}<Icon name='hashtag' /></Button>
          <Button positive icon labelPosition='left'>{stats.correct}<Icon name='check' /></Button>
          <Button negative icon labelPosition='left'>{stats.wrong}<Icon name='close' /></Button>
        </Button.Group>
    </Container>
  );
}

export default Rounding;
